import { lazy, Suspense } from 'react'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { Scene3DToggle } from '@/components/ui/Scene3DToggle'
import { use3DPreference } from '@/hooks/use3DPreference'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero/Hero'
import { About } from '@/components/sections/About/About'
import { Skills } from '@/components/sections/Skills/Skills'
import { Experiences } from '@/components/sections/Experiences/Experiences'
import { Formation } from '@/components/sections/Formation/Formation'
import { Projects } from '@/components/sections/Projects/Projects'
import { Contact } from '@/components/sections/Contact/Contact'

// Code-split: the three.js/R3F bundle is heavy (~300KB gzipped) and purely decorative —
// load it after the critical content (Hero, nav) rather than blocking first paint on it.
const SceneCanvas = lazy(() =>
  import('@/components/three/SceneCanvas').then((mod) => ({ default: mod.SceneCanvas }))
)

export default function App() {
  const [scene3DEnabled, setScene3DEnabled] = use3DPreference()

  return (
    <ErrorBoundary>
      <ScrollProgress />
      {/* Fixed 3D background — z-0, pointer-events-none */}
      {scene3DEnabled && (
        <ErrorBoundary fallback={null}>
          <Suspense fallback={null}>
            <SceneCanvas />
          </Suspense>
        </ErrorBoundary>
      )}
      <Scene3DToggle enabled={scene3DEnabled} onToggle={() => setScene3DEnabled((v) => !v)} />

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
