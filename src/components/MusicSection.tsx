"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { defaultTracks, Track } from "@/data/portfolio";
import { FiPlay, FiPause, FiSkipForward, FiSkipBack, FiPlus, FiTrash2, FiVolume2, FiMusic } from "react-icons/fi";

export default function MusicSection() {
  const [tracks, setTracks] = useState<Track[]>(defaultTracks);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [progress, setProgress] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTrack, setNewTrack] = useState({ title: "", artist: "", url: "" });
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
    // Load local tracks
    const saved = localStorage.getItem("custom_tracks");
    let initialTracks = defaultTracks;
    if (saved) {
      try {
        const custom = JSON.parse(saved);
        initialTracks = [...custom, ...defaultTracks];
        setTracks(initialTracks);
      } catch (e) {
        console.error("Failed to load custom tracks", e);
      }
    }

    // EXCLUSIVE TRIGGER: Only start music via Globe Interaction
    const attemptAutoplay = () => {
      if (audioRef.current) {
        // Force the Police track to be the starting song
        const policeTrack = initialTracks.find(t => t.title.includes("Every Breath You Take"));
        const targetTrack = policeTrack || initialTracks[0];

        if (targetTrack) {
          audioRef.current.src = targetTrack.url;
          setCurrentTrackIndex(initialTracks.indexOf(targetTrack));
        }
        
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          // We still remove the listener after first success to avoid music restarting on every touch
          window.removeEventListener("portfolio:start-music", attemptAutoplay);
        }).catch((err) => {
          console.warn("Audio activation failed:", err);
        });
      }
    };

    window.addEventListener("portfolio:start-music", attemptAutoplay);

    return () => {
      window.removeEventListener("portfolio:start-music", attemptAutoplay);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch(e => {
        // Handle rejection (usually browser blocks auto-play)
        console.warn("Playback blocked by browser. Awaiting user interaction.");
      });
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p || 0);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setProgress(val);
    if (audioRef.current) {
      audioRef.current.currentTime = (val / 100) * audioRef.current.duration;
    }
  };

  const skipTrack = (direction: "next" | "prev") => {
    if (direction === "next") {
      setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    } else {
      setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    }
    setIsPlaying(true);
  };

  const addTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTrack.title || !newTrack.url) return;
    
    const track: Track = {
      id: Date.now().toString(),
      ...newTrack
    };
    
    const currentCustom = tracks.filter(t => !defaultTracks.find(dt => dt.id === t.id));
    const updatedCustom = [track, ...currentCustom];
    localStorage.setItem("custom_tracks", JSON.stringify(updatedCustom));
    setTracks([...updatedCustom, ...defaultTracks]);
    setCurrentTrackIndex(0); // Focus the newly added track
    setNewTrack({ title: "", artist: "", url: "" });
    setShowAddModal(false);
  };

  const removeTrack = (id: string) => {
    if (defaultTracks.find(t => t.id === id)) return; // Can't remove default
    const filtered = tracks.filter(t => t.id !== id);
    const customOnly = filtered.filter(t => !defaultTracks.find(dt => dt.id === t.id));
    localStorage.setItem("custom_tracks", JSON.stringify(customOnly));
    setTracks(filtered);
    if (currentTrackIndex >= filtered.length) setCurrentTrackIndex(0);
  };

  const currentTrack = tracks[currentTrackIndex];

  return (
    <section id="music" className="relative pt-24 pb-32 sm:py-24 px-4 min-h-screen flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="text-[var(--accent-cyan)] text-sm font-mono">// 05</span>
          <h2 className="section-heading text-[var(--text-primary)] mt-2">
            <span className="text-[var(--accent-cyan)]">&gt; </span>Music Player
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-[var(--accent-cyan)] to-transparent mt-3 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Main Player Card */}
          <motion.div 
            className="lg:col-span-3 terminal-window bg-[var(--bg-surface)] p-6 sm:p-8"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex gap-2">
                <div className="terminal-dot terminal-dot-red" />
                <div className="terminal-dot terminal-dot-yellow" />
                <div className="terminal-dot terminal-dot-green" />
              </div>
              <div className="text-[var(--text-tertiary)] text-[10px] font-mono tracking-widest">CYBER_PLAYER_v2.0.4</div>
            </div>

            {/* Track Info & Visualizer */}
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-20 h-20 rounded-full border-2 border-[var(--accent-cyan)] flex items-center justify-center mb-4 relative overflow-hidden group">
                <div className={`absolute inset-0 bg-[var(--accent-cyan)]/10 animate-pulse ${isPlaying ? 'opacity-100' : 'opacity-0'}`} />
                <FiMusic size={32} className={`relative ${isPlaying ? 'text-[var(--accent-cyan)]' : 'text-[var(--text-tertiary)]'}`} />
              </div>
              <h3 className="text-2xl font-bold font-[VT323] text-[var(--text-primary)] mb-1">
                {currentTrack?.title || "No Track Loaded"}
              </h3>
              <p className="text-[var(--text-secondary)] font-mono text-xs uppercase tracking-tighter">
                {currentTrack?.artist || "Unknown Artist"}
              </p>
            </div>

            {/* Visualizer (CSS Animation) */}
            <div className="h-12 flex items-center justify-center gap-1 mb-8 overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-1 bg-[var(--accent-cyan)]/50 rounded-t-full"
                  style={{
                    height: isPlaying ? `${Math.random() * 100}%` : '4px',
                    transition: 'height 0.2s ease',
                    animation: isPlaying ? `visualizer 1s ease-in-out infinite ${i * 0.05}s alternate` : 'none'
                  }}
                />
              ))}
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <input
                type="range"
                className="w-full h-1 bg-[var(--border-base)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-cyan)]"
                min="0"
                max="100"
                step="0.1"
                value={progress}
                onChange={handleProgressChange}
              />
              <div className="flex justify-between mt-2 text-[10px] font-mono text-[var(--text-tertiary)] uppercase">
                <span>0:00</span>
                <span>Live Feed</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-8 mb-8">
              <button 
                onClick={() => skipTrack("prev")}
                className="text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors p-2"
              >
                <FiSkipBack size={24} />
              </button>
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 rounded-full bg-[var(--accent-cyan)]/10 border border-[var(--accent-cyan)]/30 flex items-center justify-center text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/20 transition-all active:scale-95"
              >
                {isPlaying ? <FiPause size={28} /> : <FiPlay size={28} className="translate-x-0.5" />}
              </button>
              <button 
                onClick={() => skipTrack("next")}
                className="text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors p-2"
              >
                <FiSkipForward size={24} />
              </button>
            </div>

            {/* Volume */}
            <div className="flex items-center gap-4 px-8">
              <FiVolume2 size={16} className="text-[var(--text-tertiary)]" />
              <input
                type="range"
                className="flex-1 h-1 bg-[var(--border-base)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-cyan)]"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
              />
            </div>
          </motion.div>

          {/* Playlist Side Panel */}
          <div className="lg:col-span-2 space-y-4">
            <div className="terminal-window bg-black/30 border-dashed border-[var(--border-base)] p-4 flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-widest">Playlist_History</h4>
                <button 
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center gap-1 text-[10px] font-mono text-[var(--accent-cyan)] hover:glow-cyan transition-all"
                >
                  <FiPlus size={12} /> ADD_SOURCE
                </button>
              </div>

              <div className="space-y-2 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
                {tracks.map((track, i) => (
                  <div 
                    key={track.id}
                    className={`group p-3 rounded border transition-all cursor-pointer ${
                      i === currentTrackIndex 
                        ? 'border-[var(--accent-cyan)]/50 bg-[var(--accent-cyan)]/5' 
                        : 'border-transparent hover:bg-white/5'
                    }`}
                    onClick={() => {
                      setCurrentTrackIndex(i);
                      setIsPlaying(true);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className={`text-[10px] font-mono ${i === currentTrackIndex ? 'text-[var(--accent-cyan)]' : 'text-[var(--text-quaternary)]'}`}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <div>
                          <p className={`text-sm ${i === currentTrackIndex ? 'text-[var(--accent-cyan)]' : 'text-[var(--text-secondary)]'}`}>{track.title}</p>
                          <p className="text-[10px] text-[var(--text-tertiary)] font-mono">{track.artist}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <FiPlay size={12} className="text-[var(--accent-cyan)]" />
                        {!defaultTracks.find(dt => dt.id === track.id) && (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              removeTrack(track.id);
                            }}
                            className="text-red-900/50 hover:text-red-500"
                          >
                            <FiTrash2 size={12} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrack?.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => skipTrack("next")}
      />

      {/* Add Track Modal Overlay */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setShowAddModal(false)}
            />
            <motion.form 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onSubmit={addTrack}
              className="relative w-full max-w-md terminal-window bg-[var(--bg-surface)] p-8"
            >
               <h3 className="text-xl font-bold font-[VT323] text-[var(--accent-cyan)] mb-6 tracking-wider">$ add_new_track</h3>
               <div className="space-y-4">
                 <div>
                   <label className="block text-[10px] text-[var(--text-tertiary)] font-mono uppercase mb-1">Track Title</label>
                   <input 
                    type="text" 
                    value={newTrack.title}
                    onChange={(e) => setNewTrack({...newTrack, title: e.target.value})}
                    placeholder="E.g. Lo-Fi Beats"
                    className="w-full bg-black/50 border border-[var(--border-base)] rounded px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-cyan)] transition-all font-mono"
                   />
                 </div>
                 <div>
                   <label className="block text-[10px] text-[var(--text-tertiary)] font-mono uppercase mb-1">Artist Name</label>
                   <input 
                    type="text" 
                    value={newTrack.artist}
                    onChange={(e) => setNewTrack({...newTrack, artist: e.target.value})}
                    placeholder="E.g. RetroHacker"
                    className="w-full bg-black/50 border border-[var(--border-base)] rounded px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-cyan)] transition-all font-mono"
                   />
                 </div>
                 <div>
                   <label className="block text-[10px] text-[var(--text-tertiary)] font-mono uppercase mb-1">Audio Source URL (.mp3)</label>
                   <input 
                    type="url" 
                    value={newTrack.url}
                    onChange={(e) => setNewTrack({...newTrack, url: e.target.value})}
                    placeholder="https://example.com/audio.mp3"
                    className="w-full bg-black/50 border border-[var(--border-base)] rounded px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-cyan)] transition-all font-mono"
                   />
                 </div>
               </div>
               <div className="flex gap-4 mt-8">
                 <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-[var(--border-base)] text-[var(--text-secondary)] text-sm font-mono rounded hover:bg-white/5 transition-all"
                 >
                   CANCEL
                 </button>
                 <button 
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[var(--accent-cyan)] text-black text-sm font-mono font-bold rounded hover:bg-cyan-400 transition-all"
                 >
                   SAVE_SOURCE
                 </button>
               </div>
            </motion.form>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
