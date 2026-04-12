"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { experience, education } from "@/data/portfolio";

export default function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="relative py-24 px-4" ref={ref}>
      <div className="max-w-5xl mx-auto">
        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 mt-16"
        >
          <span className="text-[var(--accent-green)] text-sm font-mono">// 03</span>
          <h2 className="section-heading mt-2" style={{ color: "var(--text-primary)" }}>
            <span className="text-[var(--accent-green)]">&gt; </span>Education
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-[var(--accent-green)] to-transparent mt-3" />
        </motion.div>

        <div className="relative mb-20">
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute left-4 md:left-8 top-0 w-0.5 bg-gradient-to-b from-[var(--accent-green)] via-[var(--accent-green)]/50 to-transparent"
          />

          {education.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.2 }}
              className="relative pl-12 md:pl-20 mb-12 last:mb-0"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.5 + i * 0.2 }}
                className="absolute left-2 md:left-6 top-2 w-5 h-5 rounded-full border-2 bg-[var(--bg-base)]"
                style={{ borderColor: edu.color }}
              >
                <div
                  className="absolute inset-1 rounded-full"
                  style={{ background: edu.color }}
                />
              </motion.div>

              <div
                className="terminal-window transition-all duration-300 hover:scale-[1.01]"
                style={{
                  borderColor: `${edu.color}30`,
                }}
              >
                <div className="terminal-header">
                  <div className="terminal-dot terminal-dot-red" />
                  <div className="terminal-dot terminal-dot-yellow" />
                  <div className="terminal-dot terminal-dot-green" />
                  <span
                    className="text-xs ml-2"
                    style={{ color: edu.color }}
                  >
                    education_{i}.log
                  </span>
                </div>
                <div className="terminal-body">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                    <h3
                      className="text-xl font-bold font-[VT323]"
                      style={{ color: edu.color }}
                    >
                      {edu.school}
                    </h3>
                    <span className="text-xs font-mono mt-1 sm:mt-0" style={{ color: "var(--text-tertiary)" }}>
                      {edu.period}
                    </span>
                  </div>
                  <div className="text-sm text-[var(--text-primary)] mb-2 font-mono">
                    {edu.degree}
                  </div>
                  {edu.cgpa && (
                    <div className="text-xs text-[var(--accent-green)] font-mono">
                      CGPA: {edu.cgpa}
                    </div>
                  )}
                  {edu.status && (
                    <div className="text-xs text-[var(--accent-cyan)] font-mono">
                      ({edu.status})
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-[var(--accent-orange)] text-sm font-mono">// 04</span>
          <h2 className="section-heading mt-2" style={{ color: "var(--text-primary)" }}>
            <span className="text-[var(--accent-orange)]">&gt; </span>Experience
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-[var(--accent-orange)] to-transparent mt-3" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute left-4 md:left-8 top-0 w-0.5 bg-gradient-to-b from-[var(--accent-orange)] via-[var(--accent-orange)]/50 to-transparent"
          />

          {experience.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.2 }}
              className="relative pl-12 md:pl-20 mb-12 last:mb-0"
            >
              {/* Timeline dot */}
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.5 + i * 0.2 }}
                className="absolute left-2 md:left-6 top-2 w-5 h-5 rounded-full border-2 bg-[var(--bg-base)]"
                style={{ borderColor: exp.color }}
              >
                <div
                  className="absolute inset-1 rounded-full"
                  style={{ background: exp.color }}
                />
              </motion.div>

              {/* Card */}
              <div
                className="terminal-window transition-all duration-300 hover:scale-[1.01]"
                style={{
                  borderColor: `${exp.color}30`,
                }}
              >
                <div className="terminal-header">
                  <div className="terminal-dot terminal-dot-red" />
                  <div className="terminal-dot terminal-dot-yellow" />
                  <div className="terminal-dot terminal-dot-green" />
                  <span
                    className="text-xs ml-2"
                    style={{ color: exp.color }}
                  >
                    experience_{i}.log
                  </span>
                </div>
                <div className="terminal-body">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                    <h3
                      className="text-xl font-bold font-[VT323]"
                      style={{ color: exp.color }}
                    >
                      {exp.role}
                    </h3>
                    <span className="text-xs font-mono mt-1 sm:mt-0" style={{ color: "var(--text-tertiary)" }}>
                      {exp.period}
                    </span>
                  </div>
                  <div className="text-sm text-[var(--accent-cyan)] mb-4 font-mono">
                    @ {exp.company}
                  </div>
                  <div className="space-y-2">
                    {exp.points.map((point, j) => (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{
                          duration: 0.3,
                          delay: 0.6 + i * 0.2 + j * 0.1,
                        }}
                        className="flex items-start gap-2 text-sm" style={{ color: "var(--text-muted)" }}
                      >
                        <span style={{ color: exp.color }}>▸</span>
                        <span>{point}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
