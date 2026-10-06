'use client';

import React, { useEffect, useState } from 'react';

export default function AmbientBackgroundParallax() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          rafId = null;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Micro-parallax transformations at different deep background planes
  const plane1Y = (scrollY * 0.04) % 800;
  const plane2Y = (scrollY * -0.06) % 600;
  const plane3Y = (scrollY * 0.08) % 1000;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none opacity-40"
    >
      {/* Deep Background Plane 1: Left Margin Coordinate Telemetry */}
      <div
        style={{
          transform: `translate3d(0, ${-plane1Y}px, 0)`,
          willChange: 'transform',
        }}
        className="absolute left-3 sm:left-6 top-0 flex flex-col gap-64 font-mono-tag text-[9px] sm:text-[10px] text-[#EDEAE4]/20 tracking-widest uppercase [writing-mode:vertical-rl] rotate-180"
      >
        <span>LAT 23.2599° N // LON 77.4126° E</span>
        <span>UIT RGPV CSE // SYSTEM MATRIX</span>
        <span>PRODUCTION ARCHITECTURE // 2026</span>
        <span>LAT 23.2599° N // LON 77.4126° E</span>
      </div>

      {/* Deep Background Plane 2: Right Margin Precision Millimeter Ticks */}
      <div
        style={{
          transform: `translate3d(0, ${plane2Y}px, 0)`,
          willChange: 'transform',
        }}
        className="absolute right-3 sm:right-6 top-0 flex flex-col gap-48 font-mono-tag text-[9px] sm:text-[10px] text-[#EDEAE4]/20 tracking-widest uppercase [writing-mode:vertical-rl]"
      >
        <span>SYS TELEMETRY // 60-120 FPS COMPOSITED</span>
        <span>FASTAPI • GEMINI 1.5 • RAG MESH</span>
        <span>EX-CTO @ DTV // RUNTIME KERNEL</span>
        <span>SYS TELEMETRY // 60-120 FPS COMPOSITED</span>
      </div>

      {/* Deep Background Plane 3: Subtle Drifting Precision Crosshairs */}
      <div
        style={{
          transform: `translate3d(0, ${-plane3Y}px, 0)`,
          willChange: 'transform',
        }}
        className="absolute inset-0"
      >
        <div className="absolute top-[20%] left-[15%] text-[#EDEAE4]/15 font-mono text-xs">+</div>
        <div className="absolute top-[45%] right-[20%] text-[#EDEAE4]/15 font-mono text-xs">+</div>
        <div className="absolute top-[75%] left-[25%] text-[#EDEAE4]/15 font-mono text-xs">+</div>
      </div>
    </div>
  );
}
