import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Check, Copy } from 'lucide-react'
import Reveal from './Reveal'
import styles from './Contact.module.css'

export default function Contact() {
  const [copyStatus, setCopyStatus] = useState('')
  const timer = useRef(null)
  useEffect(() => () => window.clearTimeout(timer.current), [])
  const copyEmail = async () => {
    window.clearTimeout(timer.current)
    try {
      await navigator.clipboard.writeText('souravdanyal04@gmail.com')
      setCopyStatus('Email copied')
    } catch {
      setCopyStatus('Select the email address to copy it, or click it to write to me.')
    }
    timer.current = window.setTimeout(() => setCopyStatus(''), 5000)
  }
  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-heading">
      <div className="container section">
        <div className={styles.top}><div className="eyebrow">05 / What’s next?</div><span><i className="status-dot" /> Available for opportunities</span></div>
        <div className={styles.layout}>
          <div>
            <Reveal as="h2" id="contact-heading">Have a good problem?<br /><em>Let’s work on it.</em></Reveal>
            <Reveal as="p" delay={100}>I’m open to AI/ML roles, research collaborations, and interesting conversations. If you see a fit, I’d love to hear from you.</Reveal>
            <Reveal className={styles.emailRow} delay={160} distance={16}><a href="mailto:souravdanyal04@gmail.com">souravdanyal04@gmail.com <ArrowUpRight size={23} /></a><button onClick={copyEmail} aria-label="Copy email address">{copyStatus === 'Email copied' ? <Check size={15} /> : <Copy size={15} />}</button></Reveal>
            <div className={styles.copyStatus} role="status">{copyStatus}</div>
          </div>
          <Reveal className={styles.side} delay={120}>
            <span className={styles.asterisk} aria-hidden="true">✳</span>
            <div className={styles.links}>
              <a href="https://github.com/Sourav1331" target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={15} /></a>
              <a href="https://linkedin.com/in/sourav-danyal-a8b35232a" target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={15} /></a>
              <a href="/assets/Resume.pdf" download="Sourav_Danyal_Resume.pdf">Download résumé <ArrowUpRight size={15} /></a>
              <a href="tel:+918629894384">+91 86298 94384 <ArrowUpRight size={15} /></a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
