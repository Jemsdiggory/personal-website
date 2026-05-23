'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  FaGithub, FaLinkedin, FaInstagram, FaGitlab,
} from 'react-icons/fa'
import { SiItchdotio } from 'react-icons/si'

gsap.registerPlugin(ScrollTrigger)

const socials = [
  { icon: FaGithub,    url: 'https://github.com/JemsDiggory',   label: 'github'    },
  { icon: FaLinkedin,  url: 'https://linkedin.com/in/jemima05', label: 'linkedin'  },
  { icon: SiItchdotio, url: 'https://jemsdiggory.itch.io',      label: 'itch.io'   },
  { icon: FaInstagram, url: 'https://instagram.com/jeymss00',   label: 'instagram' },
  { icon: FaGitlab,    url: 'https://gitlab.com/jemimadiggory', label: 'gitlab'    },
]

const projects = [
  {
    label: 'Game Project',
    title: 'Rise Against',
    desc: '2D RPG about environmental issues. Quest systems, AI & combat, dialogue, inventory.',
    tags: [
      { text: 'Unity', bg: 'rgba(123,108,255,0.15)', border: 'rgba(123,108,255,0.4)', color: '#a99fff' },
      { text: '2D',    bg: 'rgba(123,108,255,0.15)', border: 'rgba(123,108,255,0.4)', color: '#a99fff' },
      { text: 'RPG',   bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.35)' },
    ],
    accentColor: '#7b6cff',
    btnKey: 'Y',
  },
  {
    label: 'Web App',
    title: 'Mini CMS',
    desc: 'Game blog with CRUD & WYSIWYG editor. Built with PHP and MySQL.',
    tags: [
      { text: 'PHP',        bg: 'rgba(61,255,209,0.1)',  border: 'rgba(61,255,209,0.35)', color: '#3dffd1' },
      { text: 'MySQL',      bg: 'rgba(61,255,209,0.1)',  border: 'rgba(61,255,209,0.35)', color: '#3dffd1' },
      { text: 'Vanilla JS', bg: 'rgba(6,182,212,0.08)', border: 'rgba(6,182,212,0.25)', color: '#67e8f9' },
    ],
    accentColor: '#3dffd1',
    btnKey: 'A',
  },
  {
    label: 'UI/UX Design',
    title: 'OneBox Portal',
    desc: 'Modern redesign for the OneBox portal. Legacy page → interactive business profile.',
    tags: [
      { text: 'Laravel', bg: 'rgba(255,107,138,0.1)', border: 'rgba(255,107,138,0.35)', color: '#ff6b8a' },
      { text: 'PHP',     bg: 'rgba(255,107,138,0.1)', border: 'rgba(255,107,138,0.35)', color: '#ff6b8a' },
      { text: 'CSS',     bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.22)', color: '#fdba74' },
    ],
    accentColor: '#ff6b8a',
    btnKey: 'X',
  },
  {
    label: 'UI/UX Design',
    title: 'Portal Next.js',
    desc: 'Modern UI/UX redesign of an existing platform. Transformed outdated interfaces into a sleek, responsive app.',
    tags: [
      { text: 'Next.js', bg: 'rgba(250,199,75,0.1)', border: 'rgba(250,199,75,0.35)', color: '#fac74b' },
      { text: 'React',   bg: 'rgba(250,199,75,0.1)', border: 'rgba(250,199,75,0.35)', color: '#fac74b' },
      { text: 'CSS',     bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.22)', color: '#fdba74' },
    ],
    accentColor: '#fac74b',
    btnKey: 'B',
  }
]

// Button config: color + projIdx 
const BTN_CONFIG = {
  Y: { color: '#7b6cff', projIdx: 0 },
  A: { color: '#3dffd1', projIdx: 1 },
  X: { color: '#ff6b8a', projIdx: 2 },
  B: { color: '#fac74b', projIdx: 3 },
}

// position styles per key
const BTN_POS = {
  Y: { top:  0,  left: '50%', marginLeft: -13 },                    // top center
  A: { bottom: 0, left: '50%', marginLeft: -13 },                   // bottom center
  X: { top: '50%', left:  0,  marginTop: -13  },                    // left center
  B: { top: '50%', right: 0,  marginTop: -13  },                    // right center
}

function ActionButton({ btnKey, activeProj, onPress }) {
  const cfg = BTN_CONFIG[btnKey]
  const pos = BTN_POS[btnKey]
  const isActive = cfg.projIdx === activeProj
  const [pressed, setPressed] = useState(false)

  const handleClick = () => {
    if (cfg.projIdx === null) return
    setPressed(true)
    setTimeout(() => setPressed(false), 180)
    onPress(cfg.projIdx)
  }

  return (
    <motion.button
      onClick={handleClick}
      animate={pressed ? { scale: 0.82 } : isActive ? { scale: 1.08 } : { scale: 1 }}
      whileHover={{ scale: 1.15 }}
      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
      style={{
        position: 'absolute',
        width: 26,
        height: 26,
        borderRadius: '50%',
        border: `1.5px solid ${cfg.color}`,
        background: isActive ? `${cfg.color}28` : `${cfg.color}10`,
        color: cfg.color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'DM Mono', monospace",
        fontSize: 9,
        fontWeight: 700,
        cursor: cfg.projIdx !== null ? 'pointer' : 'default',
        boxShadow: isActive
          ? `0 0 16px ${cfg.color}55, inset 0 0 8px ${cfg.color}20`
          : `0 2px 6px rgba(0,0,0,0.4)`,
        transition: 'box-shadow 0.2s, background 0.2s',
        ...pos,
      }}
    >
      {btnKey}
    </motion.button>
  )
}

const DPAD_POS = {
  up:    { top: 0,    left: '50%', marginLeft: -11 },
  down:  { bottom: 0, left: '50%', marginLeft: -11 },
  left:  { left: 0,  top: '50%',  marginTop: -11  },
  right: { right: 0, top: '50%',  marginTop: -11  },
}

function DpadButton({ dir, onPress }) {
  const [pressed, setPressed] = useState(false)
  const arrowMap = { up: '▲', down: '▼', left: '◀', right: '▶' }

  const handleClick = () => {
    setPressed(true)
    setTimeout(() => setPressed(false), 140)
    onPress(dir)
  }

  return (
    <motion.button
      onClick={handleClick}
      animate={pressed ? { scale: 0.85 } : { scale: 1 }}
      whileHover={{ scale: 1.1 }}
      transition={{ type: 'spring', stiffness: 600, damping: 30 }}
      style={{
        position: 'absolute',
        width: 22,
        height: 22,
        borderRadius: 4,
        background: pressed ? 'rgba(99,102,241,0.3)' : 'rgba(20,28,50,0.9)',
        border: `1px solid ${pressed ? 'rgba(99,102,241,0.6)' : 'rgba(99,102,241,0.2)'}`,
        color: 'rgba(99,102,241,0.5)',
        fontSize: 7,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        ...DPAD_POS[dir],
      }}
    >
      {arrowMap[dir]}
    </motion.button>
  )
}

function AnalogStick() {
  const stickRef = useRef(null)
  const isDragging = useRef(false)
  const [stickPos, setStickPos] = useState({ x: 0, y: 0 })
  const MAX = 10

  const handleMouseDown = (e) => {
    isDragging.current = true
    e.preventDefault()
  }

  useEffect(() => {
    const onMove = (e) => {
      if (!isDragging.current || !stickRef.current) return
      const rect = stickRef.current.parentElement.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      let dx = e.clientX - cx
      let dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist > MAX) {
        dx = (dx / dist) * MAX
        dy = (dy / dist) * MAX
      }
      setStickPos({ x: dx, y: dy })
    }
    const onUp = () => {
      if (!isDragging.current) return
      isDragging.current = false
      setStickPos({ x: 0, y: 0 })
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [])

  return (
    <div style={{
      width: 52,
      height: 52,
      borderRadius: '50%',
      background: 'radial-gradient(circle at 40% 35%, #252b3d, #0f1219)',
      border: '1px solid rgba(99,102,241,0.15)',
      position: 'relative',
      flexShrink: 0,
    }}>
      <motion.div
        ref={stickRef}
        onMouseDown={handleMouseDown}
        animate={{ x: stickPos.x, y: stickPos.y }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        style={{
          width: 28,
          height: 28,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 30%, #2a3150, #141824)',
          border: '1px solid rgba(99,102,241,0.3)',
          position: 'absolute',
          top: '50%',
          left: '50%',
          marginTop: -14,
          marginLeft: -14,
          cursor: 'grab',
          boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
        }}
        whileHover={{ boxShadow: '0 0 12px rgba(99,102,241,0.35)' }}
      />
    </div>
  )
}

function GamepadCard() {
  const [activeIdx, setActiveIdx] = useState(0)
  const proj = projects[activeIdx]

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useTransform(mouseY, [-150, 150], [7, -7])
  const rotateY = useTransform(mouseX, [-150, 150], [-7, 7])

  const wrapRef = useRef(null)

  const handleMouseMove = (e) => {
    const rect = wrapRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }
  const handleMouseLeave = () => {
    animate(mouseX, 0, { type: 'spring', stiffness: 200, damping: 30 })
    animate(mouseY, 0, { type: 'spring', stiffness: 200, damping: 30 })
  }

  const handleDpad = (dir) => {
    if (dir === 'up' || dir === 'right') setActiveIdx((i) => (i + 1) % projects.length)
    if (dir === 'down' || dir === 'left') setActiveIdx((i) => (i - 1 + projects.length) % projects.length)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', width: '100%' }}>

      {/* Social icons */}
      <div className="flex lg:hidden flex-wrap justify-center gap-2 mb-6">
        {socials.map((item, i) => {
          const Icon = item.icon
          return (
            <motion.a
              key={item.label}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.0 + i * 0.08 }}
              className="flex items-center justify-center rounded-xl border"
              style={{ width: 36, height: 36, background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.35)' }}
              whileHover={{ borderColor: 'var(--accent)', color: 'var(--accent)', backgroundColor: 'rgba(99,102,241,0.12)' }}
            >
              <Icon size={14} />
            </motion.a>
          )
        })}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 0, width: '100%', justifyContent: 'flex-end' }}>

        {/* Social icons */}
        <div className="hidden lg:flex flex-col items-center gap-3 pr-4">
          <motion.div
            initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            style={{ width: 1, height: 48, background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.12))', transformOrigin: 'top' }}
          />
          {socials.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.a
                key={item.label}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{
                  opacity: 1, scale: 1,
                  y: [0, i % 2 === 0 ? -5 : 5, 0],
                }}
                transition={{
                  opacity: { duration: 0.35, delay: 1.0 + i * 0.08 },
                  scale:   { duration: 0.35, delay: 1.0 + i * 0.08 },
                  y: { duration: 3 + i * 0.35, repeat: Infinity, ease: 'easeInOut', delay: i * 0.25 },
                }}
                whileHover={{ scale: 1.2 }}
                className="flex items-center justify-center rounded-xl border transition-colors duration-200"
                style={{ width: 36, height: 36, background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.35)' }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--accent)'
                  e.currentTarget.style.color = 'var(--accent)'
                  e.currentTarget.style.background = 'rgba(99,102,241,0.12)'
                  e.currentTarget.style.boxShadow = '0 0 14px rgba(99,102,241,0.3)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.35)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <Icon size={14} />
              </motion.a>
            )
          })}
          <motion.div
            initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
            transition={{ duration: 0.5, delay: 1.8 }}
            style={{ width: 1, height: 48, background: 'linear-gradient(to bottom, rgba(255,255,255,0.12), transparent)', transformOrigin: 'top' }}
          />
        </div>

        {/* GAMEPAD */}
        <div>
          <span style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.2)',
            display: 'block',
            textAlign: 'right',
            marginBottom: 12,
          }}>
            Featured Work
          </span>

          <motion.div
            ref={wrapRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
              perspective: 900,
              cursor: 'default',
            }}
          >
            <div style={{
              position: 'relative',
              width: 360,
              height: 220,
              background: 'linear-gradient(145deg, #1e2433, #141820)',
              borderRadius: '50% 50% 40% 40% / 35% 35% 50% 50%',
              border: '1.5px solid rgba(99,102,241,0.2)',
              boxShadow: `
                0 0 60px rgba(99,102,241,0.12),
                inset 0 1px 0 rgba(255,255,255,0.07),
                inset 0 -2px 8px rgba(0,0,0,0.4)
              `,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 28px',
            }}>

              <div style={{
                position: 'absolute',
                bottom: -38,
                left: 30,
                width: 100,
                height: 70,
                background: 'linear-gradient(160deg, #1a1f2e, #0f1219)',
                borderRadius: '0 0 60% 60% / 0 0 80% 80%',
                border: '1.5px solid rgba(99,102,241,0.12)',
                borderTop: 'none',
                boxShadow: 'inset 0 -4px 12px rgba(0,0,0,0.4)',
              }} />
              <div style={{
                position: 'absolute',
                bottom: -38,
                right: 30,
                width: 100,
                height: 70,
                background: 'linear-gradient(160deg, #1a1f2e, #0f1219)',
                borderRadius: '0 0 60% 60% / 0 0 80% 80%',
                border: '1.5px solid rgba(99,102,241,0.12)',
                borderTop: 'none',
                boxShadow: 'inset 0 -4px 12px rgba(0,0,0,0.4)',
              }} />

              <div style={{ position: 'relative', width: 72, height: 72, flexShrink: 0 }}>
                {['up','down','left','right'].map(dir => (
                  <DpadButton key={dir} dir={dir} onPress={handleDpad} />
                ))}
                <div style={{
                  position: 'absolute',
                  top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 20, height: 20,
                  background: '#0f1219',
                  borderRadius: 3,
                  zIndex: 2,
                }} />
              </div>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
                flex: 1,
                padding: '0 12px',
                position: 'relative',
                zIndex: 2,
              }}>
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    width: '100%',
                    background: '#080b10',
                    borderRadius: 8,
                    border: `1px solid ${proj.accentColor}35`,
                    padding: '8px 10px',
                    boxShadow: `inset 0 2px 8px rgba(0,0,0,0.6), 0 0 20px ${proj.accentColor}15`,
                    minHeight: 80,
                  }}
                >
                  <div style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 8,
                    letterSpacing: '0.15em',
                    color: proj.accentColor,
                    opacity: 0.7,
                    textTransform: 'uppercase',
                    marginBottom: 3,
                  }}>
                    {proj.label}
                  </div>
                  <div style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 13,
                    fontWeight: 700,
                    color: '#e0e0f0',
                    lineHeight: 1.2,
                    marginBottom: 3,
                  }}>
                    {proj.title}
                  </div>
                  <div style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 8,
                    color: 'rgba(200,200,220,0.45)',
                    lineHeight: 1.5,
                  }}>
                    {proj.desc}
                  </div>
                </motion.div>

                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <button style={{
                    padding: '3px 10px',
                    borderRadius: 20,
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(99,102,241,0.18)',
                    color: 'rgba(200,200,220,0.35)',
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 8,
                    letterSpacing: '0.1em',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                  }}>
                    select
                  </button>

                  <motion.div
                    animate={{ opacity: [0.4, 0.9, 0.4], boxShadow: [
                      '0 0 6px rgba(99,102,241,0.3)',
                      '0 0 12px rgba(99,102,241,0.6)',
                      '0 0 6px rgba(99,102,241,0.3)',
                    ]}}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                      width: 8, height: 8,
                      borderRadius: '50%',
                      background: 'rgba(99,102,241,0.6)',
                    }}
                  />

                  <button style={{
                    padding: '3px 10px',
                    borderRadius: 20,
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(99,102,241,0.18)',
                    color: 'rgba(200,200,220,0.35)',
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 8,
                    letterSpacing: '0.1em',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                  }}>
                    start
                  </button>
                </div>
              </div>

              <div style={{ position: 'relative', width: 80, height: 80, flexShrink: 0 }}>
                {Object.keys(BTN_CONFIG).map(key => (
                  <ActionButton
                    key={key}
                    btnKey={key}
                    activeProj={activeIdx}
                    onPress={setActiveIdx}
                  />
                ))}
              </div>

            </div>

            <motion.div
              key={`tags-${activeIdx}`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              style={{
                display: 'flex',
                gap: 6,
                justifyContent: 'center',
                marginTop: 52,
              }}
            >
              {proj.tags.map(tag => (
                <span key={tag.text} style={{
                  padding: '3px 10px',
                  borderRadius: 20,
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 9,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  background: tag.bg,
                  border: `1px solid ${tag.border}`,
                  color: tag.color,
                }}>
                  {tag.text}
                </span>
              ))}
            </motion.div>

            <div style={{
              textAlign: 'center',
              marginTop: 8,
              fontFamily: "'DM Mono', monospace",
              fontSize: 9,
              color: 'rgba(255,255,255,0.18)',
              letterSpacing: '0.08em',
            }}>
              press Y / A / X to switch · d-pad to navigate
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  )
}

// Main Hero export 

export default function Hero() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.hero-content', {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const statItems = [
    { label: 'Digital Projects', value: '10+' },
    { label: 'Games on Itch.io', value: '4+' },
    { label: 'Responsive Web Apps', value: '4+' },
    { label: 'Years Experience', value: '3+' },
  ]

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-32 overflow-hidden"
      style={{ background: 'var(--bg)', paddingTop: '10vh', paddingBottom: '8vh' }}
    >
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute rounded-full blur-[120px] opacity-20"
          style={{ width: 600, height: 600, top: '-10%', left: '-10%', background: 'radial-gradient(circle, #7b6cff, transparent)' }} />
        <div className="absolute rounded-full blur-[100px] opacity-15"
          style={{ width: 400, height: 400, bottom: '10%', right: '-5%', background: 'radial-gradient(circle, #3dffd1, transparent)' }} />
        <div className="absolute inset-0 dot-grid opacity-30" />
      </div>

      <div className="hero-content grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-4 items-center w-full max-w-7xl mx-auto">

        {/* LEFT */}
        <div className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-mono text-xs tracking-[0.3em] uppercase mb-6 flex items-center gap-3"
            style={{ color: 'var(--accent2)' }}
          >
            <span className="inline-block w-8 h-px"
              style={{ background: 'var(--accent2)', boxShadow: '0 0 6px var(--accent2)' }} />
            Creative Personal Website
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-extrabold leading-[1.0] mb-3"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', color: 'var(--text)', letterSpacing: '-0.03em' }}
          >
            Kahlaa
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-extrabold leading-[1.0] mb-8"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', letterSpacing: '-0.03em' }}
          >
            <span className="shimmer-text">Aulia Jemima</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-3 mb-10"
          >
            <span className="font-mono text-sm px-4 py-1.5 rounded-full border"
              style={{ color: 'var(--accent2)', borderColor: 'rgba(147,197,253,0.3)', background: 'rgba(147,197,253,0.06)' }}>
              Creative Developer
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="font-display text-base sm:text-lg mb-10 max-w-xl leading-relaxed"
            style={{ color: 'var(--text-muted)' }}
          >
            Creative Front-End Developer with a background in game development and visual design.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap gap-4"
          >
            <a href="#skills" className="btn-glow font-mono text-sm px-6 py-3 rounded-xl border font-medium"
              style={{ background: 'var(--accent)', borderColor: 'var(--accent)', color: '#fff', boxShadow: '0 0 20px rgba(99,102,241,0.3)' }}>
              View Projects
            </a>
            <a href="#about" className="btn-glow font-mono text-sm px-6 py-3 rounded-xl border"
              style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
              About Me
            </a>
            <a href="#contact" className="btn-glow font-mono text-sm px-6 py-3 rounded-xl border"
              style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
              Contact
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="flex flex-wrap gap-8 mt-12"
          >
            {statItems.map((s, idx) => (
              <motion.div key={s.label}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.85 + idx * 0.08 }}
                className="flex flex-col cursor-default"
              >
                <span className="font-display font-extrabold text-3xl" style={{ color: 'var(--accent)' }}>
                  {s.value}
                </span>
                <span className="font-mono text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                  {s.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT (gamepad)*/}
        <motion.div
          initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-end"
          style={{ minHeight: '520px' }}
        >
          <GamepadCard />
        </motion.div>
      </div>

      {/* hr bottom */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="w-full mt-16 max-w-7xl mx-auto"
      >
        <hr className="hr-accent" />
      </motion.div>
    </section>
  )
}