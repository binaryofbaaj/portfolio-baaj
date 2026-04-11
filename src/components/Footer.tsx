"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolio";
import { FiGithub, FiLinkedin, FiHeart } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="relative py-12 px-4 border-t border-[var(--border-base)]">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left -- Brand */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left"
          >
            <div className="text-[var(--accent-green)] font-mono text-sm mb-1">
              &gt; {personalInfo.name}
            </div>
            <div className="text-[var(--text-tertiary)] text-xs font-mono">
              Built with Next.js, Three.js &amp; lots of ☕
            </div>
          </motion.div>

          {/* Center -- Social */}
          <div className="flex items-center gap-4">
            <a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-secondary)] hover:text-[var(--accent-green)] transition-colors"
              aria-label="GitHub"
            >
              <FiGithub size={18} />
            </a>
            <a
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors"
              aria-label="LinkedIn"
            >
              <FiLinkedin size={18} />
            </a>
          </div>

          {/* Right -- Copyright */}
          <div className="text-xs text-[var(--text-tertiary)] font-mono flex items-center gap-1">
            Made with <FiHeart className="text-[var(--accent-pink)]" size={12} />{" "}
            &copy; {new Date().getFullYear()}
          </div>
        </div>

        {/* ASCII art divider */}
        <div className="mt-8 text-center text-[var(--border-base)] text-xs font-mono select-none">
          ═══════════════════════════════════════════════════════
        </div>
      </div>
    </footer>
  );
}
