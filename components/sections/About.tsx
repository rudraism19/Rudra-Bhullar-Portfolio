'use client';

import React, { useState } from 'react';
import { ArrowDown, Code2, Sparkles, Brain, Compass, Layers } from 'lucide-react';
import InteractiveGlyph from '@/components/ui/InteractiveGlyph';
import { useScrollParallax } from '@/hooks/useScrollParallax';

const IDENTITY_STEPS = [
  { role: 'AI BACKEND ARCHITECT', desc: 'Designing high-throughput asynchronous APIs, FastAPI services, and distributed cloud backends with rigorous latency guarantees.', icon: Code2 },
  { role: 'EX-CTO @ DTV', desc: 'Directed core technical team and web infrastructure at Digital Twin Verse, scaling immersive 3D digital twin systems.', icon: Layers },
  { role: 'AI AGENTS & RAG', desc: 'Pioneering Kaggle AI agent workflows, Google Gemini reasoning loops, and multi-source RAG architectures.', icon: Brain },
  { role: 'CSE SCHOLAR (UIT RGPV)', desc: 'First-principles academic and algorithmic foundations in Data Structures, Java, and System Architecture.', icon: Compass },
  { role: 'CREATIVE TECHNOLOGIST', desc: 'Synthesizing robust systems programming with editorial aesthetics, micro-interactions, and real-time experiences.', icon: Sparkles },
];

export default function About() {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { ref: sectionRef, offset } = useScrollParallax<HTMLElement>({
    speed: 0.15,
    maxOffset: 55,
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

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-28 md:py-36 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#222225]/80 overflow-hidden"
    >
      {/* Background Architectural Watermark Track */}
      <div
        aria-hidden="true"
        style={{
          transform: `translate3d(${offset * 0.3}px, ${offset * -0.2}px, 0)`,
          willChange: 'transform',
        }}
        className="absolute top-12 left-0 font-display text-[7rem] sm:text-[10rem] md:text-[14rem] font-black uppercase text-[#141416]/30 pointer-events-none select-none whitespace-nowrap overflow-hidden leading-none tracking-tighter"
      >
        RUDRA // PROFILE
      </div>

      {/* Section Marker */}
      <div
        style={{
          transform: `translate3d(0, ${offset * -0.06}px, 0)`,
          willChange: 'transform',
        }}
        className="relative z-10 flex items-center justify-between pb-8 mb-12 border-b border-[#222225]/60 font-mono-tag text-xs text-[#8E8E93]"
      >
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
      <div
        style={{
          transform: `translate3d(0, ${offset * -0.1}px, 0)`,
          willChange: 'transform',
        }}
        className="relative z-10 mb-16"
      >
        <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight text-[#FAFAFA]">
          I&apos;M <span className="text-[#EDEAE4]">RUDRA.</span>
        </h2>
        <p className="font-mono-tag text-xs sm:text-sm text-[#8E8E93] mt-2 tracking-widest uppercase">
          ENGINEERING AT THE INTERSECTION OF RIGOR & CREATIVITY
        </p>
      </div>

      {/* Asymmetric Content Split */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left: Interactive Scroll Identity Cascade (7 cols) with subtle forward glide */}
        <div
          style={{
            transform: `translate3d(0, ${offset * 0.08}px, 0)`,
            willChange: 'transform',
          }}
          className="lg:col-span-7 flex flex-col gap-3"
        >
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
                className={`group cursor-pointer p-4 sm:p-5 md:p-6 border rounded-xl select-none ${
                  isActive
                    ? 'bg-[#141416]/60 border-[#EDEAE4]'
                    : 'bg-[#0A0A0A] border-[#222225] hover:border-[#EDEAE4]/50 hover:bg-[#141416]/20'
                }`}
                data-cursor="pointer"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                    <span className="font-mono-tag text-xs font-semibold text-[#EDEAE4] shrink-0">
                      0{idx + 1}
                    </span>
                    <h3
                      className={`font-display text-lg sm:text-2xl lg:text-3xl font-bold tracking-tight uppercase transition-colors duration-200 truncate sm:overflow-visible sm:whitespace-normal ${
                        isActive ? 'text-[#FAFAFA]' : 'text-[#8E8E93] group-hover:text-[#EDEAE4]'
                      }`}
                    >
                      {step.role}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                    <Icon
                      className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-200 ${
                        isActive ? 'text-[#EDEAE4]' : 'text-[#222225] group-hover:text-[#8E8E93]'
                      }`}
                    />
                    {idx < IDENTITY_STEPS.length - 1 && (
                      <ArrowDown
                        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ml-0.5 sm:ml-1 transition-opacity duration-200 ${
                          isActive ? 'text-[#EDEAE4] opacity-100' : 'text-[#222225] opacity-40'
                        }`}
                      />
                    )}
                  </div>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isActive ? 'max-h-56 opacity-100 mt-3 pt-3 border-t border-[#222225]/80' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-xs sm:text-sm text-[#EDEAE4] font-normal leading-relaxed break-words">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Editorial Manifesto & Foundations (5 cols) with counter-elevation float */}
        <div
          style={{
            transform: `translate3d(0, ${offset * -0.14}px, 0)`,
            willChange: 'transform',
          }}
          className="lg:col-span-5 flex flex-col gap-6 sm:gap-8"
        >
          <div className="p-6 sm:p-8 rounded-2xl bg-[#141416]/30 border border-[#222225] relative overflow-hidden">
            <div
              style={{
                transform: `rotate(${offset * 0.35}deg)`,
                willChange: 'transform',
              }}
              className="absolute top-4 right-4"
            >
              <InteractiveGlyph type="neural" size={48} />
            </div>

            <p className="font-mono-tag text-xs text-[#EDEAE4] uppercase tracking-widest mb-3">
              PROFESSIONAL SYNOPSIS
            </p>

            <h4 className="font-display text-xl sm:text-2xl font-bold text-[#FAFAFA] mb-4 leading-snug break-words pr-12">
              Bridging mathematical precision with human-centric technology.
            </h4>

            <p className="text-sm sm:text-base text-[#8E8E93] leading-relaxed mb-4 break-words">
              As a Computer Science Engineering student at UIT RGPV and former Chief Technology Officer at Digital Twin Verse (DTV), I don&apos;t just build interfaces—I architect robust backend foundations, optimize complex data structures, and harness modern Large Language Models to solve meaningful problems.
            </p>

            <p className="text-sm sm:text-base text-[#8E8E93] leading-relaxed break-words">
              My engineering approach prioritizes speed, modularity, and intentional design over bloated frameworks. From civic platforms like JanSetu AI to high-concurrency FastAPI microservices and digital twin systems, every architecture is crafted to deliver palpable utility with editorial restraint.
            </p>
          </div>

          {/* Quick Metrics / Distinct Capabilities */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 font-mono-tag">
            <div className="p-3.5 sm:p-5 border border-[#222225] bg-[#0A0A0A] rounded-xl hover:border-[#EDEAE4]/50 transition-colors flex flex-col justify-between min-w-0">
              <span className="block text-base xs:text-lg sm:text-2xl lg:text-3xl font-display font-extrabold text-[#EDEAE4] truncate tracking-tight">
                FASTAPI & AI
              </span>
              <span className="text-[10px] sm:text-xs text-[#8E8E93] mt-1.5 block leading-tight break-words">
                Scalable Backends & LLM Agents
              </span>
            </div>

            <div className="p-3.5 sm:p-5 border border-[#222225] bg-[#0A0A0A] rounded-xl hover:border-[#EDEAE4]/50 transition-colors flex flex-col justify-between min-w-0">
              <span className="block text-base xs:text-lg sm:text-2xl lg:text-3xl font-display font-extrabold text-[#EDEAE4] truncate tracking-tight">
                EX-CTO @DTV
              </span>
              <span className="text-[10px] sm:text-xs text-[#8E8E93] mt-1.5 block leading-tight break-words">
                Tech Leadership & 3D Systems
              </span>
            </div>

            <div className="p-3.5 sm:p-5 border border-[#222225] bg-[#0A0A0A] rounded-xl hover:border-[#EDEAE4]/50 transition-colors flex flex-col justify-between min-w-0">
              <span className="block text-base xs:text-lg sm:text-2xl lg:text-3xl font-display font-extrabold text-[#EDEAE4] truncate tracking-tight">
                CORE DSA
              </span>
              <span className="text-[10px] sm:text-xs text-[#8E8E93] mt-1.5 block leading-tight break-words">
                Java & Problem Solving Rigor
              </span>
            </div>

            <div className="p-3.5 sm:p-5 border border-[#222225] bg-[#0A0A0A] rounded-xl hover:border-[#EDEAE4]/50 transition-colors flex flex-col justify-between min-w-0">
              <span className="block text-base xs:text-lg sm:text-2xl lg:text-3xl font-display font-extrabold text-[#EDEAE4] truncate tracking-tight">
                UIT RGPV
              </span>
              <span className="text-[10px] sm:text-xs text-[#8E8E93] mt-1.5 block leading-tight break-words">
                BTech Computer Science
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
