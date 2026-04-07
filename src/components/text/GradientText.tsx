import { cn } from '@/lib/cn'

interface GradientTextProps {
  children: React.ReactNode
  className?: string
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p'
}

export function GradientText({
  children,
  className,
  as: Tag = 'span',
}: GradientTextProps) {
  return (
    <Tag className={cn('gold-text', className)}>
      {children}
    </Tag>
  )
}
