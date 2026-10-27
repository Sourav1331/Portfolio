import { useEffect, useRef } from 'react'
import { Mountain } from 'lucide-react'
import styles from './About.module.css'

const clamp = value => Math.min(1, Math.max(0, value))
const contourPath = index => `M-20 ${180 + index * 6} Q45 ${120 + index * 7} 100 ${139 + index * 4} T200 ${62 + index * 9} Q220 ${24 + index * 12} 248 ${78 + index * 8} T320 ${99 + index * 7} Q355 ${25 + index * 12} 390 ${84 + index * 8} T480 ${115 + index * 6}`
const contours = Array.from({ length: 13 }, (_, index) => ({
  path: contourPath(index),
  depth: .35 + index * .065,
  start: index * .018,
  opacity: .9 - index * .045,
}))
const motionProperties = ['--contour-draw', '--pan-x', '--pan-y', '--relief', '--sun-x', '--sun-y', '--sun-rotation', '--ridge-travel', '--trace-opacity']

export default function MountainLandscape() {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!('IntersectionObserver' in window)) return
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let active = false

    // Update only on scroll/resize near the artwork; no continuous render loop.
    const render = () => {
      frame = 0
      if (!active || preference.matches || document.hidden) return
      const bounds = element.getBoundingClientRect()
      const progress = clamp((window.innerHeight - bounds.top) / (window.innerHeight + bounds.height))
      const travel = progress - .5
      const trace = clamp((progress - .15) / .7)
      const values = {
        '--contour-draw': (clamp((progress - .04) / .28) * 1.25).toFixed(4),
        '--pan-x': `${(-travel * 24).toFixed(2)}px`,
        '--pan-y': `${(-travel * 30).toFixed(2)}px`,
        '--relief': (travel * .18).toFixed(4),
        '--sun-x': `${(travel * 34).toFixed(2)}px`,
        '--sun-y': `${(-travel * 48).toFixed(2)}px`,
        '--sun-rotation': `${(progress * 150).toFixed(2)}deg`,
        '--ridge-travel': (1.06 - trace * 1.12).toFixed(4),
        '--trace-opacity': (Math.sin(trace * Math.PI) * .8).toFixed(4),
      }
      Object.entries(values).forEach(([property, value]) => element.style.setProperty(property, value))
      element.dataset.scrollMotion = 'true'
    }

    const schedule = () => {
      if (!frame && active && !document.hidden && !preference.matches) frame = requestAnimationFrame(render)
    }

    const setActive = next => {
      active = next
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      cancelAnimationFrame(frame)
      frame = 0
      if (active) {
        window.addEventListener('scroll', schedule, { passive: true })
        window.addEventListener('resize', schedule, { passive: true })
        schedule()
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      setActive(entry.isIntersecting && !preference.matches)
    }, { rootMargin: '100px 0px' })

    const syncPreference = () => {
      observer.disconnect()
      setActive(false)
      delete element.dataset.scrollMotion
      motionProperties.forEach(property => element.style.removeProperty(property))
      if (!preference.matches) observer.observe(element)
    }

    const syncVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame)
        frame = 0
      } else schedule()
    }

    syncPreference()
    preference.addEventListener('change', syncPreference)
    document.addEventListener('visibilitychange', syncVisibility)
    return () => {
      observer.disconnect()
      setActive(false)
      preference.removeEventListener('change', syncPreference)
      document.removeEventListener('visibilitychange', syncVisibility)
      delete element.dataset.scrollMotion
      motionProperties.forEach(property => element.style.removeProperty(property))
    }
  }, [])

  return (
    <figure ref={ref} className={styles.landscape} aria-label="An illustration of the mountains of Himachal Pradesh that responds to scrolling">
      <div className={styles.landscapeTop}><Mountain size={16} strokeWidth={1.3} /><span className="eyebrow">Himachal Pradesh, India</span></div>
      <svg className={styles.landscapeSvg} viewBox="0 0 460 190" fill="none" aria-hidden="true">
        <g className={styles.sun}>
          <circle cx="118" cy="57" r="20" stroke="currentColor" strokeWidth=".7" />
          <circle className={styles.sunHalo} cx="118" cy="57" r="27" stroke="currentColor" strokeWidth=".8" strokeDasharray="1 9" />
        </g>
        {contours.map((contour, index) => <path key={index} className={styles.contour} pathLength="1" style={{ '--depth': contour.depth, '--stroke-start': contour.start }} d={contour.path} stroke="currentColor" strokeWidth=".7" opacity={contour.opacity} />)}
        <path className={styles.ridgeTrace} pathLength="1" d={contours[0].path} strokeWidth="1.2" strokeLinecap="round" />
      </svg>
      <figcaption className={styles.landscapeBottom}><span>A little perspective, from the mountains.</span><span aria-hidden="true">↗</span></figcaption>
    </figure>
  )
}
