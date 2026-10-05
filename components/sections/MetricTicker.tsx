'use client';

import React, { useEffect, useRef, useState } from 'react';

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
  const sectionRef = useRef<HTMLElement | null>(null);

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
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Key Impact Metrics"
      className="border-y border-[#222225] bg-[#0A0A0A] py-10 px-6 md:px-12 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Editorial Subtitle */}
        <div 
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
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

        {/* Staggered Metric Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-[#222225]/60">
          {METRICS.map((item, idx) => (
            <div
              key={item.label}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(28px)',
                transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 90}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 90}ms`,
              }}
              className={`flex flex-col justify-between group hover:translate-y-[-4px] transition-transform duration-300 ${
                idx !== 0 ? 'pt-4 md:pt-0 md:pl-4 lg:pl-6' : ''
              }`}
            >
              <div>
                <span className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#EDEAE4] tracking-tight block group-hover:text-[#FFFFFF] group-hover:scale-105 transition-all origin-left">
                  {item.number}
                </span>
                <span className="font-mono-tag text-xs font-bold text-[#FAFAFA] tracking-wider block mt-1 uppercase group-hover:text-[#EDEAE4] transition-colors">
                  {item.label}
                </span>
              </div>
              <p className="font-mono-tag text-[11px] text-[#8E8E93] mt-2 leading-relaxed">
                {item.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
