'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Project, PROJECTS } from '@/lib/projects';
import ProjectVisual from './ProjectVisual';
import MagneticButton from '@/components/ui/MagneticButton';
import { ArrowUpRight, Github } from 'lucide-react';

interface ProjectItemProps {
  project: Project;
  index: number;
  total?: number;
  onSelectProject: (project: Project) => void;
}

export default function ProjectItem({ project, index, total, onSelectProject }: ProjectItemProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [approachOffset, setApproachOffset] = useState<number>(0);
  const [stackProgress, setStackProgress] = useState<number>(0);
  const articleRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (articleRef.current) {
      observer.observe(articleRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Compute approach glide and stacking depth on scroll
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let rafId: number | null = null;

    const handleScroll = () => {
      if (!articleRef.current) return;
      const rect = articleRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const stickyTop = 84 + index * 16;

      // 1. Approach Parallax: As card rises up from bottom towards its sticky dock
      const distToDock = rect.top - stickyTop;
      const normApproach = Math.max(-0.2, Math.min(1.2, distToDock / (windowH * 0.75)));
      setApproachOffset(normApproach);

      // 2. Docked Stacking Parallax: As the NEXT card scrolls over this card
      const totalCount = total || PROJECTS.length;
      if (index < totalCount - 1) {
        const nextProject = PROJECTS[index + 1];
        if (nextProject) {
          const nextEl = document.getElementById(`project-${nextProject.id}`);
          if (nextEl) {
            const nextRect = nextEl.getBoundingClientRect();
            const nextStickyTop = 84 + (index + 1) * 16;
            const startDist = windowH * 0.85;
            const currentDist = nextRect.top - nextStickyTop;
            const totalRange = startDist - nextStickyTop;
            if (totalRange > 0) {
              const p = 1 - Math.max(0, Math.min(1, currentDist / totalRange));
              setStackProgress(p);
            }
          }
        }
      } else {
        setStackProgress(0);
      }
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
    window.addEventListener('resize', onScroll, { passive: true });
    handleScroll();

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [index, total]);

  // Stacking deck calculations
  const stackScale = 1 - stackProgress * 0.05; // 1.0 down to 0.95
  const recessShift = -stackProgress * 14;     // 0 down to -14px
  const scrimOpacity = stackProgress * 0.45;   // 0 to 45% black scrim

  return (
    <article
      ref={articleRef}
      id={`project-${project.id}`}
      style={{
        top: `calc(4.75rem + ${index * 12}px)`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? `translate3d(0, ${recessShift}px, 0) scale(${stackScale})`
          : 'translate3d(0, 40px, 0)',
        transition: isVisible
          ? 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.1s ease-out'
          : 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
        transformOrigin: 'top center',
        willChange: 'transform',
      }}
      className="sticky rounded-3xl bg-[#0D0D10] border border-[#222225] hover:border-[#EDEAE4]/50 transition-all duration-300 p-5 sm:p-7 md:p-8 lg:p-9 shadow-[0_-20px_50px_rgba(0,0,0,0.92)] mb-8 sm:mb-10 md:mb-12 overflow-hidden group select-text"
    >
      {/* 3D Stacking Recess Dark Scrim */}
      <div
        aria-hidden="true"
        style={{
          opacity: scrimOpacity,
          willChange: 'opacity',
        }}
        className="absolute inset-0 bg-[#0A0A0A] pointer-events-none transition-opacity duration-100 z-20"
      />

      {/* Top Edge Specular Highlight Line with parallax glide */}
      <div
        style={{
          transform: `translate3d(${approachOffset * 70}px, 0, 0)`,
          willChange: 'transform',
        }}
        className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#EDEAE4]/40 to-transparent pointer-events-none z-10"
      />

      {/* Subtle Background Radial Ambient Glow with counter-parallax */}
      <div
        style={{
          transform: `translate3d(${approachOffset * 45}px, ${approachOffset * -30}px, 0)`,
          willChange: 'transform',
        }}
        className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle_at_top_right,_rgba(237,234,228,0.04),_transparent_70%)] pointer-events-none"
      />

      {/* Slab Header Dossier Index with micro-elevation */}
      <div
        style={{
          transform: `translate3d(0, ${approachOffset * -6}px, 0)`,
          willChange: 'transform',
        }}
        className="relative z-10 flex items-center justify-between pb-3 mb-4 border-b border-[#222225]/80 font-mono-tag text-xs text-[#8E8E93]"
      >
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#EDEAE4]" />
          <span className="text-[#EDEAE4] font-bold text-[11px] sm:text-xs">SLAB // {project.number}</span>
          <span className="text-[#222225]">—</span>
          <span className="uppercase text-[10px] sm:text-[11px] tracking-widest text-[#EDEAE4]/90">{project.category}</span>
        </div>
        <div className="flex items-center gap-2.5 text-[10px] sm:text-[11px] tracking-widest uppercase font-mono text-[#A0A0A5]">
          <span className="hidden sm:inline-block">SPECIFICATION DOSSIER</span>
          <span className="px-2 py-0.5 rounded bg-[#141416] border border-[#222225] text-[#EDEAE4]">
            {project.blueprint.throughput}
          </span>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        {/* Editorial Text Column with subtle forward float */}
        <div
          style={{
            transform: `translate3d(0, ${approachOffset * -18}px, 0)`,
            willChange: 'transform',
          }}
          className="lg:col-span-5 flex flex-col justify-center"
        >
          {/* Project Title */}
          <h3 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-[#FAFAFA] mb-3 group-hover:text-[#EDEAE4] transition-colors break-words">
            {project.name}
          </h3>

          {/* Project Description */}
          <p className="text-xs sm:text-sm text-[#8E8E93] leading-relaxed mb-4 font-normal break-words">
            {project.shortDesc}
          </p>

          {/* Key Metric Snapshot */}
          <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-[#0A0A0A] border border-[#222225] mb-4">
            {project.metrics.map((m) => (
              <div key={m.label} className="min-w-0">
                <span className="block font-display text-xs sm:text-sm md:text-base font-bold text-[#EDEAE4] truncate">
                  {m.value}
                </span>
                <span className="font-mono-tag text-[9px] sm:text-[10px] text-[#8E8E93] truncate block mt-0.5">
                  {m.label}
                </span>
              </div>
            ))}
          </div>

          {/* Technology Badges */}
          <div className="flex flex-wrap items-center gap-1.5 mb-5 font-mono-tag">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-0.5 rounded-full border border-[#222225] bg-[#141416]/50 text-[#EDEAE4] hover:border-[#EDEAE4]/50 transition-colors text-[10px] sm:text-[11px]"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <MagneticButton
              variant="primary"
              onClick={() => onSelectProject(project)}
            >
              <span className="text-xs">INSPECT ARCHITECTURE</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#0A0A0A]" />
            </MagneticButton>

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.name} GitHub Repository`}
              className="p-3 rounded-full border border-[#222225] text-[#8E8E93] hover:text-[#EDEAE4] hover:border-[#EDEAE4] transition-colors focus:outline-none shrink-0"
              data-cursor="pointer"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Large Project Visual Column with rich window-depth counter parallax */}
        <div
          style={{
            transform: `translate3d(0, ${approachOffset * 32}px, 0)`,
            willChange: 'transform',
          }}
          className="lg:col-span-7 cursor-pointer"
          onClick={() => onSelectProject(project)}
        >
          <ProjectVisual project={project} approachOffset={approachOffset} />
        </div>
      </div>
    </article>
  );
}
