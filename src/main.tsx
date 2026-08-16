import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { createLenis } from '@/lib/lenis'
import './index.css'
import App from './App.tsx'

// Register useGSAP plugin globally
gsap.registerPlugin(useGSAP)

// Init Lenis before React mounts - ensures getLenis() is non-null in all useEffects
createLenis()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
