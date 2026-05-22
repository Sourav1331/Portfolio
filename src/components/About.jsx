import { useEffect, useRef } from 'react'
import { TIMELINE } from '../data'
import styles from './About.module.css'

export default function About() {
  const ref = useRef(null)
  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal') || []
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) } })
    }, { threshold: 0.15 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section id="about" ref={ref}>
      <div className="section">
        <div className="section-tag">about</div>
        <div className={styles.layout}>
          {/* Left */}
          <div className={`${styles.left} reveal`}>
            <div className={styles.avatar}>
              <div className={styles.ring1} />
              <div className={styles.ring2} />
              <div className={styles.core}><span>SD</span></div>
              <span className={styles.badge1}>UGC NET ✓</span>
              <span className={styles.badge2}>MCA</span>
            </div>
            <div className={styles.facts}>
              {[
                ['Location', 'Himachal Pradesh, IN'],
                ['Degree',   'MCA · 2024–Present'],
                ['College',  'Central Uni. of HP'],
                ['Email',    'souravdanyal04@gmail.com'],
              ].map(([k,v]) => (
                <div className={styles.factRow} key={k}>
                  <span className={styles.factKey}>{k}</span>
                  <span className={styles.factVal}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className={styles.right}>
            <h2 className={`section-title reveal`}>
              Building the Future,<br />
              <span className="glow-cyan">One Model at a Time.</span>
            </h2>
            <p className={`${styles.para} reveal`}>
              I'm a <strong>Data Science & AI Engineer</strong> pursuing my MCA at Central University of Himachal Pradesh.
              My work spans the full AI lifecycle — from raw data exploration to deploying production-ready ML models and RAG-powered LLM applications.
            </p>
            <p className={`${styles.para} reveal`}>
              I qualified <strong>UGC NET (Computer Science)</strong> in June 2025, making me eligible for PhD admission — a testament to my deep theoretical grounding alongside hands-on engineering. I believe AI must solve real problems, not just benchmark well.
            </p>

            <div className={`${styles.timeline} reveal`}>
              {TIMELINE.map((t, i) => (
                <div className={styles.tlItem} key={i}>
                  <div className={styles.tlMarker}>
                    <div className={styles.tlDot} />
                    {i < TIMELINE.length - 1 && <div className={styles.tlLine} />}
                  </div>
                  <div className={styles.tlBody}>
                    <div className={styles.tlPeriod}>{t.period}</div>
                    <div className={styles.tlTitle}>{t.title}</div>
                    <div className={styles.tlSub}>{t.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
