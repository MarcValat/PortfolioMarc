import { FileDown } from 'lucide-react'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { GoldButton } from '@/components/ui/GoldButton'
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
          <p className="font-body text-base text-text-primary/85 leading-relaxed mb-6">
            Vous souhaitez me contacter pour une opportunité professionnelle, une question
            ou une collaboration ? Je lis tous les messages et réponds rapidement.
          </p>
          <GoldButton
            href="/CV-Marc-Valat-fr.pdf"
            target="_blank"
            download
            className="mb-8 text-sm px-5 py-2.5"
          >
            <FileDown size={16} />
            Télécharger mon CV
          </GoldButton>
          <ContactInfo />
        </div>
        <ContactForm />
      </div>
    </SectionWrapper>
  )
}
