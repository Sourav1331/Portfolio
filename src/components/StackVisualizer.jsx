import { useState } from 'react'
import styles from './StackVisualizer.module.css'

const TYPE_COLORS = {
  data:      { label: 'Data Input',  color: '#a78bfa' },
  process:   { label: 'Processing',  color: '#38bdf8' },
  model:     { label: 'Model',       color: '#f59e0b' },
  framework: { label: 'Framework',   color: '#34d399' },
  output:    { label: 'Output',      color: '#fb923c' },
  api:       { label: 'API / UI',    color: '#f472b6' },
}

export default function StackVisualizer({ stack }) {
  const [active, setActive] = useState(null)

  return (
    <div className={styles.wrap}>
      <div className={styles.label}>// tech stack flow</div>
      <div className={styles.flow}>
        {stack.map((step, i) => {
          const meta = TYPE_COLORS[step.type] || TYPE_COLORS.process
          const isActive = active === i
          return (
            <div key={i} className={styles.stepWrap}>
              <div
                className={`${styles.step} ${isActive ? styles.stepActive : ''}`}
                style={{ '--accent': meta.color }}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
              >
                <div className={styles.stepType} style={{ color: meta.color }}>{meta.label}</div>
                <div className={styles.stepLabel}>{step.label}</div>
              </div>
              {i < stack.length - 1 && (
                <div className={`${styles.arrow} ${isActive ? styles.arrowActive : ''}`}
                  style={{ '--accent': meta.color }}>
                  →
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}