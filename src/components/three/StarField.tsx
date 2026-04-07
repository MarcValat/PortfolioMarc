import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// ── Shaders ────────────────────────────────────────────────────────────────

const starVert = /* glsl */`
  attribute float size;
  attribute vec3 color;
  uniform float uTime;
  varying vec3 vColor;
  varying float vTwinkle;

  void main() {
    vColor = color;
    // Each star twinkles at its own frequency based on position hash
    float freq = 0.8 + fract(sin(dot(position.xy, vec2(12.9898, 78.233))) * 43758.5453) * 1.4;
    vTwinkle = 0.65 + 0.35 * sin(uTime * freq + position.z * 5.3);

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * vTwinkle * (60.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const starFrag = /* glsl */`
  varying vec3 vColor;
  varying float vTwinkle;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    // Soft glow falloff — bright core, diffuse halo
    float gaussian  = exp(-d * d * 18.0);
    float edgeFade  = 1.0 - smoothstep(0.35, 0.5, d);
    float alpha = gaussian * edgeFade * 0.75;
    gl_FragColor = vec4(vColor, alpha * vTwinkle);
  }
`

const nebulaVert = /* glsl */`
  attribute float size;
  attribute vec3 color;
  varying vec3 vColor;

  void main() {
    vColor = color;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (60.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const nebulaFrag = /* glsl */`
  varying vec3 vColor;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float alpha = (1.0 - smoothstep(0.0, 0.5, d)) * 0.22;
    gl_FragColor = vec4(vColor, alpha);
  }
`

// ── StarField ───────────────────────────────────────────────────────────────

const STAR_COUNT   = 2800
const NEBULA_COUNT = 280

export function StarField() {
  const starsRef  = useRef<THREE.Points>(null)
  const nebulaRef = useRef<THREE.Points>(null)
  const matRef    = useRef<THREE.ShaderMaterial>(null)

  // ── Stars ─────────────────────────────────────────────────────────────────
  const starData = useMemo(() => {
    const positions = new Float32Array(STAR_COUNT * 3)
    const colors    = new Float32Array(STAR_COUNT * 3)
    const sizes     = new Float32Array(STAR_COUNT)

    for (let i = 0; i < STAR_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2

      // Mix: 55% galaxy band (flat), 35% wide sphere, 10% close bright stars
      const roll = Math.random()
      let r: number, phi: number

      if (roll < 0.55) {
        // Galactic band — flattened distribution
        r   = 7 + Math.random() * 11
        phi = Math.PI / 2 + (Math.random() - 0.5) * 0.65
      } else if (roll < 0.90) {
        // Wide sphere halo
        r   = 6 + Math.random() * 12
        phi = Math.acos(2 * Math.random() - 1)
      } else {
        // Foreground bright stars (closer)
        r   = 2.5 + Math.random() * 4
        phi = Math.acos(2 * Math.random() - 1)
      }

      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)

      // Star size — most tiny, a few larger
      sizes[i] = roll > 0.90
        ? 1.2 + Math.random() * 1.2   // bright foreground
        : 0.3 + Math.random() * 0.9

      // Star color palette
      const c = Math.random()
      if (c < 0.50) {
        // Blue-white (dimmed)
        const v = 0.45 + Math.random() * 0.25
        colors[i * 3]     = v * 0.82
        colors[i * 3 + 1] = v * 0.88
        colors[i * 3 + 2] = v
      } else if (c < 0.75) {
        // Off-white / pale silver
        const v = 0.4 + Math.random() * 0.2
        colors[i * 3]     = v * 0.9
        colors[i * 3 + 1] = v * 0.92
        colors[i * 3 + 2] = v
      } else if (c < 0.88) {
        // Soft lavender
        colors[i * 3]     = 0.35 + Math.random() * 0.15
        colors[i * 3 + 1] = 0.25 + Math.random() * 0.1
        colors[i * 3 + 2] = 0.5  + Math.random() * 0.15
      } else if (c < 0.96) {
        // Muted gold (brand)
        colors[i * 3]     = 0.5
        colors[i * 3 + 1] = 0.4
        colors[i * 3 + 2] = 0.18
      } else {
        // Soft rose
        colors[i * 3]     = 0.5
        colors[i * 3 + 1] = 0.28
        colors[i * 3 + 2] = 0.35
      }
    }

    return { positions, colors, sizes }
  }, [])

  // ── Nebula clouds ─────────────────────────────────────────────────────────
  const nebulaData = useMemo(() => {
    const positions = new Float32Array(NEBULA_COUNT * 3)
    const colors    = new Float32Array(NEBULA_COUNT * 3)
    const sizes     = new Float32Array(NEBULA_COUNT)

    const clusters = [
      { cx:  5,  cy:  2,  cz: -4, r: [0.45, 0.2, 0.9],  spread: 4 },  // violet
      { cx: -5,  cy: -2,  cz: -3, r: [0.2,  0.4, 0.95], spread: 4 },  // blue-violet
      { cx:  1,  cy:  4,  cz: -6, r: [0.8,  0.3, 0.7],  spread: 3 },  // rose-purple
      { cx: -2,  cy: -4,  cz: -5, r: [0.3,  0.2, 0.8],  spread: 3.5 },// deep blue
    ]

    for (let i = 0; i < NEBULA_COUNT; i++) {
      const cl = clusters[i % clusters.length]
      positions[i * 3]     = cl.cx + (Math.random() - 0.5) * cl.spread
      positions[i * 3 + 1] = cl.cy + (Math.random() - 0.5) * cl.spread * 0.7
      positions[i * 3 + 2] = cl.cz + (Math.random() - 0.5) * cl.spread * 0.6

      sizes[i] = 1.5 + Math.random() * 2.5

      const [r0, g0, b0] = cl.r
      colors[i * 3]     = r0 + (Math.random() - 0.5) * 0.2
      colors[i * 3 + 1] = g0 + (Math.random() - 0.5) * 0.15
      colors[i * 3 + 2] = b0 + (Math.random() - 0.5) * 0.1
    }

    return { positions, colors, sizes }
  }, [])

  useFrame((state) => {
    if (matRef.current) matRef.current.uniforms.uTime.value = state.clock.elapsedTime

    const t = state.clock.elapsedTime * 0.012
    if (starsRef.current) {
      starsRef.current.rotation.y = t
      starsRef.current.rotation.x = t * 0.25
    }
    if (nebulaRef.current) {
      nebulaRef.current.rotation.y = t * 0.5
      nebulaRef.current.rotation.x = t * 0.1
    }
  })

  return (
    <>
      {/* Stars */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[starData.positions, 3]} />
          <bufferAttribute attach="attributes-color"    args={[starData.colors, 3]} />
          <bufferAttribute attach="attributes-size"     args={[starData.sizes, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={matRef}
          vertexShader={starVert}
          fragmentShader={starFrag}
          uniforms={{ uTime: { value: 0 } }}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Nebula */}
      <points ref={nebulaRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nebulaData.positions, 3]} />
          <bufferAttribute attach="attributes-color"    args={[nebulaData.colors, 3]} />
          <bufferAttribute attach="attributes-size"     args={[nebulaData.sizes, 1]} />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={nebulaVert}
          fragmentShader={nebulaFrag}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  )
}
