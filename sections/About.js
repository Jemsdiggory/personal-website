'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CRETIVOX_LOGO = '/assets/img/LogoCretivox.png'

// typewriter quote data
const QUOTE_LINES = [
  { text: 'while(alive) {', color: 'var(--accent2)',  indent: 0  },
  { text: '  code();',      color: 'var(--text)',      indent: 1  },
  { text: '  game();',      color: 'var(--text)',      indent: 1  },
  { text: '  repeat_playlist();', color: 'var(--text)', indent: 1 },
  { text: '}',              color: 'var(--accent2)',   indent: 0  },
]
const ATTRIBUTION = '// — my life, probably'

function TypewriterQuote({ triggered }) {
  const [displayed, setDisplayed]   = useState([])  // array of {lineIdx, chars}
  const [done, setDone]             = useState(false)
  const [showAttr, setShowAttr]     = useState(false)
  const timerRef                    = useRef(null)
  const hasRun                      = useRef(false)

  const runTypewriter = useCallback(() => {
    if (hasRun.current) return
    hasRun.current = true

    let lineIdx  = 0
    let charIdx  = 0
    const delay  = 38   // ms per char

    const tick = () => {
      const line = QUOTE_LINES[lineIdx]
      if (!line) {
        // all lines done — show attribution
        setTimeout(() => setShowAttr(true), 300)
        setDone(true)
        return
      }

      setDisplayed(prev => {
        const next = [...prev]
        if (!next[lineIdx]) next[lineIdx] = { lineIdx, chars: '' }
        next[lineIdx] = { lineIdx, chars: line.text.slice(0, charIdx + 1) }
        return next
      })

      charIdx++
      if (charIdx >= line.text.length) {
        lineIdx++
        charIdx = 0
        timerRef.current = setTimeout(tick, delay + 60) // slight pause between lines
      } else {
        timerRef.current = setTimeout(tick, delay)
      }
    }

    timerRef.current = setTimeout(tick, 300)
  }, [])

  useEffect(() => {
    if (triggered) runTypewriter()
    return () => clearTimeout(timerRef.current)
  }, [triggered, runTypewriter])

  return (
    <div style={{
      marginTop: '36px',
      padding: '20px 24px',
      borderRadius: '12px',
      background: 'rgba(13,17,23,0.6)',
      border: '1px solid rgba(99,102,241,0.2)',
      backdropFilter: 'blur(8px)',
      fontFamily: 'var(--font-mono)',
      fontSize: '0.82rem',
      lineHeight: 2,
      minHeight: '160px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* subtle glow */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)',
        pointerEvents: 'none',
      }} />

      {/* line number gutter */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {QUOTE_LINES.map((line, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
            {/* line number */}
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
              color: 'rgba(255,255,255,0.15)', width: '16px',
              flexShrink: 0, textAlign: 'right', userSelect: 'none',
            }}>{i + 1}</span>

            {/* code text */}
            <span style={{
              color: line.color,
              paddingLeft: line.indent ? '16px' : '0',
              letterSpacing: '0.02em',
            }}>
              {displayed[i]?.chars ?? ''}
              {/* blinking cursor on active line */}
              {!done && displayed[i] !== undefined &&
               (displayed[i + 1] === undefined || !displayed[i + 1]) && (
                <span style={{
                  display: 'inline-block',
                  width: '2px', height: '0.9em',
                  background: 'var(--accent)',
                  marginLeft: '2px',
                  verticalAlign: 'middle',
                  animation: 'blink-cursor 0.75s step-end infinite',
                }} />
              )}
            </span>
          </div>
        ))}
      </div>

      {/* attribution line */}
      <div style={{
        marginTop: '8px',
        paddingLeft: '32px',
        fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
        color: 'rgba(255,255,255,0.2)',
        fontStyle: 'italic',
        opacity: showAttr ? 1 : 0,
        transform: showAttr ? 'translateY(0)' : 'translateY(6px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
        letterSpacing: '0.04em',
      }}>
        {ATTRIBUTION}
      </div>

      <style>{`
        @keyframes blink-cursor {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </div>
  )
}

// main about section
export default function About() {
  const sectionRef    = useRef(null)
  const eyebrowRef    = useRef(null)
  const titleRef      = useRef(null)
  const bioRef        = useRef(null)
  const cardRef       = useRef(null)
  const ropeRef       = useRef(null)
  const [quoteTriggered, setQuoteTriggered] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.from(eyebrowRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        y: 20, opacity: 0, duration: 0.6, ease: 'power3.out',
      })

      const words = titleRef.current.querySelectorAll('.word')
      gsap.from(words, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 76%', once: true },
        y: 60, opacity: 0, rotateX: -25,
        duration: 0.8, stagger: 0.12, ease: 'power4.out',
      })

      const paras = bioRef.current.querySelectorAll('.bio-para')
      gsap.from(paras, {
        scrollTrigger: { trigger: bioRef.current, start: 'top 82%', once: true },
        y: 36, opacity: 0,
        duration: 0.75, stagger: 0.16, ease: 'power3.out',
      })

      // trigger typewriter when bio is visible
      ScrollTrigger.create({
        trigger: bioRef.current,
        start: 'top 75%',
        once: true,
        onEnter: () => setQuoteTriggered(true),
      })

      gsap.from(ropeRef.current, {
        scrollTrigger: { trigger: cardRef.current, start: 'top 85%', once: true },
        scaleY: 0, transformOrigin: 'top center',
        duration: 0.6, ease: 'power2.out',
      })

      gsap.from(cardRef.current, {
        scrollTrigger: { trigger: cardRef.current, start: 'top 85%', once: true },
        y: -40, opacity: 0, duration: 0.7, delay: 0.35, ease: 'back.out(1.4)',
      })

      gsap.to(cardRef.current, {
        y: '-12px', duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1,
      })

      gsap.to(ropeRef.current, {
        skewX: 1.5, duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1,
      })

    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        position: 'relative', width: '100%',
        padding: '130px 0 150px',
        background: 'var(--bg)', overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.8); }
        }
        @keyframes shimmer-card {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .lanyard-card-inner {
          transition: box-shadow 0.35s ease, transform 0.35s ease;
        }
        .lanyard-card-inner:hover {
          box-shadow: 0 32px 80px rgba(99,102,241,0.4) !important;
          transform: rotate(-1.5deg) scale(1.02);
        }
        @media (max-width: 900px) {
          .about-grid { flex-direction: column !important; }
          .lanyard-wrap { align-items: center !important; margin-top: 56px; width: 100% !important; }
        }
      `}</style>

      <div style={{
        position: 'absolute', top: '10%', left: '-8%',
        width: '480px', height: '480px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.09) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />
      <div className="dot-grid" style={{
        position: 'absolute', inset: 0, opacity: 0.25, pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}>

        {/* Eyebrow */}
        <p ref={eyebrowRef} style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
          letterSpacing: '0.3em', color: 'var(--accent)',
          textTransform: 'uppercase', marginBottom: '16px',
          display: 'flex', alignItems: 'center', gap: '12px',
        }}>
          <span style={{ display: 'inline-block', width: '32px', height: '1px', background: 'var(--accent)' }} />
          About Me
        </p>

        {/* Title */}
        <h2 ref={titleRef} style={{
          fontFamily: 'var(--font-display)', fontWeight: 800,
          fontSize: 'clamp(2.6rem, 6vw, 5rem)', letterSpacing: '-0.03em',
          lineHeight: 1.05, margin: '0 0 64px',
          display: 'flex', flexWrap: 'wrap', gap: '0.25em', perspective: '600px',
        }}>
          {['Who', 'Am', 'I?'].map((word, i) => (
            <span key={word} className="word" style={{
              display: 'inline-block',
              color: i === 2 ? 'transparent' : 'var(--text)',
              WebkitTextStroke: i === 2 ? '1.5px var(--accent)' : undefined,
            }}>
              {word}
            </span>
          ))}
        </h2>

        {/* Main layout */}
        <div className="about-grid" style={{
          display: 'flex', alignItems: 'flex-start', gap: '72px',
        }}>

          {/* bio n typewriter */}
          <div ref={bioRef} style={{ flex: '1 1 0', minWidth: 0 }}>
            <p className="bio-para" style={{
              fontFamily: 'var(--font-display)', fontSize: '1.1rem',
              lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: '22px',
            }}>
              I'm{' '}
              <span style={{ color: 'var(--text)', fontWeight: 600 }}>Kahlaa Aulia Jemima</span>
              , a{' '}
              <span style={{ color: 'var(--accent2)' }}>creative front-end developer</span>
              {' '}and{' '}
              <span style={{ color: 'var(--accent2)' }}>interactive technologist</span>
              {' '}passionate about building immersive digital experiences.
            </p>

            <p className="bio-para" style={{
              fontFamily: 'var(--font-display)', fontSize: '0.95rem',
              lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: '22px',
            }}>
              Currently studying Game Technology at{' '}
              <span style={{ color: 'var(--accent2)' }}>Politeknik Negeri Media Kreatif Jakarta</span>,
              I specialize in game programming with Unity — focusing on gameplay mechanics
              and system architecture.
            </p>

            <p className="bio-para" style={{
              fontFamily: 'var(--font-display)', fontSize: '0.95rem',
              lineHeight: 1.85, color: 'var(--text-muted)',
            }}>
              Beyond games, I craft responsive web interfaces with Next.js, React, and
              TailwindCSS.
            </p>

            {/* typewriter code quote*/}
            <div className="bio-para">
              <TypewriterQuote triggered={quoteTriggered} />
            </div>
          </div>

          {/*lanyard */}
          <div className="lanyard-wrap" style={{
            flexShrink: 0, display: 'flex', flexDirection: 'column',
            alignItems: 'center', width: '280px', marginTop: '-48px',
          }}>

            {/* Rope */}
            <div ref={ropeRef} style={{
              width: '3px', height: '88px',
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.06), rgba(99,102,241,0.55), rgba(99,102,241,0.35))',
              borderRadius: '2px', flexShrink: 0, position: 'relative',
            }}>
              <div style={{
                position: 'absolute', bottom: -7, left: '50%',
                transform: 'translateX(-50%)',
                width: '13px', height: '13px', borderRadius: '50%',
                background: 'rgba(99,102,241,0.65)',
                border: '2px solid rgba(99,102,241,0.95)',
                boxShadow: '0 0 10px rgba(99,102,241,0.55)',
              }} />
            </div>

            {/* Card */}
            <div ref={cardRef} className="lanyard-card-inner" style={{
              width: '100%', borderRadius: '20px',
              background: 'linear-gradient(145deg, rgba(30,36,60,0.97), rgba(18,22,38,0.99))',
              border: '1px solid rgba(99,102,241,0.28)',
              boxShadow: '0 20px 56px rgba(0,0,0,0.55), 0 0 0 1px rgba(99,102,241,0.12)',
              overflow: 'hidden', cursor: 'default', position: 'relative',
            }}>
              <div style={{ height: '10px', background: 'linear-gradient(90deg, var(--accent), var(--accent2))' }} />

              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.035) 50%, transparent 60%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer-card 4s ease infinite',
                pointerEvents: 'none', borderRadius: '20px',
              }} />

              <div style={{ padding: '24px 22px 26px' }}>

                {/* logo n company */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <div style={{
                    width: '42px', height: '42px', borderRadius: '10px',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    overflow: 'hidden', flexShrink: 0,
                  }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={CRETIVOX_LOGO} alt="Cretivox"
                      style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '5px' }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                        e.currentTarget.parentElement.innerHTML =
                          '<span style="font-family:monospace;font-size:0.55rem;color:rgba(255,255,255,0.4)">CTV</span>'
                      }} />
                  </div>
                  <div>
                    <p style={{
                      fontFamily: 'var(--font-display)', fontSize: '0.88rem',
                      fontWeight: 700, color: 'var(--text)', margin: 0, lineHeight: 1.2,
                    }}>Cretivox</p>
                    <p style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
                      color: 'var(--text-muted)', margin: 0,
                      letterSpacing: '0.08em', textTransform: 'uppercase',
                    }}>Creative Agency</p>
                  </div>
                </div>

                <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '20px' }} />

                {/* Avatar + name */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
                  <div style={{
                    width: '110px', height: '110px', borderRadius: '50%',
                    border: '2.5px solid rgba(99,102,241,0.55)',
                    marginBottom: '14px', overflow: 'hidden',
                    boxShadow: '0 0 32px rgba(99,102,241,0.3)', flexShrink: 0,
                    background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(147,197,253,0.1))',
                  }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img loading="lazy" src="/assets/img/profile.jpeg" alt="Kahlaa Aulia Jemima"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                        e.currentTarget.parentElement.innerHTML =
                          '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center"><span style="font-family:var(--font-display);font-size:1.4rem;font-weight:700;color:var(--accent2)">KJ</span></div>'
                      }} />
                  </div>
                  <p style={{
                    fontFamily: 'var(--font-display)', fontSize: '0.95rem',
                    fontWeight: 700, color: 'var(--text)', margin: '0 0 4px',
                    textAlign: 'center', lineHeight: 1.2,
                  }}>Kahlaa Aulia Jemima</p>
                  <p style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                    color: 'var(--accent)', margin: 0,
                    letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'center',
                  }}>Front-end Developer Intern</p>
                </div>

                <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '16px' }} />

                {/* Status */}
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  padding: '9px 14px', borderRadius: '999px',
                  background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)',
                }}>
                  <span style={{
                    width: '7px', height: '7px', borderRadius: '50%',
                    background: '#22c55e', boxShadow: '0 0 8px #22c55e',
                    animation: 'pulse-dot 2s infinite', flexShrink: 0,
                  }} />
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
                    letterSpacing: '0.12em', color: '#22c55e',
                    textTransform: 'uppercase', whiteSpace: 'nowrap',
                  }}>Ready to Work</span>
                </div>

                <p style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.5rem',
                  color: 'rgba(255,255,255,0.1)', letterSpacing: '0.15em',
                  textAlign: 'center', margin: '14px 0 0',
                }}>ID · 2026 · Anak Magank</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}