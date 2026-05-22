import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.logo}>[SD]_</span>
        <span className={styles.copy}>© 2025 Sourav Danyal · AI & Data Science Engineer</span>
        <div className={styles.socials}>
          <a href="https://github.com/Sourav1331" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://linkedin.com/in/sourav-danyal-a8b35232a" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
    </footer>
  )
}
