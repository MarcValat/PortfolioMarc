import { motion } from 'framer-motion'
import { Mail, Phone, MapPin } from 'lucide-react'
import { GithubIcon } from '@/components/ui/GithubIcon'
import { GlassCard } from '@/components/ui/GlassCard'

type IconComponent = React.ComponentType<{ size?: number; className?: string }>

const CONTACT_ITEMS: Array<{
  icon: IconComponent
  label: string
  value: string
  href: string | null
}> = [
  {
    icon: Mail,
    label: 'Email',
    value: 'marc.valat@hotmail.fr',
    href: 'mailto:marc.valat@hotmail.fr',
  },
  {
    icon: Phone,
    label: 'Téléphone',
    value: '+33 6 14 79 70 71',
    href: 'tel:+33614797071',
  },
  {
    icon: MapPin,
    label: 'Localisation',
    value: 'Deuil-la-Barre, 95170',
    href: null,
  },
  {
    icon: GithubIcon,
    label: 'GitHub',
    value: 'github.com/MarcValat',
    href: 'https://github.com/MarcValat',
  },
]

export function ContactInfo() {
  return (
    <div className="flex flex-col gap-4">
      {CONTACT_ITEMS.map(({ icon: Icon, label, value, href }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
        >
          <GlassCard className="flex items-center gap-4 px-5 py-4" hover>
            <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
              <Icon size={16} className="text-gold" />
            </div>
            <div>
              <p className="text-text-primary/90 text-xs font-mono uppercase tracking-wider mb-0.5">
                {label}
              </p>
              {href ? (
                <a
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-text-primary/95 text-sm hover:text-gold transition-colors"
                >
                  {value}
                </a>
              ) : (
                <p className="text-text-primary/95 text-sm">{value}</p>
              )}
            </div>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  )
}
