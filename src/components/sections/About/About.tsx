import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { ProfileCard } from './ProfileCard'
import { AboutText } from './AboutText'

export function About() {
  return (
    <SectionWrapper id="apropos" ariaLabel="À propos de moi">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left — text */}
        <div>
          <SectionTitle subtitle="Mon parcours, mes motivations, ce qui me définit en dehors du CV.">
            À propos
          </SectionTitle>
          <AboutText />
        </div>

        {/* Right — card */}
        <div className="flex justify-center lg:justify-end">
          {/* Pass photoSrc once the user provides the photo */}
          <ProfileCard />
        </div>
      </div>
    </SectionWrapper>
  )
}
