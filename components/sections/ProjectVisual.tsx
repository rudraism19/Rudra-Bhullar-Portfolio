'use client';

import React from 'react';
import { Project } from '@/lib/projects';
import { ArrowUpRight, Cpu, Radio, ShieldCheck, Activity, Users, FileText, CheckCircle2 } from 'lucide-react';

interface ProjectVisualProps {
  project: Project;
}

export default function ProjectVisual({ project }: ProjectVisualProps) {
  const { diagramType, name, technologies, number } = project;

  return (
    <div
      className="relative w-full h-full min-h-[340px] md:min-h-[460px] rounded-2xl bg-[#2E2910] border border-[#4A4322] overflow-hidden flex flex-col justify-between p-6 md:p-8 select-none transition-all duration-500 group-hover:border-[#EB7D00]/60"
      data-cursor="view"
    >
      {/* Top visual header */}
      <div className="flex items-center justify-between border-b border-[#4A4322]/60 pb-4 font-mono-tag text-xs text-[#BDB99F]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#EB7D00] animate-pulse" />
          <span className="text-[#EBE3A7] tracking-wider uppercase font-semibold">
            ARCH.SPEC // {name}
          </span>
        </div>
        <span className="text-[#EB7D00] font-bold">FIG.{number}</span>
      </div>

      {/* Main Diagram Canvas Based on Diagram Type */}
      <div className="my-auto py-6 flex items-center justify-center">
        {diagramType === 'civic' && (
          <div className="w-full max-w-md flex flex-col gap-4">
            {/* Multi-language voice pipeline visual */}
            <div className="p-4 rounded-xl bg-[#2C5745]/40 border border-[#4A4322] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#2E2910] border border-[#EB7D00] flex items-center justify-center text-[#EB7D00]">
                  <Radio className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <span className="font-mono-tag text-xs text-[#EBE3A7] block font-semibold">
                    VERNACULAR AUDIO STREAM
                  </span>
                  <span className="font-mono-tag text-[11px] text-[#BDB99F]">
                    Hindi / Punjabi / Hinglish (Sarvam)
                  </span>
                </div>
              </div>
              <span className="font-mono-tag text-xs text-[#EB7D00] font-bold">16kHz PCM</span>
            </div>

            {/* Neural Schema Core */}
            <div className="p-4 rounded-xl bg-[#2E2910] border border-[#EB7D00]/40 flex items-center justify-between shadow-inner">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#EB7D00] text-[#2E2910] flex items-center justify-center font-display font-bold">
                  AI
                </div>
                <div>
                  <span className="font-mono-tag text-xs text-[#F8F5E8] block font-semibold">
                    GEMINI FLASH REASONING
                  </span>
                  <span className="font-mono-tag text-[11px] text-[#BDB99F]">
                    Dynamic Scheme Matching Engine
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-[#2C5745] text-[#EBE3A7] text-[10px] font-mono-tag">
                ACTIVE
              </span>
            </div>

            {/* Database vector node */}
            <div className="flex items-center justify-between text-xs font-mono-tag text-[#BDB99F] px-2">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#EB7D00]" />
                500+ Welfare Programs Indexed
              </span>
              <span className="text-[#EBE3A7]">Supabase pgvector</span>
            </div>
          </div>
        )}

        {diagramType === 'standards' && (
          <div className="w-full max-w-md flex flex-col gap-4">
            <div className="p-4 rounded-xl bg-[#2C5745]/30 border border-[#4A4322] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-[#EBE3A7]" />
                <div>
                  <p className="font-mono-tag text-xs text-[#F8F5E8] font-bold">
                    IS 456 / IS 1786 SPEC CORPUS
                  </p>
                  <p className="font-mono-tag text-[11px] text-[#BDB99F]">
                    Dense & Sparse Hybrid Semantic Index
                  </p>
                </div>
              </div>
              <ShieldCheck className="w-5 h-5 text-[#EB7D00]" />
            </div>

            {/* Citation clause callout */}
            <div className="p-3.5 rounded-lg bg-[#2E2910] border-l-2 border-[#EB7D00] text-xs font-mono-tag text-[#EBE3A7] leading-relaxed">
              <span className="text-[#EB7D00] font-bold block mb-1">
                § CITATION VERIFICATION (IS:1786:2008)
              </span>
              Tensile stress compliance checked: 550 N/mm² tolerance strictly matched with 99.2% confidence.
            </div>

            <div className="grid grid-cols-3 gap-2 text-center font-mono-tag text-[10px] text-[#BDB99F]">
              <div className="p-2 border border-[#4A4322] rounded bg-[#2E2910]">QDRANT VECTOR</div>
              <div className="p-2 border border-[#4A4322] rounded bg-[#2E2910]">BM25 RE-RANK</div>
              <div className="p-2 border border-[#EB7D00]/50 rounded bg-[#2C5745]/40 text-[#EB7D00]">
                ZERO HALLUCINATION
              </div>
            </div>
          </div>
        )}

        {diagramType === 'twin' && (
          <div className="w-full max-w-md flex flex-col gap-4">
            {/* Visual Radar / Skill Polygon Simulation */}
            <div className="relative h-44 rounded-xl bg-[#2C5745]/20 border border-[#4A4322] flex items-center justify-center p-4">
              <svg viewBox="0 0 200 200" className="w-40 h-40">
                {/* Background radar concentric rings */}
                <circle cx="100" cy="100" r="80" stroke="#4A4322" strokeWidth="1" fill="none" />
                <circle cx="100" cy="100" r="50" stroke="#4A4322" strokeWidth="1" fill="none" />
                <circle cx="100" cy="100" r="25" stroke="#4A4322" strokeWidth="1" fill="none" />
                <line x1="100" y1="20" x2="100" y2="180" stroke="#4A4322" strokeWidth="1" />
                <line x1="20" y1="100" x2="180" y2="100" stroke="#4A4322" strokeWidth="1" />
                {/* Benchmark Polygon */}
                <polygon
                  points="100,30 165,100 135,160 55,140 40,90"
                  fill="rgba(44, 87, 69, 0.4)"
                  stroke="#2C5745"
                  strokeWidth="1.5"
                />
                {/* Student Digital Twin Polygon */}
                <polygon
                  points="100,45 150,100 120,150 70,130 55,85"
                  fill="rgba(235, 125, 0, 0.3)"
                  stroke="#EB7D00"
                  strokeWidth="2"
                />
              </svg>

              <div className="absolute top-3 left-3 text-[10px] font-mono-tag text-[#EBE3A7]">
                DSA / SYSTEM DESIGN / DEV
              </div>
              <div className="absolute bottom-3 right-3 text-[10px] font-mono-tag text-[#EB7D00] font-bold">
                TWIN SIMULATION: 88.4% MATCH
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-mono-tag text-[#BDB99F] px-1">
              <span>Dynamic Growth Path</span>
              <span className="text-[#EBE3A7]">Neo4j Knowledge Graph</span>
            </div>
          </div>
        )}

        {diagramType === 'voice' && (
          <div className="w-full max-w-md flex flex-col gap-4">
            <div className="p-4 rounded-xl bg-[#2C5745]/30 border border-[#4A4322]">
              <div className="flex items-center justify-between mb-3 font-mono-tag text-xs">
                <span className="text-[#EBE3A7] flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#EB7D00]" />
                  FULL-DUPLEX AUDIO BUS
                </span>
                <span className="text-[#EB7D00] font-bold">480ms E2E</span>
              </div>

              {/* Animated Audio Oscilloscope Simulation */}
              <div className="h-16 flex items-center justify-between gap-1 px-2 bg-[#2E2910] rounded-lg border border-[#4A4322]/80">
                {[40, 75, 90, 60, 30, 85, 95, 45, 70, 100, 80, 50, 65, 88, 72, 35, 90, 60, 45].map((h, i) => (
                  <div
                    key={i}
                    className="w-1.5 bg-[#EB7D00] rounded-full transition-all duration-300"
                    style={{
                      height: `${h}%`,
                      opacity: (i % 2 === 0 ? 0.9 : 0.6),
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono-tag">
              <div className="p-3 rounded-lg border border-[#4A4322] bg-[#2E2910] text-[#BDB99F]">
                <span className="text-[#EBE3A7] block mb-1">PROTOCOL</span>
                Binary WebSockets
              </div>
              <div className="p-3 rounded-lg border border-[#4A4322] bg-[#2E2910] text-[#BDB99F]">
                <span className="text-[#EB7D00] block mb-1">INTERRUPT</span>
                Barge-In Handled
              </div>
            </div>
          </div>
        )}

        {diagramType === 'queue' && (
          <div className="w-full max-w-md flex flex-col gap-4">
            <div className="p-4 rounded-xl bg-[#2C5745]/30 border border-[#4A4322]">
              <div className="flex items-center justify-between mb-3 font-mono-tag text-xs">
                <span className="text-[#EBE3A7] flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#EB7D00]" />
                  OPD LANE LOAD BALANCER
                </span>
                <span className="text-[#EB7D00] font-bold">ACTIVE OPD: 4 LANES</span>
              </div>

              {/* Queue status row */}
              <div className="grid grid-cols-3 gap-2">
                <div className="p-3 bg-[#2E2910] border border-[#EB7D00] rounded-lg text-center font-mono-tag">
                  <span className="text-[10px] text-[#BDB99F] block">NOW SERVING</span>
                  <span className="text-xl font-display font-bold text-[#EB7D00]">T-142</span>
                </div>
                <div className="p-3 bg-[#2E2910] border border-[#4A4322] rounded-lg text-center font-mono-tag">
                  <span className="text-[10px] text-[#BDB99F] block">NEXT IN LINE</span>
                  <span className="text-xl font-display font-bold text-[#EBE3A7]">T-143</span>
                </div>
                <div className="p-3 bg-[#2E2910] border border-[#4A4322] rounded-lg text-center font-mono-tag">
                  <span className="text-[10px] text-[#BDB99F] block">AVG WAIT</span>
                  <span className="text-xl font-display font-bold text-[#F8F5E8]">7 MIN</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-mono-tag text-[#BDB99F] px-1">
              <span>Redis Pub/Sub Sync</span>
              <span className="text-[#EB7D00]">&lt;80ms Socket Relay</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom visual footer */}
      <div className="border-t border-[#4A4322]/60 pt-4 flex items-center justify-between font-mono-tag text-xs text-[#BDB99F]">
        <div className="flex items-center gap-2">
          <Cpu className="w-3.5 h-3.5 text-[#EB7D00]" />
          <span className="truncate max-w-[200px] sm:max-w-none">
            {technologies.slice(0, 3).join(' • ')}
          </span>
        </div>

        <div className="flex items-center gap-1 text-[#EBE3A7] group-hover:text-[#EB7D00] transition-colors">
          <span>INSPECT ARCHITECTURE</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </div>
  );
}
