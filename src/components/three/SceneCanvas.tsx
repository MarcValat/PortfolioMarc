import { createContext, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'
import { useLenis } from '@/hooks/useLenis'
import { StarField } from './StarField'
import { PostProcessing } from './PostProcessing'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export const ScrollContext = createContext<{ scrollRef: React.RefObject<number> }>({
  scrollRef: { current: 0 },
})

function Scene({ scrollRef }: { scrollRef: React.RefObject<number> }) {
  return (
    <ScrollContext.Provider value={{ scrollRef }}>
      <StarField />
      <PostProcessing />
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
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
      >
        <Scene scrollRef={scrollRef} />
      </Canvas>
    </div>
  )
}
