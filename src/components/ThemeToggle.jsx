import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import styles from './Navbar.module.css'

function savedTheme() {
  try {
    const value = localStorage.getItem('portfolio-theme')
    return value === 'light' || value === 'dark' ? value : null
  } catch { return null }
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme
  document.documentElement.style.colorScheme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#181d19' : '#f7f6f2')
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light')

  useEffect(() => {
    const preference = window.matchMedia('(prefers-color-scheme: dark)')
    const update = () => {
      const next = savedTheme() || (preference.matches ? 'dark' : 'light')
      applyTheme(next)
      setTheme(next)
    }
    const syncStorage = event => { if (event.key === 'portfolio-theme' || event.key === null) update() }
    preference.addEventListener('change', update)
    window.addEventListener('storage', syncStorage)
    return () => {
      preference.removeEventListener('change', update)
      window.removeEventListener('storage', syncStorage)
    }
  }, [])

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    applyTheme(next)
    setTheme(next)
    try { localStorage.setItem('portfolio-theme', next) } catch { /* The current tab still changes when storage is unavailable. */ }
  }

  return <button type="button" className={styles.themeToggle} onClick={toggle} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>{theme === 'dark' ? <Sun size={18} strokeWidth={1.5} /> : <Moon size={18} strokeWidth={1.5} />}</button>
}
