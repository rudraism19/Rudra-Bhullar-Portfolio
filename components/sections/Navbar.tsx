'use client';

import React, { useEffect, useState, useRef } from 'react';
import {
  Menu,
  X,
  ArrowUpRight,
  Layers,
  User,
  Cpu,
  FlaskConical,
  Trophy,
  Milestone,
  Send,
  Orbit,
  Command,
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  href: string;
  num: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'work', label: 'WORK', href: '#work', num: '01', icon: Layers, description: 'Systems & Architecture' },
  { id: 'about', label: 'ABOUT', href: '#about', num: '02', icon: User, description: 'Biography & Engineering' },
  { id: 'skills', label: 'SKILLS', href: '#skills', num: '03', icon: Cpu, description: 'Tech Stack & Vector Mesh' },
  { id: 'experiments', label: 'LAB', href: '#experiments', num: '04', icon: FlaskConical, description: 'Creative Code & WebGL' },
  { id: 'trophies', label: 'VAULT', href: '#trophies', num: '05', icon: Trophy, description: 'Honors & Laurels' },
  { id: 'journey', label: 'JOURNEY', href: '#journey', num: '06', icon: Milestone, description: 'Career & Timeline' },
  { id: 'contact', label: 'CONTACT', href: '#contact', num: '07', icon: Send, description: 'Direct Transmission' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [whirlAngle, setWhirlAngle] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (rafId.current !== null) return;

      rafId.current = requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? Math.min(1, Math.max(0, currentY / docHeight)) : 0;

        // 1. Threshold for revealing side navbar: strictly after the Hero section completes
        const heroEl = document.getElementById('hero');
        if (heroEl) {
          const heroThreshold = heroEl.offsetTop + heroEl.offsetHeight - 80;
          setIsScrolled(currentY >= heroThreshold);
        } else {
          setIsScrolled(currentY > window.innerHeight * 1.5);
        }

        // 2. Rotational whirl angle coupled smoothly to scroll
        const angle = (currentY * 0.22) % 360;
        setWhirlAngle(angle);
        setScrollProgress(progress);

        // 3. Detect active section
        const sectionIds = ['hero', 'work', 'about', 'skills', 'experiments', 'trophies', 'journey', 'contact'];
        const scrollPos = currentY + window.innerHeight * 0.35;

        for (const id of sectionIds) {
          const el = document.getElementById(id);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
              setActiveSection(id);
              break;
            }
          }
        }

        rafId.current = null;
      });
    };

    const handleToggleMenu = () => {
      setMobileMenuOpen((prev) => !prev);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('toggle-nav-menu', handleToggleMenu);
    window.addEventListener('keydown', handleKeyDown);

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('toggle-nav-menu', handleToggleMenu);
      window.removeEventListener('keydown', handleKeyDown);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const targetId = href.replace('#', '');
    const targetEl = document.getElementById(targetId);

    if (targetEl) {
      const lenis = (window as unknown as { __lenis?: { scrollTo: (target: HTMLElement | string) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo(targetEl);
      } else {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* ========================================================
          1. DESKTOP FLOATING SIDE NAVBAR (ROCK-SOLID DOCK, WHIRL ON GYRO/HALOS)
          ======================================================== */}
      <aside
        aria-label="Side Navigation Dock"
        className={`fixed right-4 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center transition-all duration-400 ease-out select-none ${
          isScrolled
            ? 'opacity-100 translate-x-0 pointer-events-auto'
            : 'opacity-0 translate-x-8 pointer-events-none'
        }`}
      >
        <div className="relative flex flex-col items-center py-3.5 px-2 rounded-2xl sm:rounded-full bg-[#0A0A0A]/90 backdrop-blur-xl border border-[#222225] hover:border-[#EDEAE4]/40 shadow-[0_12px_44px_rgba(0,0,0,0.8)] transition-colors duration-300">
          {/* Subtle Vertical Scroll Progress Spine */}
          <div className="absolute top-14 bottom-14 left-1/2 -translate-x-1/2 w-[1px] bg-[#222225] pointer-events-none">
            <div
              className="w-full bg-[#EDEAE4] transition-all duration-150"
              style={{ height: `${scrollProgress * 100}%` }}
            />
          </div>

          {/* Top Kinetic Whirl Apex / Return to Top */}
          <a
            href="#hero"
            onClick={(e) => scrollToSection(e, '#hero')}
            aria-label="Scroll to top of page"
            data-cursor="pointer"
            title="Top // Apex"
            className="group relative w-10 h-10 flex items-center justify-center rounded-full bg-[#141416]/50 border border-[#222225] hover:border-[#EDEAE4] mb-2.5 transition-colors shrink-0"
          >
            {/* Outer Counter-Rotating Whirl Ring */}
            <div
              style={{
                transform: `rotate(${whirlAngle}deg)`,
                willChange: 'transform',
              }}
              className="absolute inset-0 rounded-full border border-dashed border-[#EDEAE4]/40 pointer-events-none"
            />

            {/* Inner Gyroscope Symbol */}
            <div
              style={{
                transform: `rotate(${-whirlAngle * 1.4}deg)`,
                willChange: 'transform',
              }}
              className="w-4 h-4 flex items-center justify-center text-[#EDEAE4] pointer-events-none"
            >
              <Orbit className="w-full h-full" />
            </div>

            {/* Hover Tooltip to the Left */}
            <div className="absolute right-full mr-3.5 px-2.5 py-1 rounded-lg bg-[#0A0A0A]/95 backdrop-blur-md border border-[#222225] text-[10px] font-mono-tag whitespace-nowrap text-[#EDEAE4] opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all pointer-events-none shadow-xl flex items-center gap-1.5">
              <span className="text-[#8E8E93]">00</span>
              <span className="font-bold">APEX // TOP</span>
            </div>
          </a>

          {/* Nav Nodes Stacked Vertically (Solid, non-wobbling, centered) */}
          <nav className="relative flex flex-col items-center gap-2 my-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              const Icon = item.icon;

              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  data-cursor="pointer"
                  aria-label={`${item.label} (${item.description})`}
                  className={`group relative w-10 h-10 flex items-center justify-center rounded-xl sm:rounded-full transition-all duration-200 focus:outline-none shrink-0 ${
                    isActive
                      ? 'bg-[#141416] text-[#EDEAE4] shadow-[0_0_14px_rgba(237,234,228,0.2)]'
                      : 'text-[#8E8E93] hover:text-[#FAFAFA] hover:bg-[#141416]/60'
                  }`}
                >
                  {/* Active Orbital Whirl Halo */}
                  {isActive && (
                    <div
                      style={{
                        transform: `rotate(${whirlAngle * 1.8}deg)`,
                        willChange: 'transform',
                      }}
                      className="absolute inset-0 rounded-xl sm:rounded-full border border-dashed border-[#EDEAE4]/70 pointer-events-none"
                    />
                  )}

                  {/* Representative Section Symbol */}
                  <Icon
                    className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${
                      isActive ? 'text-[#EDEAE4]' : 'text-[#8E8E93] group-hover:text-[#FAFAFA]'
                    }`}
                  />

                  {/* Horizontal Expanding Pill Tooltip (Reveals to Left) */}
                  <div className="absolute right-full mr-3.5 px-3 py-1.5 rounded-xl bg-[#0A0A0A]/95 backdrop-blur-md border border-[#222225] text-xs font-mono-tag whitespace-nowrap text-[#EDEAE4] opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all pointer-events-none shadow-2xl flex items-center gap-2.5">
                    <Icon className="w-3.5 h-3.5 text-[#EDEAE4]" />
                    <span className="text-[#8E8E93] text-[10px] font-semibold">{item.num}</span>
                    <span className="font-bold tracking-wider">{item.label}</span>
                    <span className="text-[10px] text-[#8E8E93] hidden lg:inline">
                      — {item.description}
                    </span>
                  </div>
                </a>
              );
            })}
          </nav>

          {/* Bottom Quick Connect Node with Whirling Border */}
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, '#contact')}
            data-cursor="pointer"
            aria-label="Direct contact transmission"
            title="Connect // Transmission"
            className="group relative w-10 h-10 flex items-center justify-center rounded-xl sm:rounded-full bg-[#141416]/50 border border-[#222225] hover:border-[#EDEAE4] mt-2.5 transition-colors text-[#EDEAE4] shrink-0"
          >
            <div
              style={{
                transform: `rotate(${whirlAngle * 0.75}deg)`,
                willChange: 'transform',
              }}
              className="absolute inset-0 rounded-xl sm:rounded-full border border-dashed border-[#EDEAE4]/30 pointer-events-none"
            />
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />

            {/* Hover Tooltip to Left */}
            <div className="absolute right-full mr-3.5 px-2.5 py-1 rounded-lg bg-[#0A0A0A]/95 backdrop-blur-md border border-[#222225] text-[10px] font-mono-tag whitespace-nowrap text-[#EDEAE4] opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all pointer-events-none shadow-xl flex items-center gap-1.5">
              <Send className="w-3 h-3 text-[#EDEAE4]" />
              <span className="font-bold">CONNECT // 07</span>
            </div>
          </a>

          {/* Quick Command Palette Launcher */}
          <button
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('open-command-palette'));
              }
            }}
            data-cursor="pointer"
            aria-label="Open Command Palette (Cmd+K)"
            title="Search / Command Palette"
            className="group relative w-10 h-10 flex items-center justify-center rounded-xl sm:rounded-full bg-[#141416]/50 border border-[#222225] hover:border-[#EDEAE4] mt-1.5 transition-colors text-[#8E8E93] hover:text-[#EDEAE4] shrink-0"
          >
            <Command className="w-3.5 h-3.5" />
            <div className="absolute right-full mr-3.5 px-2.5 py-1 rounded-lg bg-[#0A0A0A]/95 backdrop-blur-md border border-[#222225] text-[10px] font-mono-tag whitespace-nowrap text-[#EDEAE4] opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all pointer-events-none shadow-xl flex items-center gap-1.5">
              <span>COMMANDS</span>
              <kbd className="px-1 py-0.5 rounded bg-[#141416] border border-[#222225] text-[9px] text-[#EDEAE4]">⌘K</kbd>
            </div>
          </button>
        </div>
      </aside>

      {/* ========================================================
          2. MOBILE FLOATING WHIRL VORTEX BUTTON (< md)
          ======================================================== */}
      <div
        className={`fixed top-5 right-5 z-40 md:hidden transition-all duration-400 ${
          isScrolled ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-75 pointer-events-none'
        }`}
      >
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav"
          className="relative w-12 h-12 rounded-full bg-[#0A0A0A]/90 backdrop-blur-md border border-[#222225] hover:border-[#EDEAE4] text-[#FAFAFA] flex items-center justify-center shadow-2xl focus:outline-none"
          data-cursor="pointer"
        >
          {/* Outer Mobile Whirling Ring */}
          <div
            style={{
              transform: `rotate(${whirlAngle}deg)`,
              willChange: 'transform',
            }}
            className="absolute inset-0 rounded-full border border-dashed border-[#EDEAE4]/50 pointer-events-none"
          />

          {mobileMenuOpen ? <X className="w-5 h-5 text-[#EDEAE4]" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* ========================================================
          3. NAVIGATION DRAWER MENU (Mobile & Keyboard Overlay)
          ======================================================== */}
      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Directory"
        className={`fixed inset-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-xl p-8 sm:p-12 md:p-16 flex flex-col justify-between transition-transform duration-500 ease-[cubic-bezier(0.85,0,0.15,1)] ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#222225]">
          <div className="flex items-center gap-3">
            <div
              style={{
                transform: `rotate(${whirlAngle}deg)`,
              }}
              className="w-5 h-5 rounded-full border border-dashed border-[#EDEAE4] pointer-events-none"
            />
            <p className="font-mono-tag text-xs text-[#EDEAE4] tracking-widest uppercase">
              NAVIGATION INDEX // 2026
            </p>
          </div>

          <button
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation menu"
            className="min-w-[44px] min-h-[44px] px-3 py-2 rounded-lg text-[#FAFAFA] hover:text-[#EDEAE4] border border-[#222225] hover:border-[#EDEAE4] transition-colors font-mono text-xs flex items-center gap-1.5 justify-center"
            data-cursor="pointer"
          >
            <X className="w-4 h-4" />
            <span>CLOSE</span>
          </button>
        </div>

        {/* Drawer Links with Symbols */}
        <div className="my-auto py-8">
          <ul className="flex flex-col gap-4 sm:gap-5 max-w-xl">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              const Icon = item.icon;

              return (
                <li key={item.id} className="border-b border-[#222225]/40 pb-2">
                  <a
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    className="min-h-[48px] flex items-center justify-between text-2xl sm:text-3xl md:text-4xl font-display font-bold text-[#FAFAFA] hover:text-[#EDEAE4] transition-colors group"
                  >
                    <span className="group-hover:translate-x-2 transition-transform duration-200 flex items-center gap-3.5">
                      <Icon className={`w-6 h-6 transition-colors ${isActive ? 'text-[#EDEAE4]' : 'text-[#8E8E93] group-hover:text-[#EDEAE4]'}`} />
                      <span>{item.label}</span>
                    </span>
                    <span className="font-mono-tag text-xs sm:text-sm text-[#8E8E93] group-hover:text-[#EDEAE4]">
                      {item.num}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Drawer Footer */}
        <div className="border-t border-[#222225] pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono-tag text-xs text-[#8E8E93]">
          <div>
            <p className="text-[#EDEAE4] font-semibold mb-1">RUDRA BHULLAR</p>
            <p>AI Backend Engineer • Ex-CTO @DTV</p>
          </div>
          <div>
            <a
              href="mailto:rudraism19@gmail.com"
              className="text-[#EDEAE4] hover:underline"
            >
              rudraism19@gmail.com
            </a>
            <p className="text-[#8E8E93] text-[11px] mt-0.5">Based in Madhya Pradesh, India • IST</p>
          </div>
        </div>
      </div>
    </>
  );
}
