'use client';

import React, { useState } from 'react';
import { ArrowDown, Code2, Sparkles, Brain, Compass, Layers } from 'lucide-react';
import InteractiveGlyph from '@/components/ui/InteractiveGlyph';

const IDENTITY_STEPS = [
  { role: 'CSE STUDENT', desc: 'Rigorous engineering foundations in algorithms, data structures & systems architecture.', icon: Code2 },
  { role: 'DEVELOPER', desc: 'Crafting responsive, type-safe full-stack web platforms with Next.js & React.', icon: Layers },
  { role: 'BUILDER', desc: 'Shipping end-to-end products solving real civic, educational, and healthcare problems.', icon: Compass },
  { role: 'AI EXPLORER', desc: 'Designing multimodal workflows, RAG agents, and domain-tuned LLM architectures.', icon: Brain },
  { role: 'CREATIVE ENGINEER', desc: 'Experimenting with GLSL shaders, micro-interactions, and editorial web design.', icon: Sparkles },
];

export default function About() {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = React.useRef<HTMLElement | null>(null);

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
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-28 md:py-36 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#222225]/80"
    >
      {/* Section Marker */}
      <div className="flex items-center justify-between pb-8 mb-12 border-b border-[#222225]/60 font-mono-tag text-xs text-[#8E8E93]">
        <div className="flex items-center gap-2">
          <span className="text-[#EDEAE4] font-bold">02 / ABOUT</span>
          <span className="text-[#222225]">—</span>
          <span>EDITORIAL PROFILE & EVOLUTION</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[#EDEAE4]">
          <span>[ IDENTITY SPECTRUM ]</span>
        </div>
      </div>

      {/* Main Headline */}
      <div className="mb-16">
        <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight text-[#FAFAFA]">
          I&apos;M <span className="text-[#EDEAE4]">RUDRA.</span>
        </h2>
        <p className="font-mono-tag text-xs sm:text-sm text-[#8E8E93] mt-2 tracking-widest uppercase">
          ENGINEERING AT THE INTERSECTION OF RIGOR & CREATIVITY
        </p>
      </div>

      {/* Asymmetric Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left: Interactive Scroll Identity Cascade (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          <p className="font-mono-tag text-xs text-[#EDEAE4] tracking-wider mb-2">
            HOVER OR SELECT A PHASE TO INSPECT:
          </p>

          {IDENTITY_STEPS.map((step, idx) => {
            const isActive = activeStep === idx;
            const Icon = step.icon;

            return (
              <div
                key={step.role}
                onMouseEnter={() => setActiveStep(idx)}
                onClick={() => setActiveStep(idx)}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible
                    ? isActive ? 'translateX(8px)' : 'translateX(0)'
                    : 'translateY(24px)',
                  transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 80}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 80}ms`,
                }}
                className={`group cursor-pointer p-5 md:p-6 border rounded-xl select-none ${
                  isActive
                    ? 'bg-[#141416]/60 border-[#EDEAE4]'
                    : 'bg-[#0A0A0A] border-[#222225] hover:border-[#EDEAE4]/50 hover:bg-[#141416]/20'
                }`}
                data-cursor="pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="font-mono-tag text-xs font-semibold text-[#EDEAE4]">
                      0{idx + 1}
                    </span>
                    <h3
                      className={`font-display text-xl sm:text-3xl font-bold tracking-tight uppercase transition-colors duration-200 ${
                        isActive ? 'text-[#FAFAFA]' : 'text-[#8E8E93] group-hover:text-[#EDEAE4]'
                      }`}
                    >
                      {step.role}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <Icon
                      className={`w-5 h-5 transition-colors duration-200 ${
                        isActive ? 'text-[#EDEAE4]' : 'text-[#222225] group-hover:text-[#8E8E93]'
                      }`}
                    />
                    {idx < IDENTITY_STEPS.length - 1 && (
                      <ArrowDown
                        className={`w-4 h-4 ml-1 transition-opacity duration-200 ${
                          isActive ? 'text-[#EDEAE4] opacity-100' : 'text-[#222225] opacity-40'
                        }`}
                      />
                    )}
                  </div>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isActive ? 'max-h-24 opacity-100 mt-3 pt-3 border-t border-[#222225]/80' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-sm text-[#EDEAE4] font-normal leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Editorial Manifesto & Foundations (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div className="p-8 rounded-2xl bg-[#141416]/30 border border-[#222225] relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <InteractiveGlyph type="neural" size={54} />
            </div>

            <p className="font-mono-tag text-xs text-[#EDEAE4] uppercase tracking-widest mb-3">
              PROFESSIONAL SYNOPSIS
            </p>

            <h4 className="font-display text-xl sm:text-2xl font-bold text-[#FAFAFA] mb-4 leading-snug">
              Bridging mathematical precision with human-centric technology.
            </h4>

            <p className="text-sm sm:text-base text-[#8E8E93] leading-relaxed mb-4">
              As a Computer Science Engineering student based in India, I don&apos;t just build interfaces—I architect robust backend foundations, optimize complex data structures, and harness modern Large Language Models to solve meaningful problems.
            </p>

            <p className="text-sm sm:text-base text-[#8E8E93] leading-relaxed">
              My engineering approach prioritizes speed, modularity, and intentional design over bloated frameworks. From civic platforms like JanSetu AI to voice-driven RAG pipelines, every system is crafted to deliver palpable utility with editorial restraint.
            </p>
          </div>

          {/* Quick Metrics / Distinct Capabilities */}
          <div className="grid grid-cols-2 gap-4 font-mono-tag">
            <div className="p-5 border border-[#222225] bg-[#0A0A0A] rounded-xl hover:border-[#EDEAE4]/50 transition-colors">
              <span className="block text-2xl sm:text-3xl font-display font-extrabold text-[#EDEAE4]">
                CORE DSA
              </span>
              <span className="text-xs text-[#8E8E93] mt-1 block">
                Java & Problem Solving Rigor
              </span>
            </div>

            <div className="p-5 border border-[#222225] bg-[#0A0A0A] rounded-xl hover:border-[#EDEAE4]/50 transition-colors">
              <span className="block text-2xl sm:text-3xl font-display font-extrabold text-[#EDEAE4]">
                FULL-STACK
              </span>
              <span className="text-xs text-[#8E8E93] mt-1 block">
                Next.js, Node, Supabase
              </span>
            </div>

            <div className="p-5 border border-[#222225] bg-[#0A0A0A] rounded-xl hover:border-[#EDEAE4]/50 transition-colors">
              <span className="block text-2xl sm:text-3xl font-display font-extrabold text-[#EDEAE4]">
                AI AGENTS
              </span>
              <span className="text-xs text-[#8E8E93] mt-1 block">
                RAG, Gemini, MCP Tools
              </span>
            </div>

            <div className="p-5 border border-[#222225] bg-[#0A0A0A] rounded-xl hover:border-[#EDEAE4]/50 transition-colors">
              <span className="block text-2xl sm:text-3xl font-display font-extrabold text-[#EDEAE4]">
                HACKATHONS
              </span>
              <span className="text-xs text-[#8E8E93] mt-1 block">
                High Velocity Prototyping
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
