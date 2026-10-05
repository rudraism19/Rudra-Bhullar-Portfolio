'use client';

import React, { useState, useRef } from 'react';
import { TROPHIES, TrophyItem } from '@/lib/trophies';
import { Trophy, Award, ShieldCheck, Binary, Sparkles, X, CheckCircle2, ArrowUpRight, Cpu } from 'lucide-react';

type CategoryFilter = 'ALL' | 'HACKATHON' | 'CERTIFICATION' | 'ALGORITHMIC' | 'OPEN_SOURCE';

interface TrophyCardProps {
  trophy: TrophyItem;
  onInspect: (trophy: TrophyItem) => void;
}

function TrophyCard({ trophy, onInspect }: TrophyCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalized [-1, 1]
    const normX = (x / rect.width - 0.5) * 2;
    const normY = (y / rect.height - 0.5) * 2;

    setRotate({
      x: -normY * 9, // Subtle tilt
      y: normX * 9,
    });

    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.16,
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  const getCategoryIcon = (cat: TrophyItem['category']) => {
    switch (cat) {
      case 'HACKATHON':
        return Trophy;
      case 'CERTIFICATION':
        return ShieldCheck;
      case 'ALGORITHMIC':
        return Binary;
      default:
        return Sparkles;
    }
  };

  const Icon = getCategoryIcon(trophy.category);

  return (
    <div
      style={{ perspective: 1000 }}
      className="h-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          onInspect(trophy);
        }}
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: 'transform 0.15s ease-out',
        }}
        className="relative h-full p-6 sm:p-7 rounded-2xl bg-[#141416]/35 border border-[#222225] hover:border-[#EDEAE4] transition-colors duration-300 flex flex-col justify-between cursor-pointer select-none group overflow-hidden shadow-xl"
        data-cursor="pointer"
      >
        {/* Dynamic Specular Sheen Reflection */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(237, 234, 228, ${glare.opacity}), transparent 60%)`,
          }}
        />

        {/* Top Trophy Header */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4 font-mono-tag text-[10px] sm:text-xs">
            <span className="px-2.5 py-1 rounded bg-[#0A0A0A] border border-[#222225] text-[#EDEAE4] font-bold uppercase tracking-widest flex items-center gap-1.5 shrink-0">
              <Icon className="w-3.5 h-3.5 text-[#EDEAE4]" />
              {trophy.badgeTitle}
            </span>

            <span className="text-[#8E8E93] text-[11px] font-semibold shrink-0">
              {trophy.date}
            </span>
          </div>

          <div className="mb-2">
            <span className="font-mono-tag text-[11px] text-[#EDEAE4] uppercase tracking-wider block font-semibold mb-1">
              {trophy.organization}
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#FAFAFA] group-hover:text-[#EDEAE4] transition-colors break-words">
              {trophy.title}
            </h3>
          </div>

          <p className="text-xs text-[#8E8E93] leading-relaxed mb-6 break-words font-normal">
            {trophy.desc}
          </p>
        </div>

        {/* Bottom Metrics & Inspection Prompt */}
        <div>
          <div className="p-3 rounded-xl bg-[#0A0A0A] border border-[#222225] flex items-center justify-between gap-2 mb-4">
            <span className="font-mono-tag text-[10px] text-[#8E8E93] uppercase">
              {trophy.metrics.label}
            </span>
            <span className="font-display text-base font-extrabold text-[#EDEAE4] shrink-0">
              {trophy.metrics.value}
            </span>
          </div>

          <div className="border-t border-[#222225]/70 pt-3 flex items-center justify-between text-[11px] font-mono-tag text-[#8E8E93]">
            <span className="text-[#EDEAE4] font-semibold truncate max-w-[140px] sm:max-w-none">
              {trophy.proofBadge}
            </span>
            <span className="text-[#EDEAE4] group-hover:translate-x-1 transition-transform flex items-center gap-1 shrink-0 font-bold">
              <span>INSPECT SPEC</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TrophyCabinet() {
  const [filter, setFilter] = useState<CategoryFilter>('ALL');
  const [inspectedTrophy, setInspectedTrophy] = useState<TrophyItem | null>(null);

  const filtered = filter === 'ALL'
    ? TROPHIES
    : TROPHIES.filter((t) => t.category === filter);

  return (
    <section
      id="trophies"
      className="relative py-28 md:py-36 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#222225]/80"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#222225]/60 mb-12">
        <div>
          <div className="flex flex-wrap items-center gap-2 font-mono-tag text-xs text-[#EDEAE4] uppercase tracking-widest mb-3">
            <span className="font-bold">05 / THE VAULT</span>
            <span className="text-[#222225]">—</span>
            <span className="text-[#8E8E93]">3D TROPHY CABINET &amp; VERIFIED ACCREDITATIONS</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight text-[#FAFAFA]">
            AWARDS &amp; <span className="text-[#EDEAE4]">HONORS.</span>
          </h2>
        </div>

        <p className="max-w-md font-mono-tag text-xs text-[#8E8E93] leading-relaxed">
          Tangible laurels from national hackathon stages, certified cloud architectures, and algorithmic problem-solving benchmarks.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2.5 mb-10">
        {[
          { label: 'ALL ACCREDITATIONS', value: 'ALL' },
          { label: 'NATIONAL HACKATHONS', value: 'HACKATHON' },
          { label: 'CERTIFICATIONS', value: 'CERTIFICATION' },
          { label: 'ALGORITHMIC RIGOR', value: 'ALGORITHMIC' },
          { label: 'LEADERSHIP & COMMUNITY', value: 'OPEN_SOURCE' },
        ].map((tab) => {
          const isActive = filter === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => {
                setFilter(tab.value as CategoryFilter);
              }}
              className={`px-3.5 sm:px-4 py-2 rounded-xl font-mono-tag text-[10px] sm:text-xs tracking-wider transition-all duration-200 select-none ${
                isActive
                  ? 'bg-[#141416] text-[#EDEAE4] border border-[#EDEAE4] font-bold'
                  : 'bg-[#0A0A0A] text-[#8E8E93] border border-[#222225] hover:text-[#FAFAFA] hover:border-[#EDEAE4]/40'
              }`}
              data-cursor="pointer"
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 3D Trophies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((trophy) => (
          <TrophyCard
            key={trophy.id}
            trophy={trophy}
            onInspect={(t) => setInspectedTrophy(t)}
          />
        ))}
      </div>

      {/* Detailed Credential Inspection Modal */}
      {inspectedTrophy && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#0A0A0A]/95 transition-opacity duration-200 select-text"
          onClick={() => setInspectedTrophy(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0A0A0A] border border-[#EDEAE4] rounded-2xl p-6 sm:p-10 text-[#FAFAFA] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setInspectedTrophy(null)}
              className="absolute top-6 right-6 p-2 rounded-full border border-[#222225] bg-[#0A0A0A] text-[#8E8E93] hover:text-[#EDEAE4] hover:border-[#EDEAE4] transition-colors"
              data-cursor="pointer"
              aria-label="Close credential view"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Spec Header */}
            <div className="border-b border-[#222225] pb-6 mb-6">
              <div className="flex flex-wrap items-center gap-2 font-mono-tag text-xs text-[#EDEAE4] mb-2 uppercase tracking-widest">
                <span>ACCREDITATION SPEC</span>
                <span>//</span>
                <span>{inspectedTrophy.rank}</span>
              </div>

              <h3 className="font-display text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#FAFAFA] break-words pr-8 sm:pr-0">
                {inspectedTrophy.title}
              </h3>

              <div className="flex flex-wrap items-center gap-3 mt-3 text-xs font-mono-tag text-[#8E8E93]">
                <span className="text-[#EDEAE4] font-semibold">{inspectedTrophy.organization}</span>
                <span>•</span>
                <span>ISSUED: {inspectedTrophy.date}</span>
                {inspectedTrophy.credentialId && (
                  <>
                    <span>•</span>
                    <span className="px-2 py-0.5 rounded bg-[#141416] border border-[#222225] text-[#EDEAE4]">
                      ID: {inspectedTrophy.credentialId}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Narrative & Jury Citation */}
            <div className="space-y-6 text-sm text-[#8E8E93] leading-relaxed mb-6 font-mono-tag">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#EDEAE4] block font-bold mb-2">
                  ACHIEVEMENT BRIEF
                </span>
                <p className="break-words font-sans text-sm text-[#FAFAFA] leading-relaxed">
                  {inspectedTrophy.desc}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#141416]/40 border border-[#222225]">
                <span className="text-xs uppercase tracking-widest text-[#EDEAE4] block font-bold mb-1.5 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#EDEAE4]" />
                  OFFICIAL JURY / ACCREDITATION CITATION
                </span>
                <p className="text-xs text-[#8E8E93] leading-relaxed break-words">
                  &ldquo;{inspectedTrophy.citation}&rdquo;
                </p>
              </div>

              {/* Technologies */}
              <div>
                <span className="text-xs uppercase tracking-widest text-[#EDEAE4] block font-bold mb-3">
                  DEPLOYED TECHNICAL PROFICIENCIES
                </span>
                <div className="flex flex-wrap gap-2">
                  {inspectedTrophy.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full border border-[#222225] bg-[#0A0A0A] text-[#EDEAE4] text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-[#222225] pt-4 flex flex-wrap items-center justify-between gap-3 font-mono-tag text-xs">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1.5 text-[#EDEAE4]">
                  <CheckCircle2 className="w-4 h-4 text-[#EDEAE4]" />
                  <span>VERIFIED RECORD ON FILE</span>
                </div>
                {inspectedTrophy.verificationUrl && (
                  <a
                    href={inspectedTrophy.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#EDEAE4] bg-[#EDEAE4]/10 text-[#EDEAE4] hover:bg-[#EDEAE4] hover:text-[#0A0A0A] font-bold text-xs transition-colors"
                    data-cursor="pointer"
                  >
                    <span>VERIFY ON ISSUER PORTAL</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              <button
                onClick={() => setInspectedTrophy(null)}
                className="px-5 py-2.5 rounded-lg bg-[#EDEAE4] text-[#0A0A0A] font-bold hover:bg-[#FAFAFA] transition-colors"
                data-cursor="pointer"
              >
                CLOSE SPEC
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
