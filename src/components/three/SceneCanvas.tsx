import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'
import { useLenis } from '@/hooks/useLenis'
import { StarField } from './StarField'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { ScrollContext } from './ScrollContext'

function Scene({ scrollRef }: { scrollRef: React.RefObject<number> }) {
  return (
    <ScrollContext.Provider value={{ scrollRef }}>
      <StarField />
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
    </ScrollContext.Provider>
  )
}

export function SceneCanvas() {
  const scrollRef = useRef<number>(0)
  const prefersReduced = useReducedMotion()

  useLenis((lenis) => {
    scrollRef.current = lenis.animatedScroll
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
          depth: false,
        }}
        dpr={[1, 1.5]}
        style={{ background: '#080808' }}
        onCreated={({ gl }) => gl.setClearColor('#080808', 1)}
      >
        <Scene scrollRef={scrollRef} />
      </Canvas>
    </div>
  )
}
