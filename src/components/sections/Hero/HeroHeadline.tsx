import { useRef } from 'react'
import { motion } from 'framer-motion'
import { GradientText } from '@/components/text/GradientText'

export function HeroHeadline() {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div ref={ref} className="mb-6">
      <motion.h1
        className="font-heading font-bold leading-tight text-text-primary mb-3"
        style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', letterSpacing: '-0.03em' }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        <GradientText>Marc Valat</GradientText>
      </motion.h1>

      <motion.p
        className="font-heading text-xl md:text-2xl text-text-primary/90 font-medium tracking-wide"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.45 }}
      >
        Ingénieur IA · Développement · DevOps
      </motion.p>
    </div>
  )
}
