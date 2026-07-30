import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Fades + slides children with the `.reveal` class into view
 * as they cross the viewport, staggered in DOM order.
 */
export default function useReveal(deps = []) {
  const scopeRef = useRef(null)

  useEffect(() => {
    const scope = scopeRef.current
    if (!scope) return

    const targets = scope.classList.contains('reveal')
      ? [scope]
      : scope.querySelectorAll('.reveal')

    const ctx = gsap.context(() => {
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: scope,
          start: 'top 82%',
          once: true,
        },
      })
    }, scope)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return scopeRef
}
