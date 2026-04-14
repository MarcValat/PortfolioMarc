import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/cn'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

interface SectionTitleProps {
  children: React.ReactNode
  subtitle?: string
  className?: string
  align?: 'left' | 'center'
}

export function SectionTitle({
  children,
  subtitle,
  className,
  align = 'left',
}: SectionTitleProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  useGSAP(() => {
    if (prefersReduced || !rootRef.current) return

    const heading = rootRef.current.querySelector('.section-title-heading')
    const underline = rootRef.current.querySelector('.section-title-underline')
    const sub = rootRef.current.querySelector('.section-title-subtitle')

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: rootRef.current,
        start: 'top 85%',
        once: true,
      },
    })

    tl.fromTo(
      heading,
      { yPercent: 110, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.75, ease: 'power3.out' }
    )
    .fromTo(
      underline,
      { scaleX: 0, transformOrigin: 'left center' },
      { scaleX: 1, duration: 0.55, ease: 'power2.out' },
      '-=0.35'
    )

    if (sub) {
      tl.fromTo(
        sub,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out' },
        '-=0.3'
      )
    }
  }, { scope: rootRef, dependencies: [prefersReduced] })

  return (
    <div ref={rootRef} className={cn('mb-12', align === 'center' && 'text-center', className)}>
      {/* overflow-hidden masks the translateY reveal */}
      <div style={{ overflow: 'hidden', display: 'inline-block' }}>
        <h2
          className={cn(
            'section-title-heading',
            'font-heading text-4xl font-bold text-text-primary mb-3',
            'relative inline-block'
          )}
        >
          {children}
          {/* Gold underline accent */}
          <span
            className="section-title-underline absolute -bottom-1 left-0 h-0.5 w-full bg-gold-gradient"
            aria-hidden
          />
        </h2>
      </div>
      {subtitle && (
        <p className="section-title-subtitle mt-4 text-text-primary/85 font-body text-base max-w-xl">
          {subtitle}
        </p>
      )}
    </div>
  )
}
