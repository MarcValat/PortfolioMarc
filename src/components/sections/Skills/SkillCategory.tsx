import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui/GlassCard'
import { cn } from '@/lib/cn'
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

// Bento sizing driven by breadth of the category — the more skills, the more room it earns.
function spanForCount(n: number) {
  if (n >= 6) return 'md:col-span-4'
  if (n >= 4) return 'md:col-span-3'
  return 'md:col-span-2'
}

export function SkillCategoryCard({ category }: Omit<SkillCategoryProps, 'index'>) {
  const count = category.skills.length
  const large = count >= 6

  return (
    <motion.div variants={item} className={spanForCount(count)}>
      <GlassCard className={cn('h-full', large ? 'p-7' : 'p-6')} hover>
        <h3
          className={cn(
            'font-heading font-semibold text-text-primary mb-5 uppercase tracking-widest gold-text',
            large ? 'text-base' : 'text-sm'
          )}
        >
          {category.category}
        </h3>
        <div className={large ? 'md:grid md:grid-cols-2 md:gap-x-8' : undefined}>
          {category.skills.map((skill) => (
            <SkillBar key={skill.name} skill={skill} />
          ))}
        </div>
      </GlassCard>
    </motion.div>
  )
}
