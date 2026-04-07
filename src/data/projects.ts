import type { Project } from '@/types'

export const PROJECTS: Project[] = [
  {
    title: 'EduFlow',
    description:
      'Intranet complet pour école : gestion des étudiants, emploi du temps, présences, notes, projets, admissions, RH, documentation interne et JPO. Application full-stack avec authentification par rôles, stockage fichiers S3 et déploiement Docker.',
    tags: [
      'Next.js 15',
      'TypeScript',
      'PostgreSQL',
      'Prisma',
      'Auth.js',
      'shadcn/ui',
      'MinIO',
      'Docker',
    ],
    url: null, // À renseigner : URL instance de test
    liveDemo: true,
    status: 'En développement (18/40 étapes)',
  },
  {
    title: 'Infrastructure Serveur Personnel',
    description:
      "Déploiement et maintenance d'un serveur auto-hébergé avec GitLab et ses runners CI/CD Docker, Nextcloud, Immich (gestion photos), Plex, et Nginx comme reverse-proxy. Gestion des backups, certificats TLS et monitoring.",
    tags: ['Linux', 'Docker', 'Nginx', 'GitLab CI/CD', 'Nextcloud', 'Immich', 'Self-hosting'],
    url: null,
    liveDemo: false,
    status: 'En production',
  },
]
