import { useEffect, useRef } from 'react'
import { CERTIFICATIONS } from '../data'
import styles from './Certifications.module.css'

const COLOR_MAP = {
  cyan:   { border: 'rgba(56,189,248,0.35)',  bg: 'rgba(56,189,248,0.06)',  text: '#38bdf8' },
  green:  { border: 'rgba(52,211,153,0.35)',  bg: 'rgba(52,211,153,0.06)',  text: '#34d399' },
  purple: { border: 'rgba(167,139,250,0.35)', bg: 'rgba(167,139,250,0.06)', text: '#a78bfa' },
}

export default function Certifications() {
  const ref = useRef(null)
  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal') || []
    const io = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if (!e.isIntersecting) return
        setTimeout(() => e.target.classList.add('visible'), i * 120)
        io.unobserve(e.target)
      })
    }, { threshold: 0.15 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section id="certs" ref={ref} className={styles.sec}>
      <div className="section">
        <div className="section-tag">certifications</div>
        <h2 className="section-title reveal">Credentials</h2>

        <div className={styles.grid}>
          {CERTIFICATIONS.map(cert => {
            const col = COLOR_MAP[cert.color] || COLOR_MAP.cyan
            return (
              <div
                className={`${styles.card} reveal`}
                key={cert.id}
                style={{ '--cert-border': col.border, '--cert-bg': col.bg, '--cert-text': col.text }}
              >
                {/* Top bar */}
                <div className={styles.topBar} style={{ background: col.text }} />

                <div className={styles.inner}>
                  <div className={styles.header}>
                    <span className={styles.badge}>{cert.badge}</span>
                    <div className={styles.verifiedBadge}>
                      <span className={styles.verifiedDot} />
                      Verified
                    </div>
                  </div>

                  <h3 className={styles.title}>{cert.title}</h3>

                  <div className={styles.meta}>
                    <span className={styles.issuer}>{cert.issuer}</span>
                    <span className={styles.sep}>·</span>
                    <span className={styles.date}>{cert.date}</span>
                  </div>

                  <div className={styles.skills}>
                    {cert.skills.map(s => (
                      <span className={styles.skillTag} key={s} style={{ color: col.text, borderColor: col.border, background: col.bg }}>
                        {s}
                      </span>
                    ))}
                  </div>

                  <a
                    href={cert.verify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.verifyBtn}
                    style={{ color: col.text, borderColor: col.border }}
                  >
                    View Credential →
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}