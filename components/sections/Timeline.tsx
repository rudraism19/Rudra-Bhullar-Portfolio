'use client';

import React from 'react';
import { Trophy, Code2, Cpu, Cloud, CheckCircle2 } from 'lucide-react';

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

const ACHIEVEMENTS = [
  {
    icon: Trophy,
    title: '5+ National Hackathons',
    desc: 'Podium and finalist recognitions for shipping high-velocity civic tech and healthcare solutions within 36-hour sprint windows.',
  },
  {
    icon: Cpu,
    title: 'Gemini API & React Integration',
    desc: 'Architected real-world multimodal AI platforms leveraging Google AI Studio, Gemini 1.5, and low-latency audio pipelines.',
  },
  {
    icon: Code2,
    title: '500+ DSA Problems Solved',
    desc: 'Rigorous algorithmic foundation across Java and C++, emphasizing asymptotic efficiency, tree traversals, and dynamic programming.',
  },
  {
    icon: Cloud,
    title: 'Google Cloud & AI Practitioner',
    desc: 'Certified foundational proficiency across Google Cloud infrastructure, vector embeddings, and containerized deployments.',
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
          <div className="flex items-center gap-2 font-mono-tag text-xs text-[#EDEAE4] uppercase tracking-widest mb-3">
            <span className="font-bold">05 / TIMELINE &amp; ACHIEVEMENTS</span>
            <span className="text-[#222225]">—</span>
            <span className="text-[#8E8E93]">VERIFIED TRACK RECORD</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight text-[#FAFAFA]">
            THE <span className="text-[#EDEAE4]">JOURNEY.</span>
          </h2>
        </div>

        <p className="max-w-md font-mono-tag text-xs text-[#8E8E93] leading-relaxed">
          From first-principles theoretical computation to national hackathon podiums, multimodal AI deployments, and creative web engineering.
        </p>
      </div>

      {/* Verified Key Achievements Strip */}
      <div className="mb-20">
        <p className="font-mono-tag text-xs uppercase tracking-widest text-[#EDEAE4] mb-6 font-semibold">
          [ KEY ACHIEVEMENTS &amp; RECOGNITION ]
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ACHIEVEMENTS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="p-6 rounded-xl border border-[#222225] bg-[#141416]/20 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#0A0A0A] border border-[#EDEAE4] flex items-center justify-center text-[#EDEAE4] mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#FAFAFA] mb-2 uppercase">
                    {item.title}
                  </h3>
                  <p className="font-mono-tag text-xs text-[#8E8E93] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-[#222225]/60 flex items-center gap-1.5 text-[11px] font-mono-tag text-[#EDEAE4]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#EDEAE4]" />
                  <span>VERIFIED RECORD</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Editorial Vertical Timeline */}
      <div>
        <p className="font-mono-tag text-xs uppercase tracking-widest text-[#EDEAE4] mb-8 font-semibold">
          [ CHRONOLOGICAL EVOLUTION ]
        </p>

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

              <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#FAFAFA] group-hover:text-[#EDEAE4] transition-colors mb-2">
                {milestone.title}
              </h3>

              <p className="text-sm font-mono-tag text-[#EDEAE4]/90 mb-2">
                {milestone.focus}
              </p>

              <p className="text-sm text-[#8E8E93] leading-relaxed max-w-2xl font-normal">
                {milestone.impact}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
