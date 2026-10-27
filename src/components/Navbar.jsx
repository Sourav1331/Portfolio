import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Menu, MessageCircle, X } from 'lucide-react'
import styles from './Navbar.module.css'
import ThemeToggle from './ThemeToggle'

const links = [
  { href: 'projects', label: 'Work' },
  { href: 'about', label: 'About' },
  { href: 'skills', label: 'Expertise' },
]

export default function Navbar({ onTerminal }) {
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)
  const menuRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id) })
    }, { rootMargin: '-15% 0px -60% 0px' })
    document.querySelectorAll('main > section[id]').forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const closeOutside = event => { if (!navRef.current?.contains(event.target)) setMenuOpen(false) }
    const onKey = event => {
      if (event.key === 'Escape') { setMenuOpen(false); menuRef.current?.focus() }
    }
    const onResize = () => { if (window.innerWidth > 760) setMenuOpen(false) }
    document.addEventListener('pointerdown', closeOutside)
    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.removeEventListener('pointerdown', closeOutside)
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [menuOpen])

  return (
    <header className={styles.header} ref={navRef}>
      <nav className={`container ${styles.nav}`} aria-label="Main navigation">
        <a href="#hero" className={styles.brand} onClick={() => setMenuOpen(false)} aria-label="Sourav Danyal, home">
          <span className={styles.monogram}>sd<span>.</span></span>
          <span className={styles.name}>Sourav Danyal<span>AI & Data Science</span></span>
        </a>
        <div className={`${styles.links} ${menuOpen ? styles.open : ''}`} id="navigation-links">
          {links.map((link, index) => (
            <a key={link.href} href={`#${link.href}`} className={active === link.href ? styles.active : ''} aria-current={active === link.href ? 'location' : undefined} onClick={() => setMenuOpen(false)}>
              <span className={styles.linkNumber}>0{index + 1}</span>{link.label}
            </a>
          ))}
          <a href="#contact" className={styles.mobileContact} onClick={() => setMenuOpen(false)}>Let’s talk <ArrowUpRight size={15} /></a>
        </div>
        <div className={styles.actions}>
          <ThemeToggle />
          <button className={styles.assistant} onClick={() => { setMenuOpen(false); onTerminal() }} aria-label="Ask Sourav’s AI assistant">
            <MessageCircle size={16} strokeWidth={1.6} /><span>Ask AI</span>
          </button>
          <a className={styles.contact} href="#contact">Let’s talk <ArrowUpRight size={15} /></a>
          <button ref={menuRef} className={styles.menuButton} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="navigation-links" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </nav>
    </header>
  )
}
