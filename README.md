# 🌐 Retro-Futuristic 3D Developer Portfolio

A high-fidelity, interactive developer portfolio built with a cinematic 3D engine, terminal-aesthetic design system, and custom "Spin-to-Play" interactive audio activation.

![Immersive Design](https://img.shields.io/badge/Aesthetic-High--Fidelity-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![Three.js](https://img.shields.io/badge/Three.js-R3F-blue)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-611f76)

## 🚀 Key Features

### 🌍 Cinematic 3D Interaction
- **Atmospheric Globe**: High-detail 3D Earth model with atmospheric swirls and a reactive starfield background.
- **Spin-to-Play Audio**: A unique gamified entry experience where background music logic is exclusive to the 3D globe—spin the planet to unlock the site's high-fidelity audio.
- **HUD Interface**: Futuristic Heads-Up Display (HUD) elements and interaction hint cards.

### ⌨️ Terminal Aesthetic
- **Interactive Terminal**: Custom functional terminal for deeper exploration of project logs and skills.
- **Cyber-Player**: A persistent, low-poly music section with playlist support and visual sync.
- **Retro Typing Effects**: Authentic terminal text rendering with glowing cursors and scanline overlays.

### 🎨 Design System
- **Dark Mode Optimized**: Immersive deep-space theme using curated HSL color palettes.
- **Micro-animations**: Subtle Framer Motion transitions for every interaction, from button hovers to page scrolls.
- **Responsive HUD**: Fully responsive design that scales the 3D experience across mobile and desktop.

## 🛠️ Tech Stack

- **Core**: Next.js 15 (App Router)
- **3D Engine**: Three.js / @react-three/fiber / @react-three/drei
- **Motion**: Framer Motion
- **Styling**: Tailwind CSS & Vanilla CSS
- **State**: React Hooks & LocalStorage Persistence

## 📦 Getting Started

1. **Clone & Install**:
   ```bash
   git clone [your-repo-url]
   cd portfolio
   npm install
   ```

2. **Run Development Mode**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

## ⚙️ Customization

Most of the portfolio content lives in a single source of truth for easy updates:
- **Project Data**: Update `src/data/portfolio.ts` to change your name, projects, experiences, and social links.
- **Music Tracks**: Default tracks are defined in `src/data/portfolio.ts`. Users can also add their own tracks via the live UI, which are persisted in `localStorage`.

---

Built with ❤️ by [Gurman Singh](https://github.com/gurman-singh)
