import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Sets up Lenis smooth scrolling and syncs it with GSAP's
 * ScrollTrigger so scroll-based animations stay in lockstep
 * with the smoothed scroll position.
 */
export default function useLenis() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const lenis = new Lenis({
      duration: prefersReduced ? 0 : 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !prefersReduced,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    window.__lenis = lenis

    return () => {
      lenis.destroy()
      window.__lenis = null
    }
  }, [])
}
