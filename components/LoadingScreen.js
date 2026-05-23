'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function LoadingScreen({ onComplete }) {
  const overlayRef   = useRef(null)
  const textRef      = useRef(null)
  const subRef       = useRef(null)
  const scanlineRef  = useRef(null)
  const barRef       = useRef(null)
  const [show, setShow] = useState(true)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.7,
          ease: 'power2.inOut',
          onComplete: () => {
            setShow(false)
            onComplete?.()
          },
        })
      },
    })

    // Timeline sequence
    tl.from(textRef.current, {
      clipPath: 'inset(0 100% 0 0)',
      duration: 1.1,
      ease: 'power3.inOut',
      delay: 0.2,
    })

    .from(subRef.current, {
      opacity: 0,
      y: 10,
      duration: 0.6,
      ease: 'power2.out',
    }, '-=0.2')

    .from(barRef.current, {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 1.4,
      ease: 'power2.inOut',
    }, '-=0.5')

    .to({}, { duration: 0.6 })

    return () => tl.kill()
  }, [onComplete])

  if (!show) return null

  return (
    <div
      ref={overlayRef}
      style={{
        position:       'fixed',
        inset:          0,
        zIndex:         9999,
        background:     '#0d1117',
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
        overflow:       'hidden',
      }}
    >
      {/* scanline effect */}
      <div
        ref={scanlineRef}
        style={{
          position:   'absolute',
          inset:      0,
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.015) 2px, rgba(255,255,255,0.015) 4px)',
          pointerEvents: 'none',
          zIndex:     1,
        }}
      />

      {/* blur glow */}
      <div style={{
        position: 'absolute', top: '20%', left: '15%',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '20%', right: '10%',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(147,197,253,0.08) 0%, transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none',
      }} />

      {/* dot grid */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        pointerEvents: 'none',
      }} />

      {/* content */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 2rem' }}>

        {/* Eyebrow */}
        <p style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.65rem',
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
          color:         'rgba(255,255,255,0.25)',
          marginBottom:  '20px',
        }}>
          jemsprojects.vercel.app
        </p>

        <div
          ref={textRef}
          style={{
            fontFamily:    'var(--font-display)',
            fontWeight:    800,
            fontSize:      'clamp(2.4rem, 8vw, 6.5rem)',
            letterSpacing: '-0.03em',
            lineHeight:    1,
            marginBottom:  '12px',
            position:      'relative',
            display:       'inline-block',

            // metallic chrome shimmer
            background: `
              linear-gradient(
                105deg,
                #6366f1 0%,
                #93c5fd 20%,
                #ffffff 35%,
                #e2e8f0 42%,
                #ffffff 50%,
                #93c5fd 58%,
                #6366f1 75%,
                #93c5fd 88%,
                #ffffff 100%
              )
            `,
            backgroundSize:   '250% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation:      'chrome-sweep 2.2s linear infinite',
          }}
        >
          Jems personal Website
        </div>

        <div
          ref={subRef}
          style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      'clamp(0.7rem, 2vw, 0.9rem)',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            marginBottom:  '48px',
            position:      'relative',
            display:       'inline-block',

            background: `
              linear-gradient(
                105deg,
                rgba(147,197,253,0.4) 0%,
                rgba(255,255,255,0.9) 30%,
                rgba(255,255,255,1)   45%,
                rgba(255,255,255,0.9) 55%,
                rgba(147,197,253,0.4) 80%,
                rgba(99,102,241,0.5)  100%
              )
            `,
            backgroundSize:       '250% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor:  'transparent',
            backgroundClip:       'text',
            animation:            'chrome-sweep 2.2s linear infinite',
            animationDelay:       '0.15s',
          }}
        >
          Best viewed on desktop
        </div>

        <p style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.6rem',
          letterSpacing: '0.12em',
          color:         'rgba(255,255,255,0.2)',
          marginBottom:  '36px',
          maxWidth:      '320px',
          margin:        '0 auto 36px',
          lineHeight:    1.6,
        }}>
          Mobile experience is supported, but for the full interactive experience —
          open on a larger screen.
        </p>

        <div style={{
          width:        'min(320px, 80vw)',
          height:       '1px',
          background:   'rgba(255,255,255,0.08)',
          borderRadius: '999px',
          overflow:     'hidden',
          margin:       '0 auto',
        }}>
          <div
            ref={barRef}
            style={{
              height:     '100%',
              background: 'linear-gradient(90deg, var(--accent), var(--accent2), #fff)',
              borderRadius: '999px',
              boxShadow:  '0 0 12px rgba(99,102,241,0.8)',
            }}
          />
        </div>

        <p style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.55rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color:         'rgba(255,255,255,0.15)',
          marginTop:     '12px',
        }}>
          Initializing experience...
        </p>
      </div>

      {/* corner accent */}
      {[
        { top: '24px',   left: '24px',  borderTop: '1px solid', borderLeft: '1px solid'  },
        { top: '24px',   right: '24px', borderTop: '1px solid', borderRight: '1px solid' },
        { bottom: '24px',left: '24px',  borderBottom: '1px solid', borderLeft: '1px solid' },
        { bottom: '24px',right: '24px', borderBottom: '1px solid', borderRight: '1px solid'},
      ].map((s, i) => (
        <div key={i} style={{
          position: 'absolute', ...s,
          width: '28px', height: '28px',
          borderColor: 'rgba(99,102,241,0.3)',
          zIndex: 2,
        }} />
      ))}

      {/* ── Chrome sweep keyframe ── */}
      <style>{`
        @keyframes chrome-sweep {
          0%   { background-position: 200% center; }
          100% { background-position: -50% center; }
        }
      `}</style>
    </div>
  )
}