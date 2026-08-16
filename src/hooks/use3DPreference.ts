import { useEffect, useState } from 'react'

const STORAGE_KEY = 'portfolio-3d-enabled'

function readStoredPreference(): boolean {
  if (typeof window === 'undefined') return true
  const stored = window.localStorage.getItem(STORAGE_KEY)
  return stored === null ? true : stored === 'true'
}

// Manual opt-out for the 3D background - independent from prefers-reduced-motion,
// for visitors whose GPU/browser struggles with WebGL even without that OS setting.
export function use3DPreference() {
  const [enabled, setEnabled] = useState(readStoredPreference)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, String(enabled))
  }, [enabled])

  return [enabled, setEnabled] as const
}
