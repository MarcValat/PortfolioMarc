import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { GoldButton } from '@/components/ui/GoldButton'
import { cn } from '@/lib/cn'

const WEB3FORMS_KEY = '004c3b17-4c6f-4897-a8da-ccc2008ce328'

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
      <label htmlFor={id} className="block text-xs font-mono text-text-primary/90 uppercase tracking-widest mb-2">
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

type Status = 'idle' | 'loading' | 'success' | 'error'

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')

    const data = new FormData(e.currentTarget)
    data.append('access_key', WEB3FORMS_KEY)

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      })
      const json = await res.json()
      setStatus(json.success ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <GlassCard className="p-8">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center gap-4 py-12 text-center"
          >
            <CheckCircle size={48} className="text-gold" />
            <h3 className="font-heading text-xl font-bold text-text-primary">Message envoyé !</h3>
            <p className="text-text-primary/75 text-sm">Je vous répondrai dans les meilleurs délais.</p>
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
              <Field id="name" name="name" label="Nom" placeholder="Jean Dupont" required />
              <Field id="email" name="email" label="Email" type="email" placeholder="jean@exemple.com" required />
            </div>
            <Field id="subject" name="subject" label="Objet" placeholder="Opportunité / Stage / Question" required />
            <Field
              id="message"
              name="message"
              label="Message"
              placeholder="Bonjour Marc, …"
              multiline
              rows={5}
              required
            />

            {status === 'error' && (
              <div className="flex items-center gap-2 text-coral text-sm">
                <AlertCircle size={14} />
                <span>Erreur lors de l'envoi. Réessayez ou contactez-moi directement.</span>
              </div>
            )}

            <GoldButton type="submit" disabled={status === 'loading'} className="self-start">
              {status === 'loading' ? 'Envoi…' : <>Envoyer <Send size={14} /></>}
            </GoldButton>
          </motion.form>
        )}
      </AnimatePresence>
    </GlassCard>
  )
}
