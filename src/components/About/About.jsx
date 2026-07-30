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
            <div className="about-media-image" ref={imgRef} />
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
