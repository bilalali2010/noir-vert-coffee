import { useState } from 'react'
import { FaInstagram, FaTiktok, FaPinterestP, FaXTwitter } from 'react-icons/fa6'
import useMagnetic from '../../hooks/useMagnetic'
import './Footer.css'

const SOCIALS = [
  { icon: FaInstagram, label: 'Instagram', href: '#' },
  { icon: FaTiktok, label: 'TikTok', href: '#' },
  { icon: FaPinterestP, label: 'Pinterest', href: '#' },
  { icon: FaXTwitter, label: 'X', href: '#' },
]

const COLUMNS = [
  {
    title: 'Visit',
    links: ['Riverside District', 'Old Mill Quarter', 'Harbor Row'],
  },
  {
    title: 'Company',
    links: ['Our Story', 'Wholesale', 'Careers', 'Press'],
  },
  {
    title: 'Support',
    links: ['Contact', 'FAQ', 'Gift Cards', 'Accessibility'],
  },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const btnRef = useMagnetic(0.25)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email.trim()) setSubmitted(true)
  }

  return (
    <footer className="footer">
      <div className="container footer-top">
        <div className="footer-brand">
          <h2>Noir&nbsp;Vert</h2>
          <p>Roasted in shadow, poured in gold.</p>

          <form className="footer-newsletter" onSubmit={handleSubmit}>
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button ref={btnRef} type="submit" className="btn btn-primary" data-cursor="hover">
              {submitted ? 'Subscribed ✓' : 'Subscribe'}
            </button>
          </form>
        </div>

        <div className="footer-columns">
          {COLUMNS.map((col) => (
            <div key={col.title} className="footer-col">
              <h3>{col.title}</h3>
              <ul>
                {col.links.map((link) => (
                  <li key={link}><a href="#" data-cursor="hover">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Noir Vert Coffee House. All rights reserved.</span>
        <div className="footer-socials">
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} aria-label={s.label} data-cursor="hover">
              <s.icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
