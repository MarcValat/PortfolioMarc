import { Mail, MapPin } from 'lucide-react'
import { GithubIcon } from '@/components/ui/GithubIcon'

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-glass-border bg-bg-primary/80 backdrop-blur-glass">
      <div className="px-6 md:px-12 lg:px-24 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-text-primary/40 text-sm">
          <MapPin size={14} />
          <span>Deuil-la-Barre, 95170</span>
        </div>

        <p className="text-text-primary/30 text-xs font-mono">
          © 2025 Marc Valat — Ingénieur IA · Dev · DevOps
        </p>

        <div className="flex items-center gap-4">
          <a
            href="mailto:marc.valat@hotmail.fr"
            className="text-text-primary/40 hover:text-gold transition-colors"
            aria-label="Email"
          >
            <Mail size={16} />
          </a>
          <a
            href="https://github.com/MarcValat"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-primary/40 hover:text-gold transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon size={16} />
          </a>
        </div>
      </div>
    </footer>
  )
}
