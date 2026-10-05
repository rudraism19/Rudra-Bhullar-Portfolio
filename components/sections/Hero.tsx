'use client';

import React, { useEffect, useState } from 'react';
import { Github, Linkedin, Twitter, Mail, Menu } from 'lucide-react';

const FOCUS_AREAS = [
  'Full-Stack Systems',
  'Multimodal AI & RAG',
  'Distributed Architecture',
  'Java & DSA Rigor',
  'Creative Engineering',
];

const SOCIAL_LINKS = [
  { name: 'GitHub', href: 'https://github.com/rudrabhullar', icon: Github },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/rudra-bhullar', icon: Linkedin },
  { name: 'X / Twitter', href: 'https://x.com/rudrabhullar', icon: Twitter },
  { name: 'Email', href: 'mailto:rudrabhullar19@gmail.com', icon: Mail },
];

export default function Hero() {
  const [time, setTime] = useState<string>('');
  const [scrollY, setScrollY] = useState<number>(0);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

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
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
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

  return (
    <section
      id="hero"
      className="relative w-full px-3 sm:px-6 lg:px-8 pt-3 sm:pt-5 pb-8 max-w-[1680px] mx-auto overflow-hidden bg-[#0A0A0A]"
    >
      {/* Editorial Titanium Architectural Limestone Canvas Block */}
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full rounded-[26px] sm:rounded-[36px] md:rounded-[42px] bg-[#EDEAE4] overflow-hidden min-h-[92vh] sm:min-h-[94vh] lg:min-h-[96vh] flex flex-col justify-between shadow-2xl border border-[#EDEAE4]/40 transition-colors duration-500"
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

        {/* 1. TOP EDITORIAL BAR (z-30) */}
        <header className="relative px-6 sm:px-10 md:px-14 pt-6 sm:pt-8 flex items-center justify-between z-30">
          {/* Based In Location */}
          <div className="flex flex-col text-left">
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-[#0A0A0A]/60 font-bold">
              Based in:
            </span>
            <span className="font-sans text-xs sm:text-sm font-extrabold tracking-tight text-[#0A0A0A]">
              Punjab, India
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

        {/* 2. GIANT CONDENSED DISPLAY TYPOGRAPHY WITH 3D PARALLAX (z-10) */}
        <div 
          style={{
            transform: `translate3d(${-mousePos.x * 8}px, ${-scrollY * 0.12 - mousePos.y * 6}px, 0)`,
            transition: 'transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
            willChange: 'transform',
          }}
          className="absolute top-[48%] -translate-y-1/2 left-6 sm:left-10 md:left-14 lg:left-16 z-10 pointer-events-none select-none flex flex-col leading-[0.8] tracking-tighter"
        >
          <h1 className="flex flex-col select-none">
            <span className="font-headline text-[22vw] sm:text-[18vw] lg:text-[14.5vw] xl:text-[195px] font-black uppercase text-[#0A0A0A] leading-[0.8] tracking-tight">
              RUDRA
            </span>
            <span className="font-headline text-[22vw] sm:text-[18vw] lg:text-[14.5vw] xl:text-[195px] font-black uppercase text-[#0A0A0A] leading-[0.8] tracking-tight">
              BHULLAR
            </span>
          </h1>
        </div>

        {/* 3. PORTRAIT SILHOUETTE CUTOUT WITH 3D DEPTH PARALLAX (z-20) */}
        <div 
          style={{
            transform: `translate3d(${mousePos.x * 12}px, ${scrollY * 0.22 + mousePos.y * 8}px, 0) scale(${Math.max(0.92, 1 - scrollY * 0.00025)})`,
            transition: 'transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
            willChange: 'transform',
          }}
          className="absolute bottom-0 left-[34%] sm:left-[36%] md:left-[38%] lg:left-[43%] translate-x-[-15%] sm:translate-x-0 z-20 pointer-events-none select-none flex items-end justify-center"
        >
          {/* Crisp HD Cutout Image (Scaled cleanly so zero pixelation occurs) */}
          <img
            src="/rudra-hero-hd.png"
            alt="Rudra Bhullar - Creative Technologist & AI Engineer"
            className="h-[46vh] sm:h-[52vh] md:h-[58vh] lg:h-[64vh] xl:h-[68vh] max-h-[580px] w-auto object-contain object-bottom filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.38)]"
          />
        </div>

        {/* 4. RIGHT COLUMN: SPECIALIZATION / SERVICES (z-30) */}
        <div className="absolute top-[46%] -translate-y-1/2 right-6 sm:right-10 md:right-14 lg:right-16 z-30 hidden md:flex flex-col text-left max-w-[210px] lg:max-w-[250px]">
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
        <div className="absolute bottom-0 right-0 w-full h-[140px] sm:h-[180px] md:h-[220px] pointer-events-none z-15 overflow-hidden">
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
            <p className="font-sans text-xs sm:text-sm text-[#0A0A0A]/90 leading-relaxed font-bold mb-3 sm:mb-4">
              Building intelligent AI systems, robust full-stack architectures,
              and expressive digital experiences with engineering discipline.
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
              className="inline-flex items-center justify-between sm:justify-start gap-3 w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 rounded-lg bg-[#EDEAE4] text-[#0A0A0A] border border-[#222225] hover:bg-[#FFFFFF] hover:text-[#0A0A0A] font-mono text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 shadow-xl hover:scale-105 active:scale-95 group"
              data-cursor="pointer"
            >
              <span>START A PROJECT</span>
              <span className="w-5 h-5 rounded bg-[#0A0A0A] text-[#EDEAE4] group-hover:bg-[#0A0A0A] group-hover:text-[#FFFFFF] flex items-center justify-center text-xs transition-colors">
                →
              </span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
