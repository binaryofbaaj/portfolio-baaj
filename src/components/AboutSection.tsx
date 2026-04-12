"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { personalInfo } from "@/data/portfolio";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { label: "CGPA", value: personalInfo.cgpa, color: "var(--accent-green)" },
    { label: "Degree", value: personalInfo.degree, color: "var(--accent-cyan)" },
    { label: "University", value: "Graphic Era", color: "var(--accent-purple)" },
  ];

        const lines = [
    { prefix: "name", value: `"${personalInfo.fullName}"`, delay: 0.05 },
    { prefix: "email", value: `"${personalInfo.email}"`, delay: 0.1 },
    { prefix: "role", value: `"AI/ML Engineer & Full Stack Architect"`, delay: 0.15 },
    { prefix: "education", value: `"B.Tech CSE @ Graphic Era (8.32 CGPA, 2025)"`, delay: 0.2 },
    { prefix: "upcoming", value: `"M.Tech @ UPES Dehradun (2026)"`, delay: 0.25 },
    { prefix: "expertise", value: `["AI Research", "Scalable Web Engines", "Cyber-Resilience"]`, delay: 0.3 },
    { prefix: "design_mantra", value: `"Clean Architecture & Performance Optimization"`, delay: 0.35 },
    { prefix: "mission", value: `"Building intelligent, data-driven systems for real-world impact"`, delay: 0.4 },
  ];

  return (
    <section id="about" className="relative py-24 px-4" ref={ref}>
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-[var(--accent-green)] text-sm font-mono">// 01</span>
          <h2 className="section-heading text-[var(--text-primary)] mt-2">
            <span className="text-[var(--accent-green)]">&gt; </span>About Me
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-[var(--accent-green)] to-transparent mt-3" />
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Terminal Window - Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-3 terminal-window"
          >
            <div className="terminal-header">
              <div className="terminal-dot terminal-dot-red" />
              <div className="terminal-dot terminal-dot-yellow" />
              <div className="terminal-dot terminal-dot-green" />
              <span className="text-[var(--text-secondary)] text-xs ml-2">about.json</span>
            </div>
            <div className="terminal-body">
              <div className="text-[var(--text-secondary)] mb-3">
                <span className="text-[var(--accent-cyan)]">const</span>{" "}
                <span className="text-[var(--text-primary)]">developer</span> = {"{"}
              </div>
              {lines.map((line) => (
                <motion.div
                  key={line.prefix}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: line.delay + 0.3 }}
                  className="ml-6 mb-1"
                >
                  <span className="text-[var(--accent-purple)]">{line.prefix}</span>
                  <span className="text-[var(--text-secondary)]">: </span>
                  <span className="text-[var(--accent-green)]">{line.value}</span>
                  <span className="text-[var(--text-secondary)]">,</span>
                </motion.div>
              ))}
              <div className="text-[var(--text-secondary)] mt-3">{"}"}</div>
            </div>
          </motion.div>

          {/* Stats Cards - Right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-2 flex flex-col gap-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.15 }}
                className="p-5 rounded-lg border transition-all duration-300 hover:scale-105"
                style={{
                  borderColor: `${stat.color}30`,
                  background: `linear-gradient(135deg, ${stat.color}08, transparent)`,
                }}
                whileHover={{
                  boxShadow: `0 0 20px ${stat.color}20`,
                }}
              >
                <div
                  className="text-xs font-mono mb-1"
                  style={{ color: stat.color }}
                >
                  {stat.label}
                </div>
                <div className="text-xl font-bold text-[var(--text-primary)] font-[VT323]">
                  {stat.value}
                </div>
              </motion.div>
            ))}

          </motion.div>
        </div>
      </div>
    </section>
  );
}
