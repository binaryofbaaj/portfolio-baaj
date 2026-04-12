"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolio";
import { FiGithub, FiLinkedin, FiHeart, FiMail, FiArrowUp } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";

const quickLinks = [
  { label: "~/home", href: "#hero" },
  { label: "~/about", href: "#about" },
  { label: "~/skills", href: "#skills" },
  { label: "~/projects", href: "#projects" },
  { label: "~/experience", href: "#experience" },
  { label: "~/contact", href: "#contact" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative pt-16 pb-8 px-4 border-t border-[var(--border-base)] overflow-hidden">
      {/* Subtle gradient glow at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-green)]/40 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[60px] bg-gradient-to-b from-[var(--accent-green)]/5 to-transparent blur-2xl" />

      <div className="max-w-6xl mx-auto">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-[var(--accent-green)] font-mono text-lg mb-3 font-bold tracking-wider">
              &gt; {personalInfo.name}<span className="cursor-blink">_</span>
            </div>
            <p className="text-[var(--text-tertiary)] text-xs font-mono leading-relaxed mb-4">
              Full Stack Developer crafting digital experiences with clean code and creative design.
            </p>
            <div className="text-[10px] font-mono text-[var(--text-quaternary)] space-y-1">
              <div><span className="text-[var(--accent-green)]">$</span> echo $STACK</div>
              <div className="pl-3 text-[var(--text-tertiary)]">Next.js • Three.js • TypeScript</div>
              <div><span className="text-[var(--accent-green)]">$</span> uptime</div>
              <div className="pl-3 text-[var(--text-tertiary)]">Always coding ☕</div>
            </div>
          </motion.div>

          {/* Quick Links Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-[0.2em] mb-4">
              // Quick Nav
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-[var(--text-secondary)] text-xs font-mono hover:text-[var(--accent-green)] transition-colors py-1 cursor-pointer"
                >
                  <span className="text-[var(--accent-green)]/50">$</span> cd {link.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Connect Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-[0.2em] mb-4">
              // Connect
            </h4>
            <div className="flex items-center gap-3 mb-6">
              {[
                { icon: <FiGithub size={16} />, href: personalInfo.social.github, label: "GitHub", color: "hover:text-[var(--accent-green)] hover:border-[var(--accent-green)]/30" },
                { icon: <FiLinkedin size={16} />, href: personalInfo.social.linkedin, label: "LinkedIn", color: "hover:text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)]/30" },
                { icon: <FaXTwitter size={16} />, href: "https://x.com/shreddedreder", label: "X", color: "hover:text-white hover:border-white/30" },
                { icon: <FiMail size={16} />, href: `mailto:${personalInfo.email}`, label: "Email", color: "hover:text-[var(--accent-purple)] hover:border-[var(--accent-purple)]/30" },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-9 h-9 flex items-center justify-center rounded-lg border border-[var(--border-base)] text-[var(--text-secondary)] transition-all duration-300 ${social.color}`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            <div className="text-[10px] font-mono text-[var(--text-quaternary)]">
              <span className="text-[var(--accent-cyan)]">&gt;</span> {personalInfo.email}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="relative h-[1px] mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--border-base)] to-transparent" />
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[10px] text-[var(--text-quaternary)] font-mono flex items-center gap-1.5">
            <span className="text-[var(--accent-green)]">&gt;</span>
            Designed & Built with <FiHeart className="text-[var(--accent-pink)] inline" size={10} /> by {personalInfo.name}
            <span className="mx-1 text-[var(--border-base)]">|</span>
            &copy; {new Date().getFullYear()}
          </div>

          <motion.button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-[10px] font-mono text-[var(--text-quaternary)] hover:text-[var(--accent-green)] transition-colors cursor-pointer"
            whileHover={{ y: -2 }}
          >
            <span>scroll_to_top</span>
            <FiArrowUp size={12} className="group-hover:animate-bounce" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
