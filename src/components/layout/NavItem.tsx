import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'

interface NavItemProps {
  href: string
  label: string
  active: boolean
  onClick?: () => void
}

export function NavItem({ href, label, active, onClick }: NavItemProps) {
  return (
    <motion.a
      href={href}
      onClick={(e) => {
        e.preventDefault()
        onClick?.()
        const target = document.querySelector(href)
        if (target) target.scrollIntoView({ behavior: 'smooth' })
      }}
      className={cn(
        'relative text-sm font-heading font-medium transition-colors duration-200',
        active ? 'text-gold' : 'text-text-primary/70 hover:text-text-primary'
      )}
      whileHover={{ y: -1 }}
    >
      {label}
      {active && (
        <motion.span
          className="absolute -bottom-1 left-0 h-0.5 w-full bg-gold"
          layoutId="nav-underline"
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}
    </motion.a>
  )
}
