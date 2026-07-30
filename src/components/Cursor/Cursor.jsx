import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './Cursor.css'

/**
 * Custom ambient cursor: a soft gold ring that trails the pointer
 * and expands over interactive elements. Disabled on touch devices.
 */
export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    let ringX = window.innerWidth / 2
    let ringY = window.innerHeight / 2

    const move = (e) => {
      gsap.set(dot, { x: e.clientX, y: e.clientY })
      ringX = e.clientX
      ringY = e.clientY
    }

    gsap.ticker.add(() => {
      gsap.set(ring, { x: ringX, y: ringY })
    })

    const onEnter = () => ring.classList.add('is-active')
    const onLeave = () => ring.classList.remove('is-active')

    window.addEventListener('mousemove', move)

    const interactive = document.querySelectorAll('a, button, [data-cursor="hover"]')
    interactive.forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      window.removeEventListener('mousemove', move)
      interactive.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <>
      <div className="cursor-dot" ref={dotRef} aria-hidden="true" />
      <div className="cursor-ring" ref={ringRef} aria-hidden="true" />
    </>
  )
}
