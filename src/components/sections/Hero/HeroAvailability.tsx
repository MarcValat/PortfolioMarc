import { motion } from 'framer-motion'

export function HeroAvailability() {
  return (
    <motion.div
      className="inline-flex items-center gap-2.5 rounded-full border border-gold/25 bg-gold/5 px-4 py-1.5 mb-6 text-xs font-mono text-text-primary/85"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
      </span>
      Freelance depuis 1 an · ouvert à un CDI
    </motion.div>
  )
}
