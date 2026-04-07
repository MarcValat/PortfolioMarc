import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Timeline } from './Timeline'

export function Experiences() {
  return (
    <SectionWrapper id="experiences" ariaLabel="Expériences professionnelles">
      <SectionTitle subtitle="Stages, CDI et activités en parallèle des études.">
        Expériences
      </SectionTitle>
      <Timeline />
    </SectionWrapper>
  )
}
