import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ExternalLink, Server, Code2, KeyRound, Copy, Check } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { GoldBadge } from '@/components/ui/GoldBadge'
import { GoldButton } from '@/components/ui/GoldButton'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type { Project } from '@/types'

interface ProjectCardProps {
  project: Project
}

const ICONS: Record<string, React.ReactNode> = {
  'EduFlow': <Code2 size={20} className="text-gold" />,
  'Infrastructure Serveur Personnel': <Server size={20} className="text-gold" />,
}

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    })
  }

  return (
    <button
      onClick={handleCopy}
      className="ml-auto shrink-0 p-1 rounded text-text-primary/40 hover:text-gold transition-colors"
      title="Copier"
    >
      {copied ? <Check size={11} className="text-gold" /> : <Copy size={11} />}
    </button>
  )
}

export function ProjectCard({ project }: ProjectCardProps) {
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
    <motion.div variants={item} className="h-full">
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
          <p className="font-body text-sm text-text-primary/85 leading-relaxed flex-1">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <GoldBadge key={tag} size="sm">{tag}</GoldBadge>
            ))}
          </div>

          {/* Demo credentials */}
          {project.demoCredentials && (
            <div className="rounded-lg border border-gold/15 bg-gold/5 p-3">
              <div className="flex items-center gap-1.5 text-gold/70 text-xs font-mono mb-2.5">
                <KeyRound size={11} />
                <span>Comptes démo — mdp : </span>
                <span className="text-gold font-semibold">{project.demoCredentials.password}</span>
                <CopyButton text={project.demoCredentials.password} />
              </div>
              <div className="space-y-1.5">
                {project.demoCredentials.logins.map((login) => (
                  <div key={login} className="flex items-center gap-2 bg-black/20 rounded px-2 py-1">
                    <span className="text-xs font-mono text-text-primary/75 flex-1 truncate">{login}</span>
                    <CopyButton text={login} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          {project.url && project.liveDemo && (
            <GoldButton
              href={project.url}
              target="_blank"
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
