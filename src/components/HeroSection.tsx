"use client";

import { useEffect, useState, Suspense } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolio";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { FiFileText, FiGithub, FiLinkedin } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";

const PlanetCanvas = dynamic(() => import("./PlanetModel"), { ssr: false });
const ComputerCanvas = dynamic(() => import("./ComputerModel"), { ssr: false });
const StarsCanvas = dynamic(() => import("./StarsBackground"), { ssr: false });
const CanvasWrapper = dynamic(() => import("@react-three/fiber").then((m) => m.Canvas), { ssr: false });

function TypingEffect({ text, speed = 80, delay = 0 }: { text: string; speed?: number; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1));
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [displayed, text, speed, started]);

  return (
    <span>
      {displayed}
      <span className="cursor-blink text-[var(--accent-green)]">▌</span>
    </span>
  );
}

export default function HeroSection() {
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [hideGlobeHint, setHideGlobeHint] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const t1 = setTimeout(() => setShowSubtitle(true), 2500);
    const t2 = setTimeout(() => setShowButtons(true), 4000);
    
    const handleMusicStart = () => setHideGlobeHint(true);
    window.addEventListener("portfolio:start-music", handleMusicStart);

    return () => { 
      clearTimeout(t1); 
      clearTimeout(t2);
      window.removeEventListener("portfolio:start-music", handleMusicStart);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-20 flex flex-col items-center justify-start px-4 overflow-hidden"
    >
      {/* Stars Background for Dark Mode */}
      {mounted && resolvedTheme === "dark" && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          <CanvasWrapper camera={{ position: [0, 0, 1] }}>
            <Suspense fallback={null}>
              <StarsCanvas />
            </Suspense>
          </CanvasWrapper>
        </div>
      )}

      
      {/* Aesthetic HUD Scroll Indicator - Compact Center */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute top-24 left-1/2 -translate-x-1/2 z-30"
      >
        <div className="flex items-center gap-2 px-2 py-0.5 rounded-full border border-[var(--accent-green)]/10 bg-black/20 backdrop-blur-[2px]">
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-green)] animate-pulse" />
          <span className="text-[8px] font-mono text-[var(--accent-green)]/60 tracking-widest uppercase">
            
          </span>
        </div>
      </motion.div>

      
      <div className="relative z-20 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-4 items-center">
        {/* Left Content */}
        <div className="text-center lg:text-left lg:pr-8">
          {/* Terminal prompt */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-[var(--text-secondary)] text-sm mb-4 font-mono"
          >
            gurman@portfolio:~$
          </motion.div>

          {/* Main heading */}
          <div className="mb-6 font-[VT323]">
            <div className="text-2xl sm:text-3xl md:text-4xl text-[var(--accent-green)] mb-2">
              Hi, I am
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[var(--accent-green)] leading-none whitespace-nowrap">
              <TypingEffect text={personalInfo.name} speed={70} />
            </h1>
          </div>

          {/* Subtitle */}
          {showSubtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-lg sm:text-xl text-[var(--text-secondary)] mb-8"
            >
              <span className="text-[var(--accent-cyan)]">&gt;</span> {personalInfo.title}
            </motion.p>
          )}


          {/* CTA Buttons */}
          {showButtons && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-3 mt-8 lg:max-w-md w-full lg:mx-0 mx-auto"
            >
              <motion.a
                href="https://drive.google.com/file/d/1QwememThNEJKClJzg5Uo5VRCMrYuN8LT/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full relative px-8 py-3 bg-white text-black rounded-lg font-sans text-sm font-bold overflow-hidden transition-all duration-300 hover:bg-gray-100 text-center flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FiFileText size={18} />
                <span>Resume</span>
              </motion.a>

              <div className="flex items-center gap-3 w-full">
                <motion.a
                  href="#contact"
                  className="group relative flex-1 py-3 bg-transparent border border-[var(--border-base)] text-[var(--text-primary)] rounded-lg font-sans text-sm font-bold overflow-visible transition-all duration-300 hover:bg-[#fcf5eb] hover:text-black text-center flex items-center justify-center cursor-pointer max-w-[140px]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Hire Me
                  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-max px-3 py-1.5 bg-[#0a0d1f] border border-[var(--border-base)] rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 text-white font-sans text-center shadow-lg">
                    plz 🥺🙏
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0a0d1f] border-t border-l border-[var(--border-base)] rotate-45" />
                  </div>
                </motion.a>

                <motion.a
                  href="https://x.com/shreddedreder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 h-11 flex items-center justify-center bg-transparent border border-[var(--border-base)] rounded-lg text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-all cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaXTwitter size={18} />
                </motion.a>

                <motion.a
                  href="https://github.com/binaryofbaaj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 h-11 flex items-center justify-center bg-transparent border border-[var(--border-base)] rounded-lg text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-all cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiGithub size={18} />
                </motion.a>

                <motion.a
                  href="https://www.linkedin.com/in/gurman-singh-2032b0244/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 h-11 flex items-center justify-center bg-transparent border border-[var(--border-base)] rounded-lg text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-all cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiLinkedin size={18} />
                </motion.a>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Content - Cinematic Planet */}
        <motion.div
          initial={{ opacity: 1, scale: 1, y: 0 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="flex justify-center items-center h-[300px] sm:h-[500px] lg:h-[600px] w-full mt-4 lg:mt-0"
        >
          {/* Globe Interaction Hint */}
          {!hideGlobeHint && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2, duration: 1 }}
              className="absolute -right-12 top-10 z-40 hidden lg:block"
            >
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                {/* Cloud Card */}
                <div className="px-4 py-3 bg-[var(--bg-surface)] border border-[var(--accent-cyan)]/30 rounded-2xl shadow-[0_0_20px_rgba(0,255,255,0.1)] backdrop-blur-md max-w-[180px]">
                  <p className="text-[10px] font-mono text-[var(--accent-cyan)] leading-relaxed">
                    <span className="text-[var(--accent-green)] font-bold"># ACTION:</span><br/>
                    SPIN THE GLOBE TO PLAY THE MUSIC
                  </p>

                  {/* Visual Arrow Tail */}
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-[1px] bg-[var(--accent-cyan)]/50" />
                  {/* Arrow Head */}
                  <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-0 h-0 border-r-[6px] border-r-[var(--accent-cyan)]/50 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent" />
                </div>
              </motion.div>
            </motion.div>
          )}

          <PlanetCanvas />
        </motion.div>
      </div>

      {/* Bottom Content - Computer Canvas */}
      <div className="w-full h-[400px] sm:h-[500px] lg:h-[600px] relative mt-4 z-10">
        <ComputerCanvas />
      </div>


      {/* Decorative grid */}
      <div className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,65,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,65,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
    </section>
  );
}
