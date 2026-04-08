import { motion } from 'framer-motion'

export function HeroTagline() {
  return (
    <motion.p
      className="font-body text-base md:text-lg text-text-primary/75 max-w-xl leading-relaxed mb-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut', delay: 0.65 }}
    >
      Diplômé ESME Sudria, je conçois des systèmes intelligents, développe des applications
      robustes et maintiens une infrastructure DevOps en production.
    </motion.p>
  )
}
