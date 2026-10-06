'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Command,
  ArrowRight,
  Terminal,
  Layers,
  User,
  Cpu,
  FlaskConical,
  Trophy,
  Milestone,
  Send,
  Copy,
  Check,
  Github,
  Linkedin,
  X,
  CornerDownLeft,
  Sparkles,
} from 'lucide-react';

interface PaletteAction {
  id: string;
  title: string;
  category: 'NAVIGATION' | 'PROJECTS' | 'ACTIONS' | 'LINKS';
  icon: React.ComponentType<{ className?: string }>;
  shortcut?: string;
  perform: () => void;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mode, setMode] = useState<'menu' | 'terminal'>('menu');
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalOutput, setTerminalOutput] = useState<
    Array<{ command: string; output: string | React.ReactNode }>
  >([
    {
      command: 'system.init()',
      output: 'Rudra Bhullar Architecture Console v2.6. Type "help" for commands or "exit" to return.',
    },
  ]);
  const [copied, setCopied] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalInputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const emailAddress = 'rudraism19@gmail.com';

  const scrollTo = (id: string) => {
    setIsOpen(false);
    const target = document.getElementById(id);
    if (target) {
      const lenis = (window as unknown as { __lenis?: { scrollTo: (target: HTMLElement | string) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo(target);
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const actions: PaletteAction[] = [
    // Navigation
    { id: 'nav-work', title: 'Work // Featured Engineering Systems', category: 'NAVIGATION', icon: Layers, shortcut: '01', perform: () => scrollTo('work') },
    { id: 'nav-about', title: 'About // Profile & Architecture Ethos', category: 'NAVIGATION', icon: User, shortcut: '02', perform: () => scrollTo('about') },
    { id: 'nav-skills', title: 'Skills // Tech Stack & Distributed Systems', category: 'NAVIGATION', icon: Cpu, shortcut: '03', perform: () => scrollTo('skills') },
    { id: 'nav-lab', title: 'Lab // WebGL & Creative Sandbox', category: 'NAVIGATION', icon: FlaskConical, shortcut: '04', perform: () => scrollTo('experiments') },
    { id: 'nav-vault', title: 'Vault // Accreditations & Hackathon Honors', category: 'NAVIGATION', icon: Trophy, shortcut: '05', perform: () => scrollTo('trophies') },
    { id: 'nav-journey', title: 'Journey // Career Milestones Timeline', category: 'NAVIGATION', icon: Milestone, shortcut: '06', perform: () => scrollTo('journey') },
    { id: 'nav-contact', title: 'Contact // Direct Dispatch & Inquiries', category: 'NAVIGATION', icon: Send, shortcut: '07', perform: () => scrollTo('contact') },

    // Actions & Tools
    { id: 'action-copy-email', title: copied ? 'Email Copied to Clipboard!' : 'Copy Direct Email Address', category: 'ACTIONS', icon: copied ? Check : Copy, shortcut: 'COPY', perform: copyEmail },
    { id: 'action-terminal', title: 'Launch Interactive Developer CLI Terminal', category: 'ACTIONS', icon: Terminal, shortcut: 'CLI', perform: () => setMode('terminal') },

    // External Links
    { id: 'link-github', title: 'Visit GitHub Profile (@rudraism19)', category: 'LINKS', icon: Github, shortcut: 'GH', perform: () => window.open('https://github.com/rudraism19', '_blank') },
    { id: 'link-linkedin', title: 'Connect on LinkedIn (/in/rudra-bhullar)', category: 'LINKS', icon: Linkedin, shortcut: 'IN', perform: () => window.open('https://linkedin.com/in/rudra-bhullar', '_blank') },
  ];

  const filteredActions = actions.filter((action) =>
    action.title.toLowerCase().includes(query.toLowerCase()) ||
    action.category.toLowerCase().includes(query.toLowerCase())
  );

  // Keyboard shortcut listener: Cmd+K / Ctrl+K / /
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-palette', handleCustomOpen);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleCustomOpen);
    };
  }, [isOpen]);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      setSelectedIndex(0);
      setQuery('');
      if (mode === 'menu') {
        setTimeout(() => inputRef.current?.focus(), 60);
      } else {
        setTimeout(() => terminalInputRef.current?.focus(), 60);
      }
    }
  }, [isOpen, mode]);

  // Terminal scroll to bottom
  useEffect(() => {
    if (mode === 'terminal') {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalOutput, mode]);

  // Keyboard navigation inside menu mode
  const handleMenuKeyDown = (e: React.KeyboardEvent) => {
    if (filteredActions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredActions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredActions.length) % filteredActions.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const current = filteredActions[selectedIndex];
      if (current) {
        current.perform();
      }
    }
  };

  // Terminal command executor
  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim();
    if (!cmd) return;

    const lower = cmd.toLowerCase();
    let response: React.ReactNode = '';

    if (lower === 'help') {
      response = (
        <div className="space-y-1 text-xs font-mono text-[#8E8E93]">
          <p><span className="text-[#EDEAE4] font-bold">whoami</span> — Summary of engineering profile & role</p>
          <p><span className="text-[#EDEAE4] font-bold">skills</span> — Core architecture proficiencies</p>
          <p><span className="text-[#EDEAE4] font-bold">projects</span> — Key production backend systems</p>
          <p><span className="text-[#EDEAE4] font-bold">contact</span> — Email, social coordinates, and location</p>
          <p><span className="text-[#EDEAE4] font-bold">clear</span> — Reset terminal console output</p>
          <p><span className="text-[#EDEAE4] font-bold">exit</span> — Return to standard palette menu</p>
        </div>
      );
    } else if (lower === 'whoami') {
      response = 'Rudra Bhullar — AI Backend Engineer & Former CTO @ Digital Twin Verse. Specialized in high-throughput FastAPI, vector search, RAG pipelines, and distributed Java architectures.';
    } else if (lower === 'skills') {
      response = 'FASTAPI • PYTHON • NEXT.JS 14 • TYPESCRIPT • SUPABASE VECTOR • POSTGRESQL • DOCKER • JAVA (DSA) • REDIS • PYTORCH';
    } else if (lower === 'projects') {
      response = '1. FinAI High-Throughput Engine | 2. DTV Metaverse Architecture | 3. CampusConnect Network | 4. HealthSync Multimodal AI';
    } else if (lower === 'contact') {
      response = `Email: ${emailAddress} | GitHub: github.com/rudraism19 | LinkedIn: linkedin.com/in/rudra-bhullar | Location: Madhya Pradesh, India`;
    } else if (lower === 'clear') {
      setTerminalOutput([]);
      setTerminalInput('');
      return;
    } else if (lower === 'exit') {
      setMode('menu');
      setTerminalInput('');
      return;
    } else {
      response = `Command not recognized: "${cmd}". Type "help" for a list of valid commands.`;
    }

    setTerminalOutput((prev) => [...prev, { command: cmd, output: response }]);
    setTerminalInput('');
  };

  return (
    <>
      {/* Discreet Desktop Floating Shortcut Pill (Bottom Left) */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open Command Palette (Ctrl+K or Cmd+K)"
        data-cursor="pointer"
        className="fixed bottom-6 left-6 z-40 hidden sm:inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0A0A0A]/85 backdrop-blur-xl border border-[#222225] hover:border-[#EDEAE4]/50 text-[#8E8E93] hover:text-[#EDEAE4] transition-all text-xs font-mono-tag shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
      >
        <Command className="w-3.5 h-3.5 text-[#EDEAE4]" />
        <span>COMMAND PALETTE</span>
        <kbd className="px-1.5 py-0.5 rounded bg-[#141416] border border-[#222225] text-[10px] text-[#EDEAE4] font-mono">
          ⌘K
        </kbd>
      </button>

      {/* Modal Backdrop */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Command Palette"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] sm:pt-[16vh] px-4 bg-[#0A0A0A]/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        >
          {/* Palette Card */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl rounded-2xl bg-[#0A0A0A] border border-[#EDEAE4]/40 shadow-[0_24px_64px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col transition-all"
          >
            {/* Header: Mode Switcher & Close */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#222225] bg-[#141416]/40 font-mono-tag text-xs text-[#8E8E93]">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMode('menu')}
                  className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                    mode === 'menu'
                      ? 'bg-[#141416] text-[#EDEAE4] border border-[#222225] font-bold'
                      : 'hover:text-[#FAFAFA]'
                  }`}
                  data-cursor="pointer"
                >
                  <Command className="w-3.5 h-3.5" />
                  <span>COMMANDS</span>
                </button>
                <button
                  onClick={() => setMode('terminal')}
                  className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                    mode === 'terminal'
                      ? 'bg-[#141416] text-[#EDEAE4] border border-[#222225] font-bold'
                      : 'hover:text-[#FAFAFA]'
                  }`}
                  data-cursor="pointer"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>CLI CONSOLE</span>
                </button>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[10px] hidden sm:inline">ESC TO CLOSE</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded text-[#8E8E93] hover:text-[#EDEAE4] transition-colors"
                  aria-label="Close Command Palette"
                  data-cursor="pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* ========================================================
                MODE A: COMMAND MENU SEARCH
                ======================================================== */}
            {mode === 'menu' && (
              <>
                {/* Search Input Bar */}
                <div className="relative flex items-center px-5 py-4 border-b border-[#222225]">
                  <Search className="w-5 h-5 text-[#8E8E93] shrink-0 mr-3" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setSelectedIndex(0);
                    }}
                    onKeyDown={handleMenuKeyDown}
                    placeholder="Search sections, actions, direct links, or commands..."
                    className="w-full bg-transparent text-[#FAFAFA] placeholder-[#8E8E93]/50 font-mono-tag text-xs sm:text-sm focus:outline-none"
                  />
                  {query && (
                    <button
                      onClick={() => setQuery('')}
                      className="text-xs text-[#8E8E93] hover:text-[#EDEAE4] px-1 font-mono"
                    >
                      CLEAR
                    </button>
                  )}
                </div>

                {/* Filtered Action List */}
                <div
                  ref={listRef}
                  className="max-h-[380px] overflow-y-auto p-3 space-y-1 font-mono-tag text-xs"
                >
                  {filteredActions.length === 0 ? (
                    <div className="py-12 text-center text-[#8E8E93]">
                      <p className="text-sm">No actions found for &ldquo;{query}&rdquo;</p>
                      <p className="text-[11px] mt-1 text-[#8E8E93]/70">Try searching for &quot;work&quot;, &quot;skills&quot;, &quot;github&quot;, or launch CLI terminal.</p>
                    </div>
                  ) : (
                    filteredActions.map((action, idx) => {
                      const isSelected = idx === selectedIndex;
                      const Icon = action.icon;

                      return (
                        <div
                          key={action.id}
                          onMouseEnter={() => setSelectedIndex(idx)}
                          onClick={() => action.perform()}
                          className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${
                            isSelected
                              ? 'bg-[#141416] text-[#EDEAE4] border border-[#222225]'
                              : 'text-[#8E8E93] hover:text-[#FAFAFA]'
                          }`}
                          data-cursor="pointer"
                        >
                          <div className="flex items-center gap-3 truncate">
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center border transition-colors ${
                              isSelected
                                ? 'bg-[#0A0A0A] border-[#EDEAE4] text-[#EDEAE4]'
                                : 'bg-[#141416]/50 border-[#222225] text-[#8E8E93]'
                            }`}>
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <span className={`font-semibold truncate text-xs ${isSelected ? 'text-[#FAFAFA]' : 'text-[#8E8E93]'}`}>
                              {action.title}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {action.shortcut && (
                              <span className="px-2 py-0.5 rounded bg-[#0A0A0A] border border-[#222225] text-[10px] text-[#EDEAE4]">
                                {action.shortcut}
                              </span>
                            )}
                            {isSelected && (
                              <CornerDownLeft className="w-3.5 h-3.5 text-[#EDEAE4]" />
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Footer Guide */}
                <div className="px-5 py-3 border-t border-[#222225] bg-[#141416]/20 flex items-center justify-between font-mono-tag text-[11px] text-[#8E8E93]">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5">
                      <kbd className="px-1.5 py-0.5 rounded bg-[#141416] border border-[#222225] text-[#EDEAE4]">↑↓</kbd>
                      <span>NAVIGATE</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <kbd className="px-1.5 py-0.5 rounded bg-[#141416] border border-[#222225] text-[#EDEAE4]">↵</kbd>
                      <span>SELECT</span>
                    </span>
                  </div>
                  <span className="text-[#EDEAE4] font-semibold">RUDRA BHULLAR // ARCHITECTURE</span>
                </div>
              </>
            )}

            {/* ========================================================
                MODE B: INTERACTIVE DEVELOPER CLI TERMINAL
                ======================================================== */}
            {mode === 'terminal' && (
              <div className="flex flex-col h-[400px] bg-[#0A0A0A] p-5 font-mono text-xs">
                {/* Terminal Console Output Scroll Area */}
                <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                  {terminalOutput.map((item, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex items-center gap-2 text-[#8E8E93]">
                        <span className="text-[#EDEAE4] font-bold">guest@rudra:~$</span>
                        <span className="text-[#FAFAFA]">{item.command}</span>
                      </div>
                      <div className="pl-4 text-[#EDEAE4]/90 leading-relaxed">
                        {item.output}
                      </div>
                    </div>
                  ))}
                  <div ref={terminalEndRef} />
                </div>

                {/* Command Input Prompt */}
                <form
                  onSubmit={handleTerminalSubmit}
                  className="mt-3 pt-3 border-t border-[#222225] flex items-center gap-2"
                >
                  <span className="text-[#EDEAE4] font-bold shrink-0">guest@rudra:~$</span>
                  <input
                    ref={terminalInputRef}
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    placeholder="Type command (e.g. 'help', 'skills', 'projects', 'contact', 'clear')..."
                    className="w-full bg-transparent text-[#FAFAFA] placeholder-[#8E8E93]/40 focus:outline-none"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="text-xs px-2 py-1 rounded bg-[#141416] border border-[#222225] text-[#EDEAE4] hover:bg-[#EDEAE4] hover:text-[#0A0A0A] transition-colors"
                  >
                    ↵
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
