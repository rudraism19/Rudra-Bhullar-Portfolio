'use client';

import React from 'react';
import HeroShader from '@/components/ui/HeroShader';
import MagneticButton from '@/components/ui/MagneticButton';
import { ArrowDownRight, Sparkles, Terminal, Cpu } from 'lucide-react';

const TAGS = ['AI', 'WEB', 'JAVA', 'DSA', 'CREATIVE TECH'];

export default function Hero() {
  const scrollTo = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      const lenis = (window as unknown as { __lenis?: { scrollTo: (target: HTMLElement | string) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo(el);
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[95vh] flex flex-col justify-between pt-28 md:pt-36 pb-16 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Top Editorial Metadata Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#4A4322]/80 font-mono-tag text-xs text-[#BDB99F]">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#EB7D00] inline-block animate-pulse" />
          <span className="text-[#EBE3A7] tracking-wider font-semibold">PORTFOLIO EDITION // 2026</span>
          <span className="hidden sm:inline text-[#4A4322]">|</span>
          <span className="hidden sm:inline">BASED IN INDIA</span>
        </div>

        <div className="flex items-center gap-4 text-[11px] tracking-widest text-[#BDB99F]">
          <span className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-[#EB7D00]" />
            SYSTEM ARCHITECTURE & INTELLIGENCE
          </span>
        </div>
      </div>

      {/* Main Asymmetric Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto py-8">
        {/* Left Column: Bold Editorial Typography & Narrative (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Subtitle tag */}
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="font-mono-tag text-xs tracking-widest uppercase text-[#EB7D00] font-bold">
              RUDRA BHULLAR
            </span>
            <span className="text-[#4A4322] font-mono-tag">/</span>
            <span className="font-mono-tag text-xs tracking-widest text-[#BDB99F]">
              CREATIVE TECHNOLOGIST × AI ENGINEER
            </span>
          </div>

          {/* Large Bold Display Typography */}
          <h1 className="font-display text-5xl sm:text-7xl lg:text-[5.5rem] font-extrabold uppercase tracking-tight leading-[0.92] text-[#F8F5E8] mb-6">
            I BUILD <br />
            <span className="text-[#EBE3A7]">DIGITAL</span> <br />
            <span className="inline-block relative">
              EXPERIENCES.
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-[#EB7D00]/70 rounded-full" />
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg md:text-xl text-[#BDB99F] font-normal max-w-xl leading-relaxed mb-8">
            Computer Science Engineering student building AI-powered products,
            high-performance web systems, and experimental technology that bridges algorithms with human intent.
          </p>

          {/* Skill Tag Badges */}
          <div className="flex flex-wrap items-center gap-2.5 mb-10">
            {TAGS.map((tag) => (
              <span
                key={tag}
                className="px-3.5 py-1.5 rounded-full border border-[#4A4322] bg-[#2C5745]/30 text-[#EBE3A7] text-xs font-mono-tag tracking-wider hover:border-[#EB7D00] hover:text-[#EB7D00] transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <MagneticButton
              variant="primary"
              onClick={() => scrollTo('work')}
            >
              <span>VIEW MY WORK</span>
              <ArrowDownRight className="w-4 h-4 text-[#2E2910]" />
            </MagneticButton>

            <MagneticButton
              variant="outline"
              onClick={() => scrollTo('contact')}
            >
              <span>LET&apos;S CONNECT</span>
            </MagneticButton>
          </div>
        </div>

        {/* Right Column: WebGL Interactive Shader Visual (5 cols) */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <div className="w-full relative group">
            {/* Ambient decorative glow */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#2C5745] via-[#EB7D00]/20 to-[#EBE3A7]/10 opacity-30 blur-xl group-hover:opacity-50 transition-opacity duration-700 pointer-events-none" />
            
            <HeroShader />
          </div>
        </div>
      </div>

      {/* Hero Footer Strip / Editorial Details */}
      <div className="pt-6 border-t border-[#4A4322]/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono-tag text-xs text-[#BDB99F]">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-[#EB7D00]" />
          <span>CORE FOCUS: SCALABLE ARCHITECTURES × GENERATIVE AI × GRAPHIC DISCIPLINE</span>
        </div>

        <button
          onClick={() => scrollTo('about')}
          className="flex items-center gap-2 text-[#EBE3A7] hover:text-[#EB7D00] transition-colors group"
        >
          <span>EXPLORE PROFILE</span>
          <span className="text-[#EB7D00] group-hover:translate-y-0.5 transition-transform">↓</span>
        </button>
      </div>
    </section>
  );
}
