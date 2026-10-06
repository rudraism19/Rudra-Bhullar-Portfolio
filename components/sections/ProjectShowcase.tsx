'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { PROJECTS, Project } from '@/lib/projects';
import ProjectItem from './ProjectItem';
import { Sparkles, Terminal } from 'lucide-react';
import { useScrollParallax } from '@/hooks/useScrollParallax';

const ProjectModal = dynamic(() => import('./ProjectModal'), { ssr: false });

export default function ProjectShowcase() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeSlab, setActiveSlab] = useState<number>(0);
  const { ref: sectionRef, offset } = useScrollParallax<HTMLElement>({
    speed: 0.12,
    maxOffset: 50,
  });

  // Track active project slab based on scroll position
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    let rafId: number | null = null;

    const handleScroll = () => {
      PROJECTS.forEach((p, idx) => {
        const el = document.getElementById(`project-${p.id}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          const stickyTop = 84 + idx * 16;
          // Card is active when it has reached its docking zone
          if (rect.top <= stickyTop + 100 && rect.bottom > stickyTop) {
            setActiveSlab(idx);
          }
        }
      });
    };

    const onScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          handleScroll();
          rafId = null;
        });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative py-28 md:py-36 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#222225]/80 overflow-hidden"
    >
      {/* Background Architectural Watermark Track with Active Slab Display */}
      <div
        aria-hidden="true"
        style={{
          transform: `translate3d(${offset * -0.3}px, ${offset * 0.15}px, 0)`,
          willChange: 'transform',
        }}
        className="absolute top-10 right-0 font-display text-[6rem] sm:text-[9rem] md:text-[12rem] font-black uppercase text-[#141416]/30 pointer-events-none select-none whitespace-nowrap overflow-hidden leading-none tracking-tighter transition-all duration-300"
      >
        SLAB 0{activeSlab + 1} // {PROJECTS[activeSlab].blueprint.throughput}
      </div>

      {/* Section Header with depth glide */}
      <div
        style={{
          transform: `translate3d(0, ${offset * -0.1}px, 0)`,
          willChange: 'transform',
        }}
        className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#222225]/60 mb-12"
      >
        <div>
          <div className="flex items-center gap-2 font-mono-tag text-xs text-[#EDEAE4] uppercase tracking-widest mb-3">
            <span className="font-bold">01 / SELECTED WORK</span>
            <span className="text-[#222225]">—</span>
            <span className="text-[#8E8E93]">CASE STUDIES & PRODUCTION SYSTEMS</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight text-[#FAFAFA]">
            FEATURED <span className="text-[#EDEAE4]">PROJECTS.</span>
          </h2>
        </div>

        <div className="flex flex-col items-start md:items-end gap-2.5 max-w-md font-mono-tag text-xs text-[#8E8E93] leading-relaxed">
          <p className="text-[11px] sm:text-xs">
            An editorial selection of full-stack platforms, multimodal AI systems, and low-latency tools engineered with an obsessive focus on performance and architectural clarity.
          </p>

          {/* Compact Active Slab Navigation Tabs */}
          <div className="flex items-center gap-2 pt-1.5 border-t border-[#222225]/60 w-full justify-between font-mono-tag">
            <span className="text-[#EDEAE4] font-semibold text-[10px] tracking-wider uppercase flex items-center gap-1.5 truncate max-w-[220px]">
              <span className="w-1 h-1 rounded-full bg-[#EDEAE4] animate-pulse shrink-0" />
              SLAB 0{activeSlab + 1}/{PROJECTS.length} // {PROJECTS[activeSlab].name}
            </span>

            <div className="flex items-center gap-1 shrink-0">
              {PROJECTS.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => {
                    const el = document.getElementById(`project-${p.id}`);
                    if (el) {
                      const lenis = (window as unknown as { __lenis?: { scrollTo: (target: HTMLElement, options?: object) => void } }).__lenis;
                      if (lenis) {
                        lenis.scrollTo(el, { offset: -60 });
                      } else {
                        el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  }}
                  className={`h-4 px-1.5 rounded text-[9px] font-mono transition-all ${
                    activeSlab === idx
                      ? 'bg-[#EDEAE4] text-[#0A0A0A] font-bold shadow-[0_0_6px_rgba(237,234,228,0.4)]'
                      : 'bg-[#141416] text-[#8E8E93] hover:text-[#EDEAE4]'
                  }`}
                  aria-label={`Jump to ${p.name}`}
                  data-cursor="pointer"
                >
                  0{idx + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Projects List: Layered Architectural Slabs (Sticky Stacking Parallax) */}
      <div className="relative flex flex-col pb-16">
        {PROJECTS.map((project, idx) => (
          <ProjectItem
            key={project.id}
            project={project}
            index={idx}
            total={PROJECTS.length}
            onSelectProject={(proj) => setSelectedProject(proj)}
          />
        ))}
      </div>

      {/* Case Study Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
