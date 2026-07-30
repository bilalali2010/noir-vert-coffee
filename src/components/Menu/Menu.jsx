import { useRef } from 'react'
import useReveal from '../../hooks/useReveal'
import './Menu.css'

const ITEMS = [
  {
    name: 'Midnight Espresso',
    desc: 'Double shot, dark cocoa notes, a whisper of smoke.',
    price: '$4.50',
    tint: 'linear-gradient(160deg, #2a1810, #0e0906)',
  },
  {
    name: 'Emerald Cold Brew',
    desc: 'Eighteen-hour steep, mint-green undertone, citrus finish.',
    price: '$5.20',
    tint: 'linear-gradient(160deg, #10301f, #061410)',
  },
  {
    name: 'Gilded Latte',
    desc: 'Steamed oat milk, turmeric-gold dust, honeycomb sweetness.',
    price: '$5.80',
    tint: 'linear-gradient(160deg, #4a3418, #1a1006)',
  },
  {
    name: 'Velvet Mocha',
    desc: 'Single-origin cacao, espresso, cream folded to silk.',
    price: '$6.10',
    tint: 'linear-gradient(160deg, #331a12, #100804)',
  },
  {
    name: 'Amber Pour-Over',
    desc: 'Ethiopian light roast, floral and bright, hand-poured.',
    price: '$5.00',
    tint: 'linear-gradient(160deg, #2f2210, #100c04)',
  },
  {
    name: 'Noir Affogato',
    desc: 'Vanilla bean gelato drowned in single-origin espresso.',
    price: '$6.50',
    tint: 'linear-gradient(160deg, #1c150e, #070503)',
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
      <div className="menu-card-art" style={{ background: item.tint }}>
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
