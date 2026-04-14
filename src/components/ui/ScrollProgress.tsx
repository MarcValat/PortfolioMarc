import { useMotionValue, useSpring, motion } from 'framer-motion'
import { useLenis } from '@/hooks/useLenis'

export function ScrollProgress() {
  const progress = useMotionValue(0)
  const smoothProgress = useSpring(progress, { stiffness: 200, damping: 30, mass: 0.5 })

  useLenis((lenis) => {
    const limit = lenis.limit
    if (limit > 0) progress.set(lenis.animatedScroll / limit)
  })

  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        width: 2,
        zIndex: 100,
        pointerEvents: 'none',
        background: 'rgba(201,168,76,0.06)',
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          scaleY: smoothProgress,
          transformOrigin: 'top',
          height: '100%',
          background: 'linear-gradient(to bottom, rgba(201,168,76,0.3), #c9a84c, #f0d080)',
          boxShadow: '0 0 8px rgba(201,168,76,0.4)',
        }}
      />
    </div>
  )
}
