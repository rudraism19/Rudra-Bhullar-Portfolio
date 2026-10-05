'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Project } from '@/lib/projects';
import ProjectVisual from './ProjectVisual';
import MagneticButton from '@/components/ui/MagneticButton';
import { ArrowUpRight, Github } from 'lucide-react';

interface ProjectItemProps {
  project: Project;
  index: number;
  onSelectProject: (project: Project) => void;
}

export default function ProjectItem({ project, index, onSelectProject }: ProjectItemProps) {
  const isEven = index % 2 === 1;
  const [isVisible, setIsVisible] = useState(false);
  const articleRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (articleRef.current) {
      observer.observe(articleRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={articleRef}
      className="py-16 md:py-24 border-b border-[#222225]/80 last:border-b-0 group"
      id={`project-${project.id}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        {/* Editorial Text Column with Smooth Scroll Reveal */}
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(36px)',
            transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className={`lg:col-span-5 flex flex-col justify-center ${
            isEven ? 'lg:order-2' : 'lg:order-1'
          }`}
        >
          {/* Project Number & Category */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3 font-mono-tag text-xs tracking-widest text-[#8E8E93]">
            <span className="font-display text-3xl sm:text-5xl font-black text-[#EDEAE4]/90 shrink-0">
              {project.number}
            </span>
            <span className="text-[#222225] text-lg sm:text-xl">/</span>
            <span className="text-[#EDEAE4] uppercase font-semibold text-[11px] sm:text-xs">
              {project.category}
            </span>
          </div>

          {/* Project Title */}
          <h3 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-[#FAFAFA] mb-4 group-hover:text-[#EDEAE4] transition-colors break-words">
            {project.name}
          </h3>

          {/* Project Description */}
          <p className="text-sm sm:text-base text-[#8E8E93] leading-relaxed mb-6 font-normal break-words">
            {project.shortDesc}
          </p>

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
              <span>VIEW CASE STUDY</span>
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

        {/* Large Project Visual Column with Scroll Scale */}
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'scale(1)' : 'scale(0.96)',
            transition: 'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) 100ms, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 100ms',
          }}
          className={`lg:col-span-7 cursor-pointer ${
            isEven ? 'lg:order-1' : 'lg:order-2'
          }`}
          onClick={() => onSelectProject(project)}
        >
          <ProjectVisual project={project} />
        </div>
      </div>
    </article>
  );
}
