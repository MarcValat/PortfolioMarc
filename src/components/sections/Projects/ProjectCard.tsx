import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ExternalLink, Server, Code2 } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { GoldBadge } from '@/components/ui/GoldBadge'
import { GoldButton } from '@/components/ui/GoldButton'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type { Project } from '@/types'

interface ProjectCardProps {
  project: Project
  index: number
}

const ICONS: Record<string, React.ReactNode> = {
  'EduFlow': <Code2 size={20} className="text-gold" />,
  'Infrastructure Serveur Personnel': <Server size={20} className="text-gold" />,
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-100, 100], [5, -5]), { stiffness: 200, damping: 25 })
  const rotateY = useSpring(useTransform(mouseX, [-100, 100], [-5, 5]), { stiffness: 200, damping: 25 })

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current || prefersReduced) return
    const rect = ref.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }

  function handleMouseLeave() {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.12, ease: 'easeOut' }}
    >
      <motion.div
        ref={ref}
        style={prefersReduced ? {} : { rotateX, rotateY, transformPerspective: 800 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="h-full"
      >
        <GlassCard className="p-6 h-full flex flex-col gap-5" hover>
          {/* Header */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
              {ICONS[project.title] ?? <Code2 size={18} className="text-gold" />}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-heading font-bold text-text-primary text-base truncate">
                {project.title}
              </h3>
              {project.status && (
                <span className="text-xs font-mono text-gold/50">{project.status}</span>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="font-body text-sm text-text-primary/60 leading-relaxed flex-1">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <GoldBadge key={tag} size="sm">{tag}</GoldBadge>
            ))}
          </div>

          {/* CTA */}
          {project.url && project.liveDemo && (
            <GoldButton
              href={project.url}
              variant="outline"
              className="self-start text-xs px-4 py-2"
            >
              <ExternalLink size={13} />
              Voir la démo
            </GoldButton>
          )}
        </GlassCard>
      </motion.div>
    </motion.div>
  )
}
