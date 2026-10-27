import { ArrowUpRight } from 'lucide-react'
import { TIMELINE } from '../data'
import Reveal from './Reveal'
import MountainLandscape from './MountainLandscape'
import styles from './About.module.css'

export default function About() {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-heading">
      <div className="container section">
        <Reveal className="section-label eyebrow" distance={12}><span>02</span><span>A little about me</span></Reveal>
        <div className={styles.layout}>
          <div className={styles.left}>
            <Reveal as="h2" id="about-heading" className="section-title" delay={60}>Curiosity is the<br /><em>starting point.</em></Reveal>
            <Reveal as="figure" className={styles.portrait} delay={120} distance={18}>
              <div className={styles.portraitFrame}>
                <div className={styles.portraitImage}><img src="/assets/profile.jpeg" alt="Sourav Danyal by the water" width="4160" height="3127" loading="lazy" decoding="async" /></div>
              </div>
              <figcaption><strong>Sourav Danyal</strong><span>AI & Data Science</span></figcaption>
            </Reveal>
            <MountainLandscape />
          </div>
          <div className={styles.bio}>
            <Reveal as="p" className={styles.lead} delay={80}>An engineer’s mindset.<br />A researcher’s curiosity.</Reveal>
            <Reveal as="p" delay={120}>I’m Sourav, an AI and Data Science engineer based in the foothills of the Himalayas. I enjoy taking a messy question, understanding the data behind it, and building something people can actually use.</Reveal>
            <Reveal as="p" delay={160}>I completed my MCA at the Central University of Himachal Pradesh in 2026 and qualified UGC NET in Computer Science. My projects bring that theoretical foundation into practice: from multi-agent research workflows to document intelligence and recommendation systems.</Reveal>
            <div className={styles.education}>
              {TIMELINE.map((item, index) => <Reveal className={styles.educationRow} key={item.title} delay={index * 80} distance={16}><span>{item.period}</span><div><h3>{item.title}</h3><p>{item.sub}</p></div></Reveal>)}
            </div>
            <a className="text-link" href="/assets/Resume.pdf" target="_blank" rel="noopener noreferrer">The full story, in my résumé <ArrowUpRight size={15} /></a>
          </div>
        </div>
      </div>
    </section>
  )
}
