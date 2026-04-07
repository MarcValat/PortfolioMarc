import { cn } from '@/lib/cn'

interface SectionWrapperProps {
  id: string
  children: React.ReactNode
  className?: string
  ariaLabel?: string
}

export function SectionWrapper({
  id,
  children,
  className,
  ariaLabel,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel ?? id}
      className={cn(
        'relative w-full px-6 md:px-12 lg:px-24 py-24 lg:py-32',
        className
      )}
    >
      {children}
    </section>
  )
}
