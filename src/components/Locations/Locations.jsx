import { HiOutlineLocationMarker, HiOutlineClock } from 'react-icons/hi'
import useReveal from '../../hooks/useReveal'
import './Locations.css'

const LOCATIONS = [
  { city: 'Riverside District', address: '214 Marlowe Ave', hours: '7am – 7pm daily' },
  { city: 'Old Mill Quarter', address: '58 Founders Lane', hours: '7am – 9pm daily' },
  { city: 'Harbor Row', address: '9 Quayside Walk', hours: '6:30am – 6pm daily' },
]

export default function Locations() {
  const scopeRef = useReveal()

  return (
    <section id="locations" className="section locations" ref={scopeRef}>
      <div className="container locations-grid">
        <div>
          <span className="eyebrow reveal">Locations</span>
          <h2 className="reveal">Find your corner.</h2>
          <p className="reveal locations-lead">
            Three rooms, one standard. Each roastery keeps its own rhythm, but the same
            slow-poured philosophy.
          </p>

          <ul className="locations-list reveal">
            {LOCATIONS.map((loc) => (
              <li key={loc.city} className="locations-item">
                <h3>{loc.city}</h3>
                <p><HiOutlineLocationMarker /> {loc.address}</p>
                <p><HiOutlineClock /> {loc.hours}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="locations-map reveal glass-card" role="img" aria-label="Stylised map showing three Noir Vert locations">
          <div className="locations-map-grid" />
          <span className="locations-pin" style={{ top: '32%', left: '38%' }} />
          <span className="locations-pin" style={{ top: '58%', left: '62%' }} />
          <span className="locations-pin" style={{ top: '68%', left: '28%' }} />
          <p className="locations-map-caption">Map preview — live map loads at checkout</p>
        </div>
      </div>
    </section>
  )
}
