'use client';

import React, { useState } from 'react';
import { PROJECTS, Project } from '@/lib/projects';
import ProjectItem from './ProjectItem';
import ProjectModal from './ProjectModal';
import { Sparkles, Terminal } from 'lucide-react';

export default function ProjectShowcase() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section
      id="work"
      className="relative py-28 md:py-36 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#2C2720]/80"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#2C2720]/60 mb-12">
        <div>
          <div className="flex items-center gap-2 font-mono-tag text-xs text-[#EB7D00] uppercase tracking-widest mb-3">
            <span className="font-bold">01 / SELECTED WORK</span>
            <span className="text-[#2C2720]">—</span>
            <span className="text-[#A39E91]">CASE STUDIES & PRODUCTION SYSTEMS</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight text-[#FAF8F2]">
            FEATURED <span className="text-[#EB7D00]">PROJECTS.</span>
          </h2>
        </div>

        <div className="max-w-md font-mono-tag text-xs text-[#A39E91] leading-relaxed">
          <p>
            An editorial selection of full-stack platforms, multimodal AI systems, and low-latency tools engineered with an obsessive focus on performance and architectural clarity.
          </p>
        </div>
      </div>

      {/* Projects List: Asymmetric Editorial Spreads */}
      <div className="flex flex-col">
        {PROJECTS.map((project, idx) => (
          <ProjectItem
            key={project.id}
            project={project}
            index={idx}
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
