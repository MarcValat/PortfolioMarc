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
    title: 'Suite Bobine',
    description:
      "Suite de trois applications de bureau open source pour vidéothèque. Bobine Audio remet un doublage en phase avec sa vidéo en comparant musique et bruitages plutôt que dialogues ; Bobine Subs recale des sous-titres sur ceux déjà présents, d'une langue à l'autre, en comparant le rythme des répliques (y compris PGS/VobSub) ; Bobine Style applique un style de sous-titres uniforme, adapté à chaque résolution. Détection des décalages constants, dérives et sauts avec score de confiance, correction manuelle, traitement d'une saison entière en une passe et export MKV sans réencodage.",
    tags: ['Tauri 2', 'Rust', 'React 19', 'TypeScript', 'Python', 'FastAPI', 'NumPy / SciPy', 'FFmpeg', 'DSP', 'Playwright'],
    url: null,
    liveDemo: false,
    repoLinks: [
      { label: 'Bobine Audio', url: 'https://github.com/MarcValat/BobineAudio' },
      { label: 'Bobine Subs', url: 'https://github.com/MarcValat/BobineSubs' },
      { label: 'Bobine Style', url: 'https://github.com/MarcValat/BobineStyle' },
    ],
    status: 'v2.0.0 - Windows & Linux',
  },
  {
    title: 'Site de Joséphine A. Ribelli',
    description:
      "Site officiel d'une autrice de romans, conçu en freelance : présentation de l'autrice et de ses univers, catalogue des romans, actualités, espace presse et newsletter. Site statique ultra-rapide, contenu géré par l'autrice depuis une console d'administration, multilingue (français puis anglais) et optimisé pour le référencement.",
    tags: ['Astro', 'TypeScript', 'Sanity', 'Cloudflare Workers', 'Brevo', 'SEO', 'i18n'],
    url: null,
    liveDemo: false,
    status: 'En développement',
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
      "Application web qui convertit des histoires (PDF ou DOCX) en audio narré en français, avec voix preset ou clonage de sa propre voix. Trois moteurs de synthèse vocale exécutés localement (Kyutai Pocket TTS, Chatterbox, Qwen3-TTS) chargés à la demande, balises d'ambiance dans le texte, régénération phrase par phrase, montage audio et streaming temps réel via Redis.",
    tags: ['FastAPI', 'Python', 'React', 'Vite', 'Redis', 'arq', 'TTS', 'Docker'],
    url: null,
    liveDemo: false,
    repoUrl: 'https://github.com/MarcValat/Voice4Kids-Remastered',
    status: 'v1.0',
  },
  {
    title: 'MicroScope Control',
    description:
      "Application de bureau de pilotage d'un microscope de laboratoire : caméra scientifique TUCSEN (SDK TUCAM), anneau LED RGBW sur Arduino et platines motorisées Thorlabs XY/Z. Moteur Python (API HTTP + WebSocket) avec aperçu caméra en direct, time-lapse, vidéo, et mode simulation complet reproduisant le matériel. Tests automatisés (moteur, interface, shell Rust) sur chaque pull request.",
    tags: ['Tauri 2', 'Rust', 'React', 'TypeScript', 'Python', 'FastAPI', 'WebSocket', 'Arduino', 'Pilotage matériel'],
    url: null,
    liveDemo: false,
    status: 'Interface terminée - validation matériel à venir',
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
