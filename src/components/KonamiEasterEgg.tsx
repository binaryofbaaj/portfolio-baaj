"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const KONAMI_CODE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "KeyB", "KeyA",
];

export default function KonamiEasterEgg() {
  const [sequence, setSequence] = useState<string[]>([]);
  const [activated, setActivated] = useState(false);
  const [chars, setChars] = useState<Array<{ id: number; x: number; char: string; speed: number }>>([]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const newSeq = [...sequence, e.code].slice(-KONAMI_CODE.length);
      setSequence(newSeq);
      if (newSeq.join(",") === KONAMI_CODE.join(",")) {
        setActivated(true);
        setSequence([]);
        // Auto-dismiss after 8 seconds
        setTimeout(() => setActivated(false), 8000);
      }
    },
    [sequence]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (!activated) {
      setChars([]);
      return;
    }
    const matrixChars = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789";
    let id = 0;
    const interval = setInterval(() => {
      setChars((prev) => {
        const newChars = [...prev];
        // Add new columns
        for (let i = 0; i < 3; i++) {
          newChars.push({
            id: id++,
            x: Math.random() * 100,
            char: matrixChars[Math.floor(Math.random() * matrixChars.length)],
            speed: 2 + Math.random() * 5,
          });
        }
        return newChars.slice(-200); // Limit
      });
    }, 50);

    return () => clearInterval(interval);
  }, [activated]);

  return (
    <AnimatePresence>
      {activated && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] pointer-events-none overflow-hidden"
        >
          {/* Matrix rain */}
          {chars.map((c) => (
            <motion.span
              key={c.id}
              initial={{ top: -20, opacity: 1 }}
              animate={{ top: "110vh", opacity: 0 }}
              transition={{ duration: c.speed, ease: "linear" }}
              className="absolute text-[var(--accent-green)] text-sm font-mono"
              style={{ left: `${c.x}%` }}
            >
              {c.char}
            </motion.span>
          ))}

          {/* Center message */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-center bg-[var(--bg-base)]/90 p-8 rounded-xl border border-[var(--accent-green)]/30 backdrop-blur-sm pointer-events-auto">
              <div className="text-4xl mb-3">🎮</div>
              <h3 className="text-[var(--accent-green)] text-2xl font-[VT323] glow-green mb-2">
                KONAMI CODE ACTIVATED!
              </h3>
              <p className="text-[var(--text-secondary)] text-sm font-mono">
                You found the easter egg! You&apos;re a true hacker 🧑‍💻
              </p>
              <button
                onClick={() => setActivated(false)}
                className="mt-4 px-4 py-2 bg-[var(--accent-green)] text-[var(--bg-base)] rounded font-mono text-sm font-bold hover:bg-[var(--accent-cyan)] transition-colors"
              >
                $ dismiss
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
