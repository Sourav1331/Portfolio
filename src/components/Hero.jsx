import { useEffect, useRef, useState } from 'react'
import styles from './Hero.module.css'

const ROLES = ['AI Engineer', 'Data Scientist', 'ML Engineer', 'RAG Specialist', 'Deep Learning Dev']

const STATS = [
  { val: '3+', label: 'ML Projects' },
  { val: '5+', label: 'Frameworks' },
  { val: '1',  label: 'UGC NET' },
]

const FOCUS = [
  { color: 'green',  text: 'RAG Applications' },
  { color: 'cyan',   text: 'LLM Fine-tuning' },
  { color: 'purple', text: 'MLOps Pipelines' },
]

const CODE_LINES = [
  { t: 'comment',   v: '# Sourav Danyal · AI Engineer' },
  { t: 'blank' },
  { t: 'kw',        v: 'from', rest: ' skills import [' },
  { t: 'str',       v: '  "Machine Learning",' },
  { t: 'str',       v: '  "Deep Learning",' },
  { t: 'str',       v: '  "Generative AI",' },
  { t: 'str',       v: '  "RAG & LLMs",' },
  { t: 'plain',     v: ']' },
  { t: 'blank' },
  { t: 'kw',        v: 'status', rest: ' = ' },
  { t: 'strInline', v: '"Open to Opportunities"' },
]

// ── Neural Network background ──────────────────────────
function useNeuralCanvas(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const LAYER_COUNTS = [4, 6, 6, 6, 4]
    let W = () => canvas.width
    let H = () => canvas.height

    const buildNodes = () => {
      return LAYER_COUNTS.map((count, li) => {
        const x = W() * 0.08 + li * (W() * 0.84 / (LAYER_COUNTS.length - 1))
        return Array.from({ length: count }, (_, ni) => ({
          x,
          y: H() * 0.1 + ni * ((H() * 0.8) / (count - 1 || 1)),
          pulse: Math.random() * Math.PI * 2,
          speed: 0.025 + Math.random() * 0.02,
          active: false,
        }))
      })
    }

    let nodes = buildNodes()
    window.addEventListener('resize', () => { nodes = buildNodes() })

    // Signals
    const signals = []
    const spawnSignal = () => {
      const li = Math.floor(Math.random() * (LAYER_COUNTS.length - 1))
      const from = nodes[li][Math.floor(Math.random() * nodes[li].length)]
      const to   = nodes[li + 1][Math.floor(Math.random() * nodes[li + 1].length)]
      const color = Math.random() > 0.6
        ? { r: 56,  g: 189, b: 248 }   // cyan
        : Math.random() > 0.5
        ? { r: 52,  g: 211, b: 153 }   // green
        : { r: 167, g: 139, b: 250 }   // purple
      signals.push({ from, to, t: 0, speed: 0.008 + Math.random() * 0.012, color })
    }
    for (let i = 0; i < 10; i++) spawnSignal()

    const draw = () => {
      ctx.clearRect(0, 0, W(), H())

      // Draw edges
      for (let li = 0; li < LAYER_COUNTS.length - 1; li++) {
        nodes[li].forEach(a => {
          nodes[li + 1].forEach(b => {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = 'rgba(56,189,248,0.055)'
            ctx.lineWidth = 0.7
            ctx.stroke()
          })
        })
      }

      // Animate & draw signals
      for (let i = signals.length - 1; i >= 0; i--) {
        const s = signals[i]
        s.t += s.speed
        const x = s.from.x + (s.to.x - s.from.x) * s.t
        const y = s.from.y + (s.to.y - s.from.y) * s.t
        const { r, g, b } = s.color
        // Trail
        ctx.beginPath()
        ctx.arc(x, y, 3.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r},${g},${b},0.9)`
        ctx.shadowColor = `rgba(${r},${g},${b},1)`
        ctx.shadowBlur = 12
        ctx.fill()
        ctx.shadowBlur = 0
        if (s.t >= 1) { signals.splice(i, 1); spawnSignal() }
      }

      // Draw nodes
      nodes.forEach((layer, li) => {
        const isInput  = li === 0
        const isOutput = li === LAYER_COUNTS.length - 1
        layer.forEach(n => {
          n.pulse += n.speed
          const glow = 0.5 + 0.5 * Math.sin(n.pulse)
          const col = isInput
            ? { r: 167, g: 139, b: 250 }
            : isOutput
            ? { r: 52,  g: 211, b: 153 }
            : { r: 56,  g: 189, b: 248 }
          const { r, g, b } = col

          // Outer ring
          ctx.beginPath()
          ctx.arc(n.x, n.y, 9, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(${r},${g},${b},${0.12 + glow * 0.15})`
          ctx.lineWidth = 1
          ctx.stroke()

          // Inner node
          ctx.beginPath()
          ctx.arc(n.x, n.y, 4.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${r},${g},${b},${0.7 + glow * 0.3})`
          ctx.shadowColor = `rgba(${r},${g},${b},0.8)`
          ctx.shadowBlur = 8 + glow * 6
          ctx.fill()
          ctx.shadowBlur = 0
        })
      })

      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])
}

export default function Hero() {
  const canvasRef = useRef(null)
  const [roleIdx,    setRoleIdx]    = useState(0)
  const [fadeRole,   setFadeRole]   = useState(true)
  const [visibleLines, setVisible]  = useState(0)

  useNeuralCanvas(canvasRef)

  // Rotating roles
  useEffect(() => {
    const id = setInterval(() => {
      setFadeRole(false)
      setTimeout(() => { setRoleIdx(p => (p + 1) % ROLES.length); setFadeRole(true) }, 300)
    }, 2800)
    return () => clearInterval(id)
  }, [])

  // Typewriter code
  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      i++; setVisible(i)
      if (i >= CODE_LINES.length) clearInterval(id)
    }, 190)
    return () => clearInterval(id)
  }, [])

  return (
    <section className={styles.hero} id="hero">
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.grid} />

      <div className={styles.wrapper}>
        {/* LEFT */}
        <div className={styles.content}>
          <div className={styles.eyebrow}>
            <span className={styles.eyeLine} />
            <span className={`${styles.role} ${fadeRole ? styles.roleIn : styles.roleOut}`}>
              {ROLES[roleIdx]}
            </span>
            <span className={styles.eyeLine} />
          </div>

          <h1 className={styles.name}>
            Sourav<br />
            <span className={styles.nameAccent}>Danyal<span className={styles.dot}>.</span></span>
          </h1>

          <p className={styles.desc}>
            Crafting intelligent systems at the intersection of<br />
            <em>Data Science · Machine Learning · Generative AI</em>
          </p>

          <div className={styles.actions}>
            <a
              href="#projects"
              onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="btn-primary"
            >
              View Projects →
            </a>
            <a href="/assets/Resume.pdf" download="Sourav_Danyal_Resume.pdf" className="btn-ghost">
              ↓ Download Resume
            </a>
          </div>

          <div className={styles.badges}>
            <span className={styles.badge}>🎓 MCA · CUHP</span>
            <span className={`${styles.badge} ${styles.badgeGreen}`}>✓ UGC NET Qualified</span>
            <span className={`${styles.badge} ${styles.badgePurple}`}>🟣 Open to Opportunities</span>
          </div>
        </div>

        {/* RIGHT */}
        <div className={styles.aside}>
          {/* Code card */}
          <div className={styles.codeCard}>
            <div className={styles.codeBar}>
              <span className={styles.codeDot} style={{ background: '#ff5f57' }} />
              <span className={styles.codeDot} style={{ background: '#febc2e' }} />
              <span className={styles.codeDot} style={{ background: '#28c840' }} />
              <span className={styles.codeFile}>profile.py</span>
            </div>
            <div className={styles.codeBody}>
              {CODE_LINES.slice(0, visibleLines).map((line, i) => (
                <div className={styles.codeLine} key={i}>
                  <span className={styles.lineNum}>{i + 1}</span>
                  {line.t === 'comment'   && <span className={styles.cComment}>{line.v}</span>}
                  {line.t === 'blank'     && <span>&nbsp;</span>}
                  {line.t === 'plain'     && <span className={styles.cPlain}>{line.v}</span>}
                  {line.t === 'str'       && <span className={styles.cStr}>{line.v}</span>}
                  {line.t === 'kw'        && <><span className={styles.cKw}>{line.v}</span><span className={styles.cPlain}>{line.rest}</span></>}
                  {line.t === 'strInline' && <span className={styles.cStr}>{line.v}</span>}
                </div>
              ))}
              {visibleLines < CODE_LINES.length && (
                <div className={styles.codeLine}>
                  <span className={styles.lineNum}>{visibleLines + 1}</span>
                  <span className={styles.cursor}>▌</span>
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className={styles.statsRow}>
            {STATS.map(s => (
              <div className={styles.stat} key={s.label}>
                <div className={styles.statVal}>{s.val}</div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Focus card */}
          <div className={styles.focusCard}>
            <div className={styles.focusTitle}>// current focus</div>
            {FOCUS.map(f => (
              <div className={styles.focusRow} key={f.text}>
                <span className={`${styles.focusDot} ${styles['dot_' + f.color]}`} />
                <span className={styles.focusText}>{f.text}</span>
              </div>
            ))}
            <div className={styles.statusRow}>
              <span className={styles.pulseDot} />
              <span className={styles.statusText}>Available for hire</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.scrollHint}>
        <span className={styles.scrollLine} />
        <span>scroll</span>
      </div>
    </section>
  )
}
