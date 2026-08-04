import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const NAME_WORDS = ['Marc', 'Valat']

export function HeroHeadline() {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  useGSAP(
    () => {
      if (prefersReduced) return

      gsap.fromTo(
        '.hero-word',
        { yPercent: 115, rotateX: -45, opacity: 0 },
        {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          duration: 0.85,
          ease: 'expo.out',
          stagger: 0.09,
          delay: 0.2,
        }
      )
    },
    { scope: ref, dependencies: [prefersReduced] }
  )

  return (
    <div ref={ref} className="mb-6">
      <h1
        className="font-heading font-bold leading-tight text-text-primary mb-3"
        style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', letterSpacing: '-0.03em', perspective: '600px' }}
      >
        {NAME_WORDS.map((word) => (
          <span key={word} className="inline-block overflow-hidden align-top mr-[0.22em] last:mr-0">
            <span
              className="hero-word gold-text inline-block"
              style={prefersReduced ? undefined : { transformOrigin: '50% 100%' }}
            >
              {word}
            </span>
          </span>
        ))}
      </h1>

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
