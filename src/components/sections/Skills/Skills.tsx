import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { SkillCategoryCard } from './SkillCategory'
import { SKILLS } from '@/data/skills'

export function Skills() {
  return (
    <SectionWrapper id="competences" ariaLabel="Compétences">
      <SectionTitle subtitle="Technologies, outils et domaines maîtrisés ou pratiqués régulièrement.">
        Compétences
      </SectionTitle>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {SKILLS.map((category, i) => (
          <SkillCategoryCard key={category.category} category={category} index={i} />
        ))}
      </div>
    </SectionWrapper>
  )
}
