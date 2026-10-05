'use client';

import React, { useEffect, useState } from 'react';
import { Github, Linkedin, Twitter, Mail, Menu } from 'lucide-react';

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
  const [time, setTime] = useState<string>('');
  const [scrollY, setScrollY] = useState<number>(0);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [glarePos, setGlarePos] = useState<{ x: number; y: number; opacity: number }>({ x: 50, y: 50, opacity: 0 });

  useEffect(() => {
    // 1. Live IST clock
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

    // 2. Smooth Scroll Parallax tracking (within hero range)
    const handleScroll = () => {
      if (window.scrollY <= 1400) {
        setScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = ((clientX - left) / width - 0.5) * 2;
    const y = ((clientY - top) / height - 0.5) * 2;
    setMousePos({ x, y });
    setGlarePos({
      x: ((clientX - left) / width) * 100,
      y: ((clientY - top) / height) * 100,
      opacity: 0.65,
    });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

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

  // Scroll ratio for smooth animations (0 to 1 over first 700px)
  const scrollRatio = Math.min(1, Math.max(0, scrollY / 700));
  const canvasScale = 1 - scrollRatio * 0.045; // 1.0 -> 0.955
  const canvasRadius = 32 + scrollRatio * 20; // 32px -> 52px
  const headerOpacity = Math.max(0, 1 - scrollY / 160);
  const silhouetteY = scrollY * 0.32 + mousePos.y * 10;
  const silhouetteScale = Math.max(0.86, 1 - scrollRatio * 0.12);
  const typographyY = -scrollY * 0.18 - mousePos.y * 8;
  const specsY = -scrollY * 0.1;

  return (
    <section
      id="hero"
      style={{ perspective: '1400px' }}
      className="relative w-full px-3 sm:px-6 lg:px-8 pt-3 sm:pt-5 pb-8 max-w-[1680px] mx-auto overflow-hidden bg-[#0A0A0A]"
    >
      {/* Editorial Titanium Architectural Limestone Canvas Block with 3D Card Recess */}
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `scale(${canvasScale}) translate3d(0, ${scrollY * 0.06}px, 0) rotateX(${-mousePos.y * 3.2}deg) rotateY(${mousePos.x * 3.2}deg)`,
          borderRadius: `${canvasRadius}px`,
          transformOrigin: 'center top',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1), border-radius 0.12s ease-out',
          willChange: 'transform, border-radius',
        }}
        className="relative w-full bg-[#EDEAE4] overflow-hidden min-h-[92vh] sm:min-h-[94vh] lg:min-h-[96vh] flex flex-col justify-between shadow-2xl border border-[#EDEAE4]/40"
      >
        
        {/* Dynamic Specular Sheen Tracking Cursor Across Limestone */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 800px at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,${glarePos.opacity}), rgba(255,255,255,0.08) 40%, transparent 70%)`,
          }}
        />

        {/* Ambient Warm Corner Sheen */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_25%,_rgba(255,255,255,0.5),_transparent_65%)] pointer-events-none" />

        {/* Fine Editorial Grid Watermark Lines */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(to right, #0A0A0A 1px, transparent 1px), linear-gradient(to bottom, #0A0A0A 1px, transparent 1px)`,
            backgroundSize: '48px 48px'
          }}
        />

        {/* 1. TOP EDITORIAL BAR (Dissolves gracefully on scroll) (z-30) */}
        <header 
          style={{
            opacity: headerOpacity,
            transform: `translate3d(0, ${-scrollY * 0.2}px, 0)`,
            transition: 'opacity 0.2s ease-out',
          }}
          className="relative px-6 sm:px-10 md:px-14 pt-6 sm:pt-8 flex items-center justify-between z-30"
        >
          {/* Based In Location */}
          <div className="flex flex-col text-left">
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-[#0A0A0A]/60 font-bold">
              Based in:
            </span>
            <span className="font-sans text-xs sm:text-sm font-extrabold tracking-tight text-[#0A0A0A]">
              Madhya Pradesh, India
            </span>
          </div>

          {/* Live Indian Standard Time (IST) */}
          <div className="hidden sm:flex flex-col items-center text-center">
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-[#0A0A0A]/60 font-bold">
              Local Time
            </span>
            <span className="font-mono text-xs sm:text-sm font-bold tracking-tight text-[#0A0A0A]">
              {time || '11:45:00 PM IST'}
            </span>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollTo('work')}
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

        {/* 2. GIANT CONDENSED DISPLAY TYPOGRAPHY WITH 3D PARALLAX (z-10 - Deep Plane) */}
        <div 
          style={{
            transform: `translate3d(${-mousePos.x * 16}px, ${typographyY - mousePos.y * 8}px, -24px)`,
            transition: 'transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
            willChange: 'transform',
          }}
          className="absolute top-20 sm:top-24 md:top-28 lg:top-32 left-6 sm:left-10 md:left-14 lg:left-16 z-10 pointer-events-none select-none flex flex-col"
        >
          <h1 className="flex flex-col gap-1.5 sm:gap-2.5 select-none">
            <span className="font-headline text-[15vw] sm:text-[12.5vw] md:text-[10.5vw] lg:text-[9vw] xl:text-[130px] 2xl:text-[142px] font-black uppercase text-[#0A0A0A] leading-[0.88] tracking-[0.02em]">
              RUDRA
            </span>
            <span className="font-headline text-[15vw] sm:text-[12.5vw] md:text-[10.5vw] lg:text-[9vw] xl:text-[130px] 2xl:text-[142px] font-black uppercase text-[#0A0A0A] leading-[0.88] tracking-[0.02em]">
              BHULLAR
            </span>
          </h1>
        </div>

        {/* 3. PORTRAIT SILHOUETTE CUTOUT WITH 3D DEPTH PARALLAX (z-20 - Foreground Plane) */}
        <div 
          style={{
            transform: `translate3d(${mousePos.x * 22}px, ${silhouetteY + mousePos.y * 14}px, 45px) scale(${silhouetteScale})`,
            transition: 'transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
            willChange: 'transform',
          }}
          className="absolute bottom-0 left-[30%] sm:left-[34%] md:left-[38%] lg:left-[42%] translate-x-[-10%] sm:translate-x-0 z-20 pointer-events-none select-none flex items-end justify-center"
        >
          {/* Crisp HD Cutout Image with Directional Light-Angle Drop Shadow */}
          <img
            src="/rudra-hero-hd.png"
            alt="Rudra Bhullar - Creative Technologist & AI Engineer"
            style={{
              filter: `drop-shadow(${-mousePos.x * 16}px ${18 - mousePos.y * 8}px 28px rgba(0,0,0,0.18))`,
              transition: 'filter 0.15s ease-out',
            }}
            className="h-[48vh] sm:h-[54vh] md:h-[60vh] lg:h-[66vh] xl:h-[70vh] max-h-[600px] w-auto object-contain object-bottom"
          />
        </div>

        {/* 4. RIGHT COLUMN: SPECIALIZATION / SERVICES (z-30 - Floating Plane) */}
        <div 
          style={{
            transform: `translate3d(${mousePos.x * 8}px, ${specsY + mousePos.y * 6}px, 20px)`,
            transition: 'transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
          }}
          className="absolute top-[46%] -translate-y-1/2 right-6 sm:right-10 md:right-14 lg:right-16 z-30 hidden lg:flex flex-col text-left max-w-[210px] lg:max-w-[250px]"
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

        {/* 5. ORGANIC CURVED BOTTOM BASELINE DIVIDER (z-15) */}
        <div className="absolute bottom-0 right-0 w-full h-[140px] sm:h-[180px] md:h-[220px] pointer-events-none z-15 overflow-hidden hidden md:block">
          <svg
            viewBox="0 0 1440 220"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <path
              d="M 520,220 C 640,220 680,100 820,100 L 1440,100 L 1440,220 Z"
              fill="#0A0A0A"
            />
          </svg>
        </div>

        {/* 6. BOTTOM ROW: EDITORIAL BIO + SOCIALS (LEFT) & CTA BUTTON (RIGHT) (z-30) */}
        <div className="relative px-6 sm:px-10 md:px-14 pb-6 sm:pb-8 md:pb-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 z-30 mt-auto">
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

          {/* Right: Bold CTA Button on the dark foundation */}
          <div className="w-full sm:w-auto">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('contact');
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
    </section>
  );
}
