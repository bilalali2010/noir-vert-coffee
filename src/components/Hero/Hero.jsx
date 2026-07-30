import { Suspense, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { HiArrowDown } from 'react-icons/hi'
import Scene from './Scene'
import useMagnetic from '../../hooks/useMagnetic'
import './Hero.css'

const heading = ['Roasted', 'in Shadow,', 'Poured in Gold.']

export default function Hero({ ready }) {
  const scrollBtnRef = useMagnetic(0.3)
  const wordsRef = useRef([])
  wordsRef.current = []

  useEffect(() => {
    if (!ready) return
    gsap.fromTo(
      wordsRef.current,
      { yPercent: 120, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.12, ease: 'power4.out', delay: 0.2 }
    )
    gsap.fromTo(
      '.hero-sub, .hero-cta-row, .hero-scroll',
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.9, stagger: 0.1 }
    )
  }, [ready])

  const addWordRef = (el) => {
    if (el) wordsRef.current.push(el)
  }

  const scrollToMenu = (e) => {
    e.preventDefault()
    const el = document.querySelector('#menu')
    if (el && window.__lenis) window.__lenis.scrollTo(el, { offset: -60 })
    else el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="hero">
      <Suspense fallback={null}>
        <Scene ready={ready} />
      </Suspense>

      <div className="hero-vignette" aria-hidden="true" />

      <div className="hero-content container">
        <span className="eyebrow">Est. small-batch roastery</span>

        <h1 className="hero-heading">
          {heading.map((line, i) => (
            <span className="hero-line-mask" key={i}>
              <span className="hero-line" ref={addWordRef}>
                {line}
              </span>
            </span>
          ))}
        </h1>

        <p className="hero-sub">
          Single-origin beans, slow-poured rituals, and a room built for lingering.
          Noir Vert is where dark roast meets quiet luxury.
        </p>

        <div className="hero-cta-row">
          <a href="#menu" className="btn btn-primary" onClick={scrollToMenu} data-cursor="hover">
            Explore the Menu
          </a>
          <a href="#about" className="btn btn-ghost" data-cursor="hover">
            Our Story
          </a>
        </div>
      </div>

      <motion.a
        href="#menu"
        ref={scrollBtnRef}
        className="hero-scroll"
        onClick={scrollToMenu}
        data-cursor="hover"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
      >
        <HiArrowDown size={18} />
        <span>Scroll</span>
      </motion.a>
    </section>
  )
}
