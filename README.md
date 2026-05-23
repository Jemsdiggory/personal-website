# Personal Website

Modern, interactive portfolio website built with Next.js featuring smooth animations, custom cursor, music player, and responsive design.

## 🎯 Features

- **Interactive Hero Section** - Gamepad-themed project showcase with clickable buttons (Y/A/X/B)
- **Smooth Animations** - GSAP ScrollTrigger for scroll-driven effects and parallax
- **Custom Cursor** - Desktop-only animated cursor with ring effects (disabled on mobile)
- **Music Widget** - Fixed audio player with play/pause, progress seek, volume control, and mute
- **Photo Gallery** - Scattered LifeCollage with hover zoom and parallax effects
- **Project Showcase** - Draggable carousel for web and game projects with lazy loading
- **API Demo** - Real JWT authentication demo with dummyjson.com integration
- **Loading Screen** - Animated intro with shimmer text and progress bar
- **Responsive Design** - Mobile-optimized (768px breakpoint) with hamburger navigation
- **Glassmorphic UI** - Modern frosted glass aesthetic with blur effects

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|---|
| **Framework** | Next.js 14+, React 18+ |
| **Styling** | CSS-in-JS, Tailwind utilities, CSS variables |
| **Animation** | GSAP, ScrollTrigger, Framer Motion |
| **Icons** | react-icons (Feather, Font Awesome, Simple Icons) |
| **Audio** | HTML5 Audio API |

## 📁 Project Structure

```
app/                   # Next.js app directory
├── page.js           # Main page (all sections)
└── globals.css       # CSS variables & global styles

components/           # Reusable components
├── CustomCursor.js   # Desktop-only cursor (768px+)
├── LoadingScreen.js  # Intro animation
├── MusicWidget.js    # Audio player
└── Navbar.js         # Navigation + mobile menu

sections/             # Page sections
├── Hero.js           # Gamepad showcase
├── LifeCollage.js    # Photo gallery
├── FiercePhoto.js    # Portrait parallax
├── Projects.js       # Draggable carousel
├── ApiDemo.js        # JWT demo
└── About, Skills, Contact.js

public/assets/        # Static files
├── music.mp3         # Background audio
└── img/              # Photos
```

## 🎨 Design System

**CSS Variables** for theming:
- `--bg`, `--accent`, `--accent2`
- `--font-display`, `--font-mono`
- `--text`, `--text-muted`, `--border`, `--surface`

**Breakpoints**: Mobile < 768px | Desktop ≥ 768px

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🎬 Key Components

### MusicWidget
Fixed audio player (bottom-right):
- Play/Pause control
- Seekable progress bar with real-time duration
- Volume slider with mute button
- Source: `/assets/music.mp3`

### Hero Section
Gamepad controller with 4 project buttons (Y/A/X/B mapping)

### LifeCollage
Scattered photos with hover effects and scroll parallax

### CustomCursor
Animated ring cursor on desktop (disabled mobile)

### Projects
Draggable carousel with 11 web + 5 game projects

## 📋 Common Tasks

**Add new section:**
1. Create component in `sections/`
2. Import in `app/page.js`
3. Add to JSX return

**Customize colors:**
Edit CSS variables in `app/globals.css`

**Update music:**
Replace `/public/assets/music.mp3` with new audio file

**Adjust responsive breakpoint:**
Search for `768px` in codebase and update

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Music not playing | Check `/assets/music.mp3` exists, hard refresh browser |
| Custom cursor missing | Ensure screen width > 768px (desktop only) |
| Performance issues | All images use lazy loading; profile with DevTools |
| Images not loading | Verify paths in `public/assets/img/` |

## 🔧 Build & Deploy

```bash
npm run build    # Production build
npm start        # Start production server
```

---

**Built with ❤️ using Next.js, GSAP, and Framer Motion**
