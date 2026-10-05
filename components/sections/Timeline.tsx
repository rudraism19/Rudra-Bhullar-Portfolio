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
    year: '2025',
    title: 'UIT RGPV — BTech Computer Science',
    focus: 'Data Structures, Java Rigor, Algorithms & Systems Architecture',
    impact: 'Established first-principles algorithmic foundations, solving complex computational problems with space-time optimality.',
  },
  {
    phase: 'NATIONAL HACKATHONS',
    year: 'MAY – SEP 2025',
    title: 'Smart India Hackathon & Agentic Premier League',
    focus: 'Autonomous Agent Orchestration, Civic Bottlenecks, Rapid Prototyping',
    impact: 'Selected in UIT RGPV internal hackathon for SIH 2025 and awarded Google for Developers Agentic Premier League Finals achievement.',
  },
  {
    phase: 'CAMPUS LEADERSHIP',
    year: 'DEC 2025 – PRESENT',
    title: 'Technoverse Club & Code Manthan 2.0',
    focus: 'Algorithmic Problem Setting, Technical Volunteering, Peer Mentorship',
    impact: 'Active member organizing technical operations, problem curation, and coding sprints for 150+ student participants.',
  },
  {
    phase: 'GOOGLE CLOUD ACCREDITATION',
    year: 'FEB 2026',
    title: 'Google Cloud & AI Skills Certification',
    focus: 'Google Cloud Infrastructure, Vertex AI, Foundation Models, Prompt Engineering',
    impact: 'Earned official Google skill accreditation (Badge ID: 22452714) demonstrating enterprise generative AI proficiency.',
  },
  {
    phase: 'PRODUCTION WEB DEV',
    year: 'JUL – AUG 2026',
    title: 'Web Developer & Intern @ Digital Twin Verse (DTV)',
    focus: 'Next.js App Router, Responsive UI/UX, Real-Time Dashboards, API Integration',
    impact: 'Engineered student digital twin simulation engines and responsive analytics interfaces for university recruitment.',
  },
  {
    phase: 'EXECUTIVE STEWARDSHIP',
    year: 'AUG – SEP 2026',
    title: 'Chief Technology Officer (CTO) @ Digital Twin Verse',
    focus: 'Core Tech Leadership, Architecture Governance, UI/UX System Design',
    impact: 'Directed engineering team and product infrastructure, honored with official Certificate of Recognition (DTV-CORE-2026-006).',
  },
  {
    phase: 'NATIONAL CHALLENGES',
    year: 'JUL – AUG 2026',
    title: 'PromptWars, Kaggle AI Agents & Build With Bharat',
    focus: 'Google Build with AI, Kaggle 5-Day Vibe Coding, Unstop Civic Innovation',
    impact: 'Concurrently completed national competitions with verified credentials from Google for Developers, Kaggle, and Unstop.',
  },
  {
    phase: 'CURRENT FOCUS',
    year: 'PRESENT',
    title: 'AI Backend Systems & Scalable APIs',
    focus: 'FastAPI, Hybrid RAG, Autonomous Tool-Calling Agents, Low-Latency WebSockets',
    impact: 'Architecting high-throughput asynchronous backend systems and multimodal AI workflows with rigorous engineering discipline.',
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
