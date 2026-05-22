import styles from './Contact.module.css'

export default function Contact() {
  return (
    <section id="contact" className={styles.sec}>
      <div className="section">
        <div className="section-tag">contact</div>

        <div className={styles.layout}>
          <div className={styles.left}>
            <h2 className={`section-title ${styles.h2}`}>
              Let's Build<br />
              Something<br />
              <span className="glow-cyan">Intelligent.</span>
            </h2>
            <p className={styles.sub}>
              Open to research collaborations, internships, and full-time AI/ML roles.
              Reach out directly — I respond within 24 hours.
            </p>
          </div>

          <div className={styles.right}>
            {[
              { icon: '✉', label: 'Email',    val: 'souravdanyal04@gmail.com',          href: 'mailto:souravdanyal04@gmail.com' },
              { icon: '📞', label: 'Phone',    val: '+91-8629894384',                    href: 'tel:+918629894384' },
              { icon: 'GH', label: 'GitHub',   val: 'github.com/Sourav1331',             href: 'https://github.com/Sourav1331',                        ext: true },
              { icon: 'in', label: 'LinkedIn', val: 'linkedin.com/in/sourav-danyal',     href: 'https://linkedin.com/in/sourav-danyal-a8b35232a',      ext: true },
            ].map(l => (
              <a
                key={l.label}
                href={l.href}
                target={l.ext ? '_blank' : undefined}
                rel={l.ext ? 'noopener noreferrer' : undefined}
                className={styles.clink}
              >
                <span className={styles.clinkIcon}>{l.icon}</span>
                <div>
                  <div className={styles.clinkLabel}>{l.label}</div>
                  <div className={styles.clinkVal}>{l.val}</div>
                </div>
                <span className={styles.arrow}>→</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}