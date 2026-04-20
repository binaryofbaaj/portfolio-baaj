"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { projects } from "@/data/portfolio";
import { FiGithub, FiExternalLink } from "react-icons/fi";

function ProjectCard({
  project,
  index,
  isInView: parentInView,
}: {
  project: (typeof projects)[0];
  index: number;
  isInView: boolean;
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -10, y: x * 10 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={parentInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative group rounded-xl border overflow-hidden"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.02 : 1})`,
        transition: "transform 0.2s ease-out, box-shadow 0.3s ease",
        borderColor: isHovered ? `${project.color}50` : "var(--border-base)",
        boxShadow: isHovered
          ? `0 0 30px ${project.color}15, 0 20px 60px rgba(0,0,0,0.5)`
          : "0 4px 20px rgba(0,0,0,0.3)",
        background: `linear-gradient(145deg, var(--bg-surface), var(--bg-base))`,
      }}
    >
      {/* Gradient overlay on top */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${(tilt.y / 10 + 0.5) * 100}% ${(tilt.x / -10 + 0.5) * 100}%, ${project.color}08, transparent 60%)`,
        }}
      />

      <div className="relative p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-xs font-mono mb-2" style={{ color: "var(--text-tertiary)" }}>
              [{String(index + 1).padStart(2, "0")}]
            </div>
            <h3
              className="text-2xl font-bold font-[VT323] tracking-wide group-hover:glitch-text"
              style={{ color: project.color }}
              data-text={project.title}
            >
              {project.title}
            </h3>
          </div>
          <div className="flex gap-3">
            {project.comingSoon ? (
              <>
                <div className="relative group/tooltip">
                  <button
                    disabled
                    className="p-2 rounded-md border border-[var(--border-base)] text-[var(--text-tertiary)] cursor-not-allowed transition-all opacity-50"
                    aria-label={`${project.title} GitHub`}
                  >
                    <FiGithub size={18} />
                  </button>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[var(--bg-surface)] text-[var(--text-secondary)] text-[10px] font-mono rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-[var(--border-base)] z-10">
                    Coming soon
                  </div>
                </div>
                <div className="relative group/tooltip">
                  <button
                    disabled
                    className="p-2 rounded-md border border-[var(--border-base)] text-[var(--text-tertiary)] cursor-not-allowed transition-all opacity-50"
                    aria-label={`${project.title} Live Preview`}
                  >
                    <FiExternalLink size={18} />
                  </button>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[var(--bg-surface)] text-[var(--text-secondary)] text-[10px] font-mono rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-[var(--border-base)] z-10">
                    Coming soon
                  </div>
                </div>
              </>
            ) : (
              <>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md border border-[var(--border-base)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-secondary)] transition-all"
                  aria-label={`${project.title} GitHub`}
                >
                  <FiGithub size={18} />
                </a>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md border border-[var(--border-base)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-secondary)] transition-all"
                  aria-label={`${project.title} Live Preview`}
                >
                  <FiExternalLink size={18} />
                </a>
              </>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm mb-5 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          {project.description}
        </p>

        {/* Features */}
        <div className="mb-5">
          {project.features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={parentInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.3, delay: index * 0.2 + i * 0.1 + 0.4 }}
              className="flex items-start gap-2 mb-1.5 text-xs" style={{ color: "var(--text-muted)" }}
            >
              <span style={{ color: project.color }}>▸</span>
              <span>{feature}</span>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2 py-1 text-xs font-mono rounded border"
              style={{
                borderColor: `${project.color}25`,
                color: `${project.color}cc`,
                background: `${project.color}08`,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className="h-0.5 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
        }}
      />
    </motion.div>
  );
}

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="relative py-24 px-4" ref={ref}>
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-[var(--accent-purple)] text-sm font-mono">// 03</span>
          <h2 className="section-heading mt-2" style={{ color: "var(--text-primary)" }}>
            <span className="text-[var(--accent-purple)]">&gt; </span>Projects
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-[var(--accent-purple)] to-transparent mt-3" />
        </motion.div>

        <div className="grid gap-8">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
