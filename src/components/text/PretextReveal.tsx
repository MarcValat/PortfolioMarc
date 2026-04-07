import { useRef, useEffect, useState, useCallback } from 'react'
import { gsap } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { loadPretext } from '@/hooks/usePretext'
import { PRETEXT_FONTS, type PretextFontKey } from '@/lib/fonts'
import { cn } from '@/lib/cn'

interface PretextRevealProps {
  text: string
  fontKey?: PretextFontKey
  className?: string
  lineClassName?: string
  delay?: number
  stagger?: number
}

export function PretextReveal({
  text,
  fontKey = 'bodyLarge',
  className,
  lineClassName,
  delay = 0,
  stagger = 0.08,
}: PretextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const [lines, setLines] = useState<string[]>([])
  const fontConfig = PRETEXT_FONTS[fontKey]

  const computeLines = useCallback(async () => {
    if (!containerRef.current) return
    const width = containerRef.current.offsetWidth
    if (width <= 0) return

    // Pretext font string: "weight size family"
    const fontString = `${fontConfig.fontSize}px ${fontConfig.fontFamily}`

    try {
      const pretext = await loadPretext()
      const prepared = pretext.prepareWithSegments(text, fontString)
      const result = pretext.layoutWithLines(prepared, width, fontConfig.lineHeight)
      setLines(result.lines.map((l) => l.text))
    } catch {
      // Fallback: split on newlines
      setLines(text.split('\n'))
    }
  }, [text, fontConfig])

  useEffect(() => {
    computeLines()
    const ro = new ResizeObserver(() => computeLines())
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [computeLines])

  useGSAP(
    () => {
      if (!containerRef.current || prefersReduced || lines.length === 0) return
      const lineEls = containerRef.current.querySelectorAll('.pretext-line')
      gsap.fromTo(
        lineEls,
        { y: fontConfig.lineHeight, opacity: 0, clipPath: 'inset(0 0 100% 0)' },
        {
          y: 0,
          opacity: 1,
          clipPath: 'inset(0 0 0% 0)',
          duration: 0.8,
          stagger,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    },
    { scope: containerRef, dependencies: [lines, prefersReduced, fontConfig.lineHeight, delay, stagger] }
  )

  if (prefersReduced) {
    return (
      <div ref={containerRef} className={cn('font-body', className)}>
        {text}
      </div>
    )
  }

  return (
    <div ref={containerRef} className={cn('font-body', className)}>
      {lines.map((line, i) => (
        <div
          key={i}
          className={cn('pretext-line overflow-hidden', lineClassName)}
          style={{ minHeight: fontConfig.lineHeight }}
        >
          {line}
        </div>
      ))}
    </div>
  )
}
