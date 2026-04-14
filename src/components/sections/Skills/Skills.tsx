import { motion } from 'framer-motion'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { SkillCategoryCard } from './SkillCategory'
import { SKILLS } from '@/data/skills'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
}

export function Skills() {
  return (
    <SectionWrapper id="competences" ariaLabel="Compétences">
      <SectionTitle subtitle="Technologies, outils et domaines maîtrisés ou pratiqués régulièrement.">
        Compétences
      </SectionTitle>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
      >
        {SKILLS.map((category) => (
          <SkillCategoryCard key={category.category} category={category} />
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
