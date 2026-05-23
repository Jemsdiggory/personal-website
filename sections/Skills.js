'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  SiJavascript, SiPhp, SiPython,
  SiNetlify, SiVercel, SiNextdotjs, SiReact, SiTailwindcss,
  SiMysql, SiGithub, SiGit,
  SiUnity, SiBlender, SiFigma,
  SiLaravel, SiCanva,
} from 'react-icons/si'
import { TbBrandCSharp } from 'react-icons/tb'
import { FaCode, FaToolbox } from 'react-icons/fa'
import { MdOutlineDesignServices } from 'react-icons/md'

gsap.registerPlugin(ScrollTrigger)

const techCategories = [
  {
    title: 'Core Development',
    icon: FaCode,
    items: [
      { icon: TbBrandCSharp,  name: '',          highlight: true  },
      { icon: SiReact,        name: 'React',        highlight: true  },
      { icon: SiNextdotjs,    name: 'Next.js',      highlight: true  },
      { icon: SiTailwindcss,  name: 'Tailwind',     highlight: true  },
      { icon: SiJavascript,   name: 'JavaScript',   highlight: true },
      { icon: SiUnity,        name: 'Unity',        highlight: true  },
      { icon: SiLaravel,      name: 'Laravel',      highlight: false },
      { icon: SiPhp,          name: 'PHP',          highlight: false },
      { icon: SiPython,       name: 'Python',       highlight: false },
    ],
  },
  {
    title: 'Design Tools',
    icon: MdOutlineDesignServices,
    items: [
      { icon: SiFigma,   name: 'Figma',   highlight: true  },
      { icon: SiCanva,   name: 'Canva',   highlight: true  },
      { icon: SiBlender, name: 'Blender', highlight: false },
    ],
  },
  {
    title: 'Dev Tools & Workflow',
    icon: FaToolbox,
    items: [
      { icon: SiGit,    name: 'Git',     highlight: true  },
      { icon: SiGithub, name: 'GitHub',  highlight: true  },
      { icon: SiNetlify,name: 'Netlify', highlight: true },
      { icon: SiVercel, name: 'Vercel',  highlight: true  },
      { icon: SiMysql,  name: 'MySQL',   highlight: false },
    ],
  },
]

/* Scroll reveal */
function SkillTag({ item, revealDelay }) {
  const ref = useRef(null)
  const [hovered, setHovered] = useState(false)
  const Icon = item.icon

  useEffect(() => {
    // init state
    gsap.set(ref.current, { 
      y: 22,           
      opacity: 0,      
      scale: 0.88      
    })

    ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 92%',
      onEnter: () => {
        gsap.to(ref.current, {
          y: 0,                   
          opacity: 1,             
          scale: 1,              
          duration: 0.55,        
          delay: revealDelay,      
          ease: 'back.out(1.6)',   
        })
      },
      once: true,
    })
  }, [revealDelay])

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:        'flex',
        alignItems:     'center',
        gap:            '7px',
        padding:        '8px 14px',
        borderRadius:   '10px',
        fontFamily:     'var(--font-mono)',
        fontSize:       '0.72rem',
        fontWeight:     500,
        letterSpacing:  '0.04em',
        cursor:         'default',
        userSelect:     'none',
        transition:     'transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease, border-color 0.25s ease, color 0.25s ease',
        
        transform:      hovered ? 'translateY(-3px) scale(1.04)' : 'translateY(0) scale(1)',
        background:     hovered
          ? 'rgba(99,102,241,0.13)'          
          : item.highlight
            ? 'rgba(99,102,241,0.06)'        
            : 'rgba(255,255,255,0.03)',      
        border:         `1px solid ${hovered
          ? 'rgba(99,102,241,0.6)'           
          : item.highlight
            ? 'rgba(99,102,241,0.28)'        
            : 'rgba(255,255,255,0.07)'}`,   
        color:          hovered
          ? '#fff'                            
          : item.highlight
            ? 'var(--accent)'                 
            : 'var(--text-muted)',            
        boxShadow:      hovered
          ? '0 0 18px rgba(99,102,241,0.28), 0 4px 16px rgba(0,0,0,0.3)' 
          : 'none',
      }}
    >
      {/* icon */}
      <Icon
        size={14}
        style={{
          transition: 'transform 0.4s ease, color 0.25s ease',
          transform:  hovered ? 'rotate(12deg) scale(1.15)' : 'rotate(0) scale(1)',
          color:      hovered ? 'var(--accent2)' : 'inherit',
          flexShrink: 0,
        }}
      />
      {item.name}
    </div>
  )
}

function CategoryCard({ category, cardIndex }) {
  const headerRef = useRef(null)
  const CategoryIcon = category.icon

  useEffect(() => {
    
    gsap.set(headerRef.current, { 
      x: -24,      
      opacity: 0   
    })

    // SCROLL TRIGGER header
    
    ScrollTrigger.create({
      trigger: headerRef.current,
      start: 'top 88%',
      onEnter: () => {
        gsap.to(headerRef.current, {
          x: 0,                    
          opacity: 1,              
          duration: 0.65,          
          delay: cardIndex * 0.12, 
          ease: 'power3.out',      
        })
      },
      once: true,
    })
  }, [cardIndex])

  
  const baseDelay = cardIndex * 0.05

  return (
    <div
      style={{
        background:   'rgba(255,255,255,0.02)',
        border:       '1px solid rgba(255,255,255,0.06)',
        borderRadius: '16px',
        padding:      '28px',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Header slides */}
      <div ref={headerRef} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <div style={{ width: '3px', height: '18px', borderRadius: '2px', background: 'var(--accent)', flexShrink: 0 }} />
        <CategoryIcon size={15} style={{ color: 'var(--accent2)', flexShrink: 0 }} />
        <h3
          style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.68rem',
            fontWeight:    600,
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color:         'var(--text-muted)',
            margin:        0,
          }}
        >
          {category.title}
        </h3>
      </div>

      {/* Tags cascade  staggered reveal */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {category.items.map((item, tagIdx) => (
          <SkillTag
            key={item.name}
            item={item}
            revealDelay={baseDelay + tagIdx * 0.06}
          />
        ))}
      </div>
    </div>
  )
}

/* Skills Section   */
export default function Skills() {
  const sectionRef  = useRef(null)
  const eyebrowRef  = useRef(null)
  const titleRef    = useRef(null)
  const subRef      = useRef(null)
  const hrRef       = useRef(null)

  useEffect(() => {
    
    const ctx = gsap.context(() => {

      gsap.from(eyebrowRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        y: 20,                  
        opacity: 0,             
        duration: 0.6,          
        ease: 'power3.out',     
      })
      
      const words = titleRef.current.querySelectorAll('.word')
      gsap.from(words, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 76%', once: true },
        y: 48,                  
        opacity: 0,            
        rotateX: -30,           
        duration: 0.7,         
        stagger: 0.08,          
        ease: 'power4.out',     
      })

      
      gsap.from(subRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', once: true },
        y: 16,                  
        opacity: 0,             
        duration: 0.6,          
        delay: 0.3,             
        ease: 'power3.out',
      })

      
      gsap.from(hrRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true },
        scaleX: 0,              
        transformOrigin: 'left center', 
        duration: 1,            
        delay: 0.4,             
        ease: 'expo.out',       
      })

    }, sectionRef)

    
    return () => ctx.revert()
  }, [])

  const titleWords = ['Tools', 'I', 'Master']

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{
        position:   'relative',
        width:      '100%',
        padding:    '130px 0 150px',
        background: 'var(--bg)',
        overflow:   'hidden',
      }}
    >
      {/* Bg glows  */}
      <div style={{
        position: 'absolute', top: '-10%', right: '-8%',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 65%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '5%', left: '-5%',
        width: '380px', height: '380px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(147,197,253,0.07) 0%, transparent 65%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}>

        {/* Label Animated via gsap.from() in useEffect */}
        <p
          ref={eyebrowRef}
          style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.7rem',
            letterSpacing: '0.3em',
            color:         'var(--accent)',
            textTransform: 'uppercase',
            marginBottom:  '16px',
            display:       'flex',
            alignItems:    'center',
            gap:           '12px',
          }}
        >
          <span style={{ display: 'inline-block', width: '32px', height: '1px', background: 'var(--accent)' }} />
          Tech Stack & Expertise
        </p>

        {/* Title */}
        <h2
          ref={titleRef}
          style={{
            fontFamily:    'var(--font-display)',
            fontWeight:    800,
            fontSize:      'clamp(2.4rem, 5.5vw, 4.2rem)',
            letterSpacing: '-0.03em',
            lineHeight:    1.05,
            margin:        '0 0 16px',
            display:       'flex',
            flexWrap:      'wrap',
            gap:           '0.28em',
            perspective:   '600px',
          }}
        >
          {titleWords.map((word, i) => (
            <span
              key={word}
              className="word"
              style={{
                display:     'inline-block',
                color:       i === 2 ? 'transparent' : 'var(--text)',
                WebkitTextStroke: i === 2 ? '1px var(--accent)' : undefined,
              }}
            >
              {word}
            </span>
          ))}
        </h2>

        {/* Subtitle */}
        <p
          ref={subRef}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize:   '0.78rem',
            color:      'var(--text-muted)',
            marginBottom: '10px',
            letterSpacing: '0.02em',
          }}
        >
          {techCategories.reduce((acc, c) => acc + c.items.length, 0)} technologies across {techCategories.length} categories
        </p>

        {/* Divider line */}
        <div
          ref={hrRef}
          style={{
            height:     '1px',
            width:      '200px',
            marginBottom: '64px',
            background: 'linear-gradient(90deg, var(--accent), var(--accent2), transparent)',
          }}
        />

        {/* Category cards grid */}
        <div
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap:                 '20px',
          }}
        >
          {techCategories.map((category, i) => (
            <CategoryCard key={category.title} category={category} cardIndex={i} />
          ))}
        </div>

        {/* Stats counter */}
        <div
          style={{
            marginTop:      '56px',
            display:        'flex',
            gap:            '32px',
            flexWrap:       'wrap',
          }}
        >
          {techCategories.map((cat) => (
            <div key={cat.title} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize:   '1.8rem',
                fontWeight: 800,
                color:      'var(--accent)',
                lineHeight: 1,
              }}>
                {cat.items.length}
              </span>
              <span style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      '0.6rem',
                color:         'var(--text-muted)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}>
                {cat.title}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}