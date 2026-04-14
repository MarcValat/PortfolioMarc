import { useEffect } from 'react'
import { createLenis } from '@/lib/lenis'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { SceneCanvas } from '@/components/three/SceneCanvas'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero/Hero'
import { About } from '@/components/sections/About/About'
import { Skills } from '@/components/sections/Skills/Skills'
import { Experiences } from '@/components/sections/Experiences/Experiences'
import { Formation } from '@/components/sections/Formation/Formation'
import { Projects } from '@/components/sections/Projects/Projects'
import { Contact } from '@/components/sections/Contact/Contact'

export default function App() {
  useEffect(() => {
    createLenis()
  }, [])

  return (
    <ErrorBoundary>
      <ScrollProgress />
      {/* Fixed 3D background — z-0, pointer-events-none */}
      <ErrorBoundary fallback={null}>
        <SceneCanvas />
      </ErrorBoundary>

      {/* HTML content above canvas — no z-index to stay in same stacking context as canvas */}
      <div className="relative">
        <Navbar />
        <main>
          <ErrorBoundary><Hero /></ErrorBoundary>
          <ErrorBoundary><About /></ErrorBoundary>
          <ErrorBoundary><Skills /></ErrorBoundary>
          <ErrorBoundary><Experiences /></ErrorBoundary>
          <ErrorBoundary><Formation /></ErrorBoundary>
          <ErrorBoundary><Projects /></ErrorBoundary>
          <ErrorBoundary><Contact /></ErrorBoundary>
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  )
}
