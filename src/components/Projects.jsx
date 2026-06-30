import { useEffect, useRef } from 'react'
import { PROJECTS } from '../data'
import StackVisualizer from './StackVisualizer'
import styles from './Projects.module.css'

const TAG_COLORS = { cyan: styles.tagCyan, green: styles.tagGreen, orange: styles.tagOrange }

export default function Projects() {
  const ref = useRef(null)
  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal') || []
    const io = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if (!e.isIntersecting) return
        setTimeout(() => e.target.classList.add('visible'), i * 80)
        io.unobserve(e.target)
      })
    }, { threshold: 0.1 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section id="projects" ref={ref} className={styles.sec}>
      <div className="section">
        <div className="section-tag">projects</div>
        <h2 className="section-title reveal">Featured Work</h2>
        <div className={styles.grid}>
          {PROJECTS.map(p => (
            <article className={`${styles.card} ${p.featured ? styles.featured : ''} reveal`} key={p.id}>
              {p.featured && <div className={styles.featTag}>⭐ Featured</div>}
              <div className={styles.inner}>
                <div className={styles.cardTop}>
                  <span className={styles.num}>0{p.id}</span>
                  <div className={styles.tags}>
                    {p.tags.map(t => (
                      <span className={`${styles.tag} ${TAG_COLORS[p.tagColor]}`} key={t}>{t}</span>
                    ))}
                  </div>
                </div>
                <div className={styles.emoji}>{p.emoji}</div>
                <h3 className={styles.title}>{p.title}</h3>
                <p className={styles.desc}>{p.desc}</p>
                <ul className={styles.features}>
                  {p.features.map(f => <li key={f}>{f}</li>)}
                </ul>
                {/* Tech Stack Visualizer */}
                {p.stack && <StackVisualizer stack={p.stack} />}
                <div className={styles.footer}>
                  <a
                    href={p.github || '#projects'}
                    target={p.github ? '_blank' : undefined}
                    rel={p.github ? 'noopener noreferrer' : undefined}
                    aria-disabled={!p.github}
                    onClick={e => { if (!p.github) e.preventDefault() }}
                    className={`${styles.link} ${!p.github ? styles.disabledLink : ''}`}
                  >
                    GitHub
                  </a>
                  <a
                    href={p.live || '#projects'}
                    target={p.live ? '_blank' : undefined}
                    rel={p.live ? 'noopener noreferrer' : undefined}
                    aria-disabled={!p.live}
                    onClick={e => { if (!p.live) e.preventDefault() }}
                    className={`${styles.link} ${styles.liveLink} ${!p.live ? styles.disabledLink : ''}`}
                  >
                    Live Demo
                  </a>
                </div>
              </div>
              <div className={`${styles.glow} ${p.featured ? styles.glowFeat : ''}`} />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
