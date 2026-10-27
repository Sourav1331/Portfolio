import { ArrowUp } from 'lucide-react'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <a href="#hero" className={styles.brand} aria-label="Sourav Danyal, back to top">sd<span>.</span></a>
        <span>© {new Date().getFullYear()} Sourav Danyal</span>
        <span className={styles.note}>Built with intention. Always a work in progress.</span>
        <a className={styles.back} href="#hero">Back to top <ArrowUp size={13} /></a>
      </div>
    </footer>
  )
}
