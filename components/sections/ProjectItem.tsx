'use client';

import React from 'react';
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

  return (
    <article
      className="py-16 md:py-24 border-b border-[#4A4322]/80 last:border-b-0 group"
      id={`project-${project.id}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        {/* Editorial Text Column */}
        <div
          className={`lg:col-span-5 flex flex-col justify-center ${
            isEven ? 'lg:order-2' : 'lg:order-1'
          }`}
        >
          {/* Project Number & Category */}
          <div className="flex items-center gap-4 mb-3 font-mono-tag text-xs tracking-widest text-[#BDB99F]">
            <span className="font-display text-4xl sm:text-5xl font-black text-[#EB7D00]/90">
              {project.number}
            </span>
            <span className="text-[#4A4322] text-xl">/</span>
            <span className="text-[#EBE3A7] uppercase font-semibold">
              {project.category}
            </span>
          </div>

          {/* Project Title */}
          <h3 className="font-display text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-[#F8F5E8] mb-4 group-hover:text-[#EBE3A7] transition-colors">
            {project.name}
          </h3>

          {/* Project Description */}
          <p className="text-base text-[#BDB99F] leading-relaxed mb-6 font-normal">
            {project.shortDesc}
          </p>

          {/* Technology Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-8 font-mono-tag text-xs">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full border border-[#4A4322] bg-[#2C5745]/30 text-[#EBE3A7]"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-4">
            <MagneticButton
              variant="primary"
              onClick={() => onSelectProject(project)}
            >
              <span>VIEW CASE STUDY</span>
              <ArrowUpRight className="w-4 h-4 text-[#2E2910]" />
            </MagneticButton>

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.name} GitHub Repository`}
              className="p-3.5 rounded-full border border-[#4A4322] text-[#BDB99F] hover:text-[#EB7D00] hover:border-[#EB7D00] transition-colors focus:outline-none"
              data-cursor="pointer"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Large Project Visual Column */}
        <div
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
