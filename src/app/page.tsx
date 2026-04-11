"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import AchievementsSection from "@/components/AchievementsSection";
import ContactSection from "@/components/ContactSection";
import MusicSection from "@/components/MusicSection";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import Terminal from "@/components/Terminal";

// Dynamic imports with ssr: false to prevent hydration errors and SSR bailouts
const ParticleBackground = dynamic(() => import("@/components/ParticleBackground"), { ssr: false });
const KonamiEasterEgg = dynamic(() => import("@/components/KonamiEasterEgg"), { ssr: false });

export default function Home() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  return (
    <main className="relative bg-[var(--bg-base)]">
      <div className="scanline" />
      <ParticleBackground />
      <KonamiEasterEgg />
      <Navigation onTerminalToggle={() => setIsTerminalOpen(true)} />
      
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <MusicSection />
      <AchievementsSection />
      <ContactSection />
      
      <Footer />
      
      <Terminal 
        isOpen={isTerminalOpen} 
        onClose={() => setIsTerminalOpen(false)} 
      />
    </main>
  );
}
