import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { ContactInfo } from './ContactInfo'
import { ContactForm } from './ContactForm'

export function Contact() {
  return (
    <SectionWrapper id="contact" ariaLabel="Contact">
      <SectionTitle subtitle="Disponible pour des opportunités en CDI, stage ou freelance.">
        Contact
      </SectionTitle>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-5xl">
        <div>
          <p className="font-body text-base text-text-primary/60 leading-relaxed mb-8">
            Vous souhaitez me contacter pour une opportunité professionnelle, une question
            ou une collaboration ? Je lis tous les messages et réponds rapidement.
          </p>
          <ContactInfo />
        </div>
        <ContactForm />
      </div>
    </SectionWrapper>
  )
}
