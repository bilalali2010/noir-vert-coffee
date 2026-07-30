/* NOIR VERT COFFEE HOUSE - CONSOLIDATED SOURCE */
// --- REACT COMPONENTS ---
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { HiArrowDown } from 'react-icons/hi'
// Scene removed for background image
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
      <div className="hero-background" />

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
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useReveal from '../../hooks/useReveal'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { value: 14, suffix: '', label: 'Years roasting' },
  { value: 42, suffix: '', label: 'Origin farms' },
  { value: 96, suffix: '%', label: 'Direct trade' },
  { value: 8, suffix: '', label: 'House blends' },
]

const TIMELINE = [
  { year: '2011', text: 'First cart, three blends, one neighborhood.' },
  { year: '2015', text: 'Our own roastery opens behind the flagship bar.' },
  { year: '2019', text: 'Direct-trade partnerships across four countries.' },
  { year: '2024', text: 'Noir Vert becomes a destination, not a stop.' },
]

function Counter({ value, suffix }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    const obj = { val: 0 }
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: value,
        duration: 1.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        onUpdate: () => {
          el.textContent = Math.round(obj.val) + suffix
        },
      })
    })
    return () => ctx.revert()
  }, [value, suffix])

  return <span className="about-stat-value" ref={ref}>0{suffix}</span>
}

export default function About() {
  const scopeRef = useReveal()
  const imgRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imgRef.current, {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about-media',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" className="section about" ref={scopeRef}>
      <div className="container about-grid">
        <div className="about-media reveal">
          <div className="about-media-frame">
            <img src="/about-media.jpg" alt="About Noir Vert" className="about-media-image" ref={imgRef} />
          </div>
          <div className="about-media-badge glass-card">
            <span>Since</span>
            <strong>2011</strong>
          </div>
        </div>

        <div className="about-copy">
          <span className="eyebrow reveal">Our Story</span>
          <h2 className="reveal">A roastery built on patience.</h2>
          <p className="reveal about-lead">
            Noir Vert began as a single cart and a stubborn belief: coffee deserves the
            same care as fine wine. Every bean is sourced direct, roasted in small
            batches, and rested before it ever touches water.
          </p>

          <div className="about-stats reveal">
            {STATS.map((s) => (
              <div className="about-stat" key={s.label}>
                <Counter value={s.value} suffix={s.suffix} />
                <span className="about-stat-label">{s.label}</span>
              </div>
            ))}
          </div>

          <ul className="about-timeline reveal">
            {TIMELINE.map((t) => (
              <li key={t.year}>
                <span className="about-timeline-year">{t.year}</span>
                <span className="about-timeline-text">{t.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
import { useRef } from 'react'
import useReveal from '../../hooks/useReveal'
import './Menu.css'

const ITEMS = [
  {
    name: 'Midnight Espresso',
    desc: 'Double shot, dark cocoa notes, a whisper of smoke.',
    price: '$4.50',
    image: '/menu-1.jpg',
  },
  {
    name: 'Emerald Cold Brew',
    desc: 'Eighteen-hour steep, mint-green undertone, citrus finish.',
    price: '$5.20',
    image: '/menu-2.jpg',
  },
  {
    name: 'Gilded Latte',
    desc: 'Steamed oat milk, turmeric-gold dust, honeycomb sweetness.',
    price: '$5.80',
    image: '/menu-3.jpg',
  },
  {
    name: 'Velvet Mocha',
    desc: 'Single-origin cacao, espresso, cream folded to silk.',
    price: '$6.10',
    image: '/menu-4.jpg',
  },
  {
    name: 'Amber Pour-Over',
    desc: 'Ethiopian light roast, floral and bright, hand-poured.',
    price: '$5.00',
    image: '/menu-5.jpg',
  },
  {
    name: 'Noir Affogato',
    desc: 'Vanilla bean gelato drowned in single-origin espresso.',
    price: '$6.50',
    image: '/menu-6.jpg',
  },
]

function MenuCard({ item }) {
  const cardRef = useRef(null)

  const handleMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    card.style.transform = `perspective(900px) rotateX(${-py * 10}deg) rotateY(${px * 12}deg) translateY(-6px)`
  }

  const handleLeave = () => {
    const card = cardRef.current
    if (card) card.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateY(0)'
  }

  return (
    <article
      className="menu-card glass-card reveal"
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      data-cursor="hover"
    >
      <div className="menu-card-art">
        <img src={item.image} alt={item.name} className="menu-card-img" />
        <span className="menu-card-price">{item.price}</span>
      </div>
      <div className="menu-card-body">
        <h3>{item.name}</h3>
        <p>{item.desc}</p>
      </div>
    </article>
  )
}

export default function Menu() {
  const scopeRef = useReveal()

  return (
    <section id="menu" className="section menu" ref={scopeRef}>
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">The Menu</span>
          <h2>Six pours worth the ritual.</h2>
          <p>Every cup is roasted in small batches and finished by hand at the bar.</p>
        </div>

        <div className="menu-grid">
          {ITEMS.map((item) => (
            <MenuCard item={item} key={item.name} />
          ))}
        </div>
      </div>
    </section>
  )
}
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HiX, HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import useReveal from '../../hooks/useReveal'
import './Gallery.css'

const IMAGES = [
  { src: '/gallery-1.jpg', caption: 'The bar at golden hour' },
  { src: '/gallery-2.jpg', caption: 'Hand-poured single origin' },
  { src: '/gallery-3.jpg', caption: 'Green beans, pre-roast' },
  { src: '/gallery-4.jpg', caption: 'The roasting room' },
  { src: '/gallery-5.jpg', caption: 'Corner reading nook' },
  { src: '/gallery-6.jpg', caption: 'Latte art, table three' },
];

export default function Gallery() {
  const scopeRef = useReveal()
  const [active, setActive] = useState(null)

  const close = () => setActive(null)
  const prev = () => setActive((a) => (a === 0 ? IMAGES.length - 1 : a - 1))
  const next = () => setActive((a) => (a === IMAGES.length - 1 ? 0 : a + 1))

  return (
    <section id="gallery" className="section gallery" ref={scopeRef}>
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Gallery</span>
          <h2>Inside the room.</h2>
          <p>A quiet, low-lit space designed for slow mornings and long conversations.</p>
        </div>

        <div className="gallery-grid">
          {IMAGES.map((img, i) => (
            <button
              key={i}
              className="gallery-item reveal"
              onClick={() => setActive(i)}
              data-cursor="hover"
              aria-label={`Open image: ${img.caption}`}
            >
              <img src={img.src} alt={img.caption} className="gallery-img" />
              <span className="gallery-item-caption">{img.caption}</span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
          >
            <button className="lightbox-close" onClick={close} aria-label="Close gallery">
              <HiX size={26} />
            </button>
            <button className="lightbox-nav lightbox-prev" onClick={prev} aria-label="Previous image">
              <HiChevronLeft size={28} />
            </button>

            <motion.div
              key={active}
              className="lightbox-frame"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <img src={IMAGES[active].src} alt={IMAGES[active].caption} className="lightbox-img" />
              <span className="lightbox-caption">{IMAGES[active].caption}</span>
            </motion.div>

            <button className="lightbox-nav lightbox-next" onClick={next} aria-label="Next image">
              <HiChevronRight size={28} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

/* --- CSS STYLES --- */
/*
.hero {
  position: relative;
  height: 100svh;
  min-height: 620px;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: #07120D;
}

.hero-background {
  position: absolute;
  inset: 0;
  z-index: 1;
  background-image: url('/hero-bg.jpg');
  background-size: cover;
  background-position: center;
}

.hero-vignette {
  position: absolute;
  inset: 0;
  z-index: 2;
  background: linear-gradient(180deg, rgba(7, 18, 13, 0.15) 0%, rgba(7, 18, 13, 0.1) 40%, rgba(7, 18, 13, 0.85) 100%);
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 3;
  pointer-events: none;
}

.hero-content > * {
  pointer-events: auto;
}

.hero-heading {
  margin-top: 1.1rem;
  font-size: var(--fs-hero);
  max-width: 14ch;
}

.hero-line-mask {
  display: block;
  overflow: hidden;
}

.hero-line {
  display: block;
  will-change: transform;
}

.hero-sub {
  margin-top: 1.6rem;
  max-width: 42ch;
  font-size: clamp(1rem, 1.3vw, 1.2rem);
  color: var(--c-cream);
  opacity: 0.75;
}

.hero-cta-row {
  margin-top: 2.4rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.hero-scroll {
  position: absolute;
  right: var(--gutter);
  bottom: 2.6rem;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--fs-small);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--c-gold);
}

@media (max-width: 720px) {
  .hero {
    align-items: flex-end;
    padding-bottom: 4rem;
  }
  .hero-scroll {
    display: none;
  }
  .hero-heading {
    max-width: 11ch;
  }
}
.about {
  background: linear-gradient(180deg, var(--c-bg) 0%, var(--c-bg-soft) 100%);
}

.about-grid {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: clamp(2rem, 6vw, 5rem);
  align-items: center;
}

.about-media {
  position: relative;
}

.about-media-frame {
  position: relative;
  aspect-ratio: 4 / 5;
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--c-glass-border);
  box-shadow: var(--shadow-soft);
}

.about-media-image {
  position: absolute;
  inset: -6% -6%;
  width: 112%;
  height: 112%;
  object-fit: cover;
}

.about-media-badge {
  position: absolute;
  bottom: -1.4rem;
  right: -1.4rem;
  padding: 1rem 1.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.1;
}

.about-media-badge span {
  font-size: var(--fs-small);
  opacity: 0.7;
}

.about-media-badge strong {
  font-family: var(--f-display);
  font-size: 1.5rem;
  color: var(--c-gold);
}

.about-copy h2 {
  margin-top: 0.8rem;
}

.about-lead {
  margin-top: 1.2rem;
  max-width: 52ch;
  opacity: 0.75;
}

.about-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin: 2.4rem 0;
  padding: 1.6rem 0;
  border-top: 1px solid var(--c-line);
  border-bottom: 1px solid var(--c-line);
}

.about-stat {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.about-stat-value {
  font-family: var(--f-display);
  font-size: clamp(1.6rem, 2.6vw, 2.2rem);
  color: var(--c-gold);
}

.about-stat-label {
  font-size: 0.78rem;
  opacity: 0.65;
  letter-spacing: 0.02em;
}

.about-timeline {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.about-timeline li {
  display: flex;
  gap: 1.2rem;
  align-items: baseline;
  padding-left: 1.2rem;
  border-left: 1px solid var(--c-glass-border);
}

.about-timeline-year {
  font-family: var(--f-display);
  color: var(--c-emerald);
  min-width: 3.5rem;
}

.about-timeline-text {
  opacity: 0.75;
  font-size: 0.95rem;
}

@media (max-width: 900px) {
  .about-grid {
    grid-template-columns: 1fr;
  }
  .about-stats {
    grid-template-columns: repeat(2, 1fr);
  }
  .about-media-badge {
    right: 1rem;
  }
}
.menu {
  background: var(--c-bg);
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.6rem;
}

.menu-card {
  overflow: hidden;
  transition: transform 0.25s var(--ease-out), box-shadow 0.25s var(--ease-out);
  will-change: transform;
}

.menu-card:hover {
  box-shadow: var(--shadow-soft), var(--shadow-gold);
}

.menu-card-art {
  position: relative;
  height: 190px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 1rem 1.2rem;
  overflow: hidden;
}

.menu-card-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s var(--ease-out);
}

.menu-card:hover .menu-card-img {
  transform: scale(1.1);
}

.menu-card-art::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 30% 20%, rgba(217, 182, 111, 0.18), transparent 60%);
}

.menu-card-price {
  position: relative;
  z-index: 1;
  font-family: var(--f-display);
  font-size: 1.2rem;
  color: var(--c-gold);
  background: rgba(7, 18, 13, 0.5);
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  border: 1px solid var(--c-glass-border);
}

.menu-card-body {
  padding: 1.4rem 1.5rem 1.7rem;
}

.menu-card-body h3 {
  font-size: 1.25rem;
}

.menu-card-body p {
  margin-top: 0.6rem;
  font-size: 0.92rem;
  color: var(--c-cream);
  opacity: 0.68;
}

@media (max-width: 1000px) {
  .menu-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 620px) {
  .menu-grid {
    grid-template-columns: 1fr;
  }
}
.gallery {
  background: var(--c-bg-soft);
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.gallery-item {
  position: relative;
  aspect-ratio: 4 / 3;
  border-radius: var(--radius-md);
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  padding: 1rem;
  transition: transform 0.4s var(--ease-out);
}

.gallery-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s var(--ease-out);
}

.gallery-item:hover .gallery-img {
  transform: scale(1.1);
}

.gallery-item:nth-child(3n+2) {
  aspect-ratio: 4 / 5;
}

.gallery-item::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 50%, rgba(0, 0, 0, 0.65) 100%);
  opacity: 0;
  transition: opacity var(--dur-fast);
}

.gallery-item:hover {
  transform: scale(1.03);
}

.gallery-item:hover::after {
  opacity: 1;
}

.gallery-item-caption {
  position: relative;
  z-index: 1;
  color: var(--c-cream);
  font-size: 0.85rem;
  opacity: 0;
  transform: translateY(8px);
  transition: all var(--dur-fast) var(--ease-out);
  text-align: left;
}

.gallery-item:hover .gallery-item-caption {
  opacity: 1;
  transform: translateY(0);
}

.lightbox {
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: rgba(7, 18, 13, 0.94);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-frame {
  position: relative;
  width: min(80vw, 900px);
  aspect-ratio: 16 / 10;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: flex-end;
  padding: 2rem;
  font-family: var(--f-display);
  font-size: 1.4rem;
  border: 1px solid var(--c-glass-border);
  overflow: hidden;
}

.lightbox-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.lightbox-caption {
  position: relative;
  z-index: 1;
  color: var(--c-cream);
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
}

.lightbox-close {
  position: absolute;
  top: 2rem;
  right: 2rem;
  color: var(--c-cream);
}

.lightbox-nav {
  color: var(--c-cream);
  padding: 0.8rem;
}

.lightbox-prev {
  position: absolute;
  left: clamp(1rem, 4vw, 3rem);
}

.lightbox-next {
  position: absolute;
  right: clamp(1rem, 4vw, 3rem);
}

@media (max-width: 900px) {
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 560px) {
  .gallery-grid {
    grid-template-columns: 1fr;
  }
  .lightbox-frame {
    width: 88vw;
  }
}
*/
