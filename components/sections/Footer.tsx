'use client';

import React from 'react';
import { ArrowUp } from 'lucide-react';
import { useScrollParallax } from '@/hooks/useScrollParallax';

export default function Footer() {
  const { ref: footerRef, offset } = useScrollParallax<HTMLElement>({
    speed: 0.12,
    maxOffset: 40,
  });

  const scrollToTop = () => {
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative border-t border-[#222225] bg-[#0A0A0A] py-16 px-6 md:px-12 text-[#8E8E93] overflow-hidden"
    >
      {/* Background Architectural Watermark Track */}
      <div
        aria-hidden="true"
        style={{
          transform: `translate3d(${offset * 0.3}px, ${offset * -0.15}px, 0)`,
          willChange: 'transform',
        }}
        className="absolute -top-4 left-0 font-display text-[5rem] sm:text-[8rem] md:text-[11rem] font-black uppercase text-[#141416]/40 pointer-events-none select-none whitespace-nowrap overflow-hidden leading-none tracking-tighter"
      >
        TERMINUS // 2026
      </div>

      <div
        style={{
          transform: `translate3d(0, ${offset * -0.1}px, 0)`,
          willChange: 'transform',
        }}
        className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
      >
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight text-[#FAFAFA]">
            RUDRA BHULLAR
          </h2>
          <p className="font-mono-tag text-xs text-[#EDEAE4] mt-1 font-semibold tracking-wider">
            AI BACKEND • EX-CTO @DTV • UIT RGPV
          </p>
          <p className="font-mono-tag text-xs text-[#A0A0A5] mt-2">
            © 2026 Rudra Bhullar. Designed with editorial restraint &amp; mathematical precision.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 font-mono-tag text-xs">
          <a
            href="https://github.com/rudraism19"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#EDEAE4] transition-colors"
            data-cursor="pointer"
          >
            GITHUB
          </a>
          <a
            href="https://linkedin.com/in/rudra-bhullar"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#EDEAE4] transition-colors"
            data-cursor="pointer"
          >
            LINKEDIN
          </a>
          <a
            href="https://instagram.com/rudraism19"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#EDEAE4] transition-colors"
            data-cursor="pointer"
          >
            INSTAGRAM
          </a>
          <a
            href="mailto:rudraism19@gmail.com"
            className="text-[#EDEAE4] hover:text-[#EDEAE4] transition-colors"
            data-cursor="pointer"
          >
            EMAIL
          </a>

          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="p-3 rounded-full border border-[#222225] bg-[#141416]/30 text-[#EDEAE4] hover:text-[#0A0A0A] hover:bg-[#EDEAE4] hover:border-[#EDEAE4] transition-all ml-0 md:ml-4 shadow-lg"
            data-cursor="pointer"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
