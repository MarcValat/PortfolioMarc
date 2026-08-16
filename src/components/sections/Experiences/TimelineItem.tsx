import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui/GlassCard'
import { GoldBadge } from '@/components/ui/GoldBadge'
import { Calendar, MapPin } from 'lucide-react'
import type { Experience } from '@/types'

interface TimelineItemProps {
  experience: Experience
  index: number
  isLeft: boolean
}

export function TimelineItem({ experience, index, isLeft }: TimelineItemProps) {
  return (
    <div className={`relative flex ${isLeft ? 'justify-start' : 'justify-end'} mb-12`}>
      {/* Timeline dot */}
      <div className="absolute left-1/2 top-6 -translate-x-1/2 z-10">
        <div className="w-3 h-3 rounded-full bg-gold shadow-gold-glow border-2 border-bg-primary" />
      </div>

      {/* Card - alternates left/right on desktop */}
      <motion.div
        className="w-full md:w-[45%]"
        initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, delay: index * 0.1, ease: 'easeOut' }}
      >
        <GlassCard className="p-6" hover>
          <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
            <div>
              <h3 className="font-heading font-bold text-text-primary text-base">
                {experience.company}
              </h3>
              <p className="text-gold/80 text-sm font-medium mt-0.5">{experience.role}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-text-primary/90 text-xs justify-end">
                <Calendar size={11} />
                <span>{experience.period}</span>
              </div>
              <span className="text-xs font-mono text-text-primary/85">{experience.duration}</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-text-primary/85 text-xs mb-4">
            <MapPin size={11} />
            <span>{experience.location}</span>
          </div>

          <ul className="space-y-1.5 mb-4">
            {experience.description.map((point, i) => (
              <li key={i} className="flex gap-2 text-sm text-text-primary/85 leading-snug">
                <span className="text-gold/50 mt-1 shrink-0">›</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-1.5">
            {experience.tags.map((tag) => (
              <GoldBadge key={tag} size="sm">{tag}</GoldBadge>
            ))}
          </div>
        </GlassCard>
      </motion.div>
    </div>
  )
}
