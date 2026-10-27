import { ArrowDown, Braces, Database, Workflow } from 'lucide-react'
import { SKILLS } from '../data'
import Reveal from './Reveal'
import styles from './Skills.module.css'

const disciplines = [
  { icon: Workflow, title: 'Generative AI & agents', description: 'Connecting language models to the information and tools they need. RAG pipelines, document search, and coordinated agent workflows.', tags: ['LangChain', 'LangGraph', 'ChromaDB', 'LLMs', 'RAG'] },
  { icon: Database, title: 'Machine learning & data', description: 'Finding structure in raw data. Exploration, feature engineering, model training, and recommendation systems built on solid fundamentals.', tags: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'SQL'] },
  { icon: Braces, title: 'Applications & deployment', description: 'Taking an idea beyond the notebook. APIs, responsive interfaces, and containerized applications that bring the whole system together.', tags: ['FastAPI', 'Flask', 'React', 'Streamlit', 'Docker'] },
]

export default function Skills() {
  return (
    <section id="skills" className="section container" aria-labelledby="skills-heading">
      <Reveal className="section-label eyebrow" distance={12}><span>03</span><span>What I bring to the table</span></Reveal>
      <Reveal className={styles.heading} delay={60}>
        <h2 id="skills-heading" className="section-title">The right tools.<br /><em>The bigger picture.</em></h2>
        <p>I care about how the pieces fit together.<br />These are the areas I’m building in.</p>
      </Reveal>
      <div className={styles.disciplines}>
        {disciplines.map(({ icon: Icon, title, description, tags }, index) => (
          <Reveal className={styles.discipline} key={title} delay={index * 100}>
            <div className={styles.iconRow}><Icon size={24} strokeWidth={1.2} /><span className="eyebrow">0{index + 1}</span></div>
            <h3>{title}</h3><p>{description}</p>
            <div className={styles.tags}>{tags.map(tag => <span key={tag}>{tag}</span>)}</div>
          </Reveal>
        ))}
      </div>
      <details className={styles.toolkit}>
        <summary><span>Also in the toolkit <span>Libraries, languages & fundamentals</span></span><ArrowDown size={15} /></summary>
        <div className={styles.toolkitGrid}>{SKILLS.map(group => <div key={group.category}><h3>{group.category}</h3><p>{group.items.join(' · ')}</p></div>)}</div>
      </details>
    </section>
  )
}
