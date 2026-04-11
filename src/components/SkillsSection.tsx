"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { skills } from "@/data/portfolio";

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  return (
    <section id="skills" className="relative py-24 px-4" ref={ref}>
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-[var(--accent-cyan)] text-sm font-mono">// 02</span>
          <h2 className="section-heading text-[var(--text-primary)] mt-2">
            <span className="text-[var(--accent-cyan)]">&gt; </span>Skills
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-[var(--accent-cyan)] to-transparent mt-3" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {skills.map((category, catIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: catIdx * 0.15 }}
              className="terminal-window group cursor-pointer"
              onMouseEnter={() => setActiveCategory(catIdx)}
              onMouseLeave={() => setActiveCategory(null)}
              style={{
                boxShadow:
                  activeCategory === catIdx
                    ? `0 0 20px ${category.color}20, 0 0 40px ${category.color}10`
                    : "none",
                borderColor:
                  activeCategory === catIdx ? `${category.color}40` : undefined,
                transition: "box-shadow 0.3s, border-color 0.3s",
              }}
            >
              <div
                className="terminal-header"
                style={{
                  borderBottomColor:
                    activeCategory === catIdx
                      ? `${category.color}30`
                      : undefined,
                }}
              >
                <div className="terminal-dot terminal-dot-red" />
                <div className="terminal-dot terminal-dot-yellow" />
                <div className="terminal-dot terminal-dot-green" />
                <span
                  className="text-xs ml-2 transition-colors"
                  style={{
                    color:
                      activeCategory === catIdx ? category.color : "var(--text-secondary)",
                  }}
                >
                  {category.title.toLowerCase().replace(/ & /g, "_")}
                </span>
              </div>
              <div className="terminal-body">
                {/* Command */}
                <div className="mb-3">
                  <span className="text-[var(--accent-green)]">$ </span>
                  <span className="text-[var(--text-secondary)]">{category.command}</span>
                </div>

                {/* Skills List */}
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill, skillIdx) => (
                    <motion.span
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        duration: 0.3,
                        delay: catIdx * 0.15 + skillIdx * 0.08 + 0.3,
                      }}
                      className="px-3 py-1.5 rounded-md text-sm font-mono border transition-all duration-300 hover:scale-110"
                      style={{
                        borderColor: `${category.color}30`,
                        color: category.color,
                        background: `${category.color}08`,
                      }}
                      whileHover={{
                        boxShadow: `0 0 12px ${category.color}30`,
                        background: `${category.color}15`,
                      }}
                    >
                      {skill.name}
                    </motion.span>
                  ))}
                </div>

                {/* Output count */}
                <div className="mt-4 text-xs text-[var(--text-tertiary)]">
                  → {category.items.length} items found
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
