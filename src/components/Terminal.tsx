"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { terminalCommands, projects } from "@/data/portfolio";
import { useTheme } from "next-themes";

interface TerminalLine {
  type: "input" | "output";
  content: string;
}

export default function Terminal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalLine[]>([
    {
      type: "output",
      content:
        'Welcome to Gurman\'s Portfolio Terminal v1.0\nType "help" for available commands.\n',
    },
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [history, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newHistory: TerminalLine[] = [
      ...history,
      { type: "input", content: cmd },
    ];

    if (trimmed === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    if (trimmed === "") {
      setHistory(newHistory);
      setInput("");
      return;
    }

    if (trimmed === "theme" || trimmed === "theme toggle") {
      const newTheme = theme === "dark" ? "light" : "dark";
      setTheme(newTheme);
      const warning = newTheme === 'light' ? '\nEntering Vintage Mode...' : '\nEntering Cyber Mode...';
      newHistory.push({ type: "output", content: `Theme toggled to ${newTheme} mode.${warning}` });
      setHistory(newHistory);
      setCmdHistory([cmd, ...cmdHistory]);
      setHistoryIndex(-1);
      setInput("");
      return;
    } else if (trimmed.startsWith("theme ")) {
      const mode = trimmed.split(" ")[1];
      if (mode === "light" || mode === "dark") {
        setTheme(mode);
        const warning = mode === 'light' ? '\nEntering Vintage Mode...' : '\nEntering Cyber Mode...';
        newHistory.push({ type: "output", content: `Theme switched to ${mode} mode.${warning}` });
      } else {
        newHistory.push({ type: "output", content: `Unknown theme. Usage: theme [light|dark|toggle]` });
      }
      setHistory(newHistory);
      setCmdHistory([cmd, ...cmdHistory]);
      setHistoryIndex(-1);
      setInput("");
      return;
    }

    // Navigation commands
    const navMap: Record<string, string> = {
      about: "#about",
      skills: "#skills",
      projects: "#projects",
      experience: "#experience",
      contact: "#contact",
      home: "#hero",
    };

    if (navMap[trimmed]) {
      newHistory.push({
        type: "output",
        content: `Navigating to ${trimmed}...`,
      });
      setHistory(newHistory);
      setInput("");
      onClose();
      setTimeout(() => {
        document
          .querySelector(navMap[trimmed])
          ?.scrollIntoView({ behavior: "smooth" });
      }, 300);
      return;
    }

    if (trimmed.startsWith("projects ") && trimmed !== "projects") {
      const parts = trimmed.split(" ");
      const indexStr = parts[1];
      const index = parseInt(indexStr, 10) - 1;
      
      if (!isNaN(index) && index >= 0 && index < projects.length) {
        const p = projects[index];
        newHistory.push({
          type: "output",
          content: "\n[ Project Details: " + p.title + " ]\n\nDescription: " + p.description + "\nTech Stack:  " + p.tech.join(", ") + "\nFeatures:    " + p.features.map(f => "\n  - " + f).join("") + "\n\nLinks:\n  GitHub: " + p.github + "\n  Live:   " + p.live
        });
      } else {
        newHistory.push({ type: "output", content: "Project not found. Type 'projects' to list all." });
      }
      setHistory(newHistory);
      setCmdHistory([cmd, ...cmdHistory]);
      setHistoryIndex(-1);
      setInput("");
      return;
    }

    if (trimmed.startsWith("music ") && trimmed !== "music") {
      const parts = trimmed.split(" ");
      const action = parts[1];
      if (action === "play") {
        const numStr = parts[2];
        if (numStr) {
          const idx = parseInt(numStr, 10) - 1;
          if (!isNaN(idx)) {
            window.dispatchEvent(new CustomEvent("portfolio:music-play-index", { detail: { index: idx } }));
            newHistory.push({ type: "output", content: `Playing track ${idx + 1}...` });
          } else {
            newHistory.push({ type: "output", content: "Invalid track number." });
          }
        } else {
          window.dispatchEvent(new CustomEvent("portfolio:music-command", { detail: { command: "play" } }));
          newHistory.push({ type: "output", content: "Music playback started." });
        }
      } else if (action === "pause") {
        window.dispatchEvent(new CustomEvent("portfolio:music-command", { detail: { command: "pause" } }));
        newHistory.push({ type: "output", content: "Music paused." });
      } else if (action === "next") {
        window.dispatchEvent(new CustomEvent("portfolio:music-command", { detail: { command: "next" } }));
        newHistory.push({ type: "output", content: "Skipping to next track..." });
      } else if (action === "prev") {
        window.dispatchEvent(new CustomEvent("portfolio:music-command", { detail: { command: "prev" } }));
        newHistory.push({ type: "output", content: "Returning to previous track..." });
      } else {
        newHistory.push({ type: "output", content: "Unknown music command. Usage: music [play <num>|pause|next|prev]" });
      }
      
      setHistory(newHistory);
      setCmdHistory([cmd, ...cmdHistory]);
      setHistoryIndex(-1);
      setInput("");
      return;
    }

    const response = terminalCommands[trimmed];
    if (response) {
      newHistory.push({ type: "output", content: response });
    } else {
      newHistory.push({
        type: "output",
        content: `Command not found: ${cmd}\nType "help" for available commands.`,
      });
    }

    setHistory(newHistory);
    setCmdHistory([cmd, ...cmdHistory]);
    setHistoryIndex(-1);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < cmdHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(cmdHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(cmdHistory[newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed inset-0 z-[60] flex items-center justify-center p-4 backdrop-blur-sm ${theme === 'light' ? 'bg-white/40' : 'bg-black/70'}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-2xl terminal-window"
            style={{
              background: "var(--bg-surface)",
              boxShadow:
                "0 0 40px rgba(0,255,65,0.15), 0 20px 60px rgba(0,0,0,0.5)",
            }}
          >
            <div className="terminal-header">
              <div
                className="terminal-dot terminal-dot-red cursor-pointer hover:brightness-125"
                onClick={onClose}
              />
              <div className="terminal-dot terminal-dot-yellow" />
              <div className="terminal-dot terminal-dot-green" />
              <span className="text-[var(--text-secondary)] text-xs ml-2">
                gurman@portfolio — bash
              </span>
              <span className="ml-auto text-[var(--text-tertiary)] text-xs">
                ESC to close
              </span>
            </div>
            <div
              ref={scrollRef}
              className="terminal-body h-80 overflow-y-auto"
              onClick={() => inputRef.current?.focus()}
            >
              {history.map((line, i) => (
                <div key={i} className="mb-1">
                  {line.type === "input" ? (
                    <div>
                      <span className="text-[var(--accent-green)]">
                        gurman@portfolio
                      </span>
                      <span className="text-[var(--text-secondary)]">:</span>
                      <span className="text-[var(--accent-cyan)]">~</span>
                      <span className="text-[var(--text-secondary)]">$ </span>
                      <span style={{ color: "var(--text-primary)" }}>{line.content}</span>
                    </div>
                  ) : (
                    <pre className="text-[var(--text-muted)] whitespace-pre-wrap text-sm leading-relaxed">
                      {line.content}
                    </pre>
                  )}
                </div>
              ))}

              {/* Input line */}
              <div className="flex items-center">
                <span className="text-[var(--accent-green)]">gurman@portfolio</span>
                <span className="text-[var(--text-secondary)]">:</span>
                <span className="text-[var(--accent-cyan)]">~</span>
                <span className="text-[var(--text-secondary)]">$ </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  style={{ color: "var(--text-primary)" }} className="flex-1 bg-transparent outline-none font-mono text-sm caret-[var(--accent-green)]"
                  autoComplete="off"
                  spellCheck="false"
                  aria-label="Terminal input"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
