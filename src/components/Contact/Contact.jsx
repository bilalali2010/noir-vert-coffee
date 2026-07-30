import { useState } from 'react'
import { motion } from 'framer-motion'
import useReveal from '../../hooks/useReveal'
import useMagnetic from '../../hooks/useMagnetic'
import './Contact.css'

const initialState = { name: '', email: '', message: '' }

export default function Contact() {
  const scopeRef = useReveal()
  const btnRef = useMagnetic(0.2)
  const [form, setForm] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const validate = (values) => {
    const next = {}
    if (!values.name.trim()) next.name = 'Please tell us your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = 'Enter a valid email address.'
    if (values.message.trim().length < 10) next.message = 'Message should be at least 10 characters.'
    return next
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const next = validate(form)
    setErrors(next)
    if (Object.keys(next).length === 0) {
      setStatus('sent')
      setForm(initialState)
    }
  }

  return (
    <section id="contact" className="section contact" ref={scopeRef}>
      <div className="container contact-grid">
        <div className="reveal">
          <span className="eyebrow">Contact</span>
          <h2>Come sit with us.</h2>
          <p className="contact-lead">
            Questions about catering, private tastings, or wholesale beans? Send a note
            and someone from the roastery will reply within a day.
          </p>
        </div>

        <form className="contact-form glass-card reveal" onSubmit={handleSubmit} noValidate>
          <div className="contact-field">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && <span className="contact-error" id="name-error">{errors.name}</span>}
          </div>

          <div className="contact-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && <span className="contact-error" id="email-error">{errors.email}</span>}
          </div>

          <div className="contact-field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={form.message}
              onChange={handleChange}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'message-error' : undefined}
            />
            {errors.message && <span className="contact-error" id="message-error">{errors.message}</span>}
          </div>

          <button ref={btnRef} type="submit" className="btn btn-primary contact-submit" data-cursor="hover">
            {status === 'sent' ? 'Message Sent ✓' : 'Send Message'}
          </button>

          {status === 'sent' && (
            <motion.p
              className="contact-confirm"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Thank you — we will be in touch soon.
            </motion.p>
          )}
        </form>
      </div>
    </section>
  )
}
