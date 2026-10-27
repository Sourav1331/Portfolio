import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Terminal from './components/Terminal'
import './App.css'

export default function App() {
  const [termOpen, setTermOpen] = useState(false)

  useEffect(() => {
    const originalTitle = document.title
    const updateTitle = () => {
      document.title = document.hidden ? 'Come back to my portfolio!' : originalTitle
    }

    updateTitle()
    document.addEventListener('visibilitychange', updateTitle)
    return () => {
      document.removeEventListener('visibilitychange', updateTitle)
      document.title = originalTitle
    }
  }, [])

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar onTerminal={() => setTermOpen(true)} />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Projects />
        <About />
        <Skills />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <Terminal open={termOpen} onClose={() => setTermOpen(false)} />
    </>
  )
}
