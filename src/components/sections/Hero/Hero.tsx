import { motion } from 'framer-motion'
import { HeroHeadline } from './HeroHeadline'
import { HeroTagline } from './HeroTagline'
import { HeroActions } from './HeroActions'

export function Hero() {
  return (
    <section
      id="hero"
      aria-label="Présentation"
      className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-24 pt-20"
    >
      {/* Breathing glow behind hero content */}
      <motion.div
        aria-hidden
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}
      >
        <motion.div
          animate={{ scale: [1, 1.18, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: '5%',
            left: '-10%',
            width: '65%',
            height: '80%',
            background:
              'radial-gradient(ellipse at center, rgba(201,168,76,0.28) 0%, rgba(110,70,200,0.18) 45%, transparent 70%)',
            filter: 'blur(55px)',
            borderRadius: '50%',
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          style={{
            position: 'absolute',
            top: '25%',
            left: '10%',
            width: '50%',
            height: '60%',
            background:
              'radial-gradient(ellipse at center, rgba(150,80,220,0.2) 0%, transparent 65%)',
            filter: 'blur(65px)',
            borderRadius: '50%',
          }}
        />
      </motion.div>

      <div className="max-w-3xl" style={{ position: 'relative', zIndex: 1 }}>
        <HeroHeadline />
        <HeroTagline />
        <HeroActions />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-xs font-mono text-text-primary tracking-widest">SCROLL</span>
        <div className="w-px h-10 bg-gradient-to-b from-gold to-transparent" />
      </div>
    </section>
  )
}
