import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { ProjectCard } from './ProjectCard'
import { PROJECTS } from '@/data/projects'

export function Projects() {
  return (
    <SectionWrapper id="projets" ariaLabel="Projets">
      <SectionTitle subtitle="Projets personnels et réalisations notables.">
        Projets
      </SectionTitle>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </SectionWrapper>
  )
}
