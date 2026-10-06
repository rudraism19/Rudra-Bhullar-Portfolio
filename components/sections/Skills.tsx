'use client';

import React, { useState } from 'react';
import InteractiveGlyph from '@/components/ui/InteractiveGlyph';
import { Terminal, Code, Cpu, Wrench, Sparkles, Check } from 'lucide-react';
import { useScrollParallax } from '@/hooks/useScrollParallax';

interface SkillItem {
  name: string;
  context: string;
  level: string;
  tag: string;
}

interface SkillCategory {
  id: string;
  title: string;
  glyph: 'terminal' | 'cube' | 'neural' | 'circuit';
  icon: typeof Terminal;
  skills: SkillItem[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'languages',
    title: 'LANGUAGES',
    glyph: 'terminal',
    icon: Code,
    skills: [
      { name: 'Java', context: 'DSA, Multithreading, OOP, JVM Architecture, LeetCode 500+', level: 'Foundational Rigor', tag: 'CORE' },
      { name: 'TypeScript', context: 'Strict static types, Generics, Next.js App Router, SDK Dev', level: 'Production Daily', tag: 'WEB' },
      { name: 'JavaScript', context: 'ESNext, Asynchronous Event Loops, WebGL & DOM APIs', level: 'Fluent', tag: 'RUNTIME' },
      { name: 'Python', context: 'FastAPI, LangChain, PyTorch embeddings, Data Wrangling', level: 'AI Pipeline', tag: 'DATA' },
    ],
  },
  {
    id: 'web',
    title: 'WEB ARCHITECTURE',
    glyph: 'cube',
    icon: Terminal,
    skills: [
      { name: 'React', context: 'Server Components, Custom Hooks, State Machines, Reconciliation', level: 'Advanced', tag: 'UI' },
      { name: 'Next.js', context: 'App Router, Streaming SSR, Parallel Routes, Edge Functions', level: 'Advanced', tag: 'FULLSTACK' },
      { name: 'Node.js', context: 'REST APIs, WebSockets, Fastify microservices, Streams', level: 'Proficient', tag: 'BACKEND' },
      { name: 'Tailwind CSS', context: 'Custom design tokens, fluid typography, responsive layout engines', level: 'Mastery', tag: 'STYLING' },
    ],
  },
  {
    id: 'ai',
    title: 'AI & INTELLIGENCE',
    glyph: 'neural',
    icon: Cpu,
    skills: [
      { name: 'Generative AI', context: 'Multimodal reasoning, prompt orchestration, prompt routing', level: 'Production', tag: 'CORE' },
      { name: 'RAG Systems', context: 'Hybrid search (BM25 + Dense vector), chunking, re-ranking', level: 'Specialist', tag: 'RETRIEVAL' },
      { name: 'LLM APIs', context: 'Gemini 1.5, Sarvam AI, OpenAI, Claude SDKs, streaming buffers', level: 'Production', tag: 'API' },
      { name: 'AI Agents', context: 'Tool calling loops, autonomous task decomposition, memory stores', level: 'Active Research', tag: 'AUTONOMY' },
      { name: 'MCP (Model Context)', context: 'Model Context Protocol servers, client integrations, schema tools', level: 'Pioneer', tag: 'INTEGRATION' },
    ],
  },
  {
    id: 'tools',
    title: 'INFRA & TOOLS',
    glyph: 'circuit',
    icon: Wrench,
    skills: [
      { name: 'Git & GitHub', context: 'Trunk-based workflow, interactive rebasing, CI/CD Actions', level: 'Expert', tag: 'VCS' },
      { name: 'Supabase', context: 'PostgreSQL, Row Level Security, pgvector embeddings, Realtime', level: 'Production', tag: 'DATABASE' },
      { name: 'Docker', context: 'Multi-stage containerization, local orchestration, image caching', level: 'Proficient', tag: 'DEVOPS' },
      { name: 'Vercel', context: 'Serverless deployment, edge middleware, preview pipelines', level: 'Production', tag: 'CLOUD' },
    ],
  },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>('languages');
  const [isVisible, setIsVisible] = useState(false);
  const { ref: sectionRef, offset } = useScrollParallax<HTMLElement>({
    speed: 0.14,
    maxOffset: 50,
  });

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.12 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [sectionRef]);

  const currentCat = SKILL_CATEGORIES.find((c) => c.id === activeCategory) || SKILL_CATEGORIES[0];

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-28 md:py-36 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#222225]/80 overflow-hidden"
    >
      {/* Background Architectural Watermark Track */}
      <div
        aria-hidden="true"
        style={{
          transform: `translate3d(${offset * -0.35}px, ${offset * 0.15}px, 0)`,
          willChange: 'transform',
        }}
        className="absolute top-10 right-0 font-display text-[6.5rem] sm:text-[9.5rem] md:text-[13rem] font-black uppercase text-[#141416]/30 pointer-events-none select-none whitespace-nowrap overflow-hidden leading-none tracking-tighter"
      >
        STACK // 03
      </div>

      {/* Header with depth glide */}
      <div
        style={{
          transform: `translate3d(0, ${offset * -0.08}px, 0)`,
          willChange: 'transform',
        }}
        className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#222225]/60 mb-12"
      >
        <div>
          <div className="flex flex-wrap items-center gap-2 font-mono-tag text-xs text-[#EDEAE4] uppercase tracking-widest mb-3">
            <span className="font-bold">03 / TECHNICAL REPERTOIRE</span>
            <span className="text-[#222225]">—</span>
            <span className="text-[#8E8E93]">DEPTH OVER PERCENTAGE BARS</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight text-[#FAFAFA]">
            SKILLS & <span className="text-[#EDEAE4]">TOOLING.</span>
          </h2>
        </div>

        <p className="max-w-md font-mono-tag text-xs text-[#8E8E93] leading-relaxed">
          I evaluate competency not through arbitrary percentage meters, but by systems shipped, algorithms implemented, and latency benchmarks achieved.
        </p>
      </div>

      {/* Category Tabs */}
      <div
        style={{
          transform: `translate3d(0, ${offset * -0.04}px, 0)`,
          willChange: 'transform',
        }}
        className="relative z-10 flex flex-wrap items-center gap-3 mb-10"
      >
        {SKILL_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl font-mono-tag text-xs tracking-wider transition-all duration-200 select-none ${
                isActive
                  ? 'bg-[#141416] text-[#EDEAE4] border border-[#EDEAE4]'
                  : 'bg-[#0A0A0A] text-[#8E8E93] border border-[#222225] hover:text-[#FAFAFA] hover:border-[#EDEAE4]/40'
              }`}
              data-cursor="pointer"
            >
              <InteractiveGlyph type={cat.glyph} size={20} />
              <span className="font-bold">{cat.title}</span>
            </button>
          );
        })}
      </div>

      {/* Skills Editorial Grid with Staggered Column Parallax */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentCat.skills.map((skill, idx) => {
          // Column 1 vs Column 2 vertical float offset
          const colOffset = (idx % 2 === 0 ? -1 : 1) * offset * 0.18;

          return (
            <div
              key={skill.name}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible
                  ? `translate3d(0, ${colOffset}px, 0)`
                  : 'translate3d(0, 28px, 0)',
                transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 90}ms, transform 0.15s ease-out`,
                willChange: 'transform',
              }}
              className="p-5 sm:p-6 md:p-8 rounded-2xl bg-[#141416]/25 border border-[#222225] hover:border-[#EDEAE4] hover:bg-[#141416]/40 transition-all duration-300 group flex flex-col justify-between shadow-lg"
              data-cursor="pointer"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded bg-[#0A0A0A] border border-[#222225] font-mono-tag text-[10px] text-[#EDEAE4] uppercase tracking-widest font-semibold">
                    {skill.tag}
                  </span>
                  <span className="font-mono-tag text-xs text-[#EDEAE4] shrink-0">
                    {skill.level}
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#FAFAFA] group-hover:text-[#EDEAE4] transition-colors mb-3 break-words">
                  {skill.name}
                </h3>

                <p className="text-sm text-[#8E8E93] font-normal leading-relaxed break-words">
                  {skill.context}
                </p>
              </div>

              <div className="pt-5 sm:pt-6 mt-6 border-t border-[#222225]/50 flex flex-wrap items-center justify-between gap-2 text-xs font-mono-tag text-[#8E8E93]">
                <span className="flex items-center gap-1.5 text-[#EDEAE4]">
                  <Check className="w-3.5 h-3.5 text-[#EDEAE4] shrink-0" />
                  Validated in Production
                </span>
                <span className="text-[#222225] group-hover:text-[#EDEAE4] transition-colors text-[11px] sm:text-xs">
                  PROVEN TECH
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
