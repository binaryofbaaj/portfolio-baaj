"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { achievements } from "@/data/portfolio";

export default function AchievementsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="achievements" className="relative py-24 px-4" ref={ref}>
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-[var(--accent-pink)] text-sm font-mono">// 05</span>
          <h2 className="section-heading text-[var(--text-primary)] mt-2">
            <span className="text-[var(--accent-pink)]">&gt; </span>Achievements
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-[var(--accent-pink)] to-transparent mt-3" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {achievements.map((achievement, i) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="group relative p-6 rounded-xl border border-[var(--border-base)] bg-[var(--bg-surface)]/80 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-[var(--accent-pink)]/40"
              whileHover={{
                scale: 1.03,
                boxShadow: "0 0 30px rgba(255,0,128,0.15)",
              }}
            >
              {/* Icon */}
              <div className="text-4xl mb-4">{achievement.icon}</div>

              <h3 className="text-xl font-bold font-[VT323] text-[var(--accent-pink)] mb-3">
                {achievement.title}
              </h3>

              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {achievement.description}
              </p>

              {/* Corner decoration */}
              <div className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[var(--accent-pink)]/50" />
              </div>

              {/* Bottom glow */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-pink)]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
