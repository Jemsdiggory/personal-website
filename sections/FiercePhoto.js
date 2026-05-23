"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const photos = [
  {
    id: "left",
    label: "LEFT",
    sub: "Left Side",
    url: "/assets/img/fierce/left.jpeg",
    rotate: "-6deg",
    x: "-110%",
    y: "8%",
    zIndex: 1,
    scale: 0.88,
    filter: "grayscale(30%) contrast(1.1)",
    width: "260px",
    aspect: "3/4",
  },
  {
    id: "center",
    label: "FIERCE",
    sub: "Front Side",
    url: "/assets/img/fierce/front.jpeg",
    rotate: "0deg",
    x: "0%",
    y: "-60px",
    zIndex: 3,
    scale: 1,
    filter: "grayscale(0%) contrast(1.15) brightness(1.05)",
    width: "300px",
    aspect: "2/3",
  },
  {
    id: "right",
    label: "RIGHT",
    sub: "Right Side",
    url: "/assets/img/fierce/right.jpeg",
    rotate: "6deg",
    x: "110%",
    y: "8%",
    zIndex: 1,
    scale: 0.88,
    filter: "grayscale(30%) contrast(1.1)",
    width: "260px",
    aspect: "3/4",
  },
];

export default function FiercePhoto() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const photoRefs = useRef([]);
  const lineRef = useRef(null);
  const taglineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      photoRefs.current.forEach((el, i) => {
        if (!el) return;
        const p = photos[i];
        gsap.set(el, {
          x: p.x,
          opacity: 0,
          rotation: parseFloat(p.rotate) * 1.5,
          scale: p.scale * 0.8,
        });
        gsap.to(el, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
          x: 0,
          opacity: 1,
          rotation: parseFloat(p.rotate),
          scale: p.scale,
          duration: 1.2,
          delay: i * 0.18,
          ease: "expo.out",
        });
      });

      photoRefs.current.forEach((el) => {
        if (!el) return;
        const handleMove = (e) => {
          const rect = el.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = (e.clientX - cx) / rect.width;
          const dy = (e.clientY - cy) / rect.height;
          gsap.to(el, { rotateY: dx * 12, rotateX: -dy * 12, duration: 0.4, ease: "power2.out" });
        };
        const handleLeave = () => {
          gsap.to(el, { rotateY: 0, rotateX: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
        };
        el.addEventListener("mousemove", handleMove);
        el.addEventListener("mouseleave", handleLeave);
        return () => {
          el.removeEventListener("mousemove", handleMove);
          el.removeEventListener("mouseleave", handleLeave);
        };
      });

      gsap.fromTo(
        containerRef.current,
        { scale: 0.94, opacity: 0.7 },
        {
          scale: 1,
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "top 20%",
            scrub: 1.2,
          },
        }
      );

      gsap.from(lineRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.2,
        delay: 0.4,
        ease: "expo.out",
      });

      gsap.from(taglineRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 55%",
          toggleActions: "play none none reverse",
        },
        y: 20,
        opacity: 0,
        duration: 0.9,
        delay: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="fierce"
      style={{
        background: "var(--bg)",
        padding: "120px 0 140px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <style>{`
        /* ── Mobile overrides only ── */
        @media (max-width: 640px) {
          .fierce-section { padding: 72px 0 80px !important; }

          /* Stack photos vertically, centered, no rotation, no offset-y */
          .fierce-container {
            flex-direction: column !important;
            align-items: center !important;
            gap: 20px !important;
            min-height: unset !important;
            perspective: none !important;
          }

          /* All cards full-width, no tilt offset */
          .fierce-card {
            width: 75vw !important;
            max-width: 260px !important;
            transform: none !important;   /* kills rotate + translateY on mobile */
          }

          /* Side cards same size as center on mobile */
          .fierce-card-side { width: 70vw !important; max-width: 240px !important; }

          /* Tagline stack on mobile */
          .fierce-tagline {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 1.5rem !important;
          }
        }
      `}</style>

      <div className="dot-grid" style={{ position: "absolute", inset: 0, opacity: 0.35, pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "10%", left: "5%", width: "380px", height: "380px", background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)", pointerEvents: "none", filter: "blur(40px)" }} />
      <div style={{ position: "absolute", bottom: "10%", right: "5%", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(147,197,253,0.1) 0%, transparent 70%)", pointerEvents: "none", filter: "blur(40px)" }} />

      <div className="fierce-section" style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 2rem" }}>

        {/* Title */}
        <div ref={titleRef} style={{ marginBottom: "72px" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.3em", color: "var(--accent)", textTransform: "uppercase", marginBottom: "16px", display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ display: "inline-block", width: "32px", height: "1px", background: "var(--accent)" }} />
            Visual Identity
          </p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 700, color: "var(--text)", lineHeight: 1.05, margin: 0 }}>
            The Faces
            <br />
            <span style={{ WebkitTextStroke: "1px var(--accent)", color: "transparent" }}>Behind the Work</span>
          </h2>
          <div ref={lineRef} style={{ marginTop: "28px", height: "1px", width: "180px", background: "linear-gradient(90deg, var(--accent), var(--accent2), transparent)" }} />
        </div>

        {/* Photos */}
        <div
          ref={containerRef}
          className="fierce-container"
          style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: "24px", perspective: "1200px", minHeight: "440px" }}
        >
          {photos.map((p, i) => (
            <div
              key={p.id}
              ref={(el) => (photoRefs.current[i] = el)}
              className={`fierce-card${p.id !== "center" ? " fierce-card-side" : ""}`}
              style={{
                position: "relative",
                width: p.width,
                flexShrink: 0,
                zIndex: p.zIndex,
                transform: `rotate(${p.rotate}) translateY(${p.y})`,
                cursor: "pointer",
                willChange: "transform",
              }}
            >
              <div style={{
                position: "relative",
                width: "100%",
                aspectRatio: p.aspect,
                borderRadius: "4px",
                overflow: "hidden",
                boxShadow: p.id === "center"
                  ? "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(99,102,241,0.3)"
                  : "0 20px 50px rgba(0,0,0,0.5)",
                transition: "box-shadow 0.3s ease",
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.url}
                  alt={`Portrait — ${p.sub}`}
                  loading="lazy"
                  style={{
                    width: "100%", height: "100%", objectFit: "cover",
                    objectPosition: p.id === "left" ? "20% center" : p.id === "right" ? "80% center" : "center center",
                    filter: p.filter,
                    display: "block",
                    transition: "filter 0.4s ease, transform 0.4s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter = "grayscale(0%) contrast(1.15) brightness(1.08)";
                    e.currentTarget.style.transform = "scale(1.04)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = p.filter;
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                />

                {p.id === "center" && (
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 55%, rgba(13,17,23,0.6) 100%)", pointerEvents: "none" }} />
                )}

                <div style={{
                  position: "absolute", bottom: "12px", left: "12px",
                  fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.2em",
                  color: p.id === "center" ? "var(--accent)" : "var(--text-muted)",
                  textTransform: "uppercase",
                  background: "rgba(13,17,23,0.75)", padding: "4px 8px", borderRadius: "2px", backdropFilter: "blur(4px)",
                }}>
                  {p.sub}
                </div>
              </div>

              {p.id === "center" && (
                <div style={{
                  position: "absolute", top: "-36px", left: "50%", transform: "translateX(-50%)",
                  fontFamily: "var(--font-display)", fontSize: "0.75rem", fontWeight: 700,
                  letterSpacing: "0.35em", color: "var(--accent)", textTransform: "uppercase", whiteSpace: "nowrap",
                }}>
                  ✦ Fierce ✦
                </div>
              )}

              {p.id !== "center" && (
                <div style={{
                  position: "absolute", top: "8px",
                  [p.id === "left" ? "right" : "left"]: "8px",
                  width: "24px", height: "24px",
                  borderTop: "1.5px solid var(--accent2)",
                  [p.id === "left" ? "borderRight" : "borderLeft"]: "1.5px solid var(--accent2)",
                  opacity: 0.5,
                }} />
              )}
            </div>
          ))}
        </div>

        {/* Tagline */}
        <div
          ref={taglineRef}
          className="fierce-tagline"
          style={{ marginTop: "72px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "2rem", flexWrap: "wrap" }}
        >
          <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1rem, 2vw, 1.25rem)", color: "var(--text-muted)", maxWidth: "480px", lineHeight: 1.6, margin: 0 }}>
            Every side has a story.{" "}
            <span style={{ color: "var(--text)" }}>Three perspectives, one identity.</span>
          </p>
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            {["L", "C", "R"].map((char, i) => (
              <div key={char} style={{
                width: "32px", height: "32px",
                border: `1px solid ${i === 1 ? "var(--accent)" : "rgba(255,255,255,0.1)"}`,
                borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--font-mono)", fontSize: "0.6rem",
                color: i === 1 ? "var(--accent)" : "var(--text-muted)",
              }}>
                {char}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}