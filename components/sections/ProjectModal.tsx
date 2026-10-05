'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Project } from '@/lib/projects';
import { X, Github, CheckCircle2, ArrowUpRight, Cpu, Layers, GitCompare } from 'lucide-react';
import MagneticButton from '@/components/ui/MagneticButton';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

type TabType = 'overview' | 'blueprint' | 'tradeoffs';

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (project) {
      setActiveTab('overview');
      previousActiveElementRef.current = document.activeElement as HTMLElement | null;
      document.body.style.overflow = 'hidden';

      // Focus close button on mount
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
          return;
        }

        // Trap focus inside modal
        if (e.key === 'Tab' && modalRef.current) {
          const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusableElements.length === 0) return;

          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
        previousActiveElementRef.current?.focus();
      };
    }
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-[#0A0A0A]/95 transition-opacity duration-200 select-text backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#0A0A0A] border border-[#EDEAE4]/40 rounded-2xl p-6 sm:p-10 text-[#FAFAFA] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-6 right-6 p-2 rounded-full border border-[#222225] bg-[#0A0A0A] text-[#8E8E93] hover:text-[#EDEAE4] hover:border-[#EDEAE4] transition-colors focus:outline-none focus:ring-2 focus:ring-[#EDEAE4]"
          data-cursor="pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="border-b border-[#222225] pb-6 mb-6">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-mono-tag text-xs text-[#EDEAE4] mb-2 uppercase tracking-widest">
            <span>PROJECT {project.number}</span>
            <span>//</span>
            <span>{project.category}</span>
          </div>

          <h2
            id="modal-project-title"
            className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-[#FAFAFA] break-words pr-8 sm:pr-0"
          >
            {project.name}
          </h2>

          <p className="text-[#8E8E93] text-sm sm:text-base md:text-lg mt-3 font-normal leading-relaxed break-words">
            {project.shortDesc}
          </p>
        </div>

        {/* Segmented Architectural View Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-[#222225] pb-4">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-lg font-mono-tag text-xs tracking-wider transition-all duration-200 select-none ${
              activeTab === 'overview'
                ? 'bg-[#EDEAE4] text-[#0A0A0A] font-bold shadow-md'
                : 'bg-[#141416]/50 text-[#8E8E93] border border-[#222225] hover:text-[#EDEAE4] hover:border-[#EDEAE4]/40'
            }`}
            data-cursor="pointer"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>01 // OVERVIEW & SPEC</span>
          </button>

          <button
            onClick={() => setActiveTab('blueprint')}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-lg font-mono-tag text-xs tracking-wider transition-all duration-200 select-none ${
              activeTab === 'blueprint'
                ? 'bg-[#EDEAE4] text-[#0A0A0A] font-bold shadow-md'
                : 'bg-[#141416]/50 text-[#8E8E93] border border-[#222225] hover:text-[#EDEAE4] hover:border-[#EDEAE4]/40'
            }`}
            data-cursor="pointer"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>02 // ARCHITECTURE BLUEPRINT</span>
          </button>

          <button
            onClick={() => setActiveTab('tradeoffs')}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-lg font-mono-tag text-xs tracking-wider transition-all duration-200 select-none ${
              activeTab === 'tradeoffs'
                ? 'bg-[#EDEAE4] text-[#0A0A0A] font-bold shadow-md'
                : 'bg-[#141416]/50 text-[#8E8E93] border border-[#222225] hover:text-[#EDEAE4] hover:border-[#EDEAE4]/40'
            }`}
            data-cursor="pointer"
          >
            <GitCompare className="w-3.5 h-3.5" />
            <span>03 // ENGINEERING TRADE-OFFS</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {project.metrics.map((m) => (
                <div key={m.label} className="p-3.5 sm:p-4 rounded-xl border border-[#222225] bg-[#141416]/30">
                  <span className="block font-display text-xl sm:text-2xl lg:text-3xl font-bold text-[#EDEAE4]">
                    {m.value}
                  </span>
                  <span className="font-mono-tag text-[11px] sm:text-xs text-[#8E8E93] mt-1 block leading-tight break-words">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Narrative & Architecture */}
            <div className="flex flex-col gap-6 text-sm sm:text-base leading-relaxed">
              <div>
                <h3 className="font-mono-tag text-xs uppercase tracking-widest text-[#EDEAE4] mb-2 font-bold">
                  THE PROBLEM &amp; VISION
                </h3>
                <p className="text-[#8E8E93] break-words">{project.fullDesc}</p>
              </div>

              <div className="p-4 sm:p-5 rounded-xl border border-[#222225] bg-[#0A0A0A]">
                <h3 className="font-mono-tag text-xs uppercase tracking-widest text-[#EDEAE4] mb-2 font-bold">
                  HIGH-LEVEL ARCHITECTURAL FLOW
                </h3>
                <p className="font-mono text-xs sm:text-sm text-[#FAFAFA] leading-relaxed break-words">
                  {project.architecture}
                </p>
              </div>

              <div>
                <h3 className="font-mono-tag text-xs uppercase tracking-widest text-[#EDEAE4] mb-3 font-bold">
                  KEY ARCHITECTURAL FEATURES
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#8E8E93]">
                      <CheckCircle2 className="w-4 h-4 text-[#EDEAE4] shrink-0 mt-0.5" />
                      <span className="break-words">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div className="border-t border-[#222225] pt-6">
              <p className="font-mono-tag text-xs uppercase tracking-widest text-[#8E8E93] mb-3">
                DEPLOYED TECHNOLOGIES
              </p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-full border border-[#222225] bg-[#141416]/40 text-[#EDEAE4] font-mono-tag text-xs"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ARCHITECTURE BLUEPRINT */}
        {activeTab === 'blueprint' && (
          <div className="space-y-6 animate-fadeIn">
            {/* End-to-End Dataflow Banner */}
            <div className="p-5 sm:p-6 rounded-xl border border-[#222225] bg-[#141416]/40">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2 font-mono-tag text-xs">
                <span className="text-[#EDEAE4] font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-[#EDEAE4]" />
                  END-TO-END DATAFLOW PIPELINE
                </span>
                <span className="px-2.5 py-0.5 rounded bg-[#0A0A0A] border border-[#222225] text-[#EDEAE4] text-[11px] font-mono font-semibold">
                  {project.blueprint.throughput}
                </span>
              </div>
              <p className="font-mono text-xs sm:text-sm text-[#FAFAFA] leading-relaxed break-words mt-3 bg-[#0A0A0A] p-3.5 rounded-lg border border-[#222225]">
                {project.blueprint.dataflow}
              </p>
              <div className="mt-4 pt-3 border-t border-[#222225] flex flex-wrap items-center gap-2 font-mono-tag text-xs text-[#8E8E93]">
                <span className="text-[#EDEAE4] font-bold">PERSISTENCE &amp; STORAGE:</span>
                <span className="text-[#FAFAFA]">{project.blueprint.storageEngine}</span>
              </div>
            </div>

            {/* Pipeline Stage Nodes */}
            <div className="space-y-3.5">
              <div className="flex items-center justify-between font-mono-tag text-xs text-[#8E8E93] pb-1">
                <span className="text-[#EDEAE4] uppercase tracking-wider font-bold">
                  PIPELINE NODES &amp; LATENCY BUDGETS
                </span>
                <span className="hidden sm:inline-block">[ STRICT SLA CONTROLS ]</span>
              </div>

              {project.blueprint.nodes.map((node) => (
                <div
                  key={node.step}
                  className="p-4 sm:p-5 rounded-xl border border-[#222225] bg-[#0A0A0A] hover:border-[#EDEAE4]/50 transition-colors group"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2 font-mono-tag text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-[#EDEAE4] font-bold px-2 py-0.5 rounded bg-[#141416] border border-[#222225]">
                        {node.step}
                      </span>
                      <span className="text-[#FAFAFA] font-display font-bold text-sm sm:text-base">
                        {node.title}
                      </span>
                    </div>
                    {node.latencyBudget && (
                      <span className="px-2.5 py-0.5 rounded bg-[#141416] border border-[#222225] text-[#EDEAE4] text-[11px] font-mono font-semibold">
                        {node.latencyBudget}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#8E8E93] font-mono-tag mb-2">
                    TECHNOLOGY: <span className="text-[#EDEAE4] font-semibold">{node.tech}</span>
                  </p>
                  <p className="text-xs sm:text-sm text-[#8E8E93] group-hover:text-[#FAFAFA] leading-relaxed font-sans transition-colors break-words">
                    {node.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ENGINEERING TRADE-OFFS */}
        {activeTab === 'tradeoffs' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between pb-2 mb-2 font-mono-tag text-xs text-[#8E8E93]">
              <span className="text-[#EDEAE4] uppercase tracking-wider font-bold">
                SYSTEM DESIGN DECISION MATRIX
              </span>
              <span className="hidden sm:inline-block">[ FIRST-PRINCIPLES RATIONALE ]</span>
            </div>

            {project.tradeoffs.map((item, idx) => (
              <div
                key={item.decision}
                className="p-5 sm:p-6 rounded-xl border border-[#222225] bg-[#0A0A0A] hover:border-[#EDEAE4]/50 transition-colors"
              >
                <div className="flex items-center gap-2.5 mb-3 font-mono-tag text-xs">
                  <span className="w-5 h-5 rounded-full bg-[#141416] border border-[#222225] text-[#EDEAE4] flex items-center justify-center font-bold text-[10px]">
                    0{idx + 1}
                  </span>
                  <span className="text-[#EDEAE4] font-bold uppercase tracking-wider text-sm">
                    {item.decision}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-4 p-3.5 rounded-lg bg-[#141416]/40 border border-[#222225] text-xs font-mono-tag">
                  <div className="md:col-span-5 text-[#8E8E93]">
                    <span className="text-[10px] uppercase text-[#8E8E93]/70 block mb-0.5">EVALUATED ALTERNATIVE</span>
                    <span className="text-[#FAFAFA]">{item.alternative}</span>
                  </div>
                  <div className="md:col-span-7 text-[#8E8E93] border-t md:border-t-0 md:border-l border-[#222225] pt-2 md:pt-0 md:pl-3">
                    <span className="text-[10px] uppercase text-[#EDEAE4] block mb-0.5">SELECTED ARCHITECTURE</span>
                    <span className="text-[#EDEAE4] font-semibold">{item.decision}</span>
                  </div>
                </div>

                <div>
                  <span className="font-mono-tag text-[10px] uppercase tracking-wider text-[#8E8E93] block mb-1">
                    SYSTEM RATIONALE &amp; TRADE-OFF:
                  </span>
                  <p className="text-xs sm:text-sm text-[#8E8E93] leading-relaxed font-sans break-words">
                    {item.rationale}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer CTAs */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 mt-8 border-t border-[#222225]">
          <span className="font-mono-tag text-xs text-[#8E8E93]">
            ENGINEERED BY RUDRA BHULLAR
          </span>

          <div className="flex flex-wrap items-center gap-3">
            {project.liveUrl && (
              <MagneticButton
                variant="primary"
                asAnchor
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>VERIFY RECORD</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </MagneticButton>
            )}

            <MagneticButton
              variant="outline"
              asAnchor
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-4 h-4" />
              <span>SOURCE CODE</span>
            </MagneticButton>

            <MagneticButton
              variant="outline"
              onClick={onClose}
            >
              <span>CLOSE SPEC</span>
            </MagneticButton>
          </div>
        </div>
      </div>
    </div>
  );
}
