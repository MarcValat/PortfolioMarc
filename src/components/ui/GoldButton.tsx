import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'

interface GoldButtonProps {
  children: React.ReactNode
  onClick?: () => void
  href?: string
  variant?: 'primary' | 'outline'
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export function GoldButton({
  children,
  onClick,
  href,
  variant = 'primary',
  className,
  disabled,
  type = 'button',
}: GoldButtonProps) {
  const baseClasses = cn(
    'inline-flex items-center gap-2 px-6 py-3 rounded-full font-heading font-semibold text-sm',
    'transition-all duration-300 cursor-pointer select-none',
    variant === 'primary'
      ? 'bg-gold text-bg-primary hover:bg-gold-light hover:shadow-gold-glow'
      : 'border border-gold text-gold hover:bg-gold/10 hover:shadow-gold-glow',
    disabled && 'opacity-50 cursor-not-allowed',
    className
  )

  const motionProps = {
    whileHover: disabled ? {} : { scale: 1.03, y: -1 },
    whileTap: disabled ? {} : { scale: 0.97 },
    transition: { type: 'spring', stiffness: 400, damping: 17 },
  }

  if (href) {
    return (
      <motion.a href={href} className={baseClasses} {...motionProps}>
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={baseClasses}
      disabled={disabled}
      {...motionProps}
    >
      {children}
    </motion.button>
  )
}
