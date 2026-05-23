"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// data

const gameProjects = [
  {
    title: "Vita-Dulu",
    studio: "Tealcean Studio",
    image: "/assets/img/gameprojects/icongame1.jpg",
    tags: ["Unity", "3D", "Simulation", "Educational"],
    description:
      "3D Simulation & Educational game about traditional Indonesian snacks. Responsible for overall gameplay mechanics, NPC AI behaviour, and interactive systems.",
    role: "Programmer · Designer",
    type: "SIMULATION GAME",
    link: "https://jemsdiggory.itch.io/vita-dulu",
  },
  {
    title: "Rise Against",
    studio: "Tealcean Studio",
    image: "/assets/img/gameprojects/icongame2.png",
    tags: ["Unity", "2D", "RPG", "Educational"],
    description:
      "2D RPG about environmental issues. Programmed quest systems, AI & combat, dialogue, and inventory management.",
    role: "Programmer · Designer",
    type: "RPG GAME",
    link: "https://jemsdiggory.itch.io/rise-against",
  },
  {
    title: "Let's Explore",
    studio: "Tealcean Studio",
    image: "/assets/img/gameprojects/icongame3.png",
    tags: ["Unity", "2D", "Kids", "Educational"],
    description:
      "2D Educational game on arithmetic and Indonesian tourism for children aged 6–9. Mini-game mechanics, interactive systems & UI/UX.",
    role: "Programmer · Designer",
    type: "EDUCATIONAL GAME",
    link: "https://jemsdiggory.itch.io/lets-explore",
  },
  {
    title: "Roblorant",
    studio: "Solo Project",
    image: "/assets/img/gameprojects/icongame4.png",
    tags: ["Unity", "3D", "FPS"],
    description:
      "3D FPS game assignment built with Unity. Core gameplay: player movement, shooting mechanics, enemy AI. Web-based.",
    role: "Programmer (Solo)",
    type: "FPS GAME",
    link: "https://jemsdiggory.itch.io/tugas-game-fps",
  },
  {
    title: "Congklak Adventures",
    studio: "Team 7",
    image: "/assets/img/gameprojects/icongame5.png",
    tags: ["Unity", "2D", "Traditional", "Educational"],
    description:
      "2D Educational game on the traditional Congklak board game. Role: UI Artist & co-Game Designer.",
    role: "UI Artist · Designer",
    type: "TRADITIONAL GAME",
    link: "https://dycals.itch.io/congklak-adventures",
  },
];

const webProjects = [
    {
        title: "Personal Portfolio",
        subtitle: "Jems Projects",
        image: "/assets/img/webprojects/webporto.svg",
        tags: ["Next.js", "React", "Framer Motion", "Tailwind CSS"],
        description: "Personal portfolio website built with Next.js, featuring custom animations, responsive design, and a showcase of projects.",
        type: "FRONT-END",
        link: "https://jemsprojects.vercel.app/"
    },
    
  {
    title: "Company Website",
    subtitle: "Ciptadra Softindo",
    image: "/assets/img/webprojects/webciptadra.svg",
    tags: ["Laravel", "PHP", "CSS", "Vanilla JS"],
    description:
      "Redesigned and developed the company profile homepage and product pages for Ciptadra Softindo.",
    type: "FRONT-END",
    link: "https://ciptadrasoft.com/",
  },
  {
    title: "OneBox Portal",
    subtitle: "Ciptadra Softindo",
    image: "/assets/img/webprojects/webonebox.svg",
    tags: ["Laravel", "PHP", "CSS", "Vanilla JS"],
    description:
      "Redesigned and developed the OneBox Portal for Ciptadra Softindo employees.",
    type: "FRONT-END",
    link: "https://onebox.co.id/",
  },
  {
    title: "Portal Next.js",
    subtitle: "Ciptadra Softindo",
    image: "/assets/img/webprojects/portalnextjs.svg",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    description:
      "Modern UI/UX redesign of an existing platform. Transformed outdated interfaces into a sleek, responsive app.",
    type: "FRONT-END",
    link: "https://jemsprojects.vercel.app/projects/portal-nextjs",
  },
  {
    title: "Landing Page",
    subtitle: "Mall Management System",
    image: "/assets/img/webprojects/landingpagemall.svg",
    tags: ["CodeIgniter", "PHP", "CSS", "Vanilla JS"],
    description:
      "Developed a landing page for the Mall Management System of Ciptadra.",
    type: "FRONT-END",
    link: "https://jemsprojects.vercel.app/projects/mall-management",
  },
  {
    title: "Mall Management System",
    subtitle: "Full System",
    image: "/assets/img/webprojects/sistmall.svg",
    tags: ["CodeIgniter", "PHP", "MySQL", "CSS"],
    description:
      "Web-based mall management system featuring tenant management, contract management, and billing generation.",
    type: "FULLSTACK",
    link: "https://jemsprojects.vercel.app/projects/mall-management-system",
  },
  {
    title: "FoodCheck",
    subtitle: "Recipe Finder App",
    image: "/assets/img/webprojects/foodcheck.svg",
    tags: ["Laravel", "React.js", "Vite", "Spoonacular API"],
    description:
      "Full stack recipe finder. Search recipes from available ingredients, save favorites, and track search history.",
    type: "FULLSTACK",
    link: "https://jemsprojects.vercel.app/projects/food-check",
  },
  {
    title: "Mini CMS",
    subtitle: "Game Blog",
    image: "/assets/img/webprojects/minicms.svg",
    tags: ["PHP", "MySQL", "Vanilla JS", "TinyMCE"],
    description:
      "A mini CMS for a game blog with full CRUD and WYSIWYG editor.",
    type: "WEB APP",
    link: "https://jemsprojects.vercel.app/projects/mini-cms",
  },
  {
    title: "Saku Aman",
    subtitle: "Expense Tracker",
    image: "/assets/img/webprojects/sakuaman.svg",
    tags: ["Flutter", "Dart", "SQLite"],
    description:
      "Personal finance tracker mobile app built with Flutter and SQLite.",
    type: "MOBILE APP",
    link: "https://jemsprojects.vercel.app/projects/saku-aman-app",
  },
  {
    title: "Angular SPA",
    subtitle: "Single Page Application",
    image: "/assets/img/webprojects/antarikstech.svg",
    tags: ["Angular", "TypeScript", "RxJS", "HTTP Client"],
    description:
      "SPA demonstrating Reactive Forms, Form Validation, Business Logic, and HTTP calls to an external API.",
    type: "WEB APP",
    link: "https://jemsprojects.vercel.app/projects/angular-spa",
  },
  {
    title: "MLBB Vote",
    subtitle: "Hero Filtering UI",
    image: "/assets/img/webprojects/molevote.svg",
    tags: ["HTML", "CSS", "JavaScript"],
    description:
      "Responsive game-inspired website with hero cards and role-based filtering.",
    type: "FRONT-END",
    link: "https://jemsprojects.vercel.app/projects/mlbb-vote",
  },
];

// card components

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        width: "280px",
        flexShrink: 0,
        borderRadius: "12px",
        overflow: "hidden",
        cursor: "pointer",
        border: `1px solid ${hovered ? "rgba(99,102,241,0.5)" : "rgba(255,255,255,0.07)"}`,
        boxShadow: hovered
          ? "0 0 0 1px rgba(99,102,241,0.2), 0 24px 60px rgba(0,0,0,0.5), 0 0 40px rgba(99,102,241,0.1)"
          : "0 4px 24px rgba(0,0,0,0.3)",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        userSelect: "none",
      }}
    >
      {/* Thumbnail */}
      <div style={{ position: "relative", width: "100%", aspectRatio: "4/3", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
            transform: hovered ? "scale(1.07)" : "scale(1)",
          }}
          draggable={false}
        />

        {/* bottom gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(13,17,23,0.85) 0%, rgba(13,17,23,0.2) 50%, transparent 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Type badge */}
        <div
          style={{
            position: "absolute",
            top: "12px",
            left: "12px",
            fontFamily: "var(--font-mono)",
            fontSize: "0.58rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.55)",
            background: "rgba(13,17,23,0.65)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.1)",
            padding: "3px 10px",
            borderRadius: "999px",
          }}
        >
          {project.type}
        </div>

        {/* dark overlay hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(13,17,23,0.88)",
                backdropFilter: "blur(2px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "20px",
                gap: "12px",
              }}
            >
              {/* Description */}
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.05, duration: 0.3 }}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.8rem",
                  color: "rgba(255,255,255,0.8)",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {project.description}
              </motion.p>

              {/* Tech stack tags */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}
              >
                {project.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6rem",
                      color: "var(--accent2)",
                      background: "rgba(99,102,241,0.12)",
                      border: "1px solid rgba(99,102,241,0.3)",
                      padding: "3px 10px",
                      borderRadius: "999px",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>

              {/* Role  or cta link */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.3 }}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
              >
                {project.role && (
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6rem",
                      color: "var(--text-muted)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {project.role}
                  </span>
                )}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    color: "var(--accent)",
                    letterSpacing: "0.08em",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    marginLeft: "auto",
                    transition: "color 0.2s ease",
                  }}
                >
                  View →
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Card Footer */}
      <div
        style={{
          padding: "14px 16px",
          background: "var(--surface)",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.95rem",
            fontWeight: 700,
            color: hovered ? "#fff" : "var(--text)",
            margin: "0 0 3px",
            transition: "color 0.3s ease",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {project.title}
        </h3>
        {project.subtitle && (
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              color: "var(--text-muted)",
              margin: 0,
              letterSpacing: "0.04em",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {project.subtitle}
          </p>
        )}
      </div>
    </motion.div>
  );
}

// draggable track component

function DraggableTrack({ projects }) {
  const trackRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = useCallback((e) => {
    isDragging.current = true;
    startX.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeft.current = trackRef.current.scrollLeft;
    trackRef.current.style.cursor = "grabbing";
    trackRef.current.style.userSelect = "none";
  }, []);

  const onMouseUp = useCallback(() => {
    isDragging.current = false;
    if (trackRef.current) {
      trackRef.current.style.cursor = "grab";
      trackRef.current.style.userSelect = "";
    }
  }, []);

  const onMouseMove = useCallback((e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    trackRef.current.scrollLeft = scrollLeft.current - walk;
  }, []);

  // Touch support
  const onTouchStart = useCallback((e) => {
    startX.current = e.touches[0].pageX - trackRef.current.offsetLeft;
    scrollLeft.current = trackRef.current.scrollLeft;
  }, []);

  const onTouchMove = useCallback((e) => {
    const x = e.touches[0].pageX - trackRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    trackRef.current.scrollLeft = scrollLeft.current - walk;
  }, []);

  return (
    <div style={{ position: "relative" }}>
      {/* Fade edges */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "60px",
          background: "linear-gradient(to right, var(--bg), transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "60px",
          background: "linear-gradient(to left, var(--bg), transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Scrollable track */}
      <div
        ref={trackRef}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onMouseMove={onMouseMove}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        style={{
          display: "flex",
          gap: "16px",
          overflowX: "auto",
          paddingBottom: "16px",
          paddingLeft: "4px",
          paddingRight: "4px",
          cursor: "grab",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <style>{`div::-webkit-scrollbar { display: none; }`}</style>
        {projects.map((p, i) => (
          <ProjectCard key={p.title + i} project={p} index={i} />
        ))}
      </div>
    </div>
  );
}

// main section component

const TABS = [
  { key: "web", label: "Web Apps Projects", count: webProjects.length },
  { key: "game", label: "Game Projects", count: gameProjects.length },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const [activeTab, setActiveTab] = useState("web");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current.children, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      style={{
        background: "var(--bg)",
        padding: "120px 0 140px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Background elements */}
      <div
        className="dot-grid"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.3,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "-5%",
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(147,197,253,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
          filter: "blur(50px)",
        }}
      />

      {/* header */}
      <div
        ref={headerRef}
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 2rem",
          marginBottom: "56px",
        }}
      >
        {/* Eyebrow */}
        <p
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
          Portfolio
        </p>

        {/* Title row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "24px",
            marginBottom: "36px",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
              fontWeight: 700,
              color: "var(--text)",
              lineHeight: 1.05,
              margin: 0,
            }}
          >
            Digital
            <br />
            <span
              style={{
                WebkitTextStroke: "1px var(--accent2)",
                color: "transparent",
              }}
            >
              Projects
            </span>
          </h2>

          {/* Drag hint */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              color: "var(--text-muted)",
              letterSpacing: "0.1em",
            }}
          >
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
              <path d="M1 6H17M17 6L12 1M17 6L12 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            drag to explore
          </div>
        </div>

        {/* tabs */}
        <div style={{ display: "flex", gap: "8px" }}>
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.72rem",
                  letterSpacing: "0.06em",
                  padding: "8px 18px",
                  borderRadius: "999px",
                  border: `1px solid ${isActive ? "var(--accent)" : "rgba(255,255,255,0.1)"}`,
                  background: isActive ? "var(--accent)" : "transparent",
                  color: isActive ? "#fff" : "var(--text-muted)",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  boxShadow: isActive ? "0 0 20px rgba(99,102,241,0.35)" : "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                {tab.label}
                <span
                  style={{
                    fontSize: "0.58rem",
                    padding: "2px 7px",
                    borderRadius: "999px",
                    background: isActive ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.06)",
                    color: isActive ? "#fff" : "var(--text-muted)",
                  }}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* draggable track */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 2rem",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3 }}
          >
            <DraggableTrack
              projects={activeTab === "web" ? webProjects : gameProjects}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* bottom count indicator */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "32px auto 0",
          padding: "0 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: "6px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.62rem",
            color: "var(--text-muted)",
            letterSpacing: "0.1em",
          }}
        >
          {activeTab === "web" ? webProjects.length : gameProjects.length} projects
        </span>
        <div
          style={{
            width: "40px",
            height: "1px",
            background: "linear-gradient(to right, var(--accent), transparent)",
          }}
        />
      </div>
    </section>
  );
}