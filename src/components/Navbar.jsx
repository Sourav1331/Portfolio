import { useState, useEffect } from 'react'
import { NAV_LINKS } from '../data'
import styles from './Navbar.module.css'

export default function Navbar({ onTerminal }) {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive]     = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setActive(id)
    setMenuOpen(false)
  }

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        {/* Logo */}
        <button className={styles.logo} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className={styles.bracket}>[</span>SD<span className={styles.bracket}>]</span>
          <span className={styles.blink}>_</span>
        </button>

        {/* Desktop links */}
        <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          {NAV_LINKS.map(l => (
            <li key={l.href}>
              <button
                className={`${styles.link} ${active === l.href ? styles.activeLink : ''}`}
                onClick={() => scrollTo(l.href)}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <div className={styles.right}>
          <button className={styles.aiBtn} onClick={onTerminal}>
            <span>✦</span> Ask AI
          </button>
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(p => !p)}
            aria-label="Toggle menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </nav>
  )
}
