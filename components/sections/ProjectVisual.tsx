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
      className="relative w-full h-full min-h-[360px] md:min-h-[460px] rounded-2xl bg-[#14120E] border border-[#2C2720] overflow-hidden flex flex-col justify-between p-6 md:p-8 select-none transition-colors duration-300 hover:border-[#EB7D00]"
      data-cursor="view"
    >
      {/* Top Header with Interactive Mode Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#2C2720] pb-4 font-mono-tag text-xs text-[#A39E91]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#EB7D00]" />
          <span className="text-[#F3EBD8] uppercase font-semibold">
            {viewMode === 'architecture' ? 'ARCHITECTURE' : 'BENCHMARKS'} // {name}
          </span>
        </div>

        {/* Minimal Editorial Mode Toggle */}
        <div className="flex items-center gap-1 border border-[#2C2720] rounded-lg p-0.5 bg-[#14120E]">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setViewMode('architecture');
            }}
            className={`px-2.5 py-1 rounded text-[10px] font-mono-tag tracking-wider transition-colors ${
              viewMode === 'architecture'
                ? 'bg-[#1D241F] text-[#F3EBD8] font-bold'
                : 'text-[#A39E91] hover:text-[#FAF8F2]'
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
            className={`px-2.5 py-1 rounded text-[10px] font-mono-tag tracking-wider transition-colors ${
              viewMode === 'benchmarks'
                ? 'bg-[#EB7D00] text-[#14120E] font-bold'
                : 'text-[#A39E91] hover:text-[#FAF8F2]'
            }`}
            data-cursor="pointer"
          >
            METRICS
          </button>
        </div>
      </div>

      {/* Main Diagram or Benchmark Grid */}
      <div className="my-auto py-6">
        {viewMode === 'benchmarks' ? (
          <div className="flex flex-col gap-4 font-mono-tag">
            <div className="grid grid-cols-3 gap-3">
              {metrics.map((m) => (
                <div
                  key={m.label}
                  className="p-4 rounded-xl border border-[#2C2720] bg-[#1D241F]/30 flex flex-col justify-between"
                >
                  <span className="font-display text-2xl sm:text-3xl font-extrabold text-[#EB7D00]">
                    {m.value}
                  </span>
                  <span className="text-[11px] text-[#A39E91] mt-2 block font-semibold">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-[#14120E] border border-[#2C2720] text-xs leading-relaxed">
              <span className="text-[#F3EBD8] font-bold block mb-1 flex items-center gap-1.5">
                <Gauge className="w-4 h-4 text-[#EB7D00]" />
                VERIFIED PRODUCTION IMPACT
              </span>
              <p className="text-[#A39E91] text-[11px]">
                {impact}
              </p>
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#A39E91] px-1">
              <span className="flex items-center gap-1 text-[#F3EBD8]">
                <Zap className="w-3.5 h-3.5 text-[#EB7D00]" />
                SLA Compliant
              </span>
              <span className="text-[#2C2720]">PROD SPEC {number}</span>
            </div>
          </div>
        ) : (
          <>
            {diagramType === 'civic' && (
              <div className="flex flex-col gap-3 font-mono-tag text-xs">
                <div className="p-4 rounded-xl bg-[#1D241F]/30 border border-[#2C2720] flex items-center justify-between">
                  <div>
                    <span className="text-[#F3EBD8] block font-bold">VERNACULAR AUDIO INGESTION</span>
                    <span className="text-[#A39E91] text-[11px]">Sarvam AI Indian Speech Model • 11 Dialects</span>
                  </div>
                  <span className="text-[#EB7D00] font-bold">16kHz</span>
                </div>

                <div className="p-4 rounded-xl bg-[#14120E] border border-[#2C2720] flex items-center justify-between">
                  <div>
                    <span className="text-[#FAF8F2] block font-bold">REASONING &amp; SCHEME ROUTING</span>
                    <span className="text-[#A39E91] text-[11px]">Gemini 1.5 Flash • Semantic Mapping</span>
                  </div>
                  <span className="text-[#F3EBD8]">ACTIVE</span>
                </div>

                <div className="p-4 rounded-xl bg-[#1D241F]/30 border border-[#2C2720] flex items-center justify-between">
                  <div>
                    <span className="text-[#F3EBD8] block font-bold">VECTOR SCHEME DATABASE</span>
                    <span className="text-[#A39E91] text-[11px]">Supabase pgvector • 500+ Public Welfare Specs</span>
                  </div>
                  <span className="text-[#EB7D00] font-bold">&lt;1.4s</span>
                </div>
              </div>
            )}

            {diagramType === 'standards' && (
              <div className="flex flex-col gap-3 font-mono-tag text-xs">
                <div className="p-4 rounded-xl bg-[#1D241F]/30 border border-[#2C2720] flex items-center justify-between">
                  <div>
                    <span className="text-[#F3EBD8] block font-bold">REGULATORY CORPUS</span>
                    <span className="text-[#A39E91] text-[11px]">12,000+ Bureau of Indian Standards (BIS) Clauses</span>
                  </div>
                  <span className="text-[#EB7D00] font-bold">IS SPEC</span>
                </div>

                <div className="p-4 rounded-xl bg-[#14120E] border border-[#2C2720]">
                  <span className="text-[#EB7D00] font-bold block mb-1">HYBRID RETRIEVAL PIPELINE</span>
                  <p className="text-[#A39E91] text-[11px] leading-relaxed">
                    Dense BGE embeddings combined with sparse BM25 term weighting, cross-encoder re-ranking, and clause-level citation linking.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-[#A39E91]">
                  <div className="p-2.5 border border-[#2C2720] rounded bg-[#14120E]">QDRANT VECTOR</div>
                  <div className="p-2.5 border border-[#2C2720] rounded bg-[#14120E]">BM25 RE-RANK</div>
                  <div className="p-2.5 border border-[#2C2720] rounded bg-[#1D241F]/40 text-[#F3EBD8]">99.2% PRECISION</div>
                </div>
              </div>
            )}

            {diagramType === 'twin' && (
              <div className="flex flex-col gap-3 font-mono-tag text-xs">
                <div className="p-4 rounded-xl bg-[#1D241F]/30 border border-[#2C2720] flex items-center justify-between">
                  <div>
                    <span className="text-[#F3EBD8] block font-bold">CANDIDATE VECTOR ENGINES</span>
                    <span className="text-[#A39E91] text-[11px]">Dynamic skill evaluation across 1,400 graph nodes</span>
                  </div>
                  <span className="text-[#EB7D00] font-bold">NEO4J</span>
                </div>

                <div className="p-4 rounded-xl bg-[#14120E] border border-[#2C2720]">
                  <span className="text-[#F3EBD8] font-bold block mb-1">TRAJECTORY SIMULATION</span>
                  <p className="text-[#A39E91] text-[11px] leading-relaxed">
                    Deterministic gap analysis matching academic milestones, DSA problem vectors, and system architecture benchmarks.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center text-[11px]">
                  <div className="p-3 border border-[#2C2720] rounded-xl bg-[#14120E] text-[#A39E91]">
                    <span className="text-[#F3EBD8] block font-bold">300+ STUDENTS</span>
                    Evaluated Cohort
                  </div>
                  <div className="p-3 border border-[#2C2720] rounded-xl bg-[#1D241F]/40 text-[#A39E91]">
                    <span className="text-[#EB7D00] block font-bold">+34% LIFT</span>
                    Placement Preparedness
                  </div>
                </div>
              </div>
            )}

            {diagramType === 'voice' && (
              <div className="flex flex-col gap-3 font-mono-tag text-xs">
                <div className="p-4 rounded-xl bg-[#1D241F]/30 border border-[#2C2720] flex items-center justify-between">
                  <div>
                    <span className="text-[#F3EBD8] block font-bold">FULL-DUPLEX WEBSOCKET BUS</span>
                    <span className="text-[#A39E91] text-[11px]">Binary stream with acoustic echo suppression</span>
                  </div>
                  <span className="text-[#EB7D00] font-bold">480ms E2E</span>
                </div>

                <div className="p-4 rounded-xl bg-[#14120E] border border-[#2C2720]">
                  <span className="text-[#EB7D00] font-bold block mb-1">PIPELINE FLOW</span>
                  <p className="text-[#A39E91] text-[11px] leading-relaxed">
                    Audio Ring Buffer → Streaming Whisper ASR → Sub-45ms Vector Retrieval → Streaming Kokoro/ElevenLabs TTS.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center text-[11px]">
                  <div className="p-3 border border-[#2C2720] rounded-xl bg-[#14120E] text-[#A39E91]">
                    <span className="text-[#F3EBD8] block font-bold">&lt;45ms</span>
                    Retrieval Latency
                  </div>
                  <div className="p-3 border border-[#2C2720] rounded-xl bg-[#1D241F]/40 text-[#A39E91]">
                    <span className="text-[#EB7D00] block font-bold">BARGE-IN</span>
                    Realtime Interruption
                  </div>
                </div>
              </div>
            )}

            {diagramType === 'queue' && (
              <div className="flex flex-col gap-3 font-mono-tag text-xs">
                <div className="p-4 rounded-xl bg-[#1D241F]/30 border border-[#2C2720] flex items-center justify-between">
                  <div>
                    <span className="text-[#F3EBD8] block font-bold">OPD LOGISTICS ENGINE</span>
                    <span className="text-[#A39E91] text-[11px]">Redis Pub/Sub load balancer across clinic lanes</span>
                  </div>
                  <span className="text-[#EB7D00] font-bold">&lt;80ms RELAY</span>
                </div>

                <div className="p-4 rounded-xl bg-[#14120E] border border-[#2C2720]">
                  <span className="text-[#F3EBD8] font-bold block mb-1">TRIAGE COORDINATION</span>
                  <p className="text-[#A39E91] text-[11px] leading-relaxed">
                    Real-time appointment slotting, emergency priority lanes, and dynamic consultation duration predictions.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center text-[11px]">
                  <div className="p-3 border border-[#2C2720] rounded-xl bg-[#14120E] text-[#A39E91]">
                    <span className="text-[#F3EBD8] block font-bold">15,000+</span>
                    Tokens Handled
                  </div>
                  <div className="p-3 border border-[#2C2720] rounded-xl bg-[#1D241F]/40 text-[#A39E91]">
                    <span className="text-[#EB7D00] block font-bold">-62% WAIT</span>
                    Queue Congestion Cut
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-[#2C2720] pt-4 flex items-center justify-between font-mono-tag text-xs text-[#A39E91]">
        <div className="flex items-center gap-2">
          <Cpu className="w-3.5 h-3.5 text-[#EB7D00]" />
          <span className="truncate max-w-[200px] sm:max-w-none">
            {technologies.slice(0, 3).join(' • ')}
          </span>
        </div>

        <div className="flex items-center gap-1 text-[#F3EBD8]">
          <span>INSPECT CASE STUDY</span>
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
