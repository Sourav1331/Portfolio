import { useState } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, BookOpen, CheckCheck, FileText, CodeXml, Search, Workflow, PenLine } from 'lucide-react'
import { PROJECTS } from '../data'
import { PROJECT_STUDIES as projectNotes } from '../projectStudies'
import ProjectCaseStudy from './ProjectCaseStudy'
import Reveal from './Reveal'
import styles from './Projects.module.css'

const filters = ['All work', 'Generative AI', 'Machine Learning']

function ProjectVisual({ id }) {
  if (id === 1) return (
    <div className={`${styles.visual} ${styles.researchVisual}`} aria-hidden="true">
      <div className={styles.visualTop}><span>RESEARCH / ORCHESTRATED</span><Workflow size={17} strokeWidth={1.4} /></div>
      <div className={styles.visualHeadline}>Many minds.<br /><em>One clear answer.</em></div>
      <div className={styles.agentGraph}>
        <svg viewBox="0 0 400 180" preserveAspectRatio="none"><path d="M75 45H190Q200 45 200 60V120Q200 135 210 135H325M75 135H190Q200 135 200 120V60Q200 45 210 45H325" /><path className={styles.signalPath} d="M75 45H190Q200 45 200 60V120Q200 135 210 135H325M75 135H190Q200 135 200 120V60Q200 45 210 45H325" /><circle cx="200" cy="90" r="19" /></svg>
        <div className={`${styles.agent} ${styles.agentOne}`}><Search size={15} /><span>Researcher</span></div>
        <div className={`${styles.agent} ${styles.agentTwo}`}><BookOpen size={15} /><span>Summarizer</span></div>
        <div className={`${styles.agent} ${styles.agentThree}`}><PenLine size={15} /><span>Writer</span></div>
        <div className={`${styles.agent} ${styles.agentFour}`}><CheckCheck size={15} /><span>Fact-checker</span></div>
        <span className={styles.graphCenter}>✳</span>
      </div>
      <div className={styles.visualFooter}><span>LANGGRAPH × GROQ</span><span><i /> STREAMING RESPONSES</span></div>
    </div>
  )
  if (id === 2) return (
    <div className={`${styles.visual} ${styles.documentVisual}`} aria-hidden="true">
      <div className={styles.visualTop}><span>DOCUMENTS / UNDERSTOOD</span><FileText size={17} strokeWidth={1.4} /></div>
      <div className={styles.documentScene}>
        <div className={styles.documentBack}><span>DOCX</span></div>
        <div className={styles.documentSheet}><div><FileText size={17} /><span>KNOWLEDGE, CONNECTED</span></div><strong>Your next answer<br />is already in here.</strong><i /><i /><i /><span className={styles.documentHighlight}>Retrieve. Understand. Respond.</span></div>
        <span className={styles.sourceChip}><CheckCheck size={13} /> Grounded in your sources</span>
      </div>
      <div className={styles.visualFooter}><span>DOCRAG STUDIO</span><span>PDF · CSV · XLSX · TXT · DOCX</span></div>
    </div>
  )
  return (
    <div className={`${styles.visual} ${styles.movieVisual}`} aria-hidden="true">
      <div className={styles.visualTop}><span>DISCOVERY / PERSONALIZED</span><span className={styles.movieMark}>▶</span></div>
      <div className={styles.movieScene}>
        <div className={styles.movieOrbit} /><div className={styles.movieOrbitTwo} />
        <div className={styles.movieTileOne}><span>01</span><strong>THE<br />NEXT<br /><em>FAVORITE.</em></strong><i /></div>
        <div className={styles.movieTileTwo}><span>02</span><strong>A LITTLE<br />LESS<br /><em>SCROLLING.</em></strong><i /></div>
        <span className={styles.similarity}>CONNECTED BY SIMILARITY</span>
      </div>
      <div className={styles.visualFooter}><span>5,000+ FILMS</span><span>CONTENT-BASED DISCOVERY</span></div>
    </div>
  )
}

function ProjectCard({ project, onOpen }) {
  const notes = projectNotes[project.id]
  return (
    <Reveal as="article" className={`${styles.project} ${project.featured ? styles.featured : ''}`} aria-labelledby={`project-${project.id}`} delay={project.id === 3 ? 100 : 0}>
      <ProjectVisual id={project.id} />
      <div className={styles.projectBody}>
        <div className={styles.projectMeta}><span className="eyebrow">0{project.id} / {notes.category}</span>{project.featured && <span className={styles.featuredLabel}>Featured project</span>}</div>
        <h3 id={`project-${project.id}`}>{notes.title}</h3>
        <p className={styles.description}>{notes.description}</p>
        <div className={styles.tags}>{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        <button type="button" className={styles.caseLink} onClick={() => onOpen(project)} aria-label={`Read ${notes.title} case study`}>Read case study <ArrowRight size={17} /></button>
        <div className={styles.projectLinks}>
          <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`Open ${notes.title} live demo`}>Explore project <ArrowUpRight size={15} /></a>
          <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`View ${notes.title} source on GitHub`}><CodeXml size={14} /> Source code</a>
        </div>
        <details className={styles.details}>
          <summary>Under the hood <ArrowDown size={13} /></summary>
          <div className={styles.detailContent}>
            <ul>{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
            <ol aria-label="Technology pipeline">{project.stack.map((step, index) => <li key={step.label}><span>0{index + 1}</span>{step.label}</li>)}</ol>
          </div>
        </details>
      </div>
    </Reveal>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('All work')
  const [selectedProject, setSelectedProject] = useState(null)
  const projects = PROJECTS.filter(project => filter === 'All work' || projectNotes[project.id].category === filter)
  return (
    <section id="projects" className="section container" aria-labelledby="projects-heading">
      <Reveal className="section-label eyebrow" distance={12}><span>01</span><span>Selected work</span></Reveal>
      <Reveal className={styles.sectionHeading} delay={60}>
        <h2 id="projects-heading" className="section-title">Ideas into <em>working things.</em></h2>
        <p>A few explorations in making<br />intelligence useful.</p>
      </Reveal>
      <div className={styles.filterBar}>
        <div className={styles.filters} role="group" aria-label="Filter projects">{filters.map(item => <button key={item} onClick={() => setFilter(item)} aria-pressed={filter === item} className={filter === item ? styles.selected : ''}>{item}{item === 'All work' && <span>03</span>}</button>)}</div>
        <span className={styles.projectCount} role="status">{String(projects.length).padStart(2, '0')} projects</span>
      </div>
      <div className={styles.projectGrid}>{projects.map(project => <ProjectCard key={project.id} project={project} onOpen={setSelectedProject} />)}</div>
      {selectedProject && <ProjectCaseStudy key={selectedProject.id} project={selectedProject} onClose={() => setSelectedProject(null)} />}
      <a href="https://github.com/Sourav1331" target="_blank" rel="noopener noreferrer" className={styles.more}>There’s more where these came from.<span>Explore my GitHub <ArrowRight size={15} /></span></a>
    </section>
  )
}
