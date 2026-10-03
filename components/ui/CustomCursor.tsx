'use client';

import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [cursorState, setCursorState] = useState<'default' | 'pointer' | 'view'>('default');
  const [isHovered, setIsHovered] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on desktop pointer devices and if reduced motion is off
    if (typeof window === 'undefined') return;
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasFinePointer || prefersReducedMotion) {
      return;
    }

    setEnabled(true);

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Check target elements for cursor states
      const target = e.target as HTMLElement | null;
      if (target) {
        const viewTrigger = target.closest('[data-cursor="view"]');
        const pointerTrigger = target.closest('a, button, [role="button"], [data-cursor="pointer"], input, textarea');

        if (viewTrigger) {
          setCursorState('view');
          setIsHovered(true);
        } else if (pointerTrigger) {
          setCursorState('pointer');
          setIsHovered(true);
        } else {
          setCursorState('default');
          setIsHovered(false);
        }
      }
    };

    const render = () => {
      // Smooth lerp for ring
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      rafId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove);
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden select-none">
      {/* Central precision dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-[#EB7D00] transition-opacity duration-150 ${
          cursorState === 'view' ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Floating follower ring / label */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 flex items-center justify-center -ml-5 -mt-5 transition-all duration-200 ease-out ${
          cursorState === 'view'
            ? 'w-24 h-10 -ml-12 -mt-5 bg-[#EB7D00] text-[#2E2910] font-mono-tag text-xs font-bold tracking-wider rounded-full shadow-lg shadow-[#EB7D00]/20'
            : isHovered
            ? 'w-12 h-12 -ml-6 -mt-6 rounded-full border border-[#EB7D00] bg-[#EB7D00]/10 scale-100'
            : 'w-8 h-8 -ml-4 -mt-4 rounded-full border border-[#EBE3A7]/40 scale-75'
        }`}
      >
        {cursorState === 'view' && <span>VIEW →</span>}
      </div>
    </div>
  );
}
