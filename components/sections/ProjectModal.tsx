'use client';

import React, { useEffect, useRef } from 'react';
import { Project } from '@/lib/projects';
import { X, Github, CheckCircle2 } from 'lucide-react';
import MagneticButton from '@/components/ui/MagneticButton';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (project) {
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#0A0A0A]/95 transition-opacity duration-200 select-text"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0A0A0A] border border-[#222225] rounded-2xl p-6 sm:p-10 text-[#FAFAFA]"
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
        <div className="border-b border-[#222225] pb-6 mb-8">
          <div className="flex items-center gap-3 font-mono-tag text-xs text-[#EDEAE4] mb-2 uppercase tracking-widest">
            <span>PROJECT {project.number}</span>
            <span>//</span>
            <span>{project.category}</span>
          </div>

          <h2
            id="modal-project-title"
            className="font-display text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-[#FAFAFA]"
          >
            {project.name}
          </h2>

          <p className="text-[#8E8E93] text-base sm:text-lg mt-3 font-normal leading-relaxed">
            {project.shortDesc}
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {project.metrics.map((m) => (
            <div key={m.label} className="p-4 rounded-xl border border-[#222225] bg-[#141416]/30">
              <span className="block font-display text-2xl sm:text-3xl font-bold text-[#EDEAE4]">
                {m.value}
              </span>
              <span className="font-mono-tag text-xs text-[#8E8E93] mt-1 block">
                {m.label}
              </span>
            </div>
          ))}
        </div>

        {/* Narrative & Architecture */}
        <div className="flex flex-col gap-6 text-sm sm:text-base leading-relaxed mb-8">
          <div>
            <h3 className="font-mono-tag text-xs uppercase tracking-widest text-[#EDEAE4] mb-2">
              THE PROBLEM &amp; VISION
            </h3>
            <p className="text-[#8E8E93]">{project.fullDesc}</p>
          </div>

          <div className="p-5 rounded-xl border border-[#222225] bg-[#0A0A0A]">
            <h3 className="font-mono-tag text-xs uppercase tracking-widest text-[#EDEAE4] mb-2">
              SYSTEM ARCHITECTURE
            </h3>
            <p className="font-mono-tag text-xs text-[#FAFAFA] leading-relaxed">
              {project.architecture}
            </p>
          </div>

          <div>
            <h3 className="font-mono-tag text-xs uppercase tracking-widest text-[#EDEAE4] mb-3">
              KEY ARCHITECTURAL FEATURES
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#8E8E93]">
                  <CheckCircle2 className="w-4 h-4 text-[#EDEAE4] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div className="border-t border-[#222225] pt-6 mb-8">
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

        {/* Footer CTAs */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#222225]">
          <span className="font-mono-tag text-xs text-[#8E8E93]">
            ENGINEERED BY RUDRA BHULLAR
          </span>

          <div className="flex items-center gap-3">
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
              variant="primary"
              onClick={onClose}
            >
              <span>CLOSE SPREAD</span>
            </MagneticButton>
          </div>
        </div>
      </div>
    </div>
  );
}
