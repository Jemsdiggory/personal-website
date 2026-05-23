'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

//photo data
const PHOTOS = [
  { src: '/assets/img/life-img/gaul1.jpeg', label: 'Duo',        w: 260, h: 200, x: '4%',  y: '8%',  rotate: -6  },
  { src: '/assets/img/life-img/gaul2.jpeg', label: 'Trio',    w: 220, h: 290, x: '28%', y: '2%',  rotate:  3  },
  { src: '/assets/img/life-img/gaul3.jpeg', label: 'PKKMB 2025',         w: 240, h: 180, x: '55%', y: '5%',  rotate: -4  },
  { src: '/assets/img/life-img/gaul4.jpeg', label: 'Koorlap PKKMB 2025',           w: 200, h: 240, x: '78%', y: '2%',  rotate:  7  },
  { src: '/assets/img/life-img/gaul5.jpeg', label: 'POP Gametech 2024',       w: 230, h: 170, x: '12%', y: '52%', rotate:  4  },
  { src: '/assets/img/life-img/gaul6.jpeg', label: 'PSDM HIMA Gametech',    w: 210, h: 260, x: '40%', y: '48%', rotate: -5  },
  { src: '/assets/img/life-img/gaul7.jpeg', label: 'Gametech Girls',     w: 250, h: 185, x: '65%', y: '55%', rotate:  3  },
]


const LABEL_COLORS = [
  'var(--accent)', 'var(--accent2)', '#f472b6', '#34d399', '#fbbf24', 'var(--accent)', 'var(--accent2)',
]

function PhotoCard({ photo, index, color }) {
  const ref = useRef(null)

  useEffect(() => {
    // start state
    gsap.set(ref.current, {
      opacity: 0,
      scale:   0.75,
      rotate:  photo.rotate * 2,
    })

    ScrollTrigger.create({
      trigger: ref.current.closest('section'),
      start:   'top 70%',
      onEnter: () => {
        gsap.to(ref.current, {
          opacity:  1,
          scale:    1,
          rotate:   photo.rotate,
          duration: 0.9,
          delay:    index * 0.1,
          ease:     'back.out(1.3)',
        })
      },
      once: true,
    })

    // subtle float loop
    gsap.to(ref.current, {
      y:        `+=${6 + (index % 3) * 4}`,
      duration: 2.5 + index * 0.3,
      repeat:   -1,
      yoyo:     true,
      ease:     'sine.inOut',
      delay:    index * 0.4,
    })

    // hover handlers
    const el = ref.current
    const onEnter = () => gsap.to(el, {
      scale: 1.08, rotate: 0, zIndex: 10,
      boxShadow: '0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,102,241,0.4)',
      duration: 0.35, ease: 'power2.out', overwrite: 'auto',
    })
    const onLeave = () => gsap.to(el, {
      scale: 1, rotate: photo.rotate, zIndex: index + 1,
      boxShadow: '0 8px 30px rgba(0,0,0,0.35)',
      duration: 0.4, ease: 'power2.inOut', overwrite: 'auto',
    })

    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [index, photo.rotate])

  return (
    <div
      ref={ref}
      style={{
        position:     'absolute',
        left:          photo.x,
        top:           photo.y,
        width:        `${photo.w}px`,
        zIndex:        index + 1,
        cursor:        'pointer',
        willChange:    'transform',
        borderRadius:  '8px',
        overflow:      'hidden',
        boxShadow:     '0 8px 30px rgba(0,0,0,0.35)',
        border:        '2px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Photo */}
      <div style={{ width: '100%', height: `${photo.h}px`, position: 'relative', overflow: 'hidden' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.src}
          alt={photo.label}
          loading="lazy"
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', display: 'block',
            transition: 'filter 0.3s ease',
            filter: 'brightness(0.88) contrast(1.05)',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1) contrast(1.08)' }}
          onMouseLeave={(e) => { e.currentTarget.style.filter = 'brightness(0.88) contrast(1.05)' }}
          // placeholder fallback 
          onError={(e) => {
            e.currentTarget.style.display = 'none'
            e.currentTarget.parentElement.style.background =
              'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(147,197,253,0.08))'
          }}
          draggable={false}
        />
      </div>

      {/* Caption strip */}
      <div style={{
        padding:        '8px 12px',
        background:     'rgba(13,17,23,0.9)',
        backdropFilter: 'blur(8px)',
        display:        'flex',
        alignItems:     'center',
        gap:            '6px',
      }}>
        <span style={{
          width: '5px', height: '5px', borderRadius: '50%',
          background: color, flexShrink: 0,
          boxShadow: `0 0 6px ${color}`,
        }} />
        <span style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.62rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color:         'rgba(255,255,255,0.6)',
        }}>
          {photo.label}
        </span>
      </div>
    </div>
  )
}

export default function LifeCollage() {
  const sectionRef  = useRef(null)
  const textRef     = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // text reveal
      const els = textRef.current.querySelectorAll('.collage-text')
      gsap.from(els, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
        y: 40, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
      })

      // parallax on scroll for the whole canvas
      gsap.to('.collage-canvas', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start:   'top bottom',
          end:     'bottom top',
          scrub:   1.5,
        },
        y: -60,
        ease: 'none',
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="life"
      style={{
        position:   'relative',
        width:      '100%',
        padding:    '120px 0 0',
        background: 'var(--bg)',
        overflow:   'hidden',
      }}
    >
      {/* Glow blobs */}
      <div style={{
        position: 'absolute', top: '5%', right: '10%',
        width: '350px', height: '350px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '15%', left: '5%',
        width: '300px', height: '300px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(147,197,253,0.08) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}>

        {/* ── Header text ── */}
        <div ref={textRef} style={{ marginBottom: '80px' }}>
          <p className="collage-text" style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            letterSpacing: '0.3em', color: 'var(--accent)',
            textTransform: 'uppercase', marginBottom: '16px',
            display: 'flex', alignItems: 'center', gap: '12px',
          }}>
            <span style={{ width: '32px', height: '1px', background: 'var(--accent)', display: 'inline-block' }} />
            Beyond the Screen
          </p>

          <h2 className="collage-text" style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
            letterSpacing: '-0.03em', lineHeight: 1.05,
            margin: '0 0 16px',
          }}>
            Life Outside
            <br />
            <span style={{ WebkitTextStroke: '1px var(--accent2)', color: 'transparent' }}>
              The Code
            </span>
          </h2>

          <p className="collage-text" style={{
            fontFamily: 'var(--font-display)', fontSize: '0.95rem',
            color: 'var(--text-muted)', lineHeight: 1.7,
            maxWidth: '480px', margin: 0,
          }}>
            Not only developers — but also organization members, event participants, and everyday people who enjoy team photos. 
            Hover over the photo to zoom in.
          </p>
        </div>

      </div>

      {/* scattered photos */}
      <div
        className="collage-canvas"
        style={{
          position:   'relative',
          width:      '100%',
          height:     '620px',
          overflow:   'hidden',
        }}
      >
        {PHOTOS.map((photo, i) => (
          <PhotoCard
            key={i}
            photo={photo}
            index={i}
            color={LABEL_COLORS[i % LABEL_COLORS.length]}
          />
        ))}

        {/* Bottom fade */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '160px',
          background: 'linear-gradient(to bottom, transparent, var(--bg))',
          pointerEvents: 'none', zIndex: 20,
        }} />
      </div>

      {/* Scroll hint */}
      <div style={{
        display: 'flex', justifyContent: 'center',
        paddingBottom: '80px',
        fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
        letterSpacing: '0.2em', color: 'var(--text-muted)',
        textTransform: 'uppercase', gap: '8px', alignItems: 'center',
      }}>
        <span style={{ width: '20px', height: '1px', background: 'var(--text-muted)' }} />
        hover the photos
        <span style={{ width: '20px', height: '1px', background: 'var(--text-muted)' }} />
      </div>
    </section>
  )
}