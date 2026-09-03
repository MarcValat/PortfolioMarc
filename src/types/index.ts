export interface DemoCredentials {
  logins: string[]
  password: string
}

export interface Project {
  title: string
  description: string
  tags: string[]
  url: string | null
  liveDemo?: boolean
  status?: string
  demoCredentials?: DemoCredentials
  /** Libellé du badge « en ligne » (défaut : « Démo en ligne »). */
  liveLabel?: string
  /** Libellé du bouton d'accès (défaut : « Voir la démo en ligne »). */
  urlLabel?: string
  /** Lien vers le dépôt GitHub public. */
  repoUrl?: string
}

export interface Experience {
  company: string
  role: string
  location: string
  period: string
  duration: string
  description: string[]
  tags: string[]
}

export interface SkillItem {
  name: string
  level?: number // 0–100, optional (used for bars)
}

export interface SkillCategory {
  category: string
  icon?: string
  skills: SkillItem[]
}

export interface Formation {
  school: string
  degree: string
  field: string
  period: string
  description?: string
}
