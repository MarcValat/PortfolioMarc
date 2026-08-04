import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { rollColor } from './palette'
import { scaleForDevice } from './deviceTier'

// Sparse, distant, twinkling points that sit behind the network and fill the empty
// black space between its nodes — the depth cue the old dense starfield gave for free.

const dustVert = /* glsl */ `
  attribute float size;
  attribute vec3 color;
  uniform float uTime;
  uniform float uSizeFactor;
  varying vec3 vColor;
  varying float vTwinkle;

  void main() {
    vColor = color;
    float freq = 0.4 + fract(sin(dot(position.xy, vec2(12.9898, 78.233))) * 43758.5453) * 0.9;
    vTwinkle = 0.55 + 0.45 * sin(uTime * freq + position.z * 3.1);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (uSizeFactor / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const dustFrag = /* glsl */ `
  uniform float uAlpha;
  varying vec3 vColor;
  varying float vTwinkle;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float falloff = 1.0 - smoothstep(0.0, 0.5, d);
    gl_FragColor = vec4(vColor, falloff * uAlpha * vTwinkle);
  }
`

const DUST_COUNT = scaleForDevice(1300, 500)

function buildDustData() {
  const positions = new Float32Array(DUST_COUNT * 3)
  const colors = new Float32Array(DUST_COUNT * 3)
  const sizes = new Float32Array(DUST_COUNT)

  for (let i = 0; i < DUST_COUNT; i++) {
    // Wide shell reaching well past the network's own radius (~3-14) so it
    // still surrounds the scene as the camera drifts forward on scroll.
    const r = 8 + Math.random() * 24
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = r * Math.cos(phi)

    sizes[i] = 0.35 + Math.random() * 0.75

    const rgb = rollColor()
    colors[i * 3] = rgb[0]
    colors[i * 3 + 1] = rgb[1]
    colors[i * 3 + 2] = rgb[2]
  }

  return { positions, colors, sizes }
}

const DUST = buildDustData()

export function AmbientDust() {
  const pointsRef = useRef<THREE.Points>(null)
  const matRef = useRef<THREE.ShaderMaterial>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (matRef.current) matRef.current.uniforms.uTime.value = t
    if (pointsRef.current) {
      // Slower, independent drift from the network group — sells depth via parallax.
      pointsRef.current.rotation.y = t * 0.004
      pointsRef.current.rotation.x = t * 0.0015
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[DUST.positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[DUST.colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[DUST.sizes, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        vertexShader={dustVert}
        fragmentShader={dustFrag}
        uniforms={{ uTime: { value: 0 }, uSizeFactor: { value: 30 }, uAlpha: { value: 0.75 } }}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
