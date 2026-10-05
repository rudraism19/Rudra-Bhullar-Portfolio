'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Project } from '@/lib/projects';
import ProjectVisual from './ProjectVisual';
import MagneticButton from '@/components/ui/MagneticButton';
import { ArrowUpRight, Github } from 'lucide-react';

interface ProjectItemProps {
  project: Project;
  index: number;
  total?: number;
  onSelectProject: (project: Project) => void;
}

export default function ProjectItem({ project, index, onSelectProject }: ProjectItemProps) {
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <article
      ref={articleRef}
      id={`project-${project.id}`}
      style={{
        top: `calc(5.25rem + ${index * 16}px)`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)`,
      }}
      className="sticky rounded-3xl bg-[#0D0D10] border border-[#222225] hover:border-[#EDEAE4]/50 transition-all duration-300 p-6 sm:p-8 md:p-10 lg:p-12 shadow-[0_-20px_50px_rgba(0,0,0,0.92)] mb-12 sm:mb-16 md:mb-20 overflow-hidden group select-text"
    >
      {/* Top Edge Specular Highlight Line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#EDEAE4]/35 to-transparent pointer-events-none" />

      {/* Subtle Background Radial Ambient Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle_at_top_right,_rgba(237,234,228,0.03),_transparent_70%)] pointer-events-none" />

      {/* Slab Header Dossier Index */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#222225]/80 font-mono-tag text-xs text-[#8E8E93]">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#EDEAE4]" />
          <span className="text-[#EDEAE4] font-bold">SLAB // {project.number}</span>
          <span className="text-[#222225]">—</span>
          <span className="uppercase text-[11px] tracking-widest text-[#EDEAE4]/90">{project.category}</span>
        </div>
        <div className="flex items-center gap-3 text-[11px] tracking-widest uppercase font-mono text-[#8E8E93]/70">
          <span className="hidden sm:inline-block">SPECIFICATION DOSSIER</span>
          <span className="px-2 py-0.5 rounded bg-[#141416] border border-[#222225] text-[#EDEAE4]">
            {project.blueprint.throughput}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Editorial Text Column */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          {/* Project Title */}
          <h3 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-[#FAFAFA] mb-4 group-hover:text-[#EDEAE4] transition-colors break-words">
            {project.name}
          </h3>

          {/* Project Description */}
          <p className="text-sm sm:text-base text-[#8E8E93] leading-relaxed mb-6 font-normal break-words">
            {project.shortDesc}
          </p>

          {/* Key Metric Snapshot */}
          <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-[#0A0A0A] border border-[#222225] mb-6">
            {project.metrics.map((m) => (
              <div key={m.label} className="min-w-0">
                <span className="block font-display text-sm sm:text-base font-bold text-[#EDEAE4] truncate">
                  {m.value}
                </span>
                <span className="font-mono-tag text-[10px] text-[#8E8E93] truncate block mt-0.5">
                  {m.label}
                </span>
              </div>
            ))}
          </div>

          {/* Technology Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-8 font-mono-tag text-xs">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full border border-[#222225] bg-[#141416]/50 text-[#EDEAE4] hover:border-[#EDEAE4]/50 transition-colors text-[11px] sm:text-xs"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <MagneticButton
              variant="primary"
              onClick={() => onSelectProject(project)}
            >
              <span>INSPECT ARCHITECTURE</span>
              <ArrowUpRight className="w-4 h-4 text-[#0A0A0A]" />
            </MagneticButton>

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.name} GitHub Repository`}
              className="p-3.5 rounded-full border border-[#222225] text-[#8E8E93] hover:text-[#EDEAE4] hover:border-[#EDEAE4] transition-colors focus:outline-none shrink-0"
              data-cursor="pointer"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Large Project Visual Column */}
        <div
          className="lg:col-span-7 cursor-pointer"
          onClick={() => onSelectProject(project)}
        >
          <ProjectVisual project={project} />
        </div>
      </div>
    </article>
  );
}
