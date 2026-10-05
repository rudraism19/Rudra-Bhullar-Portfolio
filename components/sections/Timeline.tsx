'use client';

import React from 'react';

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
    focus: 'Discrete Mathematics, Computer Architecture, Systems & OS Internals',
    impact: 'Established first-principles understanding of computation, memory management, and digital logic.',
  },
  {
    phase: 'SYSTEM RIGOR',
    year: '2023-2024',
    title: 'Competitive DSA (Java & C++)',
    focus: 'Dynamic Programming, Graph Theory, Trees, Complexity Optimization',
    impact: 'Solved 500+ algorithmic problems across LeetCode & competitive platforms, refining mathematical precision.',
  },
  {
    phase: 'FULL-STACK SYSTEMS',
    year: '2024',
    title: 'Production Web Engineering',
    focus: 'Next.js App Router, React Server Components, TypeScript, WebSockets',
    impact: 'Architected high-concurrency client-server applications with type safety and sub-second data streaming.',
  },
  {
    phase: 'GOOGLE AI & MULTIMODAL',
    year: '2024-2025',
    title: 'Gemini API & Google AI Studio',
    focus: 'Gemini 1.5 Flash / Pro, Prompt Orchestration, Audio & Multimodal Workflows',
    impact: 'Engineered real-world applications combining Google Gemini models with reactive client interfaces and speech synthesis.',
  },
  {
    phase: 'VELOCITY & PROTOTYPING',
    year: '2024-2025',
    title: '5+ National-Level Hackathons',
    focus: '36-Hour Rapid Prototyping, Extreme Pressure Architecture, Team Leadership',
    impact: 'Repeated finalist recognition; engineered production MVPs solving civic access and clinical queue bottlenecks.',
  },
  {
    phase: 'CLOUD & RETRIEVAL',
    year: '2025',
    title: 'RAG & Vector Architectures',
    focus: 'Supabase pgvector, Qdrant, Hybrid Retrieval (BM25 + Dense Embeddings)',
    impact: 'Built enterprise-grade compliance and document QA engines with sub-45ms latency and zero hallucination.',
  },
  {
    phase: 'EXPERIMENTATION',
    year: 'CURRENT',
    title: 'Creative Technology & MCP',
    focus: 'Model Context Protocol, WebGL GPU Shaders, Editorial Design Systems',
    impact: 'Unifying rigorous systems programming with avant-garde interactive web design.',
  },
];

export default function Timeline() {
  return (
    <section
      id="journey"
      className="relative py-28 md:py-36 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#222225]"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#222225] mb-16">
        <div>
          <div className="flex flex-wrap items-center gap-2 font-mono-tag text-xs text-[#EDEAE4] uppercase tracking-widest mb-3">
            <span className="font-bold">06 / CHRONOLOGICAL EVOLUTION</span>
            <span className="text-[#222225]">—</span>
            <span className="text-[#8E8E93]">FIRST-PRINCIPLES TO PRODUCTION</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight text-[#FAFAFA]">
            THE <span className="text-[#EDEAE4]">JOURNEY.</span>
          </h2>
        </div>

        <p className="max-w-md font-mono-tag text-xs text-[#8E8E93] leading-relaxed">
          From first-principles theoretical computation to national hackathon podiums, multimodal AI deployments, and creative web engineering.
        </p>
      </div>

        <div className="relative pl-6 md:pl-10 border-l border-[#222225] space-y-12">
          {MILESTONES.map((milestone) => (
            <div
              key={milestone.title}
              className="relative group select-none"
              data-cursor="pointer"
            >
              {/* Node marker */}
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[#0A0A0A] border-2 border-[#222225] group-hover:border-[#EDEAE4] group-hover:bg-[#EDEAE4] transition-colors" />

              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2 font-mono-tag text-xs">
                <span className="text-[#EDEAE4] font-bold tracking-wider uppercase">
                  {milestone.phase}
                </span>
                <span className="text-[#EDEAE4]">
                  {milestone.year}
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#FAFAFA] group-hover:text-[#EDEAE4] transition-colors mb-2 break-words">
                {milestone.title}
              </h3>

              <p className="text-sm font-mono-tag text-[#EDEAE4]/90 mb-2 break-words">
                {milestone.focus}
              </p>

              <p className="text-sm text-[#8E8E93] leading-relaxed max-w-2xl font-normal break-words">
                {milestone.impact}
              </p>
            </div>
          ))}
        </div>
    </section>
  );
}
