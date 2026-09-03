import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import {
  ExternalLink,
  Server,
  Code2,
  KeyRound,
  Copy,
  Check,
  Music,
  LayoutGrid,
  Mic,
  AudioLines,
  Heart,
  BookText,
} from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { GoldBadge } from '@/components/ui/GoldBadge'
import { GoldButton } from '@/components/ui/GoldButton'
import { GithubIcon } from '@/components/ui/GithubIcon'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/cn'
import type { Project } from '@/types'

interface ProjectCardProps {
  project: Project
  featured?: boolean
}

const ICONS: Record<string, React.ReactNode> = {
  'EduFlow': <Code2 size={20} className="text-gold" />,
  'Infrastructure Serveur Personnel': <Server size={20} className="text-gold" />,
  'Grans Culture': <Music size={20} className="text-gold" />,
  'TaskMatrix': <LayoutGrid size={20} className="text-gold" />,
  'Voice4Kids': <Mic size={20} className="text-gold" />,
  'SyncAudio': <AudioLines size={20} className="text-gold" />,
  'Site de Mariage': <Heart size={20} className="text-gold" />,
  'Site vitrine - Autrice de roman': <BookText size={20} className="text-gold" />,
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

function LiveBadge({ label = 'Démo en ligne' }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-xs font-mono text-emerald-300">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
      </span>
      {label}
    </span>
  )
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-160, 160], [2, -2]), { stiffness: 200, damping: 28 })
  const rotateY = useSpring(useTransform(mouseX, [-160, 160], [-2, 2]), { stiffness: 200, damping: 28 })

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
    <motion.div variants={item} className={cn('h-full', featured && 'lg:col-span-2')}>
      <motion.div
        ref={ref}
        style={prefersReduced ? {} : { rotateX, rotateY, transformPerspective: 1400 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="h-full"
      >
        <GlassCard
          className={cn('h-full flex flex-col gap-5', featured ? 'p-7 md:p-8' : 'p-6')}
          hover
          glow={featured && project.liveDemo}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="flex items-start gap-3 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                {ICONS[project.title] ?? <Code2 size={18} className="text-gold" />}
              </div>
              <div className="flex-1 min-w-0">
                <h3
                  className={cn(
                    'font-heading font-bold text-text-primary truncate',
                    featured ? 'text-xl' : 'text-base'
                  )}
                >
                  {project.title}
                </h3>
                {project.status && (
                  <span className="text-xs font-mono text-gold/50">{project.status}</span>
                )}
              </div>
            </div>
            {project.liveDemo && <LiveBadge label={project.liveLabel} />}
          </div>

          {/* Description */}
          <p
            className={cn(
              'font-body text-text-primary/85 leading-relaxed flex-1',
              featured ? 'text-[15px]' : 'text-sm'
            )}
          >
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
                <span>Comptes démo - mdp : </span>
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
          {(project.url && project.liveDemo) || project.repoUrl ? (
            <div className="flex flex-wrap items-center gap-2.5">
              {project.url && project.liveDemo && (
                <GoldButton
                  href={project.url}
                  target="_blank"
                  variant="primary"
                  className={cn('shadow-gold-glow', featured ? 'text-sm px-5 py-2.5' : 'text-xs px-4 py-2')}
                >
                  <ExternalLink size={featured ? 15 : 13} />
                  {project.urlLabel ?? 'Voir la démo en ligne'}
                </GoldButton>
              )}
              {project.repoUrl && (
                <GoldButton
                  href={project.repoUrl}
                  target="_blank"
                  variant="outline"
                  className={cn(featured ? 'text-sm px-5 py-2.5' : 'text-xs px-4 py-2')}
                >
                  <GithubIcon size={featured ? 15 : 13} />
                  Code sur GitHub
                </GoldButton>
              )}
            </div>
          ) : null}
        </GlassCard>
      </motion.div>
    </motion.div>
  )
}
