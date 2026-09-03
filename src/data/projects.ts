import type { Project } from '@/types'

export const PROJECTS: Project[] = [
  {
    title: 'EduFlow',
    description:
      'Intranet complet pour école : gestion des étudiants, emploi du temps, présences, notes, projets, admissions, RH, documentation interne et JPO. Application full-stack avec authentification par rôles, stockage fichiers S3 et déploiement Docker.',
    demoCredentials: {
      logins: [
        'superadmin@demo.colint.school',
        'admin@demo.colint.school',
        'coach@demo.colint.school',
        'etudiant1@demo.colint.school',
      ],
      password: 'Demo1234!',
    },
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
    url: 'https://demo.colint.marcallie.duckdns.org/', // À renseigner : URL instance de test
    liveDemo: true,
    status: 'En développement (18/40 étapes)',
  },
  {
    title: 'Infrastructure Serveur Personnel',
    description:
      "Serveur auto-hébergé faisant tourner une trentaine de conteneurs Docker, répartis en stacks isolées sur des réseaux dédiés : forge GitLab CE et ses runners CI/CD qui déploient automatiquement mes projets (dont ce portfolio), Nextcloud AIO avec Collabora et Talk, Immich (galerie photos + reconnaissance par ML), Vaultwarden, Umami (analytics respectueux de la vie privée) et une suite d'automatisation média. Nginx Proxy Manager en frontal, TLS Let's Encrypt, supervision via Portainer, sauvegardes chiffrées BorgBackup et mises à jour automatisées Watchtower.",
    tags: [
      'Linux',
      'Docker',
      'Docker Compose',
      'GitLab CI/CD',
      'Nginx Proxy Manager',
      'PostgreSQL',
      'Nextcloud',
      'Immich',
      'Vaultwarden',
      'Portainer',
      'BorgBackup',
      'Self-hosting',
    ],
    url: null,
    liveDemo: false,
    status: 'En production - ~30 conteneurs',
  },
  {
    title: 'Grans Culture',
    description:
      "Site de l'association Grans Culture (mairie de Grans) : vitrine publique, catalogue de l'historique des concerts (Les Soirs du Piano, Jazz à Grans, Opéra, Musique de chambre…) et interface d'administration. Développement, déploiement sur VPS OVH (Nginx, PM2, Let's Encrypt, sauvegardes) et maintenance en continu.",
    tags: ['Next.js', 'TypeScript', 'Prisma', 'SQLite', 'Tailwind CSS', 'Nginx', 'PM2', 'VPS OVH'],
    url: 'https://gransculture.fr',
    liveDemo: true,
    liveLabel: 'Site en ligne',
    urlLabel: 'Voir le site',
    status: 'En production',
  },
  {
    title: "Site vitrine - Autrice de roman",
    description:
      "Site vitrine conçu en freelance pour une autrice de roman : présentation de l'autrice et de son univers, catalogue des ouvrages et actualité des parutions. Site responsive, léger et optimisé pour le référencement naturel.",
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'SEO', 'Responsive'],
    url: null,
    liveDemo: false,
    status: 'En conception & développement',
  },
  {
    title: 'TaskMatrix',
    description:
      "Application mobile de gestion de tâches basée sur la matrice d'Eisenhower (urgent / important). Sous-tâches, rappels locaux, statistiques, mode hors ligne, et partage multi-utilisateurs avec synchronisation temps réel et notifications push.",
    tags: ['Flutter', 'Dart', 'SQLite', 'Supabase', 'PostgreSQL', 'FCM'],
    url: null,
    liveDemo: false,
    status: 'Application mobile - v1.2.1',
  },
  {
    title: 'Voice4Kids',
    description:
      "Application web qui convertit des histoires (PDF ou DOCX) en audio narré en français, avec voix preset ou clonage de sa propre voix. Synthèse vocale exécutée localement (Kyutai Pocket TTS), génération en file d'attente et streaming audio temps réel via Redis.",
    tags: ['FastAPI', 'Python', 'React', 'Vite', 'Redis', 'arq', 'TTS', 'Docker'],
    url: null,
    liveDemo: false,
    repoUrl: 'https://github.com/MarcValat/Voice4Kids-Remastered',
    status: 'v1.0',
  },
  {
    title: 'SyncAudio',
    description:
      "Outil en ligne de commande qui calcule le décalage temporel entre des pistes audio de langues différentes (doublages) d'un même contenu. Analyse la composante percussive du spectrogramme (HPSS) et corrèle les enveloppes d'onset par FFT, avec score de confiance.",
    tags: ['Python', 'NumPy', 'SciPy', 'FFmpeg', 'DSP', 'CLI'],
    url: null,
    liveDemo: false,
    repoUrl: 'https://github.com/MarcValat/SyncAudio',
    status: 'v1.0 - CLI',
  },
  {
    title: 'Site de Mariage',
    description:
      "Site web de mariage : présentation, informations pratiques, gestion des réponses des invités (RSVP) et des lieux d'hébergement, galerie collaborative où les invités déposent leurs photos du mariage, et interface de plan de table. Application Next.js / Firebase, auto-hébergée sur mon serveur perso avec déploiement continu via une CI/CD GitLab.",
    tags: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'Firebase', 'Zod', 'Jest', 'GitLab CI/CD', 'Self-hosting'],
    url: null,
    liveDemo: false,
    status: 'En développement',
  },
]
