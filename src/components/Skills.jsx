import { useEffect, useRef } from 'react'
import { SKILLS, SKILL_LEVELS } from '../data'
import Constellation from './Constellation'
import styles from './Skills.module.css'

const LEVEL_CONFIG = {
  'Beginner':              { color: '#fb923c', width: '30%',  dots: 1 },
  'Beginner–Intermediate': { color: '#f59e0b', width: '55%',  dots: 2 },
  'Intermediate':          { color: '#34d399', width: '75%',  dots: 3 },
  'Advanced':              { color: '#38bdf8', width: '95%',  dots: 4 },
}

export default function Skills() {
  const ref = useRef(null)
  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal') || []
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return
        e.target.classList.add('visible')
        io.unobserve(e.target)
      })
    }, { threshold: 0.12 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section id="skills" ref={ref} className={styles.sec}>
      <div className="section">
        <div className="section-tag">skills</div>
        <h2 className="section-title reveal">Technical Arsenal</h2>

        {/* Constellation */}
        <div className={`${styles.constellationWrap} reveal`}>
          <div className={styles.constellationLabel}>// hover any node to explore skills</div>
          <Constellation />
        </div>

        {/* Chip grid */}
        <div className={styles.grid}>
          {SKILLS.map(s => (
            <div className={`${styles.card} ${s.accent ? styles.accent : ''} reveal`} key={s.category}>
              <div className={styles.cardHead}>
                <span className={styles.icon}>{s.icon}</span>
                <span className={styles.catName}>{s.category}</span>
              </div>
              <div className={styles.chips}>
                {s.items.map(item => (
                  <span className={`${styles.chip} ${s.accent ? styles.chipAccent : ''}`} key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Honest skill level table */}
        <div className={`${styles.levelSection} reveal`}>
          <div className={styles.levelTitle}>// skill levels — self assessed based on projects & coursework</div>
          <div className={styles.levelTable}>
            <div className={styles.tableHead}>
              <span>Skill</span>
              <span>Level</span>
              <span className={styles.hideSmall}>Based on</span>
              <span>Scale</span>
            </div>
            {SKILL_LEVELS.map(s => {
              const cfg = LEVEL_CONFIG[s.level] || LEVEL_CONFIG['Beginner']
              return (
                <div className={styles.tableRow} key={s.name}>
                  <span className={styles.skillName}>{s.name}</span>
                  <span className={styles.levelBadge} style={{ color: cfg.color, borderColor: cfg.color + '44', background: cfg.color + '11' }}>
                    {s.level}
                  </span>
                  <span className={`${styles.skillNote} ${styles.hideSmall}`}>{s.note}</span>
                  <div className={styles.scaleTrack}>
                    <div className={styles.scaleFill} style={{ '--fill-color': cfg.color, '--fill-width': cfg.width }} />
                  </div>
                </div>
              )
            })}
            {/* Legend */}
            <div className={styles.legend}>
              {Object.entries(LEVEL_CONFIG).map(([label, cfg]) => (
                <div className={styles.legendItem} key={label}>
                  <span className={styles.legendDot} style={{ background: cfg.color }} />
                  <span style={{ color: cfg.color }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}