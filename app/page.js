'use client'

import { useState } from 'react'
import LoadingScreen from '@/components/LoadingScreen'
import Hero         from '@/sections/Hero'
import About        from '@/sections/About'
import LifeCollage  from '@/sections/LifeCollage'
import Skills       from '@/sections/Skills'
import FiercePhoto  from '@/sections/FiercePhoto'
import Projects     from '@/sections/Projects'
import ApiDemo from '@/sections/ApiDemo'
import Contact from '@/sections/Contact'


export default function Home() {
  const [loaded, setLoaded] = useState(false)

  return (
    <main>
      <LoadingScreen onComplete={() => setLoaded(true)} />

      <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.5s ease' }}>
        <Hero />
        <About />
        <LifeCollage />
        <Skills />
        <FiercePhoto />
        <Projects />
        <ApiDemo />
        <Contact />
      </div>
    </main>
  )
}