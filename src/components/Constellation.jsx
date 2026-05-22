import { useRef, useEffect, useState } from 'react'
import { CONSTELLATION_SKILLS } from '../data'
import styles from './Constellation.module.css'

const GROUP_COLORS = {
  lang:      { r: 56,  g: 189, b: 248 },  // cyan
  ai:        { r: 167, g: 139, b: 250 },  // purple
  data:      { r: 52,  g: 211, b: 153 },  // green
  framework: { r: 251, g: 146, b: 60  },  // orange
  db:        { r: 248, g: 113, b: 113 },  // red
}

const GROUP_LABELS = {
  lang: 'Languages', ai: 'AI / ML / DL',
  data: 'Data Science', framework: 'Frameworks', db: 'Databases',
}

export default function Constellation() {
  const canvasRef = useRef(null)
  const [hovered, setHovered] = useState(null)
  const [tooltip, setTooltip] = useState({ x: 0, y: 0, node: null })
  const animRef = useRef(null)
  const nodesRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Build world coords from % values
    nodesRef.current = CONSTELLATION_SKILLS.map(s => ({
      ...s,
      wx: (s.x / 100) * canvas.width,
      wy: (s.y / 100) * canvas.height,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.02 + Math.random() * 0.015,
    }))

    let hoveredId = null

    const draw = () => {
      const W = canvas.width, H = canvas.height
      ctx.clearRect(0, 0, W, H)

      // Update world coords on resize
      nodesRef.current.forEach(n => {
        n.wx = (n.x / 100) * W
        n.wy = (n.y / 100) * H
        n.pulse += n.pulseSpeed
      })

      // Draw edges
      nodesRef.current.forEach(n => {
        n.connects.forEach(cid => {
          const target = nodesRef.current.find(t => t.id === cid)
          if (!target) return
          const isActive = hoveredId && (n.id === hoveredId || target.id === hoveredId)
          ctx.beginPath()
          ctx.moveTo(n.wx, n.wy)
          ctx.lineTo(target.wx, target.wy)
          ctx.strokeStyle = isActive
            ? `rgba(56,189,248,0.55)`
            : `rgba(56,189,248,0.08)`
          ctx.lineWidth = isActive ? 1.2 : 0.6
          ctx.stroke()

          // Animated dot along edge when hovered
          if (isActive) {
            const t = (Date.now() % 1800) / 1800
            const ex = n.wx + (target.wx - n.wx) * t
            const ey = n.wy + (target.wy - n.wy) * t
            ctx.beginPath()
            ctx.arc(ex, ey, 2, 0, Math.PI * 2)
            ctx.fillStyle = 'rgba(56,189,248,0.9)'
            ctx.fill()
          }
        })
      })

      // Draw nodes
      nodesRef.current.forEach(n => {
        const col = GROUP_COLORS[n.group] || GROUP_COLORS.lang
        const { r, g, b } = col
        const glow = 0.5 + 0.5 * Math.sin(n.pulse)
        const isHov = n.id === hoveredId
        const radius = isHov ? n.r * 1.35 : n.r

        // Outer glow ring
        ctx.beginPath()
        ctx.arc(n.wx, n.wy, radius + 5, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${r},${g},${b},${isHov ? 0.4 : 0.1 + glow * 0.12})`
        ctx.lineWidth = 1
        ctx.stroke()

        // Node fill
        const grad = ctx.createRadialGradient(n.wx, n.wy, 0, n.wx, n.wy, radius)
        grad.addColorStop(0, `rgba(${r},${g},${b},${isHov ? 0.9 : 0.5 + glow * 0.3})`)
        grad.addColorStop(1, `rgba(${r},${g},${b},${isHov ? 0.5 : 0.2})`)
        ctx.beginPath()
        ctx.arc(n.wx, n.wy, radius, 0, Math.PI * 2)
        ctx.fillStyle = grad
        if (isHov) { ctx.shadowColor = `rgba(${r},${g},${b},0.8)`; ctx.shadowBlur = 18 }
        ctx.fill()
        ctx.shadowBlur = 0

        // Label
        const fontSize = isHov ? 9 : Math.max(7, Math.min(9, n.r * 0.65))
        ctx.font = `${isHov ? 600 : 500} ${fontSize}px Inter, sans-serif`
        ctx.fillStyle = `rgba(255,255,255,${isHov ? 1 : 0.75 + glow * 0.2})`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(n.label, n.wx, n.wy)
      })

      animRef.current = requestAnimationFrame(draw)
    }
    draw()

    // Mouse interaction
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top
      let found = null
      nodesRef.current.forEach(n => {
        const dx = mx - n.wx, dy = my - n.wy
        if (Math.sqrt(dx*dx + dy*dy) < n.r + 6) found = n
      })
      hoveredId = found?.id || null
      setHovered(found?.id || null)
      if (found) {
        setTooltip({ x: found.wx, y: found.wy, node: found })
        canvas.style.cursor = 'pointer'
      } else {
        setTooltip({ x: 0, y: 0, node: null })
        canvas.style.cursor = 'default'
      }
    }

    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseleave', () => {
      hoveredId = null; setHovered(null); setTooltip({ x:0, y:0, node:null })
    })

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <div className={styles.wrap}>
      <canvas ref={canvasRef} className={styles.canvas} />

      {/* Tooltip */}
      {tooltip.node && (
        <div
          className={styles.tooltip}
          style={{
            left: `${tooltip.node.x}%`,
            top:  `${tooltip.node.y}%`,
          }}
        >
          <div className={styles.ttName}>{tooltip.node.label}</div>
          <div className={styles.ttGroup}>{GROUP_LABELS[tooltip.node.group]}</div>
          <div className={styles.ttLevel}>{tooltip.node.level || 'Intermediate'}</div>
        </div>
      )}

      {/* Legend */}
      <div className={styles.legend}>
        {Object.entries(GROUP_COLORS).map(([key, col]) => (
          <div className={styles.legendItem} key={key}>
            <span className={styles.legendDot} style={{ background: `rgb(${col.r},${col.g},${col.b})`, boxShadow: `0 0 6px rgb(${col.r},${col.g},${col.b})` }} />
            <span className={styles.legendLabel}>{GROUP_LABELS[key]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}