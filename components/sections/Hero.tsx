'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { Github, Linkedin, Twitter, Mail, Menu, ArrowDown } from 'lucide-react';

const FOCUS_AREAS = [
  'AI Backend & Agent Systems',
  'Scalable FastAPI & Cloud APIs',
  'RAG & Vector Retrieval',
  'Java & Algorithmic Rigor (DSA)',
  'Digital Twin Systems (Ex-CTO @DTV)',
];

const SOCIAL_LINKS = [
  { name: 'GitHub', href: 'https://github.com/rudraism19', icon: Github },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/rudra-bhullar', icon: Linkedin },
  { name: 'X / Twitter', href: 'https://x.com/rudrabhullar', icon: Twitter },
  { name: 'Email', href: 'mailto:rudrabhullar19@gmail.com', icon: Mail },
];

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const cardWrapperRef = useRef<HTMLDivElement | null>(null);
  const titleDockRef = useRef<HTMLDivElement | null>(null);
  const titleAnimRef = useRef<HTMLDivElement | null>(null);

  const [time, setTime] = useState<string>('');
  const [assembleProgress, setAssembleProgress] = useState<number>(0);
  const [exitRatio, setExitRatio] = useState<number>(0);
  const [exitDist, setExitDist] = useState<number>(0);
  const [deltas, setDeltas] = useState({
    deltaX: 0,
    deltaY: 0,
    initialScale: 1.35,
    isReady: false,
  });

  // 1. Live Indian Standard Time (IST)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }) + ' IST'
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // 2. Measure docked center vs viewport center for unified single-element glide
  const calculateDeltas = useCallback(() => {
    if (!cardWrapperRef.current || !titleDockRef.current) return;

    const cardW = cardWrapperRef.current.offsetWidth;
    const cardH = cardWrapperRef.current.offsetHeight;
    const cardCenterX = cardW / 2;
    const cardCenterY = cardH / 2;

    const dockLeft = titleDockRef.current.offsetLeft;
    const dockTop = titleDockRef.current.offsetTop;
    const dockW = titleDockRef.current.offsetWidth;
    const dockH = titleDockRef.current.offsetHeight;

    const dockedCenterX = dockLeft + dockW / 2;
    const dockedCenterY = dockTop + dockH / 2;

    // deltaX and deltaY to move the title's center from docked position to viewport center
    const deltaX = cardCenterX - dockedCenterX;
    const deltaY = cardCenterY - dockedCenterY;

    const winW = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const scale = winW < 640 ? 1.15 : winW < 1024 ? 1.25 : 1.35;

    setDeltas({
      deltaX,
      deltaY,
      initialScale: scale,
      isReady: true,
    });
  }, []);

  useEffect(() => {
    calculateDeltas();
    window.addEventListener('resize', calculateDeltas);

    // Re-check after layout and fonts load
    const t1 = setTimeout(calculateDeltas, 100);
    const t2 = setTimeout(calculateDeltas, 350);

    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(calculateDeltas);
    }

    return () => {
      window.removeEventListener('resize', calculateDeltas);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [calculateDeltas]);

  // 3. Scroll tracking: Phase 1 (Assembly Runway) + Phase 2 (Old Down Parallax)
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const scrollDist = -rect.top;
      const runwayDist = window.innerHeight * 0.55;
      const totalScrollable = rect.height - window.innerHeight;

      // Phase 1: Assembly (0.0 to 1.0)
      const aProg = Math.min(1, Math.max(0, scrollDist / (runwayDist || 1)));
      setAssembleProgress(aProg);

      // Phase 2: Down scroll parallax (starts when assembly finishes)
      const eDist = Math.max(0, scrollDist - runwayDist);
      const eMax = totalScrollable - runwayDist;
      const eRatio = Math.min(1, Math.max(0, eDist / (eMax || 1)));

      setExitDist(eDist);
      setExitRatio(eRatio);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (targetId: string) => {
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

  const scrollToAssembledHero = () => {
    if (!heroRef.current) return;
    const runwayDist = window.innerHeight * 0.55;
    const targetY = heroRef.current.offsetTop + runwayDist;
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(targetY);
    } else {
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  // =========================================================================
  // DUAL-PHASE PARALLAX CALCULATIONS
  // Phase 1 (assembleProgress < 1): Big title shrinks & glides, card assembles
  // Phase 2 (assembleProgress == 1): Old multi-plane down scroll parallax
  // =========================================================================

  // 1. Unified Single Title Transform
  let titleX = (1 - assembleProgress) * deltas.deltaX;
  let titleY = (1 - assembleProgress) * deltas.deltaY;
  let titleScale = 1 + (1 - assembleProgress) * (deltas.initialScale - 1);
  let titleColor = '#0A0A0A';

  if (assembleProgress <= 0.20) {
    titleColor = '#FAFAFA';
  } else if (assembleProgress < 0.50) {
    const t = (assembleProgress - 0.20) / 0.30;
    const v = Math.round(250 - t * 240); // 250 -> 10
    titleColor = `rgb(${v}, ${v}, ${v})`;
  } else {
    titleColor = '#0A0A0A';
  }

  // Once fully assembled, apply dynamic multi-plane down scroll parallax
  if (assembleProgress >= 1.0) {
    titleX = 0;
    titleY = -exitDist * 0.08; // Floating upward with inverse parallax
    titleScale = 1.0;
  }

  // 2. Limestone Card Slab Transform
  let canvasScale = 0.86 + assembleProgress * 0.14; // 0.86 -> 1.00
  let canvasTranslateY = (1 - assembleProgress) * 90; // 90px -> 0px
  let canvasRadius = 44 - assembleProgress * 12; // 44px -> 32px
  let canvasOpacity = Math.min(1, Math.max(0, (assembleProgress - 0.05) / 0.65));

  // Once fully assembled, dynamic 3D card recess
  if (assembleProgress >= 1.0) {
    canvasScale = 1.0 - exitRatio * 0.035; // 1.00 -> 0.965 card recess
    canvasTranslateY = exitDist * 0.04; // Subtle physical card lag
    canvasRadius = 32 + exitRatio * 12; // 32px -> 44px expanding radius
    canvasOpacity = 1.0;
  }

  // 3. Portrait Cutout Silhouette Transform
  let silhouetteY = (1 - assembleProgress) * 220; // 220px -> 0px
  let silhouetteScale = 0.88 + assembleProgress * 0.12; // 0.88 -> 1.00
  let silhouetteOpacity = Math.min(1, Math.max(0, (assembleProgress - 0.25) / 0.60));

  // Once fully assembled, authentic portrait depth sink
  if (assembleProgress >= 1.0) {
    silhouetteY = exitDist * 0.14; // Sinks into the card with genuine depth
    silhouetteScale = Math.max(0.92, 1.0 - exitRatio * 0.06);
    silhouetteOpacity = 1.0;
  }

  // 4. Specialization Column Transform (Right Column)
  let specsX = (1 - assembleProgress) * 36;
  let specsY = 0;
  let specsOpacity = Math.min(1, Math.max(0, (assembleProgress - 0.55) / 0.40));

  if (assembleProgress >= 1.0) {
    specsX = 0;
    specsY = -exitDist * 0.05; // Floats upward
    specsOpacity = 1.0;
  }

  // 5. Top Editorial Header Bar Transform
  let headerTranslateY = (1 - assembleProgress) * 24;
  let headerOpacity = Math.min(1, Math.max(0, (assembleProgress - 0.55) / 0.40));

  if (assembleProgress >= 1.0) {
    headerTranslateY = -exitDist * 0.08;
    headerOpacity = Math.max(0, 1.0 - exitDist / 200); // Soft dissolve
  }

  // 6. Bottom Row Transform
  let bottomTranslateY = (1 - assembleProgress) * 24;
  let bottomOpacity = Math.min(1, Math.max(0, (assembleProgress - 0.55) / 0.40));

  if (assembleProgress >= 1.0) {
    bottomTranslateY = -exitDist * 0.03;
    bottomOpacity = 1.0;
  }

  // 7. Initial Intro Subtitles & Scroll Prompt (Fade out cleanly as scroll starts)
  const introOpacity = Math.max(0, 1 - assembleProgress * 4.5);
  const introTranslateY = -assembleProgress * 30;

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative w-full h-[185vh] bg-[#0A0A0A]"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center px-3 sm:px-6 lg:px-8 py-3 sm:py-5 overflow-hidden">

        {/* ========================================================================= */}
        {/* PHASE 1 OVERLAY: TOP & BOTTOM CONTEXT + SCROLL PROMPT (Fades cleanly)     */}
        {/* ========================================================================= */}
        {introOpacity > 0.01 && (
          <div
            style={{
              opacity: introOpacity,
              transform: `translate3d(0, ${introTranslateY}px, 0)`,
              pointerEvents: assembleProgress > 0.1 ? 'none' : 'auto',
            }}
            className="absolute inset-0 z-35 flex flex-col justify-between p-6 sm:p-12 md:p-16 select-none pointer-events-none max-w-[1680px] mx-auto"
          >
            {/* Top Coordinate Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 font-mono-tag text-xs text-[#8E8E93] border-b border-[#222225]/70 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#EDEAE4] animate-pulse" />
                <span className="text-[#EDEAE4] font-bold uppercase tracking-wider">
                  AI BACKEND ARCHITECT // EX-CTO @DTV
                </span>
              </div>
              <span className="text-[#8E8E93] text-[11px] tracking-widest uppercase">
                SHIVPURI, MADHYA PRADESH • INDIA
              </span>
            </div>

            {/* Bottom Telemetry & Scroll Cue */}
            <div className="flex items-center justify-between font-mono-tag text-xs text-[#EDEAE4] border-t border-[#222225]/70 pt-4 pointer-events-auto mt-auto">
              <span className="text-[#8E8E93] hidden sm:inline-block">
                FIRST-PRINCIPLES SYSTEMS ARCHITECTURE
              </span>
              <button
                onClick={scrollToAssembledHero}
                className="flex items-center gap-3 cursor-pointer group text-xs text-[#EDEAE4] hover:text-[#FAFAFA] transition-colors ml-auto sm:ml-0"
                data-cursor="pointer"
                aria-label="Scroll to assemble Hero section"
              >
                <span className="tracking-widest uppercase font-bold group-hover:translate-y-0.5 transition-transform">
                  SCROLL TO ASSEMBLE HERO
                </span>
                <div className="w-8 h-8 rounded-full border border-[#222225] group-hover:border-[#EDEAE4] bg-[#141416] flex items-center justify-center transition-colors shadow-md">
                  <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#EDEAE4]" />
                </div>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* HERO CANVAS WRAPPER: Contains Limestone Slab, Title, Cutout & Hero UI     */}
        {/* ========================================================================= */}
        <div
          ref={cardWrapperRef}
          className="relative w-full max-w-[1680px] h-[90vh] sm:h-[92vh] lg:h-[94vh] flex flex-col justify-between"
        >
          {/* 1. ARCHITECTURAL LIMESTONE SLAB (Scales up in Phase 1, Recesses in Phase 2) */}
          <div
            style={{
              transform: `scale(${canvasScale}) translate3d(0, ${canvasTranslateY}px, 0)`,
              opacity: canvasOpacity,
              transformOrigin: 'center center',
              willChange: 'transform, opacity',
            }}
            className="absolute inset-0 bg-[#EDEAE4] overflow-hidden rounded-[32px] sm:rounded-[40px] shadow-2xl border border-[#EDEAE4]/40 z-0 pointer-events-none"
          >
            {/* Subtle Ambient Specular Lighting */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_25%,_rgba(255,255,255,0.7),_transparent_65%)] pointer-events-none" />

            {/* Fine Editorial Grid Watermark Lines */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-[0.04]"
              style={{
                backgroundImage: `linear-gradient(to right, #0A0A0A 1px, transparent 1px), linear-gradient(to bottom, #0A0A0A 1px, transparent 1px)`,
                backgroundSize: '48px 48px'
              }}
            />

            {/* Organic Curved Bottom Baseline Divider */}
            <div className="absolute bottom-0 right-0 w-full h-[140px] sm:h-[180px] md:h-[220px] pointer-events-none z-10 hidden md:block">
              <svg viewBox="0 0 1440 220" preserveAspectRatio="none" className="w-full h-full">
                <path d="M 520,220 C 640,220 680,100 820,100 L 1440,100 L 1440,220 Z" fill="#0A0A0A" />
              </svg>
            </div>
          </div>

          {/* 2. TOP EDITORIAL BAR (Fades into place in Phase 1, Dissolves in Phase 2) */}
          <header 
            style={{
              opacity: headerOpacity,
              transform: `translate3d(0, ${headerTranslateY}px, 0)`,
              pointerEvents: assembleProgress > 0.6 && headerOpacity > 0.2 ? 'auto' : 'none',
            }}
            className="relative px-6 sm:px-10 md:px-14 pt-6 sm:pt-8 flex items-center justify-between z-30 transition-opacity"
          >
            {/* Based In Location */}
            <div className="flex flex-col text-left">
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-[#0A0A0A]/85 font-bold">
                Based in:
              </span>
              <span className="font-sans text-xs sm:text-sm font-extrabold tracking-tight text-[#0A0A0A]">
                Madhya Pradesh, India
              </span>
            </div>

            {/* Live Indian Standard Time (IST) */}
            <div className="hidden sm:flex flex-col items-center text-center">
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-[#0A0A0A]/85 font-bold">
                Local Time
              </span>
              <span className="font-mono text-xs sm:text-sm font-bold tracking-tight text-[#0A0A0A]">
                {time || '11:45:00 PM IST'}
              </span>
            </div>

            {/* Header Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => scrollToSection('work')}
                className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#0A0A0A]/20 bg-[#0A0A0A]/5 hover:bg-[#0A0A0A] hover:text-[#FAFAFA] text-xs font-mono font-bold uppercase tracking-wider transition-all"
                data-cursor="pointer"
              >
                <span>Explore Work</span>
                <span>↓</span>
              </button>
              <button
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.dispatchEvent(new CustomEvent('toggle-nav-menu'));
                  }
                }}
                className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-lg border border-[#0A0A0A] bg-[#0A0A0A] text-[#FAFAFA] hover:bg-[#FAFAFA] hover:text-[#0A0A0A] text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md group"
                data-cursor="pointer"
                aria-label="Toggle navigation menu"
              >
                <Menu className="w-3.5 h-3.5" />
                <span>Menu</span>
              </button>
            </div>
          </header>

          {/* 3. THE SINGLE UNIFIED "RUDRA BHULLAR" TITLE WITH EYEBROW & SUBTITLE */}
          <div
            ref={titleDockRef}
            className="absolute top-20 sm:top-24 md:top-28 lg:top-32 left-6 sm:left-10 md:left-14 lg:left-16 z-25 pointer-events-none select-none flex flex-col"
          >
            <div
              ref={titleAnimRef}
              style={{
                transform: `translate3d(${titleX}px, ${titleY}px, 0) scale(${titleScale})`,
                transformOrigin: 'center center',
                color: titleColor,
                willChange: 'transform, color',
              }}
              className="select-none relative inline-block text-left"
            >
              {/* Eyebrow badge (Positioned directly above title, visible only in intro) */}
              {introOpacity > 0.01 && (
                <div
                  style={{ opacity: introOpacity }}
                  className="absolute -top-7 sm:-top-8 left-0 right-0 flex items-center justify-center gap-2 pointer-events-none font-mono-tag text-[10px] sm:text-xs tracking-widest text-[#8E8E93] whitespace-nowrap"
                >
                  <span className="text-[#EDEAE4] font-bold">PORTFOLIO ARCHIVE</span>
                  <span className="text-[#222225]">—</span>
                  <span>2026 EDITION</span>
                </div>
              )}

              {/* The Single Master <h1> Element */}
              <h1 className="flex flex-col gap-1.5 sm:gap-2.5 select-none font-headline text-[15vw] sm:text-[12.5vw] md:text-[10.5vw] lg:text-[9vw] xl:text-[130px] 2xl:text-[142px] font-black uppercase leading-[0.88] tracking-[0.02em] whitespace-nowrap">
                <span className="block">RUDRA</span>
                <span className="block">BHULLAR</span>
              </h1>

              {/* Subtitle tag (Positioned directly below title, visible only in intro) */}
              {introOpacity > 0.01 && (
                <div
                  style={{ opacity: introOpacity }}
                  className="absolute -bottom-8 sm:-bottom-10 left-0 right-0 flex items-center justify-center pointer-events-none font-mono-tag text-[10px] sm:text-xs text-[#8E8E93] tracking-wider uppercase whitespace-nowrap"
                >
                  FASTAPI • LLMs &amp; AGENTS • VECTOR RAG • DIGITAL TWINS • JAVA &amp; DSA
                </div>
              )}
            </div>
          </div>

          {/* 4. PORTRAIT SILHOUETTE CUTOUT (Rises in Phase 1, Sinks with Depth Parallax in Phase 2) */}
          <div 
            style={{
              transform: `translate3d(0, ${silhouetteY}px, 0) scale(${silhouetteScale})`,
              opacity: silhouetteOpacity,
              willChange: 'transform, opacity',
            }}
            className="absolute bottom-0 left-[30%] sm:left-[34%] md:left-[38%] lg:left-[42%] translate-x-[-10%] sm:translate-x-0 z-20 pointer-events-none select-none flex items-end justify-center"
          >
            <Image
              src="/rudra-hero-hd.png"
              alt="Rudra Bhullar - Creative Technologist & AI Engineer"
              width={600}
              height={700}
              priority
              sizes="(max-width: 640px) 75vw, (max-width: 1024px) 50vw, 600px"
              className="h-[48vh] sm:h-[54vh] md:h-[60vh] lg:h-[66vh] xl:h-[70vh] max-h-[600px] w-auto object-contain object-bottom filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.12)]"
            />
          </div>

          {/* 5. RIGHT COLUMN: SPECIALIZATION (Fades in in Phase 1, Floats in Phase 2) */}
          <div 
            style={{
              opacity: specsOpacity,
              transform: `translate3d(${specsX}px, ${specsY}px, 0)`,
            }}
            className="absolute top-[46%] -translate-y-1/2 right-6 sm:right-10 md:right-14 lg:right-16 z-30 hidden lg:flex flex-col text-left max-w-[210px] lg:max-w-[250px] pointer-events-none"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#0A0A0A]" />
              <span className="font-mono text-xs font-bold tracking-widest uppercase text-[#0A0A0A]">
                SPECIALIZATION
              </span>
            </div>
            <ul className="space-y-2.5 text-[#0A0A0A]/90 font-sans font-bold text-sm lg:text-[15px] leading-snug">
              {FOCUS_AREAS.map((item) => (
                <li
                  key={item}
                  className="transition-transform duration-200 hover:translate-x-1.5 cursor-default flex items-center gap-1.5"
                >
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 6. BOTTOM ROW: EDITORIAL BIO + SOCIALS & CTA BUTTON */}
          <div 
            style={{
              opacity: bottomOpacity,
              transform: `translate3d(0, ${bottomTranslateY}px, 0)`,
              pointerEvents: assembleProgress > 0.6 ? 'auto' : 'none',
            }}
            className="relative px-6 sm:px-10 md:px-14 pb-6 sm:pb-8 md:pb-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 z-30 mt-auto transition-opacity"
          >
            {/* Left: Bio statement & Social icon links */}
            <div className="max-w-xs sm:max-w-sm md:max-w-md">
              <p className="font-sans text-xs sm:text-sm text-[#0A0A0A]/90 leading-relaxed font-bold mb-3 sm:mb-4 break-words">
                Building scalable AI backend architectures, high-performance APIs,
                and intelligent agent systems with engineering discipline.
              </p>
              <div className="flex items-center gap-2">
                {SOCIAL_LINKS.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.name}
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-[#0A0A0A] text-[#EDEAE4] hover:bg-[#FAFAFA] hover:text-[#0A0A0A] flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
                      data-cursor="pointer"
                    >
                      <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Right: Bold CTA Button */}
            <div className="w-full sm:w-auto">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contact');
                }}
                className="inline-flex items-center justify-between sm:justify-start gap-3 w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 rounded-lg bg-[#0A0A0A] text-[#FAFAFA] md:bg-[#EDEAE4] md:text-[#0A0A0A] border border-[#222225] hover:bg-[#141416] md:hover:bg-[#FFFFFF] md:hover:text-[#0A0A0A] font-mono text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 shadow-xl hover:scale-105 active:scale-95 group"
                data-cursor="pointer"
              >
                <span>START A PROJECT</span>
                <span className="w-5 h-5 rounded bg-[#FAFAFA] text-[#0A0A0A] md:bg-[#0A0A0A] md:text-[#EDEAE4] group-hover:bg-[#FFFFFF] group-hover:text-[#0A0A0A] flex items-center justify-center text-xs transition-colors">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
