'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const cursorDotRef = useRef(null)
  const cursorRingRef = useRef(null)
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    // Check if desktop on mount
    const checkDesktop = () => setIsDesktop(window.innerWidth > 768)
    checkDesktop()
    
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  useEffect(() => {
    if (!isDesktop) return

    const dot = cursorDotRef.current
    const ring = cursorRingRef.current

    // Hide default cursor
    document.body.style.cursor = 'none'

    const moveCursor = (e) => {
      const { clientX: x, clientY: y } = e

      // Dot follows cursor instantly
      gsap.set(dot, { x, y })

      // Ring follows with smooth lag
      gsap.to(ring, {
        x,
        y,
        duration: 0.15,
        ease: 'power2.out',
      })
    }

    // Hover effect on interactive elements
    const handleMouseEnter = () => {
      gsap.to(ring, {
        scale: 2.5,
        opacity: 0.5,
        duration: 0.3,
        ease: 'power2.out',
      })
      gsap.to(dot, {
        scale: 0,
        duration: 0.3,
      })
    }

    const handleMouseLeave = () => {
      gsap.to(ring, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      })
      gsap.to(dot, {
        scale: 1,
        duration: 0.3,
      })
    }

    // Apply hover effect to all interactive elements
    const interactives = document.querySelectorAll(
      'a, button, [data-cursor="pointer"]'
    )

    window.addEventListener('mousemove', moveCursor)
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      document.body.style.cursor = 'auto'
      window.removeEventListener('mousemove', moveCursor)
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [isDesktop])

  return isDesktop ? (
    <>
      {/* Small dot — instant follow */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{ backgroundColor: 'var(--color-accent)' }}
      />

      {/* Outer ring — smooth lag follow */}
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{ borderColor: 'var(--color-accent)' }}
      />
    </>
  ) : null
}