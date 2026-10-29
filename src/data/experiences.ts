import type { Experience } from '@/types'

export const EXPERIENCES: Experience[] = [
  {
    company: 'Freelance',
    role: 'Développeur logiciel & web',
    location: 'Remote, France',
    period: 'Depuis oct. 2025',
    duration: 'En cours · ~1 an',
    description: [
      "Développement, déploiement (VPS OVH, CI/CD GitLab) et maintenance du site de l'association Grans Culture, pour la mairie de Grans.",
      "Conception et réalisation de TaskMatrix, application mobile Flutter de gestion de tâches (matrice d'Eisenhower) avec back-end de synchronisation temps réel.",
      "Développement de WidgetSalary, application mobile de suivi de rémunération avec widget d'accueil - terminée et fonctionnelle (non publiée).",
      "Conception et développement du site officiel de l'autrice Joséphine A. Ribelli (Astro, Sanity, Cloudflare) : univers et romans, actualités, espace presse et newsletter, contenu géré par l'autrice et optimisé pour le référencement (en cours).",
      'Conception et développement de ce portfolio (React 19, Three.js, GSAP).',
    ],
    tags: ['Freelance', 'React', 'Next.js', 'Astro', 'Flutter', 'TypeScript', 'Three.js', 'GitLab CI/CD', 'Déploiement'],
  },
  {
    company: 'Thales Six GTS',
    role: 'Stagiaire - Réseaux & Automatisation',
    location: 'Gennevilliers, France',
    period: '2025',
    duration: '6 mois',
    description: [
      'Automatisation des tests IHM pour des équipements réseau critiques.',
      "Génération automatique de documentation utilisateur à partir de captures d'écran et de données structurées.",
    ],
    tags: ['Java', 'TypeScript', 'Automatisation', 'Playwright', 'LaTeX', 'Réseaux', 'Tests IHM'],
  },
  {
    company: 'ProMealPlan',
    role: 'Développeur Web - Stage',
    location: 'Remote',
    period: '2024',
    duration: '4 mois',
    description: [
      "Développement d'un algorithme de tri et de recommandation de plans alimentaires.",
      'Analyse de marché et communication de vulgarisation sur les données nutritionnelles.',
    ],
    tags: ['Algorithme', 'JavaScript', 'Analyse de marché'],
  },
  {
    company: 'Thales - Abu Dhabi / Dubaï',
    role: 'Stagiaire Cybersécurité',
    location: 'Abu Dhabi, Émirats Arabes Unis',
    period: '2021',
    duration: '3 mois',
    description: [
      "Développement d'un outil interne de communication sécurisée, type Microsoft Teams propriétaire.",
      'Apprentissage des protocoles réseau et des enjeux de sécurité en environnement industriel.',
    ],
    tags: ['Cybersécurité', 'Réseaux', 'VMs', 'Développement logiciel'],
  },
  {
    company: 'Cours particuliers',
    role: 'Enseignant en sciences',
    location: 'Île-de-France',
    period: '2020 – 2023',
    duration: '3 ans',
    description: [
      'Soutien scolaire en mathématiques, physique et informatique auprès de collégiens et lycéens.',
    ],
    tags: ['Pédagogie', 'Vulgarisation', 'Sciences'],
  },
  {
    company: 'T&E Woodbar',
    role: 'CDI - Bar à jus',
    location: 'Île-de-France',
    period: '2019 – 2022',
    duration: '3 ans',
    description: [
      'Gestion et service en bar à jus en parallèle des études.',
      'Adaptation au monde professionnel, travail en équipe et gestion du stress.',
    ],
    tags: ['Travail en équipe', 'Service client', 'Gestion'],
  },
]
