import type { SkillCategory } from '@/types'

export const SKILLS: SkillCategory[] = [
  {
    category: 'Langages',
    skills: [
      { name: 'Python', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'JavaScript', level: 85 },
      { name: 'Java', level: 75 },
      { name: 'C++', level: 65 },
      { name: 'C#', level: 60 },
      { name: 'Svelte', level: 55 },
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
    ],
  },
  {
    category: 'Développement & Outils',
    skills: [
      { name: 'Git', level: 85 },
      { name: 'Docker', level: 80 },
      { name: 'SQL', level: 75 },
      { name: 'Next.js', level: 80 },
      { name: 'React', level: 80 },
      { name: 'Maven', level: 65 },
    ],
  },
  {
    category: 'Réseaux & DevOps',
    skills: [
      { name: 'Linux', level: 80 },
      { name: 'Nginx', level: 75 },
      { name: 'Docker Compose', level: 80 },
      { name: 'GitLab CI/CD', level: 70 },
      { name: 'Auto-hébergement', level: 85 },
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
      { name: 'Vulgarisation', level: 85 },
    ],
  },
]
