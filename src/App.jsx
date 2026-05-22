import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Terminal from './components/Terminal'
import SectionProgress from './components/SectionProgress'
import './App.css'

export default function App() {
  const [termOpen, setTermOpen] = useState(false)

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setTermOpen(false) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <>
      <Navbar onTerminal={() => setTermOpen(true)} />
      <SectionProgress />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <Terminal open={termOpen} onClose={() => setTermOpen(false)} />
    </>
  )
}