'use client';

import React, { useState } from 'react';
import { FlaskConical, Terminal, Play, Cpu, Sparkles, Layers, RefreshCw, GitBranch, ArrowUpRight } from 'lucide-react';
import MagneticButton from '@/components/ui/MagneticButton';

interface Experiment {
  id: string;
  badge: string;
  title: string;
  desc: string;
  tech: string;
  status: 'ACTIVE EXPLORATION' | 'EXPERIMENTAL POC' | 'OPEN SOURCE PROTOTYPE';
  interactiveType: 'mcp' | 'shader' | 'agent' | 'canvas';
}

const EXPERIMENTS: Experiment[] = [
  {
    id: 'mcp-agent',
    badge: 'PROTOCOL EXPLORATION',
    title: 'Model Context Protocol (MCP) Tool Mesh',
    desc: 'Connecting Claude & Gemini agents to local database engines, Git trees, and shell tools via standard JSON-RPC 2.0 primitives.',
    tech: 'MCP SDK • TypeScript • SQLite • Docker',
    status: 'ACTIVE EXPLORATION',
    interactiveType: 'mcp',
  },
  {
    id: 'agentic-loop',
    badge: 'AUTONOMOUS SYSTEMS',
    title: 'Self-Correcting Code Generation Loop',
    desc: 'An iterative agent workflow that writes code, runs headless unit tests, reads stack traces, and self-repairs errors without human intervention.',
    tech: 'LangGraph • Gemini 1.5 Pro • Docker Sandbox',
    status: 'EXPERIMENTAL POC',
    interactiveType: 'agent',
  },
  {
    id: 'shader-field',
    badge: 'CREATIVE TECH',
    title: 'Interactive GLSL Perlin Fluid Surface',
    desc: 'Custom WebGL fragment shaders calculating real-time domain-warped noise field mapped to the #0A0A0A / #EDEAE4 editorial spectrum.',
    tech: 'WebGL • GLSL • Math & Linear Algebra',
    status: 'OPEN SOURCE PROTOTYPE',
    interactiveType: 'shader',
  },
  {
    id: 'hackathon-pocs',
    badge: 'RAPID PROTOTYPING',
    title: '36-Hour Hackathon Build Matrix',
    desc: 'Fast-paced experimental proofs-of-concept tested at national hackathons, focusing on civic utility, low-bandwidth devices, and vernacular accessibility.',
    tech: 'Next.js • FastAPI • WebSockets • Supabase',
    status: 'EXPERIMENTAL POC',
    interactiveType: 'canvas',
  },
];

export default function Experiments() {
  const [activeExp, setActiveExp] = useState(EXPERIMENTS[0].id);
  const [mcpLogStep, setMcpLogStep] = useState(1);

  const cycleMcpStep = () => {
    setMcpLogStep((prev) => (prev % 3) + 1);
  };

  return (
    <section
      id="experiments"
      className="relative py-28 md:py-36 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#222225]/80"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#222225]/60 mb-12">
        <div>
          <div className="flex flex-wrap items-center gap-2 font-mono-tag text-xs text-[#EDEAE4] uppercase tracking-widest mb-3">
            <span className="font-bold">04 / THE LABORATORY</span>
            <span className="text-[#222225]">—</span>
            <span className="text-[#8E8E93]">CREATIVE CODING & FRONTIER EXPLORATION</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight text-[#FAFAFA]">
            EXPERIMENTAL <span className="text-[#EDEAE4]">WORKS.</span>
          </h2>
        </div>

        <p className="max-w-md font-mono-tag text-xs text-[#8E8E93] leading-relaxed">
          Where I test emerging primitives: Model Context Protocol servers, autonomous LLM feedback loops, GLSL canvas shaders, and rapid hackathon prototypes.
        </p>
      </div>

      {/* Experimental Laboratory Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Experiments List (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {EXPERIMENTS.map((exp) => {
            const isSelected = activeExp === exp.id;
            return (
              <div
                key={exp.id}
                onClick={() => setActiveExp(exp.id)}
                className={`p-5 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer select-none ${
                  isSelected
                    ? 'bg-[#141416]/50 border-[#EDEAE4] shadow-lg shadow-black/20 translate-x-2'
                    : 'bg-[#0A0A0A] border-[#222225]/80 hover:border-[#EDEAE4]/40 hover:bg-[#141416]/20'
                }`}
                data-cursor="pointer"
              >
                <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2">
                  <span className="font-mono-tag text-[10px] uppercase tracking-widest text-[#EDEAE4] font-semibold">
                    {exp.badge}
                  </span>
                  <span className="font-mono-tag text-[10px] text-[#EDEAE4] shrink-0">
                    {exp.status}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold uppercase tracking-tight text-[#FAFAFA] mb-2 break-words">
                  {exp.title}
                </h3>

                <p className="text-xs text-[#8E8E93] leading-relaxed mb-4 break-words">
                  {exp.desc}
                </p>

                <div className="font-mono-tag text-[10px] sm:text-[11px] text-[#EDEAE4] border-t border-[#222225]/60 pt-3 flex items-center justify-between gap-2">
                  <span className="truncate min-w-0 flex-1 text-[#8E8E93]">{exp.tech}</span>
                  <span className="text-[#EDEAE4] font-bold shrink-0">
                    {isSelected ? 'INSPECTING →' : 'SELECT'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Live Interactive Sandbox Terminal (7 cols) */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-[#222225] bg-[#0A0A0A] overflow-hidden">
            {/* Terminal Window Header */}
            <div className="p-3.5 sm:p-4 bg-[#141416]/30 border-b border-[#222225] flex flex-wrap items-center justify-between gap-2 font-mono-tag text-xs">
              <span className="text-[#EDEAE4] font-semibold truncate text-[11px] sm:text-xs">
                LAB SPEC // {activeExp.toUpperCase()}
              </span>

              <span className="text-[#EDEAE4] text-[10px] sm:text-[11px] font-bold shrink-0">
                ACTIVE EXPERIMENT
              </span>
            </div>

            {/* Sandbox Content Area */}
            <div className="p-4 sm:p-6 md:p-8 font-mono-tag text-xs text-[#FAFAFA] leading-relaxed">
              {activeExp === 'mcp-agent' && (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#222225] pb-3">
                    <span className="text-[#EDEAE4] font-bold flex items-center gap-2 text-[11px] sm:text-xs">
                      <Terminal className="w-4 h-4 shrink-0" />
                      MCP PROTOCOL TRACE (JSON-RPC 2.0)
                    </span>
                    <button
                      onClick={cycleMcpStep}
                      className="px-2.5 py-1 rounded bg-[#141416] hover:bg-[#222225] text-[#EDEAE4] text-[10px] sm:text-[11px] flex items-center gap-1 border border-[#222225] transition-colors shrink-0"
                      data-cursor="pointer"
                    >
                      <RefreshCw className="w-3 h-3" />
                      TRIGGER NEXT STEP
                    </button>
                  </div>

                  <div className="p-3 sm:p-4 rounded-xl bg-[#0A0A0A] border border-[#222225] text-[11px] space-y-2 text-[#8E8E93]">
                    {mcpLogStep >= 1 && (
                      <div className="text-[#EDEAE4]">
                        <span className="text-[#EDEAE4] font-bold text-[10px] sm:text-[11px]">[STEP 1 - AGENT CALL]:</span>
                        <pre className="text-[10px] text-[#8E8E93] mt-1 overflow-x-auto whitespace-pre font-mono p-2 rounded bg-[#141416]/40 border border-[#222225]/40">
{`{
  "jsonrpc": "2.0",
  "method": "tools/call",
  "params": {
    "name": "query_vector_index",
    "arguments": { "query": "Find low-latency audio pipelines", "top_k": 3 }
  }
}`}
                        </pre>
                      </div>
                    )}

                    {mcpLogStep >= 2 && (
                      <div className="text-[#EDEAE4] pt-2 border-t border-[#222225]/50">
                        <span className="text-[#141416] font-bold bg-[#EDEAE4] px-1 text-[10px] mr-1 inline-block">
                          MCP SERVER RESPONSE
                        </span>
                        <span className="text-[#EDEAE4] text-[10px] sm:text-[11px] break-words">→ Verified tool execution. Vector search returned 3 chunks with 94.6% similarity.</span>
                      </div>
                    )}

                    {mcpLogStep >= 3 && (
                      <div className="text-[#EDEAE4] pt-2 border-t border-[#222225]/50 text-[10px] sm:text-[11px] break-words">
                        <span className="font-bold">[STEP 3 - RESULT]:</span> Synthetic audio stream instantiated via WebSockets in 480ms.
                      </div>
                    )}
                  </div>

                  <p className="text-[10px] sm:text-[11px] text-[#8E8E93] leading-relaxed break-words">
                    Interactive demonstration of Rudra&apos;s custom Model Context Protocol pipeline decoupling LLM clients from tool storage.
                  </p>
                </div>
              )}

              {activeExp === 'agentic-loop' && (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#222225] pb-3 text-[#EDEAE4] font-bold text-[11px] sm:text-xs">
                    <span className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 shrink-0" />
                      AUTONOMOUS AGENT STATE GRAPH
                    </span>
                    <span className="text-[10px] sm:text-xs text-[#EDEAE4] shrink-0">STATUS: CONVERGED</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[10px]">
                    <div className="p-2.5 sm:p-3 rounded-lg bg-[#141416]/40 border border-[#222225] min-w-0">
                      <span className="text-[#EDEAE4] block font-bold mb-1 truncate">01. DECOMPOSE</span>
                      <span className="break-words block text-[9px] sm:text-[10px]">Extract requirements</span>
                    </div>
                    <div className="p-2.5 sm:p-3 rounded-lg bg-[#141416]/40 border border-[#222225] min-w-0">
                      <span className="text-[#EDEAE4] block font-bold mb-1 truncate">02. SYNTHESIZE</span>
                      <span className="break-words block text-[9px] sm:text-[10px]">Write Java/TS module</span>
                    </div>
                    <div className="p-2.5 sm:p-3 rounded-lg bg-[#141416]/40 border border-[#222225] min-w-0">
                      <span className="text-[#EDEAE4] block font-bold mb-1 truncate">03. RUN TESTS</span>
                      <span className="break-words block text-[9px] sm:text-[10px]">Docker sandbox exec</span>
                    </div>
                    <div className="p-2.5 sm:p-3 rounded-lg bg-[#141416]/60 border border-[#EDEAE4] min-w-0">
                      <span className="text-[#EDEAE4] block font-bold mb-1 truncate">04. RESOLVE</span>
                      <span className="break-words block text-[9px] sm:text-[10px]">Self-repair trace</span>
                    </div>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-xl bg-[#0A0A0A] border border-[#222225] text-[#8E8E93]">
                    <p className="text-[#EDEAE4] font-semibold mb-1 text-[11px] sm:text-xs">Observation on Self-Correction:</p>
                    <p className="text-[10px] sm:text-[11px] leading-relaxed break-words">
                      By feeding compiler AST diagnostics directly back into few-shot repair prompts, error convergence rates jumped from 41% to 89% on complex algorithmic problems.
                    </p>
                  </div>
                </div>
              )}

              {activeExp === 'shader-field' && (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#222225] pb-3 text-[#EDEAE4] font-bold text-[11px] sm:text-xs">
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 shrink-0" />
                      GLSL MATHEMATICAL FOUNDATION
                    </span>
                    <span className="text-[#EDEAE4] shrink-0">DOMAIN WARPING</span>
                  </div>

                  <pre className="p-3 sm:p-4 rounded-xl bg-[#0A0A0A] border border-[#222225] text-[9px] sm:text-[10px] text-[#EDEAE4] overflow-x-auto leading-relaxed">
{`// Layered simplex noise domain warping in GLSL
vec2 q = vec2(snoise(st + vec2(t * 0.4, t * 0.2)));
vec2 r = vec2(snoise(st + 1.2 * q + vec2(1.7, 9.2)));
float f = snoise(st + 1.6 * r);

// Exact editorial palette quantization
vec3 color = mix(cBg, cGreen, smoothstep(-0.35, 0.4, f));
color = mix(color, cVanilla, smoothstep(0.3, 0.7, r.x * f));
color = mix(color, cOrange, smoothstep(0.5, 0.85, snoise(st * 2.0)));`}
                  </pre>

                  <p className="text-[10px] sm:text-[11px] text-[#8E8E93] leading-relaxed break-words">
                    All visuals in this portfolio utilize deterministic GPU fragment shaders running at 60 FPS without external video assets.
                  </p>
                </div>
              )}

              {activeExp === 'hackathon-pocs' && (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#222225] pb-3 text-[#EDEAE4] font-bold text-[11px] sm:text-xs">
                    <span className="flex items-center gap-2">
                      <GitBranch className="w-4 h-4 shrink-0" />
                      HACKATHON DEPLOYMENT SPRINT
                    </span>
                    <span className="text-[#EDEAE4] shrink-0">VELOCITY: 36H PROTOTYPES</span>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-[#141416]/30 border border-[#222225] flex items-center justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <span className="text-[#FAFAFA] font-bold block text-xs sm:text-sm truncate">Smart Standards RAG</span>
                        <span className="text-[10px] sm:text-[11px] text-[#8E8E93] block truncate">National Level Finalist • 2025</span>
                      </div>
                      <span className="text-[#EDEAE4] font-bold text-xs shrink-0">TOP 5</span>
                    </div>

                    <div className="p-3 rounded-lg bg-[#141416]/30 border border-[#222225] flex items-center justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <span className="text-[#FAFAFA] font-bold block text-xs sm:text-sm truncate">Vernacular Voice Gateway</span>
                        <span className="text-[10px] sm:text-[11px] text-[#8E8E93] block truncate">Civic Tech Innovation Sprint</span>
                      </div>
                      <span className="text-[#EDEAE4] font-bold text-xs shrink-0">HONORABLE MENTION</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Terminal Bottom Controls */}
              <div className="mt-6 pt-4 border-t border-[#222225] flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-[11px] text-[#8E8E93]">
                <span className="truncate">REPOSITORY: github.com/rudraism19</span>
                <a
                  href="https://github.com/rudraism19"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#EDEAE4] hover:text-[#FFFFFF] flex items-center gap-1 transition-colors shrink-0 font-semibold"
                  data-cursor="pointer"
                >
                  <span>BROWSE CODEBASE</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
