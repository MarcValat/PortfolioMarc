import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from '@/lib/gsap'
import { useScrollSection } from '@/hooks/useScrollSection'
import { NavItem } from './NavItem'
import { GoldButton } from '@/components/ui/GoldButton'
import { cn } from '@/lib/cn'

const NAV_LINKS = [
  { href: '#apropos',     label: 'À propos' },
  { href: '#competences', label: 'Compétences' },
  { href: '#experiences', label: 'Expériences' },
  { href: '#formation',   label: 'Formation' },
  { href: '#projets',     label: 'Projets' },
  { href: '#contact',     label: 'Contact' },
]

export function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const activeSection = useScrollSection()

  useGSAP(
    () => {
      ScrollTrigger.create({
        start: 'top -80',
        onEnter: () => setScrolled(true),
        onLeaveBack: () => setScrolled(false),
      })
    },
    { scope: navRef }
  )

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-bg-primary/80 backdrop-blur-glass border-b border-glass-border'
          : 'bg-transparent'
      )}
    >
      <div className="flex items-center justify-between px-6 md:px-12 lg:px-24 h-16">
        {/* Logo */}
        <motion.a
          href="#hero"
          className="font-heading font-bold text-lg gold-text"
          whileHover={{ scale: 1.03 }}
        >
          MV
        </motion.a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <NavItem
              key={link.href}
              href={link.href}
              label={link.label}
              active={activeSection === link.href.replace('#', '')}
            />
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex">
          <GoldButton
            href="#contact"
            variant="outline"
            className="text-xs px-4 py-2"
          >
            Me contacter
          </GoldButton>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden text-text-primary p-2"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-bg-primary/95 backdrop-blur-glass border-b border-glass-border"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {NAV_LINKS.map((link) => (
                <NavItem
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  active={activeSection === link.href.replace('#', '')}
                  onClick={() => setMobileOpen(false)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
