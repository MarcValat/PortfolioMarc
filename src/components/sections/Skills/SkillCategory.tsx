import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui/GlassCard'
import { SkillBar } from './SkillBar'
import type { SkillCategory as SkillCategoryType } from '@/types'

interface SkillCategoryProps {
  category: SkillCategoryType
  index: number
}

export function SkillCategoryCard({ category, index }: SkillCategoryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
    >
      <GlassCard className="p-6 h-full" hover>
        <h3 className="font-heading font-semibold text-text-primary mb-5 text-sm uppercase tracking-widest gold-text">
          {category.category}
        </h3>
        <div>
          {category.skills.map((skill) => (
            <SkillBar key={skill.name} skill={skill} />
          ))}
        </div>
      </GlassCard>
    </motion.div>
  )
}
