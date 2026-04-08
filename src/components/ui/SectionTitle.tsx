import { cn } from '@/lib/cn'

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
  return (
    <div className={cn('mb-12', align === 'center' && 'text-center', className)}>
      <h2
        className={cn(
          'font-heading text-4xl font-bold text-text-primary mb-3',
          'relative inline-block'
        )}
      >
        {children}
        {/* Gold underline accent */}
        <span
          className="absolute -bottom-1 left-0 h-0.5 w-full bg-gold-gradient"
          aria-hidden
        />
      </h2>
      {subtitle && (
        <p className="mt-4 text-text-primary/85 font-body text-base max-w-xl">
          {subtitle}
        </p>
      )}
    </div>
  )
}
