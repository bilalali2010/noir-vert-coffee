import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HiX, HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import useReveal from '../../hooks/useReveal'
import './Gallery.css'

const IMAGES = [
  { tint: 'linear-gradient(150deg,#173424,#081410)', caption: 'The bar at golden hour' },
  { tint: 'linear-gradient(150deg,#2d2010,#0e0904)', caption: 'Hand-poured single origin' },
  { tint: 'linear-gradient(150deg,#0f2a1e,#050c09)', caption: 'Green beans, pre-roast' },
  { tint: 'linear-gradient(150deg,#3a2413,#100a05)', caption: 'The roasting room' },
  { tint: 'linear-gradient(150deg,#122c20,#060f0a)', caption: 'Corner reading nook' },
  { tint: 'linear-gradient(150deg,#241a0c,#0b0805)', caption: 'Latte art, table three' },
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
              style={{ background: img.tint }}
              onClick={() => setActive(i)}
              data-cursor="hover"
              aria-label={`Open image: ${img.caption}`}
            >
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
              style={{ background: IMAGES[active].tint }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <span>{IMAGES[active].caption}</span>
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
