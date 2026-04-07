import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { GoldButton } from '@/components/ui/GoldButton'
import { MagneticWrapper } from '@/components/ui/MagneticWrapper'
import { GithubIcon } from '@/components/ui/GithubIcon'

export function HeroActions() {
  function scrollToContact() {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.div
      className="flex flex-wrap gap-4 items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.85 }}
    >
      <MagneticWrapper>
        <GoldButton onClick={scrollToContact}>
          Me contacter
          <ArrowDown size={16} />
        </GoldButton>
      </MagneticWrapper>

      <MagneticWrapper>
        <GoldButton
          href="https://github.com/MarcValat"
          variant="outline"
        >
          <GithubIcon size={16} />
          GitHub
        </GoldButton>
      </MagneticWrapper>
    </motion.div>
  )
}
