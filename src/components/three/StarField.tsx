import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
const starConfig = { sizeFactor: 40, alpha: 1.0, twinkleAmp: 0.4, nebulaSize: 30, nebulaAlpha: 0.8 }

// ── Shaders ────────────────────────────────────────────────────────────────

const starVert = /* glsl */ `
  attribute float size;
  attribute vec3 color;
  uniform float uTime;
  uniform float uSizeFactor;
  uniform float uTwinkleAmp;
  varying vec3 vColor;
  varying float vTwinkle;

  void main() {
    vColor = color;
    float freq = 0.8 + fract(sin(dot(position.xy, vec2(12.9898, 78.233))) * 43758.5453) * 1.4;
    vTwinkle = (1.0 - uTwinkleAmp) + uTwinkleAmp * sin(uTime * freq + position.z * 5.3);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * vTwinkle * (uSizeFactor / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const starFrag = /* glsl */ `
  uniform float uAlpha;
  varying vec3 vColor;
  varying float vTwinkle;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float alpha = (1.0 - d * 2.0) * uAlpha;
    gl_FragColor = vec4(vColor, alpha * vTwinkle);
  }
`

const nebulaVert = /* glsl */ `
  attribute float size;
  attribute vec3 color;
  uniform float uSizeFactor;
  varying vec3 vColor;

  void main() {
    vColor = color;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (uSizeFactor / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const nebulaFrag = /* glsl */ `
  uniform float uAlpha;
  varying vec3 vColor;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float alpha = (1.0 - smoothstep(0.0, 0.5, d)) * uAlpha;
    gl_FragColor = vec4(vColor, alpha);
  }
`

// ── Static geometry data (module-level — generated once, never during render) ─

const STAR_COUNT   = 2800
const NEBULA_COUNT = 280

function buildStarData() {
  const positions = new Float32Array(STAR_COUNT * 3)
  const colors    = new Float32Array(STAR_COUNT * 3)
  const sizes     = new Float32Array(STAR_COUNT)

  for (let i = 0; i < STAR_COUNT; i++) {
    const theta = Math.random() * Math.PI * 2
    const roll  = Math.random()
    let r: number, phi: number

    if (roll < 0.55) {
      r   = 7 + Math.random() * 11
      phi = Math.PI / 2 + (Math.random() - 0.5) * 0.65
    } else if (roll < 0.9) {
      r   = 6 + Math.random() * 12
      phi = Math.acos(2 * Math.random() - 1)
    } else {
      r   = 2.5 + Math.random() * 4
      phi = Math.acos(2 * Math.random() - 1)
    }

    positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = r * Math.cos(phi)

    sizes[i] = roll > 0.9 ? 1.2 + Math.random() * 1.2 : 0.3 + Math.random() * 0.9

    const c = Math.random()
    if (c < 0.5) {
      const v = 0.45 + Math.random() * 0.25
      colors[i * 3] = v * 0.82; colors[i * 3 + 1] = v * 0.88; colors[i * 3 + 2] = v
    } else if (c < 0.75) {
      const v = 0.4 + Math.random() * 0.2
      colors[i * 3] = v * 0.9; colors[i * 3 + 1] = v * 0.92; colors[i * 3 + 2] = v
    } else if (c < 0.88) {
      colors[i * 3] = 0.35 + Math.random() * 0.15
      colors[i * 3 + 1] = 0.25 + Math.random() * 0.1
      colors[i * 3 + 2] = 0.5  + Math.random() * 0.15
    } else if (c < 0.96) {
      colors[i * 3] = 0.5; colors[i * 3 + 1] = 0.4; colors[i * 3 + 2] = 0.18
    } else {
      colors[i * 3] = 0.5; colors[i * 3 + 1] = 0.28; colors[i * 3 + 2] = 0.35
    }
  }
  return { positions, colors, sizes }
}

function buildNebulaData() {
  const positions = new Float32Array(NEBULA_COUNT * 3)
  const colors    = new Float32Array(NEBULA_COUNT * 3)
  const sizes     = new Float32Array(NEBULA_COUNT)

  const clusters = [
    { cx:  5, cy:  2, cz: -4, r: [0.45, 0.2, 0.9 ] as const, spread: 4   },
    { cx: -5, cy: -2, cz: -3, r: [0.2,  0.4, 0.95] as const, spread: 4   },
    { cx:  1, cy:  4, cz: -6, r: [0.8,  0.3, 0.7 ] as const, spread: 3   },
    { cx: -2, cy: -4, cz: -5, r: [0.3,  0.2, 0.8 ] as const, spread: 3.5 },
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
}

const starData   = buildStarData()
const nebulaData = buildNebulaData()

// ── StarField ───────────────────────────────────────────────────────────────

export function StarField() {
  const starsRef   = useRef<THREE.Points>(null)
  const nebulaRef  = useRef<THREE.Points>(null)
  const starMatRef = useRef<THREE.ShaderMaterial>(null)
  const nebMatRef  = useRef<THREE.ShaderMaterial>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime

    if (starMatRef.current) {
      starMatRef.current.uniforms.uTime.value       = t
      starMatRef.current.uniforms.uSizeFactor.value = starConfig.sizeFactor
      starMatRef.current.uniforms.uAlpha.value      = starConfig.alpha
      starMatRef.current.uniforms.uTwinkleAmp.value = starConfig.twinkleAmp
    }
    if (nebMatRef.current) {
      nebMatRef.current.uniforms.uSizeFactor.value = starConfig.nebulaSize
      nebMatRef.current.uniforms.uAlpha.value      = starConfig.nebulaAlpha
    }

    const rot = t * 0.012
    if (starsRef.current) {
      starsRef.current.rotation.y = rot
      starsRef.current.rotation.x = rot * 0.25
    }
    if (nebulaRef.current) {
      nebulaRef.current.rotation.y = rot * 0.5
      nebulaRef.current.rotation.x = rot * 0.1
    }
  })

  return (
    <>
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[starData.positions, 3]} />
          <bufferAttribute attach="attributes-color"    args={[starData.colors, 3]} />
          <bufferAttribute attach="attributes-size"     args={[starData.sizes, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={starMatRef}
          vertexShader={starVert}
          fragmentShader={starFrag}
          uniforms={{
            uTime:       { value: 0 },
            uSizeFactor: { value: starConfig.sizeFactor },
            uAlpha:      { value: starConfig.alpha },
            uTwinkleAmp: { value: starConfig.twinkleAmp },
          }}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <points ref={nebulaRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nebulaData.positions, 3]} />
          <bufferAttribute attach="attributes-color"    args={[nebulaData.colors, 3]} />
          <bufferAttribute attach="attributes-size"     args={[nebulaData.sizes, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={nebMatRef}
          vertexShader={nebulaVert}
          fragmentShader={nebulaFrag}
          uniforms={{
            uSizeFactor: { value: starConfig.nebulaSize },
            uAlpha:      { value: starConfig.nebulaAlpha },
          }}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  )
}
