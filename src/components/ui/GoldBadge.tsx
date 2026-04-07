import { cn } from '@/lib/cn'

interface GoldBadgeProps {
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md'
}

export function GoldBadge({ children, className, size = 'md' }: GoldBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-gold/20 bg-gold/5 font-mono text-gold',
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm',
        className
      )}
    >
      {children}
    </span>
  )
}
