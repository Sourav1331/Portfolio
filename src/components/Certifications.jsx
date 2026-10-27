import { ArrowUpRight, Award } from 'lucide-react'
import { CERTIFICATIONS } from '../data'
import Reveal from './Reveal'
import styles from './Certifications.module.css'

export default function Certifications() {
  return (
    <section id="certs" className={`container ${styles.section}`} aria-labelledby="certifications-heading">
      <Reveal className={styles.intro}>
        <div className="section-label eyebrow"><span>04</span><span>Always learning</span></div>
        <h2 id="certifications-heading">A strong foundation.<br /><em>A continuous practice.</em></h2>
      </Reveal>
      <div className={styles.certificates}>
        {CERTIFICATIONS.map((cert, index) => <Reveal as="a" key={cert.id} href={cert.verify} target="_blank" rel="noopener noreferrer" className={styles.certificate} aria-label={`View ${cert.title} certificate`} delay={index * 100} distance={16}>
          <Award size={22} strokeWidth={1.3} /><div><h3>{cert.title}</h3><p>{cert.issuer} <span>·</span> {cert.date}</p></div><ArrowUpRight size={17} strokeWidth={1.5} />
        </Reveal>)}
      </div>
    </section>
  )
}
