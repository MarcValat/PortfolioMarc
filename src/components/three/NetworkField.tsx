import { useFrame } from '@react-three/fiber'
import { useRef, useContext } from 'react'
import * as THREE from 'three'
import { ScrollContext } from './ScrollContext'
import { rollColor } from './palette'
import { scaleForDevice } from './deviceTier'

const config = { sizeFactor: 42, alpha: 1.0, lineAlpha: 1.0, packetSizeFactor: 34 }

// ── Shaders ────────────────────────────────────────────────────────────────
// Nodes: soft glowing sprites, brighter/sharper core for hub nodes.

const nodeVert = /* glsl */ `
  attribute float size;
  attribute vec3 color;
  attribute float hub;
  uniform float uTime;
  uniform float uSizeFactor;
  varying vec3 vColor;
  varying float vPulse;
  varying float vHub;

  void main() {
    vColor = color;
    vHub = hub;
    float freq = 0.5 + fract(sin(dot(position.xy, vec2(12.9898, 78.233))) * 43758.5453) * 1.1;
    vPulse = 0.72 + 0.28 * sin(uTime * freq + position.z * 4.0);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * vPulse * (uSizeFactor / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const nodeFrag = /* glsl */ `
  uniform float uAlpha;
  varying vec3 vColor;
  varying float vPulse;
  varying float vHub;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float core = smoothstep(0.5, 0.0, d);
    float shaped = mix(core, core * core, vHub);
    gl_FragColor = vec4(vColor, shaped * uAlpha * vPulse);
  }
`

// Edges: drawn as screen-space ribbons (not native GL_LINES, which WebGL always renders at
// a flat 1px) so each edge can carry its own width and a soft, slightly luminescent
// cross-section instead of a hard flat line.

const lineVert = /* glsl */ `
  attribute vec3 other;
  attribute float side;
  attribute float aWidth;
  attribute vec3 color;
  attribute float phase;
  attribute float aLineT;
  attribute float aChargePeriod;
  attribute float aChargePhase;

  uniform float uTime;
  uniform vec2 uResolution;

  varying vec3 vColor;
  varying float vAlpha;
  varying float vSide;
  varying float vLineT;
  varying float vChargePeriod;
  varying float vChargePhase;

  void main() {
    vColor = color;
    vSide = side;
    vAlpha = 0.34 + 0.32 * (0.5 + 0.5 * sin(uTime * 0.55 + phase));

    // Position-along-line and charge timing are passed through as varyings - the pulse
    // itself is evaluated per-fragment (see fragment shader) so it stays a tight travelling
    // band instead of a value linearly interpolated between the two line endpoints.
    vLineT = aLineT;
    vChargePeriod = aChargePeriod;
    vChargePhase = aChargePhase;

    vec4 clipA = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    vec4 clipB = projectionMatrix * modelViewMatrix * vec4(other, 1.0);

    vec2 ndcA = clipA.xy / clipA.w;
    vec2 ndcB = clipB.xy / clipB.w;

    vec2 dirPx = normalize((ndcB - ndcA) * uResolution);
    vec2 normalPx = vec2(-dirPx.y, dirPx.x);
    vec2 offsetNdc = normalPx * (aWidth * side) * 2.0 / uResolution;

    gl_Position = clipA;
    gl_Position.xy += offsetNdc * clipA.w;
  }
`

const lineFrag = /* glsl */ `
  uniform float uAlpha;
  uniform float uTime;
  varying vec3 vColor;
  varying float vAlpha;
  varying float vSide;
  varying float vLineT;
  varying float vChargePeriod;
  varying float vChargePhase;

  void main() {
    float edge = 1.0 - smoothstep(0.5, 1.0, abs(vSide));
    float core = 1.0 - smoothstep(0.0, 0.4, abs(vSide));

    // Charge pulse, evaluated per-fragment against the interpolated line position -
    // each edge rarely (its own random period/offset) sends a tight bright band A -> B,
    // eased in and out over the travel window so it never cuts off abruptly. Travel time is
    // a fixed duration in seconds, decoupled from the recurrence period, so tuning how often
    // a pulse fires (period) and how fast it crosses the line (duration) don't fight each other.
    const float TRAVEL_DURATION = 1.1;
    float cycleTime = mod(uTime + vChargePhase * vChargePeriod, vChargePeriod);
    float charge = 0.0;
    if (cycleTime < TRAVEL_DURATION) {
      float pulsePos = cycleTime / TRAVEL_DURATION;
      float dist = vLineT - pulsePos;
      float spatial = exp(-dist * dist * 140.0);
      float envelope = smoothstep(0.0, 0.18, pulsePos) * (1.0 - smoothstep(0.8, 1.0, pulsePos));
      charge = spatial * envelope;
    }

    vec3 glow = vColor * (1.0 + core * 0.7 + charge * 1.8);
    float alpha = vAlpha + charge * 0.9;
    gl_FragColor = vec4(glow, edge * alpha * uAlpha);
  }
`

// ── Static geometry data (module-level - generated once, never during render) ─

const NODE_COUNT = scaleForDevice(170, 85)
const HUB_RATIO = 0.1
const EDGE_K = 2
const EDGE_MAX_DIST = 5.5
const PACKET_COUNT = scaleForDevice(22, 10)

interface Packet {
  ai: number
  bi: number
  speed: number
  offset: number
}

function buildNetworkData() {
  const positions = new Float32Array(NODE_COUNT * 3)
  const colors = new Float32Array(NODE_COUNT * 3)
  const sizes = new Float32Array(NODE_COUNT)
  const hubs = new Float32Array(NODE_COUNT)

  const hubIndices = new Set<number>()
  while (hubIndices.size < Math.round(NODE_COUNT * HUB_RATIO)) {
    hubIndices.add(Math.floor(Math.random() * NODE_COUNT))
  }

  for (let i = 0; i < NODE_COUNT; i++) {
    const r = 3 + Math.random() * 11
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = r * Math.cos(phi)

    const isHub = hubIndices.has(i)
    hubs[i] = isHub ? 1 : 0
    sizes[i] = isHub ? 2.3 + Math.random() * 1.3 : 0.9 + Math.random() * 1.0

    const rgb = rollColor()
    colors[i * 3] = rgb[0]
    colors[i * 3 + 1] = rgb[1]
    colors[i * 3 + 2] = rgb[2]
  }

  // k-nearest-neighbour edges (small N - O(N^2) once at module load is trivial)
  const edgeSet = new Set<string>()
  const edgeList: [number, number][] = []

  for (let i = 0; i < NODE_COUNT; i++) {
    const candidates: { j: number; d2: number }[] = []
    for (let j = 0; j < NODE_COUNT; j++) {
      if (i === j) continue
      const dx = positions[i * 3] - positions[j * 3]
      const dy = positions[i * 3 + 1] - positions[j * 3 + 1]
      const dz = positions[i * 3 + 2] - positions[j * 3 + 2]
      candidates.push({ j, d2: dx * dx + dy * dy + dz * dz })
    }
    candidates.sort((a, b) => a.d2 - b.d2)

    let added = 0
    for (const { j, d2 } of candidates) {
      if (added >= EDGE_K) break
      if (Math.sqrt(d2) > EDGE_MAX_DIST) break
      const key = i < j ? `${i}-${j}` : `${j}-${i}`
      if (edgeSet.has(key)) continue
      edgeSet.add(key)
      edgeList.push([i, j])
      added++
    }
  }

  // Each edge becomes a 4-vertex screen-space quad (ribbon) instead of a 2-vertex GL_LINE,
  // so it can carry its own width - thicker where it touches a hub, thin otherwise.
  const edgeQuadPositions = new Float32Array(edgeList.length * 4 * 3)
  const edgeQuadOther = new Float32Array(edgeList.length * 4 * 3)
  const edgeQuadSide = new Float32Array(edgeList.length * 4)
  const edgeQuadWidth = new Float32Array(edgeList.length * 4)
  const edgeQuadColor = new Float32Array(edgeList.length * 4 * 3)
  const edgeQuadPhase = new Float32Array(edgeList.length * 4)
  const edgeQuadLineT = new Float32Array(edgeList.length * 4)
  const edgeQuadChargePeriod = new Float32Array(edgeList.length * 4)
  const edgeQuadChargePhase = new Float32Array(edgeList.length * 4)
  const edgeIndices = new Uint16Array(edgeList.length * 6)

  edgeList.forEach(([a, b], idx) => {
    const ax = positions[a * 3], ay = positions[a * 3 + 1], az = positions[a * 3 + 2]
    const bx = positions[b * 3], by = positions[b * 3 + 1], bz = positions[b * 3 + 2]
    const isHubEdge = hubs[a] === 1 || hubs[b] === 1
    const width = isHubEdge ? 1.1 + Math.random() * 0.7 : 0.4 + Math.random() * 0.55
    const phase = Math.random() * Math.PI * 2
    // Long, staggered cycle per edge - most of the time idle, occasionally a charge travels through.
    const chargePeriod = 18 + Math.random() * 28
    const chargePhase = Math.random()
    const base = idx * 4

    // v0=A(-1) v1=A(+1) v2=B(-1) v3=B(+1)
    for (let v = 0; v < 4; v++) {
      const vi = base + v
      const atA = v < 2
      const side = v % 2 === 0 ? -1 : 1
      edgeQuadPositions[vi * 3] = atA ? ax : bx
      edgeQuadPositions[vi * 3 + 1] = atA ? ay : by
      edgeQuadPositions[vi * 3 + 2] = atA ? az : bz
      edgeQuadOther[vi * 3] = atA ? bx : ax
      edgeQuadOther[vi * 3 + 1] = atA ? by : ay
      edgeQuadOther[vi * 3 + 2] = atA ? bz : az
      edgeQuadSide[vi] = side
      edgeQuadWidth[vi] = width
      edgeQuadPhase[vi] = phase
      edgeQuadLineT[vi] = atA ? 0 : 1
      edgeQuadChargePeriod[vi] = chargePeriod
      edgeQuadChargePhase[vi] = chargePhase
      const src = atA ? a : b
      edgeQuadColor[vi * 3] = colors[src * 3]
      edgeQuadColor[vi * 3 + 1] = colors[src * 3 + 1]
      edgeQuadColor[vi * 3 + 2] = colors[src * 3 + 2]
    }

    const ib = idx * 6
    edgeIndices[ib] = base
    edgeIndices[ib + 1] = base + 1
    edgeIndices[ib + 2] = base + 2
    edgeIndices[ib + 3] = base + 1
    edgeIndices[ib + 4] = base + 3
    edgeIndices[ib + 5] = base + 2
  })

  // A handful of edges carry a travelling "packet" - sells the data-flow read.
  const packetCount = Math.min(PACKET_COUNT, edgeList.length)
  const packets: Packet[] = []
  const packetPositions = new Float32Array(packetCount * 3)
  const packetSizes = new Float32Array(packetCount).fill(3.0)
  const packetHubs = new Float32Array(packetCount).fill(1)
  const packetColors = new Float32Array(packetCount * 3)

  for (let i = 0; i < packetCount; i++) {
    const [ai, bi] = edgeList[Math.floor(Math.random() * edgeList.length)]
    packets.push({ ai, bi, speed: 0.15 + Math.random() * 0.25, offset: Math.random() * 2 })
    packetPositions[i * 3] = positions[ai * 3]
    packetPositions[i * 3 + 1] = positions[ai * 3 + 1]
    packetPositions[i * 3 + 2] = positions[ai * 3 + 2]
    // Packet inherits the color of the node it departs from - same palette variety as the mesh.
    packetColors[i * 3] = colors[ai * 3]
    packetColors[i * 3 + 1] = colors[ai * 3 + 1]
    packetColors[i * 3 + 2] = colors[ai * 3 + 2]
  }

  return {
    positions, colors, sizes, hubs,
    edgeQuadPositions, edgeQuadOther, edgeQuadSide, edgeQuadWidth, edgeQuadColor, edgeQuadPhase, edgeIndices,
    edgeQuadLineT, edgeQuadChargePeriod, edgeQuadChargePhase,
    packets, packetPositions, packetSizes, packetHubs, packetColors,
  }
}

const NET = buildNetworkData()

// ── NetworkField ────────────────────────────────────────────────────────────

export function NetworkField() {
  const groupRef = useRef<THREE.Group>(null)
  const nodeMatRef = useRef<THREE.ShaderMaterial>(null)
  const lineMatRef = useRef<THREE.ShaderMaterial>(null)
  const packetGeoRef = useRef<THREE.BufferGeometry>(null)
  const { scrollRef, limitRef } = useContext(ScrollContext)

  useFrame((state) => {
    const t = state.clock.elapsedTime

    // Camera flies forward through the network as the user scrolls
    const limit = limitRef.current
    const scrollProgress = limit > 0 ? Math.min(scrollRef.current / limit, 1) : 0
    const targetZ = 8 - scrollProgress * 4
    state.camera.position.z += (targetZ - state.camera.position.z) * 0.05

    if (nodeMatRef.current) nodeMatRef.current.uniforms.uTime.value = t
    if (lineMatRef.current) {
      lineMatRef.current.uniforms.uTime.value = t
      lineMatRef.current.uniforms.uResolution.value.set(state.size.width, state.size.height)
    }

    const rot = t * 0.012
    if (groupRef.current) {
      groupRef.current.rotation.y = rot
      groupRef.current.rotation.x = rot * 0.25
    }

    const posAttr = packetGeoRef.current?.getAttribute('position') as THREE.BufferAttribute | undefined
    if (posAttr) {
      for (let i = 0; i < NET.packets.length; i++) {
        const { ai, bi, speed, offset } = NET.packets[i]
        const cycle = (t * speed + offset) % 2
        const k = cycle <= 1 ? cycle : 2 - cycle // triangle wave: A -> B -> A
        const ax = NET.positions[ai * 3], ay = NET.positions[ai * 3 + 1], az = NET.positions[ai * 3 + 2]
        const bx = NET.positions[bi * 3], by = NET.positions[bi * 3 + 1], bz = NET.positions[bi * 3 + 2]
        posAttr.setXYZ(i, ax + (bx - ax) * k, ay + (by - ay) * k, az + (bz - az) * k)
      }
      posAttr.needsUpdate = true
    }
  })

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[NET.positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[NET.colors, 3]} />
          <bufferAttribute attach="attributes-size" args={[NET.sizes, 1]} />
          <bufferAttribute attach="attributes-hub" args={[NET.hubs, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={nodeMatRef}
          vertexShader={nodeVert}
          fragmentShader={nodeFrag}
          uniforms={{ uTime: { value: 0 }, uSizeFactor: { value: config.sizeFactor }, uAlpha: { value: config.alpha } }}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <mesh>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[NET.edgeQuadPositions, 3]} />
          <bufferAttribute attach="attributes-other" args={[NET.edgeQuadOther, 3]} />
          <bufferAttribute attach="attributes-side" args={[NET.edgeQuadSide, 1]} />
          <bufferAttribute attach="attributes-aWidth" args={[NET.edgeQuadWidth, 1]} />
          <bufferAttribute attach="attributes-color" args={[NET.edgeQuadColor, 3]} />
          <bufferAttribute attach="attributes-phase" args={[NET.edgeQuadPhase, 1]} />
          <bufferAttribute attach="attributes-aLineT" args={[NET.edgeQuadLineT, 1]} />
          <bufferAttribute attach="attributes-aChargePeriod" args={[NET.edgeQuadChargePeriod, 1]} />
          <bufferAttribute attach="attributes-aChargePhase" args={[NET.edgeQuadChargePhase, 1]} />
          <bufferAttribute attach="index" args={[NET.edgeIndices, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={lineMatRef}
          vertexShader={lineVert}
          fragmentShader={lineFrag}
          uniforms={{
            uTime: { value: 0 },
            uAlpha: { value: config.lineAlpha },
            uResolution: { value: new THREE.Vector2(1, 1) },
          }}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <points>
        <bufferGeometry ref={packetGeoRef}>
          <bufferAttribute attach="attributes-position" args={[NET.packetPositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[NET.packetColors, 3]} />
          <bufferAttribute attach="attributes-size" args={[NET.packetSizes, 1]} />
          <bufferAttribute attach="attributes-hub" args={[NET.packetHubs, 1]} />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={nodeVert}
          fragmentShader={nodeFrag}
          uniforms={{ uTime: { value: 0 }, uSizeFactor: { value: config.packetSizeFactor }, uAlpha: { value: 1 } }}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}
