import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { GoldButton } from '@/components/ui/GoldButton'
import { cn } from '@/lib/cn'

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string
  id: string
  multiline?: boolean
  rows?: number
}

function Field({ label, id, multiline, rows = 4, className, ...props }: FieldProps) {
  const [focused, setFocused] = useState(false)
  const inputClass = cn(
    'w-full bg-transparent text-text-primary text-sm font-body outline-none',
    'placeholder-text-primary/30 resize-none',
    className
  )

  return (
    <div>
      <label htmlFor={id} className="block text-xs font-mono text-text-primary/40 uppercase tracking-widest mb-2">
        {label}
      </label>
      <motion.div
        animate={{ borderColor: focused ? 'rgba(201,168,76,0.5)' : 'rgba(201,168,76,0.15)' }}
        className="rounded-lg border bg-glass-bg backdrop-blur-glass px-4 py-3"
        style={{ borderColor: 'rgba(201,168,76,0.15)' }}
      >
        {multiline ? (
          <textarea
            id={id}
            rows={rows}
            className={inputClass}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            id={id}
            className={inputClass}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            {...props}
          />
        )}
      </motion.div>
    </div>
  )
}

export function ContactForm() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // Placeholder — connect to a form service (Resend, Formspree, etc.) when ready
    setSent(true)
  }

  return (
    <GlassCard className="p-8">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center gap-4 py-12 text-center"
          >
            <CheckCircle size={48} className="text-gold" />
            <h3 className="font-heading text-xl font-bold text-text-primary">Message envoyé !</h3>
            <p className="text-text-primary/50 text-sm">Je vous répondrai dans les meilleurs délais.</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field id="name" label="Nom" placeholder="Jean Dupont" required />
              <Field id="email" label="Email" type="email" placeholder="jean@exemple.com" required />
            </div>
            <Field id="subject" label="Objet" placeholder="Opportunité / Stage / Question" required />
            <Field
              id="message"
              label="Message"
              placeholder="Bonjour Marc, …"
              multiline
              rows={5}
              required
            />
            <GoldButton type="submit" className="self-start">
              Envoyer <Send size={14} />
            </GoldButton>
          </motion.form>
        )}
      </AnimatePresence>
    </GlassCard>
  )
}
