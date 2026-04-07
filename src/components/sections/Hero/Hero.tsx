import { HeroHeadline } from './HeroHeadline'
import { HeroTagline } from './HeroTagline'
import { HeroActions } from './HeroActions'

export function Hero() {
  return (
    <section
      id="hero"
      aria-label="Présentation"
      className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-24 pt-20"
    >
      <div className="max-w-3xl">
        <HeroHeadline />
        <HeroTagline />
        <HeroActions />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-xs font-mono text-text-primary tracking-widest">SCROLL</span>
        <div className="w-px h-10 bg-gradient-to-b from-gold to-transparent" />
      </div>
    </section>
  )
}
