import { HiOutlineSparkles, HiOutlineGift, HiOutlineStar } from 'react-icons/hi'
import useReveal from '../../hooks/useReveal'
import './Rewards.css'

const TIERS = [
  {
    icon: HiOutlineSparkles,
    name: 'Sprout',
    perk: 'Earn 1 bean per dollar. Free drink at 100 beans.',
    price: 'Free to join',
  },
  {
    icon: HiOutlineStar,
    name: 'Bloom',
    perk: 'Double beans, early access to seasonal roasts.',
    price: '$8 / month',
    featured: true,
  },
  {
    icon: HiOutlineGift,
    name: 'Noir Circle',
    perk: 'Private tastings, monthly bag of house reserve.',
    price: '$22 / month',
  },
]

export default function Rewards() {
  const scopeRef = useReveal()

  return (
    <section id="rewards" className="section rewards" ref={scopeRef}>
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Rewards</span>
          <h2>Membership, poured slowly.</h2>
          <p>Three tiers, each one deepening the relationship between you and the roast.</p>
        </div>

        <div className="rewards-grid">
          {TIERS.map((tier) => (
            <div
              className={`rewards-card glass-card reveal ${tier.featured ? 'is-featured' : ''}`}
              key={tier.name}
            >
              {tier.featured && <span className="rewards-badge">Most Loved</span>}
              <tier.icon size={30} color="var(--c-gold)" />
              <h3>{tier.name}</h3>
              <p>{tier.perk}</p>
              <span className="rewards-price">{tier.price}</span>
              <button className="btn btn-ghost rewards-btn" data-cursor="hover">
                Join {tier.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
