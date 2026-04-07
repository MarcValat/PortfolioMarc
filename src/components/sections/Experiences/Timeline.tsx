import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { TimelineItem } from './TimelineItem'
import { EXPERIENCES } from '@/data/experiences'

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<SVGLineElement>(null)
  const prefersReduced = useReducedMotion()

  useGSAP(
    () => {
      if (!lineRef.current || prefersReduced) return

      const totalLength = lineRef.current.getTotalLength?.() ?? 1000
      gsap.set(lineRef.current, {
        strokeDasharray: totalLength,
        strokeDashoffset: totalLength,
      })

      gsap.to(lineRef.current, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          end: 'bottom 30%',
          scrub: 1,
        },
      })
    },
    { scope: containerRef, dependencies: [prefersReduced] }
  )

  return (
    <div ref={containerRef} className="relative">
      {/* Vertical SVG timeline spine */}
      <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 hidden md:block pointer-events-none">
        <svg
          className="h-full w-0.5"
          viewBox="0 0 2 1000"
          preserveAspectRatio="none"
        >
          {/* Background line */}
          <line
            x1="1" y1="0" x2="1" y2="1000"
            stroke="rgba(201,168,76,0.1)"
            strokeWidth="1"
          />
          {/* Animated gold line */}
          <line
            ref={lineRef}
            x1="1" y1="0" x2="1" y2="1000"
            stroke="#C9A84C"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Experience items */}
      {EXPERIENCES.map((exp, i) => (
        <TimelineItem
          key={exp.company + exp.period}
          experience={exp}
          index={i}
          isLeft={i % 2 === 0}
        />
      ))}
    </div>
  )
}
