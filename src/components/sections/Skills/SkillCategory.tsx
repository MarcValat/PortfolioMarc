import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui/GlassCard'
import { SkillBar } from './SkillBar'
import type { SkillCategory as SkillCategoryType } from '@/types'

interface SkillCategoryProps {
  category: SkillCategoryType
  index: number
}

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export function SkillCategoryCard({ category }: Omit<SkillCategoryProps, 'index'>) {
  return (
    <motion.div variants={item}>
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
