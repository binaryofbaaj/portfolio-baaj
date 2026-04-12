# 🌐 Retro-Futuristic 3D Developer Portfolio

A high-fidelity, interactive developer portfolio built with a cinematic 3D engine, terminal-aesthetic design system, and custom "Spin-to-Play" interactive audio activation.

![Status: Production Ready](https://img.shields.io/badge/Status-Production--Ready-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![Three.js](https://img.shields.io/badge/Three.js-R3F-blue)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-611f76)

## 🚀 Key Features

### 🌍 Cinematic 3D Interaction
- **Atmospheric Globe**: High-detail 3D Earth model with atmospheric swirls and a reactive starfield background.
- **Spin-to-Play Audio**: A unique gamified entry experience where background music logic is exclusive to the 3D globe—spin the planet to unlock the site's high-fidelity audio.
- **Instant Positioning**: Optimized 3D engine hydration to ensure a seamless, non-jittery entrance.

### ⌨️ Terminal Aesthetic & Functionality
- **Interactive Terminal**: Custom functional terminal allowing visitors to browse projects, skills, and even control the site theme and music via bash-like commands.
- **Dynamic Projects**: Use `projects [number]` in the terminal for deep-dives into specific tech stacks and features.
- **External Music Control**: Global music control via `music [play|pause|next|prev|<number>]` commands.

### 🎨 Premium Design System
- **Dual-Mode Experience**: Switch between a neon-green "Cyber Mode" and a warm "Vintage/Retro Macintosh" aesthetic.
- **Micro-animations**: Subtle Framer Motion transitions for every interaction, from button hovers to page scrolls.
- **EmailJS Integration**: A fully functional contact form that transmits messages directly to your inbox.

## 🛠️ Tech Stack

- **Core**: Next.js 15 (App Router)
- **3D Engine**: Three.js / @react-three/fiber / @react-three/drei
- **Motion**: Framer Motion
- **Form Handling**: EmailJS REST API
- **Styling**: Tailwind CSS & Vanilla CSS
- **State**: React Hooks & LocalStorage Persistence

## 📦 Getting Started

1. **Clone & Install**:
   ```bash
   git clone https://github.com/binaryofbaaj/portfolio-baaj.git
   cd portfolio
   npm install
   ```

2. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_key
   ```

3. **Run Development Mode**:
   ```bash
   npm run dev
   ```

## ⚙️ Customization

- **Project & Personal Data**: Update `src/data/portfolio.ts` to change your name, projects, experiences, and social links.
- **Music Tracks**: Default tracks are defined in `src/data/portfolio.ts`. The player automatically syncs with terminal inputs and globe interactions.

---

Built with ❤️ by [Gurman Singh](https://github.com/binaryofbaaj)
