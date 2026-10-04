'use client';

import React, { useEffect, useState } from 'react';

interface LoaderProps {
  onComplete?: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [step, setStep] = useState(1);
  const [isExiting, setIsExiting] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsRemoved(true);
      onComplete?.();
      return;
    }

    const t1 = setTimeout(() => setStep(2), 260);
    const t2 = setTimeout(() => setStep(3), 520);
    const t3 = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setIsRemoved(true);
        onComplete?.();
      }, 500);
    }, 850);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  if (isRemoved) return null;

  return (
    <div
      className={`fixed inset-0 z-[99998] flex flex-col justify-between p-8 md:p-14 bg-[#0A0A0A] text-[#FAFAFA] transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
        isExiting ? '-translate-y-full opacity-90' : 'translate-y-0 opacity-100'
      }`}
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      {/* Top identifier */}
      <div className="flex items-center justify-between text-xs tracking-widest text-[#8E8E93] font-mono-tag">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#EDEAE4]" />
          INITIALIZING WORKSPACE
        </span>
        <span>2026 // INDIA</span>
      </div>

      {/* Center typography */}
      <div className="my-auto max-w-4xl">
        <p className="text-xs uppercase tracking-[0.3em] text-[#EDEAE4] font-mono-tag mb-4">
          PORTFOLIO ARCHIVE
        </p>
        <h1 className="font-display text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight text-[#FAFAFA]">
          RUDRA BHULLAR
        </h1>
        <p className="text-sm md:text-base text-[#8E8E93] mt-3 font-mono-tag">
          CSE STUDENT • DEVELOPER • AI BUILDER
        </p>
      </div>

      {/* Bottom sequence indicator */}
      <div className="flex items-end justify-between border-t border-[#222225] pt-6 font-mono-tag">
        <div className="flex items-center gap-4 text-xs">
          <span className={`transition-colors duration-200 ${step === 1 ? 'text-[#EDEAE4] font-bold' : 'text-[#8E8E93]/50'}`}>
            01 / SYSTEM
          </span>
          <span className="text-[#222225]">/</span>
          <span className={`transition-colors duration-200 ${step === 2 ? 'text-[#EDEAE4] font-bold' : 'text-[#8E8E93]/50'}`}>
            02 / SHADERS
          </span>
          <span className="text-[#222225]">/</span>
          <span className={`transition-colors duration-200 ${step === 3 ? 'text-[#EDEAE4] font-bold' : 'text-[#8E8E93]/50'}`}>
            03 / READY
          </span>
        </div>

        <div className="text-right">
          <span className="text-2xl md:text-4xl font-display font-semibold text-[#EDEAE4]">
            0{step}
          </span>
          <span className="text-xs text-[#8E8E93] ml-1">/ 03</span>
        </div>
      </div>
    </div>
  );
}
