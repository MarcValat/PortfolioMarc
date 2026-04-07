import { useEffect } from 'react'
import { getLenis } from '@/lib/lenis'
import type Lenis from 'lenis'

type ScrollCallback = (lenis: Lenis) => void

export function useLenis(callback?: ScrollCallback): void {
  useEffect(() => {
    if (!callback) return
    const lenis = getLenis()
    if (!lenis) return

    lenis.on('scroll', callback)
    return () => {
      lenis.off('scroll', callback)
    }
  }, [callback])
}
