import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/cn'

interface SplitRevealProps {
  children: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  className?: string
  delay?: number
  stagger?: number
  triggerOnce?: boolean
}

export function SplitReveal({
  children,
  as: Tag = 'h2',
  className,
  delay = 0,
  stagger = 0.04,
  triggerOnce = true,
}: SplitRevealProps) {
  const containerRef = useRef<HTMLElement>(null)
  const prefersReduced = useReducedMotion()

  useGSAP(
    () => {
      if (!containerRef.current || prefersReduced) return

      const words = containerRef.current.querySelectorAll('.word')
      gsap.fromTo(
        words,
        { y: '110%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 0.7,
          stagger,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: triggerOnce ? 'play none none none' : 'play none none reverse',
          },
        }
      )
    },
    { scope: containerRef, dependencies: [prefersReduced, delay, stagger] }
  )

  // Split text into words wrapped in overflow-hidden spans
  const words = children.split(' ')

  return (
    <Tag
      ref={containerRef as React.RefObject<never>}
      className={cn('flex flex-wrap gap-x-[0.25em]', className)}
    >
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <span className="word inline-block">{word}</span>
        </span>
      ))}
    </Tag>
  )
}

