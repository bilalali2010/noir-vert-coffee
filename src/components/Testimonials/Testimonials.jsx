import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import useReveal from '../../hooks/useReveal'
import './Testimonials.css'

const QUOTES = [
  {
    text: 'The Gilded Latte is the first coffee that made me slow down and actually taste it.',
    name: 'Maren O.',
    role: 'Regular since 2022',
  },
  {
    text: 'It feels less like a coffee shop and more like a private lounge that happens to serve espresso.',
    name: 'Devon K.',
    role: 'Noir Circle member',
  },
  {
    text: 'I have never seen a cold brew treated with this much reverence. Worth the walk across town.',
    name: 'Priya S.',
    role: 'Weekend regular',
  },
]

export default function Testimonials() {
  const scopeRef = useReveal()
  const [index, setIndex] = useState(0)

  const prev = () => setIndex((i) => (i === 0 ? QUOTES.length - 1 : i - 1))
  const next = () => setIndex((i) => (i === QUOTES.length - 1 ? 0 : i + 1))

  return (
    <section className="section testimonials" ref={scopeRef}>
      <div className="container testimonials-inner">
        <span className="eyebrow reveal">Testimonials</span>
        <div className="testimonials-carousel reveal">
          <button className="testimonials-arrow" onClick={prev} aria-label="Previous testimonial" data-cursor="hover">
            <HiChevronLeft size={22} />
          </button>

          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <p>&ldquo;{QUOTES[index].text}&rdquo;</p>
              <footer>
                <strong>{QUOTES[index].name}</strong>
                <span>{QUOTES[index].role}</span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>

          <button className="testimonials-arrow" onClick={next} aria-label="Next testimonial" data-cursor="hover">
            <HiChevronRight size={22} />
          </button>
        </div>

        <div className="testimonials-dots">
          {QUOTES.map((_, i) => (
            <button
              key={i}
              className={`testimonials-dot ${i === index ? 'is-active' : ''}`}
              onClick={() => setIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
