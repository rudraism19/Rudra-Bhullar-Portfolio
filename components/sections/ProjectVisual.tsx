'use client';

import React, { useState } from 'react';
import { Project } from '@/lib/projects';
import { ArrowUpRight, Cpu, CheckCircle2, Gauge, Zap } from 'lucide-react';

interface ProjectVisualProps {
  project: Project;
}

export default function ProjectVisual({ project }: ProjectVisualProps) {
  const { diagramType, name, technologies, number, metrics, impact } = project;
  const [viewMode, setViewMode] = useState<'architecture' | 'benchmarks'>('architecture');

  return (
    <div
      className="relative w-full h-full min-h-[360px] md:min-h-[460px] rounded-2xl bg-[#0A0A0A] border border-[#222225] overflow-hidden flex flex-col justify-between p-6 md:p-8 select-none transition-colors duration-300 hover:border-[#EDEAE4]"
      data-cursor="view"
    >
      {/* Top Header with Interactive Mode Toggle */}
      <div className="flex items-center justify-between gap-3 border-b border-[#222225] pb-4 font-mono-tag text-xs text-[#8E8E93]">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#EDEAE4] shrink-0" />
          <span className="text-[#EDEAE4] uppercase font-semibold truncate text-[11px] sm:text-xs">
            {viewMode === 'architecture' ? 'ARCHITECTURE' : 'BENCHMARKS'} // {name}
          </span>
        </div>

        {/* Minimal Editorial Mode Toggle */}
        <div className="flex items-center gap-1 border border-[#222225] rounded-lg p-0.5 bg-[#0A0A0A] shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setViewMode('architecture');
            }}
            className={`px-2 sm:px-2.5 py-1 rounded text-[9px] sm:text-[10px] font-mono-tag tracking-wider transition-colors ${
              viewMode === 'architecture'
                ? 'bg-[#141416] text-[#EDEAE4] font-bold'
                : 'text-[#8E8E93] hover:text-[#FAFAFA]'
            }`}
            data-cursor="pointer"
          >
            DATA FLOW
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setViewMode('benchmarks');
            }}
            className={`px-2 sm:px-2.5 py-1 rounded text-[9px] sm:text-[10px] font-mono-tag tracking-wider transition-colors ${
              viewMode === 'benchmarks'
                ? 'bg-[#EDEAE4] text-[#0A0A0A] font-bold'
                : 'text-[#8E8E93] hover:text-[#FAFAFA]'
            }`}
            data-cursor="pointer"
          >
            METRICS
          </button>
        </div>
      </div>

      {/* Main Diagram or Benchmark Grid */}
      <div className="my-auto py-5 sm:py-6">
        {viewMode === 'benchmarks' ? (
          <div className="flex flex-col gap-3 sm:gap-4 font-mono-tag">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
              {metrics.map((m, idx) => (
                <div
                  key={m.label}
                  className={`p-3 sm:p-4 rounded-xl border border-[#222225] bg-[#141416]/30 flex flex-col justify-between ${
                    idx === 2 ? 'col-span-2 sm:col-span-1' : ''
                  }`}
                >
                  <span className="font-display text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#EDEAE4]">
                    {m.value}
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-[#8E8E93] mt-1.5 block font-semibold leading-tight break-words">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl bg-[#0A0A0A] border border-[#222225] text-xs leading-relaxed">
              <span className="text-[#EDEAE4] font-bold block mb-1 flex items-center gap-1.5 text-[11px] sm:text-xs">
                <Gauge className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#EDEAE4] shrink-0" />
                VERIFIED PRODUCTION IMPACT
              </span>
              <p className="text-[#8E8E93] text-[10px] sm:text-[11px] leading-relaxed break-words">
                {impact}
              </p>
            </div>

            <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-[#8E8E93] px-1 gap-2">
              <span className="flex items-center gap-1 text-[#EDEAE4] shrink-0">
                <Zap className="w-3.5 h-3.5 text-[#EDEAE4]" />
                SLA Compliant
              </span>
              <span className="text-[#222225] truncate">PROD SPEC {number}</span>
            </div>
          </div>
        ) : (
          <>
            {diagramType === 'civic' && (
              <div className="flex flex-col gap-2.5 sm:gap-3 font-mono-tag text-xs">
                <div className="p-3 sm:p-4 rounded-xl bg-[#141416]/30 border border-[#222225] flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <span className="text-[#EDEAE4] block font-bold text-xs sm:text-[13px] truncate">VERNACULAR AUDIO INGESTION</span>
                    <span className="text-[#8E8E93] text-[10px] sm:text-[11px] block truncate">Sarvam AI Indian Speech Model • 11 Dialects</span>
                  </div>
                  <span className="text-[#EDEAE4] font-bold text-xs sm:text-sm shrink-0">16kHz</span>
                </div>

                <div className="p-3 sm:p-4 rounded-xl bg-[#0A0A0A] border border-[#222225] flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <span className="text-[#FAFAFA] block font-bold text-xs sm:text-[13px] truncate">REASONING &amp; SCHEME ROUTING</span>
                    <span className="text-[#8E8E93] text-[10px] sm:text-[11px] block truncate">Gemini 1.5 Flash • Semantic Mapping</span>
                  </div>
                  <span className="text-[#EDEAE4] font-bold text-xs sm:text-sm shrink-0">ACTIVE</span>
                </div>

                <div className="p-3 sm:p-4 rounded-xl bg-[#141416]/30 border border-[#222225] flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <span className="text-[#EDEAE4] block font-bold text-xs sm:text-[13px] truncate">VECTOR SCHEME DATABASE</span>
                    <span className="text-[#8E8E93] text-[10px] sm:text-[11px] block truncate">Supabase pgvector • 500+ Public Welfare Specs</span>
                  </div>
                  <span className="text-[#EDEAE4] font-bold text-xs sm:text-sm shrink-0">&lt;1.4s</span>
                </div>
              </div>
            )}

            {diagramType === 'standards' && (
              <div className="flex flex-col gap-2.5 sm:gap-3 font-mono-tag text-xs">
                <div className="p-3 sm:p-4 rounded-xl bg-[#141416]/30 border border-[#222225] flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <span className="text-[#EDEAE4] block font-bold text-xs sm:text-[13px] truncate">REGULATORY CORPUS</span>
                    <span className="text-[#8E8E93] text-[10px] sm:text-[11px] block truncate">12,000+ Bureau of Indian Standards (BIS) Clauses</span>
                  </div>
                  <span className="text-[#EDEAE4] font-bold text-xs sm:text-sm shrink-0">IS SPEC</span>
                </div>

                <div className="p-3 sm:p-4 rounded-xl bg-[#0A0A0A] border border-[#222225]">
                  <span className="text-[#EDEAE4] font-bold block mb-1 text-xs sm:text-[13px]">HYBRID RETRIEVAL PIPELINE</span>
                  <p className="text-[#8E8E93] text-[10px] sm:text-[11px] leading-relaxed break-words">
                    Dense BGE embeddings combined with sparse BM25 term weighting, cross-encoder re-ranking, and clause-level citation linking.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-1.5 sm:gap-2 text-center text-[9px] sm:text-[10px] text-[#8E8E93]">
                  <div className="p-2 sm:p-2.5 border border-[#222225] rounded bg-[#0A0A0A] truncate">QDRANT VECTOR</div>
                  <div className="p-2 sm:p-2.5 border border-[#222225] rounded bg-[#0A0A0A] truncate">BM25 RE-RANK</div>
                  <div className="p-2 sm:p-2.5 border border-[#222225] rounded bg-[#141416]/40 text-[#EDEAE4] font-semibold truncate">99.2% PRECISION</div>
                </div>
              </div>
            )}

            {diagramType === 'twin' && (
              <div className="flex flex-col gap-2.5 sm:gap-3 font-mono-tag text-xs">
                <div className="p-3 sm:p-4 rounded-xl bg-[#141416]/30 border border-[#222225] flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <span className="text-[#EDEAE4] block font-bold text-xs sm:text-[13px] truncate">CANDIDATE VECTOR ENGINES</span>
                    <span className="text-[#8E8E93] text-[10px] sm:text-[11px] block truncate">Dynamic skill evaluation across 1,400 graph nodes</span>
                  </div>
                  <span className="text-[#EDEAE4] font-bold text-xs sm:text-sm shrink-0">NEO4J</span>
                </div>

                <div className="p-3 sm:p-4 rounded-xl bg-[#0A0A0A] border border-[#222225]">
                  <span className="text-[#EDEAE4] font-bold block mb-1 text-xs sm:text-[13px]">TRAJECTORY SIMULATION</span>
                  <p className="text-[#8E8E93] text-[10px] sm:text-[11px] leading-relaxed break-words">
                    Deterministic gap analysis matching academic milestones, DSA problem vectors, and system architecture benchmarks.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center text-[10px] sm:text-[11px]">
                  <div className="p-2.5 sm:p-3 border border-[#222225] rounded-xl bg-[#0A0A0A] text-[#8E8E93]">
                    <span className="text-[#EDEAE4] block font-bold text-xs sm:text-sm truncate">300+ STUDENTS</span>
                    Evaluated Cohort
                  </div>
                  <div className="p-2.5 sm:p-3 border border-[#222225] rounded-xl bg-[#141416]/40 text-[#8E8E93]">
                    <span className="text-[#EDEAE4] block font-bold text-xs sm:text-sm truncate">+34% LIFT</span>
                    Placement Preparedness
                  </div>
                </div>
              </div>
            )}

            {diagramType === 'voice' && (
              <div className="flex flex-col gap-2.5 sm:gap-3 font-mono-tag text-xs">
                <div className="p-3 sm:p-4 rounded-xl bg-[#141416]/30 border border-[#222225] flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <span className="text-[#EDEAE4] block font-bold text-xs sm:text-[13px] truncate">FULL-DUPLEX WEBSOCKET BUS</span>
                    <span className="text-[#8E8E93] text-[10px] sm:text-[11px] block truncate">Binary stream with acoustic echo suppression</span>
                  </div>
                  <span className="text-[#EDEAE4] font-bold text-xs sm:text-sm shrink-0">480ms E2E</span>
                </div>

                <div className="p-3 sm:p-4 rounded-xl bg-[#0A0A0A] border border-[#222225]">
                  <span className="text-[#EDEAE4] font-bold block mb-1 text-xs sm:text-[13px]">PIPELINE FLOW</span>
                  <p className="text-[#8E8E93] text-[10px] sm:text-[11px] leading-relaxed break-words">
                    Audio Ring Buffer → Streaming Whisper ASR → Sub-45ms Vector Retrieval → Streaming Kokoro/ElevenLabs TTS.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center text-[10px] sm:text-[11px]">
                  <div className="p-2.5 sm:p-3 border border-[#222225] rounded-xl bg-[#0A0A0A] text-[#8E8E93]">
                    <span className="text-[#EDEAE4] block font-bold text-xs sm:text-sm truncate">&lt;45ms</span>
                    Retrieval Latency
                  </div>
                  <div className="p-2.5 sm:p-3 border border-[#222225] rounded-xl bg-[#141416]/40 text-[#8E8E93]">
                    <span className="text-[#EDEAE4] block font-bold text-xs sm:text-sm truncate">BARGE-IN</span>
                    Realtime Interruption
                  </div>
                </div>
              </div>
            )}

            {diagramType === 'queue' && (
              <div className="flex flex-col gap-2.5 sm:gap-3 font-mono-tag text-xs">
                <div className="p-3 sm:p-4 rounded-xl bg-[#141416]/30 border border-[#222225] flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <span className="text-[#EDEAE4] block font-bold text-xs sm:text-[13px] truncate">OPD LOGISTICS ENGINE</span>
                    <span className="text-[#8E8E93] text-[10px] sm:text-[11px] block truncate">Redis Pub/Sub load balancer across clinic lanes</span>
                  </div>
                  <span className="text-[#EDEAE4] font-bold text-xs sm:text-sm shrink-0">&lt;80ms RELAY</span>
                </div>

                <div className="p-3 sm:p-4 rounded-xl bg-[#0A0A0A] border border-[#222225]">
                  <span className="text-[#EDEAE4] font-bold block mb-1 text-xs sm:text-[13px]">TRIAGE COORDINATION</span>
                  <p className="text-[#8E8E93] text-[10px] sm:text-[11px] leading-relaxed break-words">
                    Real-time appointment slotting, emergency priority lanes, and dynamic consultation duration predictions.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center text-[10px] sm:text-[11px]">
                  <div className="p-2.5 sm:p-3 border border-[#222225] rounded-xl bg-[#0A0A0A] text-[#8E8E93]">
                    <span className="text-[#EDEAE4] block font-bold text-xs sm:text-sm truncate">15,000+</span>
                    Tokens Handled
                  </div>
                  <div className="p-2.5 sm:p-3 border border-[#222225] rounded-xl bg-[#141416]/40 text-[#8E8E93]">
                    <span className="text-[#EDEAE4] block font-bold text-xs sm:text-sm truncate">-62% WAIT</span>
                    Queue Congestion Cut
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-[#222225] pt-4 flex items-center justify-between gap-2 font-mono-tag text-xs text-[#8E8E93]">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <Cpu className="w-3.5 h-3.5 text-[#EDEAE4] shrink-0" />
          <span className="truncate max-w-[160px] sm:max-w-xs md:max-w-none text-[11px] sm:text-xs">
            {technologies.slice(0, 3).join(' • ')}
          </span>
        </div>

        <div className="flex items-center gap-1 text-[#EDEAE4] shrink-0 text-[11px] sm:text-xs font-semibold">
          <span className="hidden xs:inline">INSPECT CASE STUDY</span>
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
