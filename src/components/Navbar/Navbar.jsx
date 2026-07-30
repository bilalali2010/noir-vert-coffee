import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { HiOutlineMenuAlt3, HiX } from 'react-icons/hi'
import useMagnetic from '../../hooks/useMagnetic'
import './Navbar.css'

const LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'Menu', href: '#menu' },
  { label: 'Rewards', href: '#rewards' },
  { label: 'Locations', href: '#locations' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const ctaRef = useMagnetic(0.25)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goTo = (href) => (e) => {
    e.preventDefault()
    setOpen(false)
    const el = document.querySelector(href)
    if (el && window.__lenis) {
      window.__lenis.scrollTo(el, { offset: -80, duration: 1.2 })
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className={`navbar ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="navbar-inner container">
        <a href="#hero" className="navbar-mark" onClick={goTo('#hero')} data-cursor="hover">
          <span className="navbar-mark-dot" />
          Noir&nbsp;Vert
        </a>

        <nav className="navbar-links" aria-label="Primary">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={goTo(link.href)} data-cursor="hover">
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#locations"
          ref={ctaRef}
          onClick={goTo('#locations')}
          className="btn btn-primary navbar-cta"
          data-cursor="hover"
        >
          Order Ahead
        </a>

        <button
          className="navbar-burger"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <HiX size={22} /> : <HiOutlineMenuAlt3 size={22} />}
        </button>
      </div>

      <motion.div
        className="navbar-mobile"
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <nav aria-label="Mobile">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={goTo(link.href)}>
              {link.label}
            </a>
          ))}
        </nav>
      </motion.div>
    </header>
  )
}
