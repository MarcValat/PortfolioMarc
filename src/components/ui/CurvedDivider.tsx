import { cn } from '@/lib/cn'

interface CurvedDividerProps {
  flip?: boolean
  className?: string
  color?: string
}

export function CurvedDivider({
  flip = false,
  className,
  color = '#080808',
}: CurvedDividerProps) {
  return (
    <div
      className={cn('w-full overflow-hidden leading-none', flip && '-scale-y-100', className)}
      aria-hidden
    >
      <svg
        viewBox="0 0 1440 60"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full h-[60px]"
      >
        <path
          d="M0,0 C360,60 1080,60 1440,0 L1440,60 L0,60 Z"
          fill={color}
        />
      </svg>
    </div>
  )
}
