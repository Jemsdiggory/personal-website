"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Home",     href: "#hero"     },
  { label: "About",    href: "#about"    },
  { label: "Skills",   href: "#skills"   },
  { label: "Projects", href: "#projects" },
  { label: "Contact",  href: "#contact"  },
];

export default function Navbar() {
  const navRef       = useRef(null);
  const logoRef      = useRef(null);
  const linksRef     = useRef(null);
  const [scrolled,   setScrolled]   = useState(false);
  const [active,     setActive]     = useState("hero");
  const [menuOpen,   setMenuOpen]   = useState(false);

  // Entrance animation
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(logoRef.current, { y: -24, opacity: 0, duration: 0.7, delay: 0.2 })
      .from(
        linksRef.current?.querySelectorAll("a, button") ?? [],
        { y: -16, opacity: 0, duration: 0.5, stagger: 0.07 },
        "-=0.4"
      );
  }, []);

  // Scroll detection for active section
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      // find active section
      const sections = NAV_LINKS.map((l) =>
        document.querySelector(l.href)
      ).filter(Boolean);

      let current = "hero";
      sections.forEach((sec) => {
        if (window.scrollY >= sec.offsetTop - 120) {
          current = sec.id;
        }
      });
      setActive(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Smooth scroll navigation
  const handleClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (!target) return;
    window.scrollTo({ top: target.offsetTop - 80, behavior: "smooth" });
  };

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position:        "fixed",
          top:             0,
          left:            0,
          right:           0,
          zIndex:          100,
          padding:         "0 2rem",
          height:          "68px",
          display:         "flex",
          alignItems:      "center",
          justifyContent:  "space-between",
          transition:      "background 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease",
          background:      scrolled ? "rgba(13,17,23,0.82)" : "transparent",
          backdropFilter:  scrolled ? "blur(16px) saturate(1.4)" : "none",
          borderBottom:    scrolled
            ? "1px solid rgba(255,255,255,0.06)"
            : "1px solid transparent",
          boxShadow:       scrolled
            ? "0 8px 32px rgba(0,0,0,0.3)"
            : "none",
        }}
      >
        <a
          ref={logoRef}
          href="#hero"
          onClick={(e) => handleClick(e, "#hero")}
          style={{
            fontFamily:     "var(--font-display)",
            fontWeight:     800,
            fontSize:       "1.15rem",
            letterSpacing:  "-0.02em",
            color:          "var(--text)",
            textDecoration: "none",
            display:        "flex",
            alignItems:     "center",
            gap:            "8px",
            userSelect:     "none",
          }}
        >
          <span
            style={{
              width:        "7px",
              height:       "7px",
              borderRadius: "50%",
              background:   "var(--accent)",
              boxShadow:    "0 0 10px var(--accent)",
              flexShrink:   0,
            }}
          />
          JD
          <span style={{ color: "var(--accent)", fontWeight: 400 }}>.</span>
        </a>

        <div
          ref={linksRef}
          style={{
            display:    "flex",
            alignItems: "center",
            gap:        "4px",
          }}
          className="desktop-nav"
        >
          {NAV_LINKS.map((link) => {
            const isActive = active === link.href.replace("#", "");
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                style={{
                  position:       "relative",
                  fontFamily:     "var(--font-mono)",
                  fontSize:       "0.72rem",
                  letterSpacing:  "0.06em",
                  color:          isActive ? "#fff" : "var(--text-muted)",
                  textDecoration: "none",
                  padding:        "6px 14px",
                  borderRadius:   "999px",
                  transition:     "color 0.25s ease, background 0.25s ease",
                  background:     isActive ? "rgba(99,102,241,0.15)" : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.color = "var(--text)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = "var(--text-muted)";
                }}
              >
                {isActive && (
                  <span
                    style={{
                      position:     "absolute",
                      bottom:       "3px",
                      left:         "50%",
                      transform:    "translateX(-50%)",
                      width:        "4px",
                      height:       "4px",
                      borderRadius: "50%",
                      background:   "var(--accent)",
                      boxShadow:    "0 0 6px var(--accent)",
                    }}
                  />
                )}
                {link.label}
              </a>
            );
          })}

          <a
            href="mailto:jemsdiggory@gmail.com"
            style={{
              fontFamily:     "var(--font-mono)",
              fontSize:       "0.72rem",
              letterSpacing:  "0.08em",
              color:          "#fff",
              textDecoration: "none",
              padding:        "7px 18px",
              borderRadius:   "999px",
              background:     "var(--accent)",
              border:         "1px solid var(--accent)",
              marginLeft:     "8px",
              transition:     "box-shadow 0.25s ease, background 0.25s ease",
              boxShadow:      "0 0 16px rgba(99,102,241,0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 0 28px rgba(99,102,241,0.55)";
              e.currentTarget.style.background = "#7577f5";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 0 16px rgba(99,102,241,0.3)";
              e.currentTarget.style.background = "var(--accent)";
            }}
          >
            Hire Me
          </a>
        </div>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="mobile-menu-btn"
          aria-label="Toggle menu"
          style={{
            display:         "none",
            flexDirection:   "column",
            justifyContent:  "center",
            alignItems:      "center",
            gap:             "5px",
            width:           "40px",
            height:          "40px",
            background:      "transparent",
            border:          "1px solid rgba(255,255,255,0.1)",
            borderRadius:    "8px",
            cursor:          "pointer",
            padding:         "8px",
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display:       "block",
                width:         menuOpen && i === 1 ? "0px" : "20px",
                height:        "1.5px",
                background:    "var(--text)",
                borderRadius:  "2px",
                transition:    "all 0.3s ease",
                transform:
                  menuOpen && i === 0
                    ? "translateY(6.5px) rotate(45deg)"
                    : menuOpen && i === 2
                    ? "translateY(-6.5px) rotate(-45deg)"
                    : "none",
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{
              position:       "fixed",
              top:            "68px",
              left:           0,
              right:          0,
              zIndex:         99,
              background:     "rgba(13,17,23,0.97)",
              backdropFilter: "blur(20px)",
              borderBottom:   "1px solid rgba(255,255,255,0.07)",
              padding:        "24px 2rem 32px",
              display:        "flex",
              flexDirection:  "column",
              gap:            "4px",
            }}
          >
            {NAV_LINKS.map((link, i) => {
              const isActive = active === link.href.replace("#", "");
              return (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.25 }}
                  style={{
                    fontFamily:     "var(--font-display)",
                    fontSize:       "1.4rem",
                    fontWeight:     700,
                    color:          isActive ? "var(--accent)" : "var(--text)",
                    textDecoration: "none",
                    padding:        "10px 0",
                    borderBottom:   "1px solid rgba(255,255,255,0.05)",
                    transition:     "color 0.2s ease",
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "space-between",
                  }}
                >
                  {link.label}
                  <span style={{ fontSize: "0.65rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </motion.a>
              );
            })}

            <motion.a
              href="mailto:jemsdiggory@gmail.com"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              style={{
                marginTop:      "20px",
                fontFamily:     "var(--font-mono)",
                fontSize:       "0.8rem",
                letterSpacing:  "0.08em",
                color:          "#fff",
                textDecoration: "none",
                padding:        "12px 24px",
                borderRadius:   "999px",
                background:     "var(--accent)",
                textAlign:      "center",
                boxShadow:      "0 0 24px rgba(99,102,241,0.4)",
              }}
            >
              Hire Me →
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}