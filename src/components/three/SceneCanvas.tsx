import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing'
import { useLenis } from '@/hooks/useLenis'
import { NetworkField } from './NetworkField'
import { AmbientDust } from './AmbientDust'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { ScrollContext } from './ScrollContext'
import { isLowPowerDevice } from './deviceTier'

function Scene({
  scrollRef,
  limitRef,
}: {
  scrollRef: React.RefObject<number>
  limitRef: React.RefObject<number>
}) {
  return (
    <ScrollContext.Provider value={{ scrollRef, limitRef }}>
      <AmbientDust />
      <NetworkField />
      <EffectComposer>
        <Bloom luminanceThreshold={0.65} luminanceSmoothing={0.4} intensity={0.5} radius={0.6} />
        <Noise opacity={0.035} />
        <Vignette eskil={false} offset={0.15} darkness={0.55} />
      </EffectComposer>
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
    </ScrollContext.Provider>
  )
}

export function SceneCanvas() {
  const scrollRef = useRef<number>(0)
  const limitRef = useRef<number>(1)
  const prefersReduced = useReducedMotion()

  useLenis((lenis) => {
    scrollRef.current = lenis.animatedScroll
    limitRef.current = lenis.limit
  })

  if (prefersReduced) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
      aria-hidden
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: 'high-performance',
          stencil: false,
        }}
        dpr={isLowPowerDevice ? 1 : [1, 1.5]}
        style={{ background: '#0A0908' }}
        onCreated={({ gl }) => gl.setClearColor('#0A0908', 1)}
      >
        <Scene scrollRef={scrollRef} limitRef={limitRef} />
      </Canvas>
    </div>
  )
}
