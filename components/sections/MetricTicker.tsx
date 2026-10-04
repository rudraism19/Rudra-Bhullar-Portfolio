'use client';

import React from 'react';

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
  return (
    <section
      aria-label="Key Impact Metrics"
      className="border-y border-[#2C2720] bg-[#14120E] py-8 px-6 md:px-12 select-none"
    >
      <div className="max-w-7xl mx-auto">
        {/* Editorial Subtitle */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#2C2720]/60 font-mono-tag text-xs text-[#A39E91]">
          <span className="text-[#EB7D00] font-bold tracking-widest uppercase">
            00 // VERIFIED METRIC REGISTRY
          </span>
          <span className="hidden sm:inline text-[#F3EBD8]">
            2023 — 2026 // PRODUCTION RECORD
          </span>
        </div>

        {/* Metric Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-[#2C2720]/60">
          {METRICS.map((item, idx) => (
            <div
              key={item.label}
              className={`flex flex-col justify-between ${
                idx !== 0 ? 'pt-4 md:pt-0 md:pl-4 lg:pl-6' : ''
              }`}
            >
              <div>
                <span className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#EB7D00] tracking-tight block">
                  {item.number}
                </span>
                <span className="font-mono-tag text-xs font-bold text-[#FAF8F2] tracking-wider block mt-1 uppercase">
                  {item.label}
                </span>
              </div>
              <p className="font-mono-tag text-[11px] text-[#A39E91] mt-2 leading-relaxed">
                {item.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
