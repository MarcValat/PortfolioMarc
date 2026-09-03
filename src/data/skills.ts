import type { SkillCategory } from '@/types'

export const SKILLS: SkillCategory[] = [
  {
    category: 'Langages',
    skills: [
      { name: 'Python', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'JavaScript', level: 85 },
      { name: 'Java', level: 80 },
      { name: 'Dart', level: 70 },
      { name: 'Svelte', level: 75 },
      { name: 'C++', level: 50 },
      { name: 'C#', level: 50 },
    ],
  },
  {
    category: 'IA / Machine Learning',
    skills: [
      { name: 'TensorFlow', level: 80 },
      { name: 'PyTorch', level: 75 },
      { name: 'Scikit-learn', level: 85 },
      { name: 'Deep Learning', level: 75 },
      { name: 'NLP', level: 70 },
      { name: 'Traitement du signal / audio', level: 68 },
    ],
  },
  {
    category: 'Développement & Outils',
    skills: [
      { name: 'Git', level: 95 },
      { name: 'Docker', level: 80 },
      { name: 'Next.js', level: 80 },
      { name: 'React', level: 80 },
      { name: 'Tailwind CSS', level: 85 },
      { name: 'Flutter', level: 68 },
      { name: 'FastAPI', level: 72 },
      { name: 'Prisma', level: 78 },
      { name: 'PostgreSQL', level: 72 },
      { name: 'Maven', level: 75 },
    ],
  },
  {
    category: 'Réseaux & DevOps',
    skills: [
      { name: 'Linux', level: 90 },
      { name: 'Nginx / Reverse-proxy', level: 85 },
      { name: 'Docker Compose', level: 80 },
      { name: 'GitLab CI/CD', level: 80 },
      { name: 'Auto-hébergement', level: 90 },
      { name: 'Supervision & backups', level: 75 },
    ],
  },
  {
    category: 'Cybersécurité',
    skills: [
      { name: 'Sécurité réseaux', level: 55 },
      { name: 'Protocoles', level: 60 },
    ],
  },
  {
    category: 'Soft Skills',
    skills: [
      { name: 'Gestion de projet', level: 80 },
      { name: 'Travail en équipe', level: 90 },
      { name: 'Vulgarisation', level: 95 },
    ],
  },
]
