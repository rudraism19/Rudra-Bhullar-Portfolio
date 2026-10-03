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
    desc: 'Custom WebGL fragment shaders calculating real-time domain-warped noise field mapped to the #2E2910 / #EB7D00 editorial spectrum.',
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
      className="relative py-28 md:py-36 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#4A4322]/80"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#4A4322]/60 mb-12">
        <div>
          <div className="flex items-center gap-2 font-mono-tag text-xs text-[#EB7D00] uppercase tracking-widest mb-3">
            <span className="font-bold">04 / THE LABORATORY</span>
            <span className="text-[#4A4322]">—</span>
            <span className="text-[#BDB99F]">CREATIVE CODING & FRONTIER EXPLORATION</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight text-[#F8F5E8]">
            EXPERIMENTAL <span className="text-[#EB7D00]">WORKS.</span>
          </h2>
        </div>

        <p className="max-w-md font-mono-tag text-xs text-[#BDB99F] leading-relaxed">
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
                className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer select-none ${
                  isSelected
                    ? 'bg-[#2C5745]/50 border-[#EB7D00] shadow-lg shadow-black/20 translate-x-2'
                    : 'bg-[#2E2910] border-[#4A4322]/80 hover:border-[#EBE3A7]/40 hover:bg-[#2C5745]/20'
                }`}
                data-cursor="pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono-tag text-[10px] uppercase tracking-widest text-[#EB7D00] font-semibold">
                    {exp.badge}
                  </span>
                  <span className="font-mono-tag text-[10px] text-[#EBE3A7]">
                    {exp.status}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold uppercase tracking-tight text-[#F8F5E8] mb-2">
                  {exp.title}
                </h3>

                <p className="text-xs text-[#BDB99F] leading-relaxed mb-4">
                  {exp.desc}
                </p>

                <div className="font-mono-tag text-[11px] text-[#EBE3A7] border-t border-[#4A4322]/60 pt-3 flex items-center justify-between">
                  <span>{exp.tech}</span>
                  <span className="text-[#EB7D00] font-bold">
                    {isSelected ? 'INSPECTING →' : 'SELECT'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Live Interactive Sandbox Terminal (7 cols) */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-[#4A4322] bg-[#2E2910] overflow-hidden">
            {/* Terminal Window Header */}
            <div className="p-4 bg-[#2C5745]/30 border-b border-[#4A4322] flex items-center justify-between font-mono-tag text-xs">
              <span className="text-[#EBE3A7] font-semibold">
                LAB SPEC // {activeExp.toUpperCase()}
              </span>

              <span className="text-[#EB7D00] text-[11px] font-bold">
                ACTIVE EXPERIMENT
              </span>
            </div>

            {/* Sandbox Content Area */}
            <div className="p-6 md:p-8 font-mono-tag text-xs text-[#F8F5E8] leading-relaxed">
              {activeExp === 'mcp-agent' && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between border-b border-[#4A4322] pb-3">
                    <span className="text-[#EB7D00] font-bold flex items-center gap-2">
                      <Terminal className="w-4 h-4" />
                      MCP PROTOCOL TRACE (JSON-RPC 2.0)
                    </span>
                    <button
                      onClick={cycleMcpStep}
                      className="px-2.5 py-1 rounded bg-[#2C5745] hover:bg-[#346651] text-[#EBE3A7] text-[11px] flex items-center gap-1 border border-[#4A4322] transition-colors"
                      data-cursor="pointer"
                    >
                      <RefreshCw className="w-3 h-3" />
                      TRIGGER NEXT STEP
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-[#2E2910] border border-[#4A4322] text-[11px] space-y-2 text-[#BDB99F]">
                    {mcpLogStep >= 1 && (
                      <div className="text-[#EBE3A7]">
                        <span className="text-[#EB7D00] font-bold">[STEP 1 - AGENT CALL]:</span>
                        <pre className="text-[10px] text-[#BDB99F] mt-1 overflow-x-auto">
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
                      <div className="text-[#EBE3A7] pt-2 border-t border-[#4A4322]/50">
                        <span className="text-[#2C5745] font-bold bg-[#EBE3A7] px-1 text-[10px] mr-1">
                          MCP SERVER RESPONSE
                        </span>
                        <span className="text-[#EBE3A7]">→ Verified tool execution. Vector search returned 3 chunks with 94.6% similarity.</span>
                      </div>
                    )}

                    {mcpLogStep >= 3 && (
                      <div className="text-[#EB7D00] pt-2 border-t border-[#4A4322]/50">
                        <span className="font-bold">[STEP 3 - RESULT]:</span> Synthetic audio stream instantiated via WebSockets in 480ms.
                      </div>
                    )}
                  </div>

                  <p className="text-[11px] text-[#BDB99F]">
                    Interactive demonstration of Rudra&apos;s custom Model Context Protocol pipeline decoupling LLM clients from tool storage.
                  </p>
                </div>
              )}

              {activeExp === 'agentic-loop' && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between border-b border-[#4A4322] pb-3 text-[#EB7D00] font-bold">
                    <span className="flex items-center gap-2">
                      <Cpu className="w-4 h-4" />
                      AUTONOMOUS AGENT STATE GRAPH
                    </span>
                    <span className="text-xs text-[#EBE3A7]">STATUS: CONVERGED</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[10px]">
                    <div className="p-3 rounded-lg bg-[#2C5745]/40 border border-[#4A4322]">
                      <span className="text-[#EB7D00] block font-bold mb-1">01. DECOMPOSE</span>
                      Extract requirements
                    </div>
                    <div className="p-3 rounded-lg bg-[#2C5745]/40 border border-[#4A4322]">
                      <span className="text-[#EBE3A7] block font-bold mb-1">02. SYNTHESIZE</span>
                      Write Java/TS module
                    </div>
                    <div className="p-3 rounded-lg bg-[#2C5745]/40 border border-[#4A4322]">
                      <span className="text-[#EB7D00] block font-bold mb-1">03. RUN TESTS</span>
                      Docker sandbox exec
                    </div>
                    <div className="p-3 rounded-lg bg-[#2C5745]/60 border border-[#EB7D00]">
                      <span className="text-[#EBE3A7] block font-bold mb-1">04. RESOLVE</span>
                      Self-repair trace
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#2E2910] border border-[#4A4322] text-[#BDB99F]">
                    <p className="text-[#EBE3A7] font-semibold mb-1">Observation on Self-Correction:</p>
                    <p className="text-[11px] leading-relaxed">
                      By feeding compiler AST diagnostics directly back into few-shot repair prompts, error convergence rates jumped from 41% to 89% on complex algorithmic problems.
                    </p>
                  </div>
                </div>
              )}

              {activeExp === 'shader-field' && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between border-b border-[#4A4322] pb-3 text-[#EB7D00] font-bold">
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      GLSL MATHEMATICAL FOUNDATION
                    </span>
                    <span className="text-[#EBE3A7]">DOMAIN WARPING</span>
                  </div>

                  <pre className="p-4 rounded-xl bg-[#2E2910] border border-[#4A4322] text-[10px] text-[#EBE3A7] overflow-x-auto leading-relaxed">
{`// Layered simplex noise domain warping in GLSL
vec2 q = vec2(snoise(st + vec2(t * 0.4, t * 0.2)));
vec2 r = vec2(snoise(st + 1.2 * q + vec2(1.7, 9.2)));
float f = snoise(st + 1.6 * r);

// Exact editorial palette quantization
vec3 color = mix(cBg, cGreen, smoothstep(-0.35, 0.4, f));
color = mix(color, cVanilla, smoothstep(0.3, 0.7, r.x * f));
color = mix(color, cOrange, smoothstep(0.5, 0.85, snoise(st * 2.0)));`}
                  </pre>

                  <p className="text-[11px] text-[#BDB99F]">
                    All visuals in this portfolio utilize deterministic GPU fragment shaders running at 60 FPS without external video assets.
                  </p>
                </div>
              )}

              {activeExp === 'hackathon-pocs' && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between border-b border-[#4A4322] pb-3 text-[#EB7D00] font-bold">
                    <span className="flex items-center gap-2">
                      <GitBranch className="w-4 h-4" />
                      HACKATHON DEPLOYMENT SPRINT
                    </span>
                    <span className="text-[#EBE3A7]">VELOCITY: 36H PROTOTYPES</span>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-[#2C5745]/30 border border-[#4A4322] flex items-center justify-between">
                      <div>
                        <span className="text-[#F8F5E8] font-bold block">Smart Standards RAG</span>
                        <span className="text-[11px] text-[#BDB99F]">National Level Finalist • 2025</span>
                      </div>
                      <span className="text-[#EB7D00] font-bold text-xs">TOP 5</span>
                    </div>

                    <div className="p-3 rounded-lg bg-[#2C5745]/30 border border-[#4A4322] flex items-center justify-between">
                      <div>
                        <span className="text-[#F8F5E8] font-bold block">Vernacular Voice Gateway</span>
                        <span className="text-[11px] text-[#BDB99F]">Civic Tech Innovation Sprint</span>
                      </div>
                      <span className="text-[#EBE3A7] font-bold text-xs">HONORABLE MENTION</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Terminal Bottom Controls */}
              <div className="mt-6 pt-4 border-t border-[#4A4322] flex items-center justify-between text-[11px] text-[#BDB99F]">
                <span>REPOSITORY: github.com/rudraism19</span>
                <a
                  href="https://github.com/rudraism19"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#EB7D00] hover:text-[#EBE3A7] flex items-center gap-1 transition-colors"
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
