import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui/GlassCard'
import { GoldBadge } from '@/components/ui/GoldBadge'
import { GradientText } from '@/components/text/GradientText'
import { FORMATIONS } from '@/data/formation'
import { Calendar, GraduationCap } from 'lucide-react'

export function EsmeCard() {
  const esme = FORMATIONS[0]
  const bac = FORMATIONS[1]

  return (
    <div className="flex flex-col gap-8 max-w-3xl">
      {/* ESME — featured */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <GlassCard className="p-8" glow hover>
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
              <GraduationCap size={22} className="text-gold" />
            </div>
            <div>
              <GradientText as="h3" className="font-heading text-2xl font-bold block mb-1">
                {esme.school}
              </GradientText>
              <p className="text-text-primary/85 text-sm">{esme.degree}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-5">
            <GoldBadge>{esme.field}</GoldBadge>
            <div className="flex items-center gap-1.5 text-text-primary/90 text-sm">
              <Calendar size={13} />
              <span>{esme.period}</span>
            </div>
          </div>

          {esme.description && (
            <p className="font-body text-base text-text-primary/85 leading-relaxed">
              {esme.description}
            </p>
          )}
        </GlassCard>
      </motion.div>

      {/* Bac */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
      >
        <GlassCard className="p-6" hover>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h3 className="font-heading font-semibold text-text-primary mb-0.5">{bac.school}</h3>
              <p className="text-text-primary/75 text-sm">{bac.degree} — {bac.field}</p>
            </div>
            <div className="flex items-center gap-1.5 text-text-primary/85 text-sm">
              <Calendar size={13} />
              <span>{bac.period}</span>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  )
}
