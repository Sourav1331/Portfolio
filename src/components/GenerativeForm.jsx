import { useEffect, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import Reveal from './Reveal'
import styles from './Hero.module.css'

// Deterministic toroidal surface drawn as copper filaments. It sleeps off screen.
export default function GenerativeForm() {
  const canvasRef = useRef(null)
  const [paused, setPaused] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = event => setPaused(event.matches)
    preference.addEventListener('change', onChange)
    return () => preference.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    if (!context) return
    let frame = 0
    let rotation = .35
    let lastTime = 0
    let inView = true
    let width = 0
    let height = 0
    let darkTheme = document.documentElement.dataset.theme === 'dark'
    const pointer = { x: 0, y: 0 }
    const smoothed = { x: 0, y: 0 }

    const draw = () => {
      context.clearRect(0, 0, width, height)
      const scale = Math.min(width, height) * .31
      const tilt = .93 + smoothed.y * .15
      const turn = rotation + smoothed.x * .2
      const lines = []
      for (let i = 0; i < 104; i++) {
        const u = i / 104 * Math.PI * 2
        const points = []
        let depth = 0
        for (let j = 0; j <= 100; j++) {
          const v = j / 100 * Math.PI * 2
          const radius = .43 + .055 * Math.cos(3 * u + 2 * v)
          const x = (1 + radius * Math.cos(v)) * Math.cos(u)
          const y = (1 + radius * Math.cos(v)) * Math.sin(u)
          const z = radius * Math.sin(v) + .16 * Math.sin(3 * u)
          const rx = x * Math.cos(turn) - y * Math.sin(turn)
          const ry = x * Math.sin(turn) + y * Math.cos(turn)
          const py = ry * Math.cos(tilt) - z * Math.sin(tilt)
          const pz = ry * Math.sin(tilt) + z * Math.cos(tilt)
          const perspective = 4.8 / (4.8 - pz)
          const lean = -.36
          points.push({ x: width / 2 + (rx * Math.cos(lean) - py * Math.sin(lean)) * scale * perspective, y: height / 2 + (rx * Math.sin(lean) + py * Math.cos(lean)) * scale * perspective })
          depth += pz
        }
        lines.push({ points, depth: depth / 101 })
      }
      lines.sort((a, b) => a.depth - b.depth)
      lines.forEach(({ points, depth }) => {
        context.beginPath()
        points.forEach((point, index) => {
          if (index === 0) context.moveTo(point.x, point.y)
          else context.lineTo(point.x, point.y)
        })
        const front = (depth + 1.5) / 3
        const copper = darkTheme ? [207, 139, 100] : [133, 68, 43]
        context.strokeStyle = `rgba(${Math.round(copper[0] + front * 40)}, ${Math.round(copper[1] + front * 14)}, ${Math.round(copper[2] + front * 7)}, ${.2 + front * .6})`
        context.lineWidth = .7
        context.stroke()
      })
    }
    const animate = time => {
      if (time - lastTime >= 40) {
        rotation += .0018
        smoothed.x += (pointer.x - smoothed.x) * .04
        smoothed.y += (pointer.y - smoothed.y) * .04
        draw()
        lastTime = time
      }
      frame = requestAnimationFrame(animate)
    }
    const syncAnimation = () => {
      cancelAnimationFrame(frame)
      if (!paused && inView && !document.hidden) frame = requestAnimationFrame(animate)
    }
    const resize = new ResizeObserver(([entry]) => {
      width = entry.contentRect.width
      height = entry.contentRect.height
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      draw()
    })
    resize.observe(canvas)
    const themeObserver = new MutationObserver(() => {
      darkTheme = document.documentElement.dataset.theme === 'dark'
      draw()
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    const intersection = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      syncAnimation()
    })
    intersection.observe(canvas)
    const move = event => {
      const bounds = canvas.getBoundingClientRect()
      pointer.x = (event.clientX - bounds.left) / bounds.width - .5
      pointer.y = (event.clientY - bounds.top) / bounds.height - .5
    }
    const leave = () => { pointer.x = 0; pointer.y = 0 }
    canvas.addEventListener('pointermove', move)
    canvas.addEventListener('pointerleave', leave)
    document.addEventListener('visibilitychange', syncAnimation)
    return () => {
      cancelAnimationFrame(frame)
      resize.disconnect()
      themeObserver.disconnect()
      intersection.disconnect()
      canvas.removeEventListener('pointermove', move)
      canvas.removeEventListener('pointerleave', leave)
      document.removeEventListener('visibilitychange', syncAnimation)
    }
  }, [paused])

  return (
    <Reveal className={styles.artwork} delay={150} distance={16} duration={1100}>
      <div className={styles.artTop} aria-hidden="true"><span className={styles.artCross}>+</span></div>
      <div className={styles.artField}>
        <span className={styles.axisVertical} aria-hidden="true" />
        <span className={styles.axisHorizontal} aria-hidden="true" />
        <canvas ref={canvasRef} className={styles.canvas} role="img" aria-label="A slowly rotating copper wire sculpture, formed from interwoven mathematical curves" />
        <span className={styles.artSide}>COMPLEXITY → CLARITY</span>
      </div>
      <div className={styles.artBottom}>
        <span className="eyebrow"><span className={styles.artDot} /> Order, from possibility.</span>
        <button onClick={() => setPaused(!paused)} className={styles.motionButton} aria-label={paused ? 'Play sculpture animation' : 'Pause sculpture animation'} aria-pressed={paused}>
          {paused ? <Play size={12} /> : <Pause size={12} />}<span>{paused ? 'Play' : 'Pause'}</span>
        </button>
      </div>
    </Reveal>
  )
}
