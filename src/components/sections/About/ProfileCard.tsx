import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { GlassCard } from '@/components/ui/GlassCard'
import { GoldBadge } from '@/components/ui/GoldBadge'
import { MapPin, Mail } from 'lucide-react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface ProfileCardProps {
  photoSrc?: string
}

export function ProfileCard({ photoSrc }: ProfileCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [8, -8]), {
    stiffness: 150,
    damping: 20,
  })
  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-8, 8]), {
    stiffness: 150,
    damping: 20,
  })

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
      ref={ref}
      style={prefersReduced ? {} : { rotateX, rotateY, transformPerspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full max-w-sm"
    >
      <GlassCard className="p-8 text-center" glow>
        {/* Avatar / Photo */}
        <div className="w-28 h-28 rounded-full mx-auto mb-6 overflow-hidden border-2 border-gold/30 shadow-gold-glow">
          {photoSrc ? (
            <img src={photoSrc} alt="Marc Valat" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center">
              <span className="font-heading text-3xl font-bold gold-text">MV</span>
            </div>
          )}
        </div>

        <h3 className="font-heading font-bold text-xl text-text-primary mb-1">Marc Valat</h3>
        <p className="text-text-primary/50 text-sm font-mono mb-4">
          Ingénieur IA · Dev · DevOps
        </p>

        <div className="flex flex-wrap gap-2 justify-center mb-6">
          <GoldBadge size="sm">IA</GoldBadge>
          <GoldBadge size="sm">Développement</GoldBadge>
          <GoldBadge size="sm">DevOps</GoldBadge>
        </div>

        <div className="flex flex-col gap-2 text-sm text-text-primary/50">
          <div className="flex items-center gap-2 justify-center">
            <MapPin size={13} className="text-gold/60" />
            <span>Deuil-la-Barre, 95170</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <Mail size={13} className="text-gold/60" />
            <a
              href="mailto:marc.valat@hotmail.fr"
              className="hover:text-gold transition-colors"
            >
              marc.valat@hotmail.fr
            </a>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
}
