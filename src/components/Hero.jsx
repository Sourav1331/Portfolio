import { ArrowDown, ArrowUpRight, MapPin } from 'lucide-react'
import GenerativeForm from './GenerativeForm'
import Reveal from './Reveal'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section id="hero" className={styles.hero} aria-labelledby="hero-heading">
      <div className="container">
        <div className={styles.intro}>
          <span className="eyebrow">Independent mind. Intelligent systems.</span>
          <a href="#contact" className={styles.availability}><span className="status-dot" /> Open to opportunities</a>
        </div>
        <div className={styles.layout}>
          <div className={styles.content}>
            <Reveal className={styles.byline} distance={12}><span /> Hi, I’m Sourav. An AI engineer.</Reveal>
            <h1 id="hero-heading">
              <Reveal as="span" className={styles.titleLine} delay={70} distance={36} duration={900}>Making AI</Reveal>{' '}
              <Reveal as="span" className={styles.titleLine} delay={160} distance={36} duration={900}>work in the</Reveal>{' '}
              <Reveal as="span" className={styles.titleLine} delay={250} distance={36} duration={900}><em>real world.</em></Reveal>
            </h1>
            <Reveal as="p" delay={330} distance={16}>I turn data, models, and a healthy dose of curiosity into useful things. Building with machine learning, generative AI, and everything in between.</Reveal>
            <Reveal className={styles.actions} delay={390} distance={16}>
              <a href="#projects" className="button">Explore my work <ArrowDown size={16} /></a>
              <a href="/assets/Resume.pdf" target="_blank" rel="noopener noreferrer" className="text-link">View résumé <ArrowUpRight size={16} /></a>
            </Reveal>
            <Reveal className={styles.location} delay={440} distance={12}><MapPin size={12} strokeWidth={1.5} /><span>Based in Himachal Pradesh, India</span><span className={styles.locationDash}>—</span><span>Open to the world</span></Reveal>
          </div>
          <GenerativeForm />
        </div>
        <Reveal className={styles.bottom} distance={14}>
          <span className={`eyebrow ${styles.focusLabel}`}>A few things I work with</span>
          <div className={styles.disciplines}><span>Generative AI</span><span className={styles.asterisk}>✳</span><span>Machine Learning</span><span className={styles.asterisk}>✳</span><span>Data Science</span></div>
          <a href="#projects" className={styles.scroll}><span className="eyebrow">Scroll to explore</span><ArrowDown size={13} /></a>
        </Reveal>
      </div>
    </section>
  )
}
