import { Box, Orbit } from 'lucide-react'
import { cn } from '@/lib/cn'

interface Scene3DToggleProps {
  enabled: boolean
  onToggle: () => void
}

export function Scene3DToggle({ enabled, onToggle }: Scene3DToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={enabled}
      title={enabled ? 'Désactiver le fond animé 3D' : 'Activer le fond animé 3D'}
      aria-label={enabled ? 'Désactiver le fond animé 3D' : 'Activer le fond animé 3D'}
      className={cn(
        'fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full',
        'border border-glass-border bg-glass-bg backdrop-blur-glass',
        'text-gold/70 hover:text-gold hover:border-gold/40 transition-colors duration-300',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2'
      )}
    >
      {enabled ? <Orbit size={18} /> : <Box size={18} />}
    </button>
  )
}
