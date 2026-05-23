"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { FaGitlab } from "react-icons/fa";
import { SiItchdotio } from "react-icons/si"

gsap.registerPlugin(ScrollTrigger);

const socials = [
  {
    icon: FiGithub,
    label: "GitHub",
    href: "https://github.com/JemsDiggory", 
  },
  {
    icon: FiLinkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/jemima05", 
  },
  {
    icon: SiItchdotio,
    label: "itch.io",
    href: "https://jemsdiggory.itch.io", 
  },
  {
    icon: FaGitlab,
    label: "GitLab",
    href: "https://gitlab.com/jemsdiggory",
  },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const dividerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading words slide up
      const words = headingRef.current.querySelectorAll(".word");
      gsap.fromTo(
        words,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
          },
        }
      );

      // sub text fade in with delay
      gsap.fromTo(
        subRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: subRef.current,
            start: "top 88%",
          },
        }
      );

      // Divider expand
      gsap.fromTo(
        dividerRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: dividerRef.current,
            start: "top 90%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headingText = "Let's build something.";
  const words = headingText.split(" ");

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{
        background: "var(--bg)",
        borderTop: "1px solid rgba(99,102,241,0.15)",
        padding: "7rem 1.5rem 4rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow blob */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "300px",
          background:
            "radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
          filter: "blur(40px)",
        }}
      />

      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
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
          Contact
        </motion.p>

        {/* Heading */}
        <h2
          ref={headingRef}
          style={{
            fontSize: "clamp(2.8rem, 8vw, 6rem)",
            fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)",
            fontWeight: 700,
            lineHeight: 1.05,
            color: "#f0f0f0",
            marginBottom: "2rem",
            overflow: "hidden",
          }}
        >
          {words.map((word, i) => (
            <span
              key={i}
              className="word"
              style={{
                display: "inline-block",
                marginRight: "0.3em",
                color:
                  i === words.length - 1 ? "var(--accent2)" : "inherit",
              }}
            >
              {word}
            </span>
          ))}
        </h2>

        {/* Sub text */}
        <p
          ref={subRef}
          style={{
            fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)",
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            color: "rgba(240,240,240,0.5)",
            maxWidth: "520px",
            lineHeight: 1.7,
            marginBottom: "3rem",
          }}
        >
          Open for freelance, internship, or collab.
          Drop a message and I'll get back to you.
        </p>

        {/* Email CTA */}
        <motion.a
          href="mailto:jemimadiggory@gmail.com" 
          className="btn-glow"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6rem",
            padding: "0.85rem 2rem",
            background: "var(--accent)",
            color: "#fff",
            fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)",
            fontWeight: 600,
            fontSize: "1rem",
            borderRadius: "8px",
            textDecoration: "none",
            marginBottom: "4rem",
            letterSpacing: "0.01em",
          }}
        >
          <FiMail size={18} />
          Say Hello
        </motion.a>

        {/* Divider */}
        <div
          ref={dividerRef}
          className="hr-accent"
          style={{
            transformOrigin: "left center",
            marginBottom: "2.5rem",
          }}
        />

        {/* Social links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          {/* Icons */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            style={{ display: "flex", gap: "1.2rem" }}
          >
            {socials.map(({ icon: Icon, label, href }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                }}
                whileHover={{ scale: 1.2, color: "var(--accent2)" }}
                style={{
                  color: "rgba(240,240,240,0.45)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  fontSize: "0.85rem",
                  fontFamily: "var(--font-mono, 'DM Mono', monospace)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
              >
                <Icon size={20} />
                {label}
              </motion.a>
            ))}
          </motion.div>

          {/* Copyright */}
          <p
            style={{
              fontFamily: "var(--font-mono, 'DM Mono', monospace)",
              fontSize: "0.72rem",
              color: "rgba(240,240,240,0.25)",
              letterSpacing: "0.05em",
            }}
          >
            © {new Date().getFullYear()} · Made with ice cream & vibecode
          </p>
        </div>
      </div>
    </section>
  );
}