import { motion } from 'framer-motion'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { ProjectCard } from './ProjectCard'
import { PROJECTS } from '@/data/projects'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.05 },
  },
}

export function Projects() {
  return (
    <SectionWrapper id="projets" ariaLabel="Projets">
      <SectionTitle subtitle="Projets personnels et réalisations notables.">
        Projets
      </SectionTitle>

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
      >
        {PROJECTS.map((project) => (
          <ProjectCard key={project.title} project={project} featured={project.liveDemo} />
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
