import { useState, useRef, useEffect } from 'react'
import { ArrowUp, ArrowUpRight, ChevronDown, MessageCircle, X } from 'lucide-react'
import { SYSTEM_PROMPT } from '../data'
import styles from './Terminal.module.css'

const CHIPS = [
  { label: 'The projects', q: 'Tell me about his projects.' },
  { label: 'Technical skills', q: 'What are his technical skills?' },
  { label: 'Education', q: 'What is his educational background?' },
  { label: 'Opportunities', q: 'What opportunities is he looking for?' },
  { label: 'Get in touch', q: 'How can I contact Sourav?' },
]

function formatAssistantText(text) {
  return text.replace(/^#{1,6}\s+/gm, '').replace(/\*\*(.*?)\*\*/g, '$1').replace(/__(.*?)__/g, '$1').replace(/\*([^*\n]+)\*/g, '$1').replace(/_([^_\n]+)_/g, '$1').replace(/`([^`\n]+)`/g, '$1').replace(/^\s*[-*]\s+/gm, '• ')
}

export default function Terminal({ open, onClose }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const dialogRef = useRef(null)
  const historyRef = useRef(null)
  const latestMessageRef = useRef(null)
  const suggestionsRef = useRef(null)
  const inputRef = useRef(null)
  const requestRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!open) {
      if (dialog.open) dialog.close()
      return
    }
    if (!dialog.open) dialog.showModal()
    inputRef.current?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [open])

  useEffect(() => {
    const history = historyRef.current
    const latest = latestMessageRef.current
    if (!open || !history || !latest) return
    // Start at the new answer rather than jumping to the bottom of a long reply.
    history.scrollTop += latest.getBoundingClientRect().top - history.getBoundingClientRect().top - 24
  }, [messages, loading, open])

  useEffect(() => () => requestRef.current?.abort(), [])

  const send = async text => {
    const question = (text || input).trim()
    if (!question || requestRef.current) return
    if (suggestionsRef.current) suggestionsRef.current.open = false
    setInput('')
    if (question.toLowerCase() === 'exit') { onClose(); return }
    setMessages(previous => [...previous, { role: 'user', text: question }])
    setLoading(true)
    const controller = new AbortController()
    requestRef.current = controller
    const timeout = window.setTimeout(() => controller.abort(), 30000)
    try {
      if (!import.meta.env.VITE_GROQ_API_KEY) throw new Error('Assistant unavailable')
      const history = messages.map(message => ({ role: message.role, content: message.text }))
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        signal: controller.signal,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}` },
        body: JSON.stringify({ model: 'openai/gpt-oss-20b', max_tokens: 600, messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...history, { role: 'user', content: question }] }),
      })
      if (!response.ok) throw new Error('Assistant unavailable')
      const data = await response.json()
      const answer = data?.choices?.[0]?.message?.content
      if (typeof answer !== 'string' || !answer.trim()) throw new Error('Empty response')
      setMessages(previous => [...previous, { role: 'assistant', text: answer }])
    } catch {
      setMessages(previous => [...previous, { role: 'assistant', text: 'I’m having trouble connecting right now. Please try again in a moment, or reach Sourav directly at souravdanyal04@gmail.com.' }])
    } finally {
      window.clearTimeout(timeout)
      requestRef.current = null
      setLoading(false)
    }
  }

  return (
    <dialog ref={dialogRef} className={styles.dialog} onCancel={onClose} onClose={onClose} onClick={event => { if (event.target === event.currentTarget) onClose() }} aria-labelledby="assistant-title" aria-describedby="assistant-description">
      <div className={styles.panel}>
        <header className={styles.header}>
          <div className={styles.identity}><span className={styles.headerIcon} aria-hidden="true"><MessageCircle size={20} strokeWidth={1.5} /></span><div><h2 id="assistant-title">Portfolio assistant</h2><p id="assistant-description">Get to know Sourav and his work.</p></div></div>
          <button onClick={onClose} aria-label="Close AI assistant"><X size={20} /></button>
        </header>
        <div className={styles.history} ref={historyRef} role="region" aria-label="Conversation" tabIndex={0}>
          {messages.length === 0 && <div className={styles.welcome}>
            <div className={styles.intro}><div className={styles.mark}>sd<span>.</span></div><h3>A little more <em>about Sourav.</em></h3><p>Explore the projects, the thinking behind them, or what I’d like to build next. Where would you like to start?</p></div>
            <span className={styles.promptLabel}>A few starting points</span>
            <div className={styles.chips}>{CHIPS.map(chip => <button key={chip.label} onClick={() => send(chip.q)} disabled={loading}>{chip.label}<ArrowUpRight size={16} aria-hidden="true" /></button>)}</div>
          </div>}
          <div role="log" aria-label="Messages" aria-live="polite" aria-busy={loading}>
            {messages.map((message, index) => <div key={index} ref={index === messages.length - 1 ? latestMessageRef : null} className={`${styles.message} ${message.role === 'user' ? styles.user : styles.ai}`}><span>{message.role === 'user' ? 'You' : 'Sourav’s assistant'}</span><p>{message.role === 'assistant' ? formatAssistantText(message.text) : message.text}</p></div>)}
            {loading && <div className={styles.thinking} role="status"><span aria-hidden="true" />Thinking it through…</div>}
          </div>
          {messages.length > 0 && <details ref={suggestionsRef} className={styles.suggestions}>
            <summary>Explore another topic <ChevronDown size={15} /></summary>
            <div className={styles.chips}>{CHIPS.map(chip => <button key={chip.label} onClick={() => send(chip.q)} disabled={loading}>{chip.label}<ArrowUpRight size={16} aria-hidden="true" /></button>)}</div>
          </details>}
        </div>
        <div className={styles.composer}>
          <form className={styles.inputRow} onSubmit={event => { event.preventDefault(); send() }}>
            <input ref={inputRef} value={input} onChange={event => setInput(event.target.value)} placeholder="Ask me about Sourav…" aria-label="Your question about Sourav" autoComplete="off" maxLength={1000} />
            <button type="submit" disabled={loading || !input.trim()} aria-label="Send question"><ArrowUp size={20} /></button>
          </form>
          <div className={styles.note}>AI can make mistakes. Get in touch for details.</div>
        </div>
      </div>
    </dialog>
  )
}
