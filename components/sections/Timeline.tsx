'use client';

import React from 'react';
import { ArrowDown, CheckCircle2 } from 'lucide-react';

interface Milestone {
  phase: string;
  year: string;
  title: string;
  focus: string;
  impact: string;
}

const MILESTONES: Milestone[] = [
  {
    phase: 'CSE FOUNDATIONS',
    year: '2023',
    title: 'Computer Science Engineering',
    focus: 'Discrete Mathematics, Computer Architecture, Operating Systems',
    impact: 'Established first-principles understanding of computation and memory hierarchy.',
  },
  {
    phase: 'SYSTEM LANGUAGE',
    year: '2023',
    title: 'Java Rigor',
    focus: 'Object-Oriented Programming, Multithreading, JVM Internals',
    impact: 'Mastered type discipline and memory management paradigms.',
  },
  {
    phase: 'ALGORITHMS',
    year: '2024',
    title: 'Data Structures & Algorithms',
    focus: 'Trees, Dynamic Programming, Graphs, Complexity Analysis',
    impact: 'Solved 500+ problems, developing mathematical problem-solving velocity.',
  },
  {
    phase: 'FULL-STACK',
    year: '2024',
    title: 'Modern Web Engineering',
    focus: 'React, Next.js App Router, TypeScript, REST & WebSockets',
    impact: 'Transitioned from standalone scripts to end-to-end distributed web applications.',
  },
  {
    phase: 'INTELLIGENCE',
    year: '2025',
    title: 'Artificial Intelligence & RAG',
    focus: 'Vector Databases, Gemini Flash, LangChain, Embeddings',
    impact: 'Shipped civic & legal retrieval engines reducing information barriers.',
  },
  {
    phase: 'VELOCITY',
    year: '2025',
    title: 'National Hackathons',
    focus: 'Rapid MVP engineering, high-stress problem solving, team leadership',
    impact: 'Finalist standings; refined ability to deliver functional systems in 36 hours.',
  },
  {
    phase: 'COLLABORATION',
    year: '2025-2026',
    title: 'Open Source Ecosystems',
    focus: 'Model Context Protocol, DevRelay, tooling contributions',
    impact: 'Contributing to open protocols and public developer infrastructure.',
  },
  {
    phase: 'EXPERIMENTATION',
    year: 'CURRENT',
    title: 'Creative Technology',
    focus: 'WebGL Shaders, GPU compute, Editorial web systems, Tactile UI',
    impact: 'Unifying engineering rigor with avant-garde interactive design.',
  },
];

export default function Timeline() {
  return (
    <section
      id="journey"
      className="relative py-28 md:py-36 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#4A4322]/80"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#4A4322]/60 mb-16">
        <div>
          <div className="flex items-center gap-2 font-mono-tag text-xs text-[#EB7D00] uppercase tracking-widest mb-3">
            <span className="font-bold">05 / TIMELINE</span>
            <span className="text-[#4A4322]">—</span>
            <span className="text-[#BDB99F]">CHRONOLOGICAL TRAJECTORY</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight text-[#F8F5E8]">
            THE <span className="text-[#EB7D00]">JOURNEY.</span>
          </h2>
        </div>

        <p className="max-w-md font-mono-tag text-xs text-[#BDB99F] leading-relaxed">
          From foundational theoretical computation to high-velocity AI engineering and creative technology experiments.
        </p>
      </div>

      {/* Editorial Vertical Timeline */}
      <div className="relative pl-6 md:pl-10 border-l border-[#4A4322]/80 space-y-12">
        {MILESTONES.map((milestone, idx) => (
          <div
            key={milestone.title}
            className="relative group select-none"
            data-cursor="pointer"
          >
            {/* Timeline node marker */}
            <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[#2E2910] border-2 border-[#4A4322] group-hover:border-[#EB7D00] group-hover:bg-[#EB7D00] transition-colors" />

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2 font-mono-tag text-xs">
              <span className="text-[#EB7D00] font-bold tracking-wider">
                {milestone.phase}
              </span>
              <span className="text-[#EBE3A7]">
                {milestone.year}
              </span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#F8F5E8] group-hover:text-[#EB7D00] transition-colors mb-2">
              {milestone.title}
            </h3>

            <p className="text-sm font-mono-tag text-[#EBE3A7]/90 mb-2">
              {milestone.focus}
            </p>

            <p className="text-sm text-[#BDB99F] leading-relaxed max-w-2xl">
              {milestone.impact}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
