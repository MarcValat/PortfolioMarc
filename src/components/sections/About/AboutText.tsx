import { motion } from 'framer-motion'

const BIO_PARAGRAPHS = [
  "Ingénieur diplômé de l'ESME Sudria (spécialisation IA, 2025), je m'intéresse autant à l'intelligence artificielle qu'au développement logiciel et aux infrastructures DevOps.",
  "En stage chez Thales, j'ai automatisé des tests d'interfaces réseau et généré de la documentation technique. Lors d'un précédent stage à Abou Dabi, j'ai développé un outil de communication sécurisée propriétaire.",
  "En parallèle, je déploie et maintiens un serveur personnel avec GitLab, Docker, Nginx, Nextcloud, Immich et d'autres services en tout genre — une pratique qui nourrit ma compréhension concrète des systèmes.",
  'Anglais C1, bilingue écrit. Passionné de tennis de table, de jeux vidéo compétitifs, de self-hostinget de programmation pour le plaisir.',
]

export function AboutText() {
  return (
    <div className="flex flex-col gap-5">
      {BIO_PARAGRAPHS.map((paragraph, i) => (
        <motion.p
          key={i}
          className="font-body text-base md:text-lg text-text-primary/70 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
        >
          {paragraph}
        </motion.p>
      ))}
    </div>
  )
}
