import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import './Loader.css'

export default function Loader({ onFinish }) {
  const [progress, setProgress] = useState(0)
  const [hidden, setHidden] = useState(false)
  const wrapRef = useRef(null)
  const beanRef = useRef(null)

  useEffect(() => {
    let raf
    const start = performance.now()
    const DURATION = 2200

    const tick = (now) => {
      const elapsed = now - start
      const pct = Math.min(100, Math.round((elapsed / DURATION) * 100))
      setProgress(pct)
      if (pct < 100) {
        raf = requestAnimationFrame(tick)
      } else {
        finish()
      }
    }
    raf = requestAnimationFrame(tick)

    function finish() {
      gsap.to(wrapRef.current, {
        yPercent: -100,
        duration: 1,
        ease: 'power4.inOut',
        delay: 0.25,
        onComplete: () => {
          setHidden(true)
          onFinish?.()
        },
      })
    }

    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    gsap.to(beanRef.current, {
      rotate: 360,
      duration: 3,
      repeat: -1,
      ease: 'none',
    })
  }, [])

  if (hidden) return null

  return (
    <div className="loader" ref={wrapRef} role="status" aria-live="polite">
      <div className="loader-inner">
        <svg
          ref={beanRef}
          className="loader-bean"
          viewBox="0 0 100 140"
          width="72"
          height="100"
          aria-hidden="true"
        >
          <path
            d="M50 4C24 4 4 34 4 70s20 66 46 66 46-30 46-66S76 4 50 4Z"
            fill="none"
            stroke="#D9B66F"
            strokeWidth="3"
          />
          <path
            d="M50 12C38 34 38 106 50 128"
            fill="none"
            stroke="#D9B66F"
            strokeWidth="3"
          />
        </svg>
        <p className="loader-word">Noir&nbsp;Vert</p>
        <div className="loader-bar">
          <div className="loader-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="loader-pct">{progress}%</span>
      </div>
    </div>
  )
}
