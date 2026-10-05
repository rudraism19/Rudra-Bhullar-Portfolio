'use client';

import React, { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'WORK', href: '#work' },
  { label: 'ABOUT', href: '#about' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'LAB', href: '#experiments' },
  { label: 'VAULT', href: '#trophies' },
  { label: 'JOURNEY', href: '#journey' },
  { label: 'CONTACT', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Detect active section
      const sectionIds = ['hero', 'work', 'about', 'skills', 'experiments', 'trophies', 'journey', 'contact'];
      const scrollPos = window.scrollY + 200;

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
    };

    const handleToggleMenu = () => {
      setMobileMenuOpen((prev) => !prev);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('toggle-nav-menu', handleToggleMenu);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('toggle-nav-menu', handleToggleMenu);
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
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'translate-y-0 opacity-100 py-3.5 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#222225]'
            : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand mark */}
          <a
            href="#hero"
            onClick={(e) => scrollToSection(e, '#hero')}
            className="group flex items-center gap-3 text-left focus:outline-none"
            data-cursor="pointer"
          >
            <div className="flex flex-col">
              <span className="font-display text-lg md:text-xl font-bold tracking-tight text-[#FAFAFA] group-hover:text-[#EDEAE4] transition-colors">
                RUDRA BHULLAR
              </span>
              <span className="font-mono-tag text-[10px] tracking-wider text-[#8E8E93] group-hover:text-[#EDEAE4] transition-colors hidden sm:inline-block">
                AI BACKEND • EX-CTO @DTV • INDIA
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={(e) => scrollToSection(e, item.href)}
                      className={`relative font-mono-tag text-xs tracking-widest uppercase py-1 transition-colors duration-200 ${
                        isActive
                          ? 'text-[#EDEAE4] font-bold'
                          : 'text-[#8E8E93] hover:text-[#EDEAE4]'
                      }`}
                      data-cursor="pointer"
                    >
                      {item.label}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#EDEAE4] rounded-full" />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Quick Status Tag / CTA */}
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#222225] bg-[#141416]/40 text-[#EDEAE4] hover:border-[#EDEAE4] hover:text-[#EDEAE4] transition-all text-xs font-mono-tag"
              data-cursor="pointer"
            >
              <span>CONNECT</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </nav>

          {/* Mobile hamburger trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 rounded-lg text-[#FAFAFA] hover:text-[#EDEAE4] border border-[#222225] bg-[#0A0A0A]/80 focus:outline-none"
            data-cursor="pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Navigation Drawer Menu (Mobile & Desktop) */}
      <div
        className={`fixed inset-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-xl p-8 sm:p-12 md:p-16 flex flex-col justify-between transition-transform duration-500 ease-[cubic-bezier(0.85,0,0.15,1)] ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between pb-6 border-b border-[#222225]">
          <p className="font-mono-tag text-xs text-[#EDEAE4] tracking-widest uppercase">
            NAVIGATION INDEX // 2026
          </p>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-lg text-[#FAFAFA] hover:text-[#EDEAE4] border border-[#222225] hover:border-[#EDEAE4] transition-colors font-mono text-xs flex items-center gap-1.5"
            data-cursor="pointer"
          >
            <X className="w-4 h-4" />
            <span>CLOSE</span>
          </button>
        </div>

        <div className="my-auto py-8">
          <ul className="flex flex-col gap-5 max-w-xl">
            {NAV_ITEMS.map((item, idx) => (
              <li key={item.label} className="border-b border-[#222225]/40 pb-3">
                <a
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className="flex items-center justify-between text-2xl sm:text-3xl md:text-4xl font-display font-bold text-[#FAFAFA] hover:text-[#EDEAE4] transition-colors group"
                >
                  <span className="group-hover:translate-x-2 transition-transform duration-200">
                    {item.label}
                  </span>
                  <span className="font-mono-tag text-xs sm:text-sm text-[#8E8E93] group-hover:text-[#EDEAE4]">
                    0{idx + 1}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

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
