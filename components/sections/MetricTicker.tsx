'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useScrollParallax } from '@/hooks/useScrollParallax';

interface MetricItem {
  number: string;
  label: string;
  sub: string;
}

const METRICS: MetricItem[] = [
  {
    number: '10+',
    label: 'PROJECTS COMPLETED',
    sub: 'Full Stack Web & AI Systems',
  },
  {
    number: '5+',
    label: 'NATIONAL HACKATHONS',
    sub: '36-Hour Rapid Prototyping',
  },
  {
    number: '20+',
    label: 'CORE TECHNOLOGIES',
    sub: 'Java, Next.js, Gemini, RAG',
  },
  {
    number: '1000+',
    label: 'COMMITTED HOURS',
    sub: 'Algorithmic & Architecture Rigor',
  },
  {
    number: '15+',
    label: 'GITHUB REPOSITORIES',
    sub: 'Open Source & Experimental Works',
  },
  {
    number: '∞',
    label: 'CONTINUOUS LEARNING',
    sub: 'Exploring Frontier Technology',
  },
];

export default function MetricTicker() {
  const [isVisible, setIsVisible] = useState(false);
  const { ref: sectionRef, offset } = useScrollParallax<HTMLElement>({
    speed: 0.14,
    maxOffset: 45,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [sectionRef]);

  return (
    <section
      ref={sectionRef}
      aria-label="Key Impact Metrics"
      className="relative border-y border-[#222225] bg-[#0A0A0A] py-12 px-6 md:px-12 select-none overflow-hidden"
    >
      {/* Background Parallax Watermark Track */}
      <div
        aria-hidden="true"
        style={{
          transform: `translate3d(${offset * 0.4}px, ${offset * -0.15}px, 0)`,
          willChange: 'transform',
        }}
        className="absolute -top-6 left-0 right-0 font-display text-[5rem] sm:text-[7rem] md:text-[8.5rem] font-black uppercase text-[#141416]/40 pointer-events-none select-none whitespace-nowrap overflow-hidden leading-none tracking-tighter"
      >
        TELEMETRY // VERIFIED RECORD
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Editorial Subtitle with subtle depth glide */}
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible
              ? `translate3d(0, ${offset * -0.08}px, 0)`
              : 'translate3d(0, 16px, 0)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
            willChange: 'transform',
          }}
          className="flex items-center justify-between pb-6 mb-8 border-b border-[#222225]/60 font-mono-tag text-xs text-[#8E8E93]"
        >
          <span className="text-[#EDEAE4] font-bold tracking-widest uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EDEAE4] inline-block animate-pulse" />
            00 // VERIFIED METRIC REGISTRY
          </span>
          <span className="hidden sm:inline text-[#EDEAE4]">
            2023 — 2026 // PRODUCTION RECORD
          </span>
        </div>

        {/* Staggered Multi-Plane Metric Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {METRICS.map((item, idx) => {
            // Alternate vertical parallax translation for 2.5D architectural depth
            const cardParallaxY = (idx % 2 === 0 ? -1 : 1) * offset * 0.22;

            return (
              <div
                key={item.label}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible
                    ? `translate3d(0, ${cardParallaxY}px, 0)`
                    : 'translate3d(0, 28px, 0)',
                  transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 70}ms, transform 0.15s ease-out`,
                  willChange: 'transform',
                }}
                className="p-3.5 sm:p-4 rounded-xl border border-[#222225] bg-[#141416]/30 hover:border-[#EDEAE4]/50 hover:bg-[#141416]/50 flex flex-col justify-between group hover:translate-y-[-4px] transition-all duration-300 min-w-0 shadow-lg backdrop-blur-sm"
              >
                <div>
                  <span className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#EDEAE4] tracking-tight block group-hover:text-[#FFFFFF] group-hover:scale-105 transition-all origin-left truncate">
                    {item.number}
                  </span>
                  <span className="font-mono-tag text-[10px] sm:text-xs font-bold text-[#FAFAFA] tracking-wide block mt-1.5 uppercase group-hover:text-[#EDEAE4] transition-colors leading-tight break-words">
                    {item.label}
                  </span>
                </div>
                <p className="font-mono-tag text-[10px] sm:text-[11px] text-[#8E8E93] mt-2.5 leading-relaxed break-words">
                  {item.sub}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
