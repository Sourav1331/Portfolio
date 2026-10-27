import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ArrowUpRight, CodeXml, X } from 'lucide-react'
import { PROJECT_STUDIES } from '../projectStudies'
import styles from './ProjectCaseStudy.module.css'

export default function ProjectCaseStudy({ project, onClose }) {
  const dialogRef = useRef(null)
  const headingRef = useRef(null)
  const [selectedStep, setSelectedStep] = useState(0)
  const study = PROJECT_STUDIES[project.id]
  const step = study.stages[selectedStep]

  useEffect(() => {
    const dialog = dialogRef.current
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    headingRef.current.focus({ preventScroll: true })
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true })
    }
  }, [])

  const moveStep = event => {
    let next
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (selectedStep + 1) % study.stages.length
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (selectedStep - 1 + study.stages.length) % study.stages.length
    if (event.key === 'Home') next = 0
    if (event.key === 'End') next = study.stages.length - 1
    if (next === undefined) return
    event.preventDefault()
    setSelectedStep(next)
    dialogRef.current.querySelector(`#architecture-step-${next}`).focus()
  }

  return (
    <dialog ref={dialogRef} className={styles.dialog} aria-labelledby="case-study-title" onCancel={event => { event.preventDefault(); onClose() }} onClick={event => { if (event.target === event.currentTarget) onClose() }}>
      <div className={styles.sheet}>
        <header className={styles.toolbar}>
          <span className="eyebrow">Selected work / 0{project.id}</span>
          <button type="button" onClick={onClose} aria-label="Close case study"><span>Close</span><X size={19} /></button>
        </header>
        <div className={styles.content}>
          <div className={styles.intro}>
            <span className={`eyebrow ${styles.category}`}>{study.category} · Case study</span>
            <h2 id="case-study-title" ref={headingRef} tabIndex={-1}>{study.title}</h2>
            <p className={styles.headline}>{study.headline}</p>
            <div className={styles.links}>
              <a href={project.live} target="_blank" rel="noopener noreferrer">Open live project <ArrowUpRight size={16} /></a>
              <a href={project.github} target="_blank" rel="noopener noreferrer"><CodeXml size={16} /> Explore the source</a>
            </div>
          </div>
          {study.screenshot && <figure className={styles.screenshot}>
            <div className={styles.browserBar} aria-hidden="true"><span /><span /><span /><p>{new URL(project.live).hostname}</p></div>
            <img src={study.screenshot} alt={study.screenshotAlt} width="1440" height="960" decoding="async" />
            <figcaption>{study.screenshotCaption}</figcaption>
          </figure>}
          <div className={styles.overview}>
            {[['01 / The problem', study.problem], ['02 / The approach', study.approach], ['03 / What it does', study.result]].map(([label, copy]) => <section key={label}><h3 className="eyebrow">{label}</h3><p>{copy}</p></section>)}
          </div>
          <section className={styles.architecture} aria-labelledby="architecture-heading">
            <div className={styles.sectionHeading}><div><span className="eyebrow">From input to output</span><h3 id="architecture-heading">Inside the <em>system.</em></h3></div><p>Select a step to see how it works.</p></div>
            <div className={styles.steps} role="tablist" aria-label="Architecture steps" onKeyDown={moveStep}>
              {study.stages.map((stage, index) => <button type="button" role="tab" key={stage.label} id={`architecture-step-${index}`} aria-controls="architecture-detail" aria-selected={selectedStep === index} tabIndex={selectedStep === index ? 0 : -1} onClick={() => setSelectedStep(index)}><span>0{index + 1}</span>{stage.label}<ArrowRight size={15} aria-hidden="true" /></button>)}
            </div>
            <div className={styles.stepDetail} id="architecture-detail" role="tabpanel" aria-labelledby={`architecture-step-${selectedStep}`} tabIndex={0}>
              <div key={selectedStep} className={styles.stepCopy}><span className="eyebrow">{step.technology}</span><h4>{step.title}</h4><p>{step.description}</p></div>
              <dl><div><dt>Input</dt><dd>{step.input}</dd></div><ArrowRight size={19} aria-hidden="true" /><div><dt>Output</dt><dd>{step.output}</dd></div></dl>
            </div>
          </section>
          <section className={styles.decisions} aria-labelledby="decisions-heading">
            <div className={styles.sectionHeading}><h3 id="decisions-heading">The engineering <em>choices.</em></h3></div>
            <div>{study.decisions.map((decision, index) => <article key={decision.title}><span className="eyebrow">0{index + 1}</span><h4>{decision.title}</h4><p>{decision.text}</p></article>)}</div>
          </section>
          <aside className={styles.boundary}><span className="eyebrow">Where judgment matters</span><p>{study.boundary}</p></aside>
          <footer className={styles.footer}><span>Built by Sourav Danyal</span><a href={project.github} target="_blank" rel="noopener noreferrer">See the implementation <ArrowUpRight size={15} /></a></footer>
        </div>
      </div>
    </dialog>
  )
}
