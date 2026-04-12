"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { FiSun, FiMoon, FiPlay, FiPause } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "#hero", label: "~/home" },
  { href: "#about", label: "~/about" },
  { href: "#skills", label: "~/skills" },
  { href: "#projects", label: "~/projects" },
  { href: "#experience", label: "~/experience" },
  { href: "#music", label: "~/music" },
  { href: "#contact", label: "~/contact" },
];

export default function Navigation({
  onTerminalToggle,
}: {
  onTerminalToggle: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState("");

  useEffect(() => {
    setMounted(true);
    const handleStatus = (e: any) => setIsPlaying(e.detail.isPlaying);
    const handleTrack = (e: any) => setCurrentTrack(e.detail.title);
    
    window.addEventListener("portfolio:music-status", handleStatus);
    window.addEventListener("portfolio:music-track", handleTrack);
    return () => {
      window.removeEventListener("portfolio:music-status", handleStatus);
      window.removeEventListener("portfolio:music-track", handleTrack);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map((l) => l.href.slice(1));
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(`#${id}`);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleMusic = () => {
    window.dispatchEvent(new CustomEvent("portfolio:toggle-music"));
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[var(--bg-base)]/80 backdrop-blur-xl border-b border-[var(--border-base)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.button
              onClick={() => handleClick("#hero")}
              className="text-[var(--accent-green)] font-bold text-lg tracking-wider"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-[var(--text-primary)]">&gt; </span>
              <span className="glow-green">gurman_singh</span>
              <span className="cursor-blink text-[var(--accent-green)]">_</span>
            </motion.button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <motion.button
                  key={link.href}
                  onClick={() => handleClick(link.href)}
                  className={`px-3 py-2 text-sm rounded-md transition-all duration-200 ${
                    activeSection === link.href
                      ? "text-[var(--accent-green)] bg-[var(--accent-green)]/10"
                      : "text-[var(--text-secondary)] hover:text-[var(--accent-green)] hover:bg-[var(--accent-green)]/5"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.label}
                </motion.button>
              ))}
              
              {mounted && (
                <div className="flex items-center ml-2">
                  {/* Music Toggle */}
                  <motion.button
                    onClick={toggleMusic}
                    className="p-2 rounded-md text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10 transition-all flex items-center relative group/music"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Toggle music"
                  >
                    {isPlaying ? <FiPause size={18} /> : <FiPlay size={18} />}
                    {isPlaying && (
                      <span className="absolute -top-1 -right-1 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-cyan)] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-cyan)]"></span>
                      </span>
                    )}
                    {/* Track Tooltip */}
                    <div className="absolute top-full right-0 mt-2 whitespace-nowrap px-2 py-1 bg-black/90 text-[var(--accent-cyan)] text-[10px] font-mono rounded opacity-0 group-hover/music:opacity-100 transition-opacity pointer-events-none border border-[var(--accent-cyan)]/30 backdrop-blur-sm z-50">
                      {isPlaying ? `NOW_PLAYING: ${currentTrack}` : "MUSIC_PAUSED"}
                    </div>
                  </motion.button>

                  <div className="group relative ml-1">
                    <motion.button
                      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                      className="p-2 rounded-md text-[var(--text-secondary)] hover:text-[var(--accent-green)] transition-all flex items-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label="Toggle theme"
                    >
                      {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
                    </motion.button>
                    {/* Theme Tooltip */}
                    <div className="absolute top-full right-0 mt-2 w-48 p-2 bg-[var(--bg-surface)] text-[var(--text-primary)] text-[10px] font-mono rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-[var(--border-base)] shadow-xl">
                      {theme === "dark" ? "Switch to Vintage Mode" : "Switch to Cyber Mode"}
                    </div>
                  </div>
                </div>
              )}

              <motion.button
                onClick={onTerminalToggle}
                className="ml-3 px-3 py-2 text-sm rounded-md border border-[var(--accent-green)]/30 text-[var(--accent-green)] hover:bg-[var(--accent-green)]/10 transition-all"
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(0,255,65,0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                $ terminal
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-[var(--accent-green)] p-2"
              aria-label="Toggle menu"
            >
              <div className="w-6 flex flex-col gap-1.5">
                <span
                  className={`block h-0.5 bg-[var(--accent-green)] transition-all duration-300 ${
                    isOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 bg-[var(--accent-green)] transition-all duration-300 ${
                    isOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 bg-[var(--accent-green)] transition-all duration-300 ${
                    isOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-60 bg-[var(--bg-base)]/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center gap-6"
          >
            {/* Global Music Toggle (Mobile) */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={toggleMusic}
              className="flex items-center gap-4 px-6 py-3 rounded-full border border-[var(--accent-cyan)]/30 bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)] mb-4"
            >
               {isPlaying ? <FiPause size={24} /> : <FiPlay size={24} />}
               <span className="font-mono text-sm tracking-wider uppercase">
                 {isPlaying ? "Pause Music" : "Play Music"}
               </span>
            </motion.button>

            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => handleClick(link.href)}
                className="text-2xl text-[var(--text-secondary)] hover:text-[var(--accent-green)] transition-colors font-mono py-2 w-full text-center"
              >
                <span className="text-[var(--accent-green)]">$ </span>cd {link.label}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: navLinks.length * 0.1 }}
              onClick={() => {
                setIsOpen(false);
                onTerminalToggle();
              }}
              className="text-2xl text-[var(--text-secondary)] hover:text-[var(--accent-green)] transition-colors font-mono mt-4 border border-[var(--accent-green)]/30 px-6 py-3 rounded-lg"
            >
              <span className="text-[var(--accent-green)]">$ </span>open terminal
            </motion.button>
            {mounted && (
              <div className="flex flex-col items-center">
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (navLinks.length + 1) * 0.1 }}
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="text-xl text-[var(--text-secondary)] hover:text-[var(--accent-green)] transition-colors flex items-center gap-2 mt-2"
                >
                  {theme === "dark" ? <><FiSun /> light_mode</> : <><FiMoon /> dark_mode</>}
                </motion.button>
                <span className="text-[10px] text-[var(--text-tertiary)] mt-1">{theme === "dark" ? "Try Vintage Mode" : "Try Cyber Mode"}</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
