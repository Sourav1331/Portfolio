import { useEffect, useState } from 'react'
import styles from './SectionProgress.module.css'

const SECTIONS = [
  { id: 'hero',     label: 'Home'    },
  { id: 'about',    label: 'About'   },
  { id: 'skills',   label: 'Skills'  },
  { id: 'projects', label: 'Projects'},
  { id: 'certs',    label: 'Certs'   },
  { id: 'contact',  label: 'Contact' },
]

export default function SectionProgress() {
  const [active, setActive] = useState('hero')
  const [scrollPct, setScrollPct] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      // Overall scroll %
      const total = document.documentElement.scrollHeight - window.innerHeight
      setScrollPct(total > 0 ? (window.scrollY / total) * 100 : 0)

      // Active section
      let current = 'hero'
      SECTIONS.forEach(s => {
        const el = document.getElementById(s.id)
        if (el && window.scrollY >= el.offsetTop - window.innerHeight / 2) {
          current = s.id
        }
      })
      setActive(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className={styles.wrap}>
      {/* Thin overall progress line */}
      <div className={styles.track}>
        <div className={styles.trackFill} style={{ height: `${scrollPct}%` }} />
      </div>

      {/* Section dots */}
      <div className={styles.dots}>
        {SECTIONS.map(s => (
          <button
            key={s.id}
            className={`${styles.dot} ${active === s.id ? styles.dotActive : ''}`}
            onClick={() => scrollTo(s.id)}
            title={s.label}
          >
            <span className={styles.dotInner} />
            <span className={styles.dotLabel}>{s.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}