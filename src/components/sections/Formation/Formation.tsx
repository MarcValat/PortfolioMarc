import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { EsmeCard } from './EsmeCard'

export function Formation() {
  return (
    <SectionWrapper id="formation" ariaLabel="Formation">
      <SectionTitle subtitle="Diplôme d'ingénieur ESME Sudria, spécialisation Intelligence Artificielle.">
        Formation
      </SectionTitle>
      <EsmeCard />
    </SectionWrapper>
  )
}
