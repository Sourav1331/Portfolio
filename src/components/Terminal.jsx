import { useState, useRef, useEffect } from 'react'
import { SYSTEM_PROMPT } from '../data'
import styles from './Terminal.module.css'

const CHIPS = [
  { label: 'Skills',       q: 'What are his technical skills?' },
  { label: 'Projects',     q: 'Tell me about his projects.' },
  { label: 'Education',    q: 'What is his educational background?' },
  { label: 'Opportunities',q: 'What opportunities is he looking for?' },
  { label: 'Contact',      q: 'How can I contact Sourav?' },
]

export default function Terminal({ open, onClose }) {
  const [messages, setMessages] = useState([])
  const [input, setInput]       = useState('')
  const [loading, setLoading]   = useState(false)
  const historyRef = useRef(null)
  const inputRef   = useRef(null)

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300)
  }, [open])

  useEffect(() => {
    if (historyRef.current) historyRef.current.scrollTop = historyRef.current.scrollHeight
  }, [messages, loading])

  const send = async (text) => {
    const q = text?.trim() || input.trim()
    if (!q || loading) return
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: q }])
    setLoading(true)

    try {
      // Build message history for multi-turn
      const history = messages.map(m => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.text }))
      history.push({ role: 'user', content: q })

      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          max_tokens: 600,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...history,
          ],
        }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err?.error?.message || `HTTP ${res.status}`)
      }

      const data   = await res.json()
      const answer = data?.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.'
      setMessages(prev => [...prev, { role: 'assistant', text: answer }])
    } catch (err) {
      const msg = err.message?.includes('401') || err.message?.includes('403')
        ? 'Groq API key not set. Add VITE_GROQ_API_KEY to your .env file and restart the dev server.'
        : `Error: ${err.message}`
      setMessages(prev => [...prev, { role: 'assistant', text: msg }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`${styles.overlay} ${open ? styles.open : ''}`} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.panel} role="dialog" aria-label="AI Terminal">
        {/* Title bar */}
        <div className={styles.bar}>
          <div className={styles.dots}>
            <span className={`${styles.dot} ${styles.red}`} onClick={onClose} title="Close" />
            <span className={`${styles.dot} ${styles.yellow}`} />
            <span className={`${styles.dot} ${styles.green}`} />
          </div>
          <span className={styles.barTitle}>sourav@portfolio ~ AI Assistant</span>
        </div>

        {/* Boot */}
        <div className={styles.boot}>
          <p><span className={styles.bootCyan}>Initializing Sourav's AI Assistant…</span></p>
          <p className={styles.bootMute}>Ask me anything about Sourav — skills, projects, education, or contact.</p>
          <p className={styles.bootMute}>─────────────────────────────────────────</p>
        </div>

        {/* History */}
        <div className={styles.history} ref={historyRef}>
          {messages.map((m, i) => (
            <div className={`${styles.msg} ${m.role === 'user' ? styles.user : styles.ai}`} key={i}>
              <div className={styles.msgLabel}>{m.role === 'user' ? '▶ you' : '◆ sourav-ai'}</div>
              <div className={styles.msgBody}>{m.text}</div>
            </div>
          ))}
          {loading && (
            <div className={`${styles.msg} ${styles.ai}`}>
              <div className={styles.msgLabel}>◆ sourav-ai</div>
              <div className={`${styles.msgBody} ${styles.typing}`}>Thinking<span className={styles.dots3}>...</span></div>
            </div>
          )}
        </div>

        {/* Chips */}
        <div className={styles.chips}>
          {CHIPS.map(c => (
            <button key={c.label} className={styles.chip} onClick={() => send(c.q)}>{c.label}</button>
          ))}
        </div>

        {/* Input */}
        <div className={styles.inputRow}>
          <span className={styles.prompt}>sourav@ai $</span>
          <input
            ref={inputRef}
            className={styles.input}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="Ask me anything about Sourav…"
            autoComplete="off"
            spellCheck={false}
          />
          <button className={styles.sendBtn} onClick={() => send()} disabled={loading}>↵</button>
        </div>
      </div>
    </div>
  )
}