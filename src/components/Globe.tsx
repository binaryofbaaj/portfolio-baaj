"use client";

import createGlobe from "cobe";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let phi = 0;
    let width = 0;
    const currentTheme = resolvedTheme || theme;
    
    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };
    
    window.addEventListener("resize", onResize);
    onResize();

    if (!canvasRef.current || !mounted) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0,
      dark: currentTheme === "dark" ? 1 : 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: currentTheme === "dark" ? 6 : 1.2,
      baseColor: currentTheme === "dark" ? [0.3, 0.3, 0.3] : [0.95, 0.95, 0.95],
      markerColor: [0.1, 0.8, 1],
      glowColor: currentTheme === "dark" ? [1, 1, 1] : [0.8, 0.8, 0.8],
      markers: [
        { location: [28.6139, 77.2090], size: 0.1 }, // New Delhi
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.005;
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = '1';
    });

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [theme, resolvedTheme, mounted]);

  if (!mounted) return <div className="w-full aspect-square" />;

  return (
    <div className="w-full relative aspect-square max-w-[500px] mx-auto filter drop-shadow-2xl">
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-0 transition-opacity duration-1000 cursor-grab active:cursor-grabbing"
      />
    </div>
  );
}
