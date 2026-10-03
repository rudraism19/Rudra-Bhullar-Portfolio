'use client';

import React from 'react';
import { Project } from '@/lib/projects';
import { ArrowUpRight, Cpu, CheckCircle2 } from 'lucide-react';

interface ProjectVisualProps {
  project: Project;
}

export default function ProjectVisual({ project }: ProjectVisualProps) {
  const { diagramType, name, technologies, number } = project;

  return (
    <div
      className="relative w-full h-full min-h-[340px] md:min-h-[460px] rounded-2xl bg-[#2E2910] border border-[#4A4322] overflow-hidden flex flex-col justify-between p-6 md:p-8 select-none transition-colors duration-300 hover:border-[#EB7D00]"
      data-cursor="view"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#4A4322] pb-4 font-mono-tag text-xs text-[#BDB99F]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#EB7D00]" />
          <span className="text-[#EBE3A7] uppercase font-semibold">
            ARCHITECTURE // {name}
          </span>
        </div>
        <span className="text-[#EB7D00] font-bold">SPEC {number}</span>
      </div>

      {/* Main Diagram */}
      <div className="my-auto py-6">
        {diagramType === 'civic' && (
          <div className="flex flex-col gap-3 font-mono-tag text-xs">
            <div className="p-4 rounded-xl bg-[#2C5745]/30 border border-[#4A4322] flex items-center justify-between">
              <div>
                <span className="text-[#EBE3A7] block font-bold">VERNACULAR AUDIO INGESTION</span>
                <span className="text-[#BDB99F] text-[11px]">Sarvam AI Indian Speech Model • 11 Dialects</span>
              </div>
              <span className="text-[#EB7D00] font-bold">16kHz</span>
            </div>

            <div className="p-4 rounded-xl bg-[#2E2910] border border-[#4A4322] flex items-center justify-between">
              <div>
                <span className="text-[#F8F5E8] block font-bold">REASONING &amp; SCHEME ROUTING</span>
                <span className="text-[#BDB99F] text-[11px]">Gemini 1.5 Flash • Semantic Mapping</span>
              </div>
              <span className="text-[#EBE3A7]">ACTIVE</span>
            </div>

            <div className="p-4 rounded-xl bg-[#2C5745]/30 border border-[#4A4322] flex items-center justify-between">
              <div>
                <span className="text-[#EBE3A7] block font-bold">VECTOR SCHEME DATABASE</span>
                <span className="text-[#BDB99F] text-[11px]">Supabase pgvector • 500+ Public Welfare Specs</span>
              </div>
              <span className="text-[#EB7D00] font-bold">&lt;1.4s</span>
            </div>
          </div>
        )}

        {diagramType === 'standards' && (
          <div className="flex flex-col gap-3 font-mono-tag text-xs">
            <div className="p-4 rounded-xl bg-[#2C5745]/30 border border-[#4A4322] flex items-center justify-between">
              <div>
                <span className="text-[#EBE3A7] block font-bold">REGULATORY CORPUS</span>
                <span className="text-[#BDB99F] text-[11px]">12,000+ Bureau of Indian Standards (BIS) Clauses</span>
              </div>
              <span className="text-[#EB7D00] font-bold">IS SPEC</span>
            </div>

            <div className="p-4 rounded-xl bg-[#2E2910] border border-[#4A4322]">
              <span className="text-[#EB7D00] font-bold block mb-1">HYBRID RETRIEVAL PIPELINE</span>
              <p className="text-[#BDB99F] text-[11px] leading-relaxed">
                Dense BGE embeddings combined with sparse BM25 term weighting, cross-encoder re-ranking, and clause-level citation linking.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-[#BDB99F]">
              <div className="p-2.5 border border-[#4A4322] rounded bg-[#2E2910]">QDRANT VECTOR</div>
              <div className="p-2.5 border border-[#4A4322] rounded bg-[#2E2910]">BM25 RE-RANK</div>
              <div className="p-2.5 border border-[#4A4322] rounded bg-[#2C5745]/40 text-[#EBE3A7]">99.2% PRECISION</div>
            </div>
          </div>
        )}

        {diagramType === 'twin' && (
          <div className="flex flex-col gap-3 font-mono-tag text-xs">
            <div className="p-4 rounded-xl bg-[#2C5745]/30 border border-[#4A4322] flex items-center justify-between">
              <div>
                <span className="text-[#EBE3A7] block font-bold">CANDIDATE VECTOR ENGINES</span>
                <span className="text-[#BDB99F] text-[11px]">Dynamic skill evaluation across 1,400 graph nodes</span>
              </div>
              <span className="text-[#EB7D00] font-bold">NEO4J</span>
            </div>

            <div className="p-4 rounded-xl bg-[#2E2910] border border-[#4A4322]">
              <span className="text-[#EBE3A7] font-bold block mb-1">TRAJECTORY SIMULATION</span>
              <p className="text-[#BDB99F] text-[11px] leading-relaxed">
                Deterministic gap analysis matching academic milestones, DSA problem vectors, and system architecture benchmarks.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center text-[11px]">
              <div className="p-3 border border-[#4A4322] rounded-xl bg-[#2E2910] text-[#BDB99F]">
                <span className="text-[#EBE3A7] block font-bold">300+ STUDENTS</span>
                Evaluated Cohort
              </div>
              <div className="p-3 border border-[#4A4322] rounded-xl bg-[#2C5745]/40 text-[#BDB99F]">
                <span className="text-[#EB7D00] block font-bold">+34% LIFT</span>
                Placement Preparedness
              </div>
            </div>
          </div>
        )}

        {diagramType === 'voice' && (
          <div className="flex flex-col gap-3 font-mono-tag text-xs">
            <div className="p-4 rounded-xl bg-[#2C5745]/30 border border-[#4A4322] flex items-center justify-between">
              <div>
                <span className="text-[#EBE3A7] block font-bold">FULL-DUPLEX WEBSOCKET BUS</span>
                <span className="text-[#BDB99F] text-[11px]">Binary stream with acoustic echo suppression</span>
              </div>
              <span className="text-[#EB7D00] font-bold">480ms E2E</span>
            </div>

            <div className="p-4 rounded-xl bg-[#2E2910] border border-[#4A4322]">
              <span className="text-[#EB7D00] font-bold block mb-1">PIPELINE FLOW</span>
              <p className="text-[#BDB99F] text-[11px] leading-relaxed">
                Audio Ring Buffer → Streaming Whisper ASR → Sub-45ms Vector Retrieval → Streaming Kokoro/ElevenLabs TTS.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center text-[11px]">
              <div className="p-3 border border-[#4A4322] rounded-xl bg-[#2E2910] text-[#BDB99F]">
                <span className="text-[#EBE3A7] block font-bold">&lt;45ms</span>
                Retrieval Latency
              </div>
              <div className="p-3 border border-[#4A4322] rounded-xl bg-[#2C5745]/40 text-[#BDB99F]">
                <span className="text-[#EB7D00] block font-bold">BARGE-IN</span>
                Realtime Interruption
              </div>
            </div>
          </div>
        )}

        {diagramType === 'queue' && (
          <div className="flex flex-col gap-3 font-mono-tag text-xs">
            <div className="p-4 rounded-xl bg-[#2C5745]/30 border border-[#4A4322] flex items-center justify-between">
              <div>
                <span className="text-[#EBE3A7] block font-bold">OPD LOGISTICS ENGINE</span>
                <span className="text-[#BDB99F] text-[11px]">Redis Pub/Sub load balancer across clinic lanes</span>
              </div>
              <span className="text-[#EB7D00] font-bold">&lt;80ms RELAY</span>
            </div>

            <div className="p-4 rounded-xl bg-[#2E2910] border border-[#4A4322]">
              <span className="text-[#EBE3A7] font-bold block mb-1">TRIAGE COORDINATION</span>
              <p className="text-[#BDB99F] text-[11px] leading-relaxed">
                Real-time appointment slotting, emergency priority lanes, and dynamic consultation duration predictions.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center text-[11px]">
              <div className="p-3 border border-[#4A4322] rounded-xl bg-[#2E2910] text-[#BDB99F]">
                <span className="text-[#EBE3A7] block font-bold">15,000+</span>
                Tokens Handled
              </div>
              <div className="p-3 border border-[#4A4322] rounded-xl bg-[#2C5745]/40 text-[#BDB99F]">
                <span className="text-[#EB7D00] block font-bold">-62% WAIT</span>
                Queue Congestion Cut
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-[#4A4322] pt-4 flex items-center justify-between font-mono-tag text-xs text-[#BDB99F]">
        <div className="flex items-center gap-2">
          <Cpu className="w-3.5 h-3.5 text-[#EB7D00]" />
          <span className="truncate max-w-[200px] sm:max-w-none">
            {technologies.slice(0, 3).join(' • ')}
          </span>
        </div>

        <div className="flex items-center gap-1 text-[#EBE3A7]">
          <span>INSPECT SPREAD</span>
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
