import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type { SkillItem } from '@/types'

interface SkillBarProps {
  skill: SkillItem
}

export function SkillBar({ skill }: SkillBarProps) {
  const barRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  useGSAP(
    () => {
      if (!fillRef.current || !barRef.current) return

      gsap.fromTo(
        fillRef.current,
        { width: '0%' },
        {
          width: `${skill.level ?? 75}%`,
          duration: prefersReduced ? 0 : 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: barRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      )
    },
    { scope: barRef, dependencies: [skill.level, prefersReduced] }
  )

  return (
    <div ref={barRef} className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="font-body text-sm text-text-primary/80">{skill.name}</span>
        <span className="font-mono text-xs text-gold/60">{skill.level ?? 75}%</span>
      </div>
      <div className="h-1 bg-glass-bg rounded-full overflow-hidden border border-glass-border">
        <div
          ref={fillRef}
          className="h-full rounded-full bg-gold-gradient"
          style={{ width: prefersReduced ? `${skill.level ?? 75}%` : '0%' }}
        />
      </div>
    </div>
  )
}
