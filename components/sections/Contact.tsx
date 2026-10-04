'use client';

import React, { useState } from 'react';
import MagneticButton from '@/components/ui/MagneticButton';
import { ArrowUpRight, Copy, Check, Mail, Github, Linkedin, Instagram, Send } from 'lucide-react';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const emailAddress = 'rudraism19@gmail.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    // Construct mailto link as reliable zero-backend transmission
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
    setFormSent(true);
  };

  return (
    <section
      id="contact"
      className="relative py-28 md:py-36 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#2C2720]/80"
    >
      {/* Section Tag */}
      <div className="flex items-center justify-between pb-8 mb-12 border-b border-[#2C2720]/60 font-mono-tag text-xs text-[#A39E91]">
        <div className="flex items-center gap-2">
          <span className="text-[#EB7D00] font-bold">06 / INQUIRY & DISCOURSE</span>
          <span className="text-[#2C2720]">—</span>
          <span>GET IN TOUCH</span>
        </div>
        <div className="text-[#F3EBD8]">
          [ OPEN TO NEW OPPORTUNITIES ]
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Massive Editorial Statement (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <h2 className="font-display text-5xl sm:text-7xl lg:text-[5.5rem] font-extrabold uppercase tracking-tight leading-[0.92] text-[#FAF8F2] mb-8">
              LET&apos;S BUILD <br />
              <span className="text-[#F3EBD8]">SOMETHING</span> <br />
              <span className="text-[#EB7D00]">INTERESTING.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#A39E91] max-w-xl leading-relaxed mb-8">
              Whether you are looking to collaborate on high-impact AI products, build cutting-edge web platforms, explore hackathon ventures, or discuss computer science architecture—my inbox is always open.
            </p>

            {/* Quick Email Box */}
            <div className="inline-flex items-center gap-3 p-3 rounded-xl bg-[#1D241F]/30 border border-[#2C2720] mb-10 max-w-full">
              <Mail className="w-5 h-5 text-[#EB7D00] shrink-0" />
              <span className="font-mono-tag text-xs sm:text-sm text-[#FAF8F2] truncate">
                {emailAddress}
              </span>
              <button
                onClick={copyEmail}
                className="px-3 py-1.5 rounded-lg bg-[#14120E] hover:bg-[#1D241F] text-[#F3EBD8] border border-[#2C2720] text-xs font-mono-tag flex items-center gap-1.5 transition-colors shrink-0"
                data-cursor="pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#EB7D00]" />
                    <span>COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>COPY</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Social Links Row */}
          <div>
            <p className="font-mono-tag text-xs text-[#A39E91] uppercase tracking-widest mb-4">
              NETWORK DIRECTORY
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://github.com/rudraism19"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#2C2720] bg-[#14120E] text-[#F3EBD8] hover:border-[#EB7D00] hover:text-[#EB7D00] transition-colors font-mono-tag text-xs"
                data-cursor="pointer"
              >
                <Github className="w-4 h-4" />
                <span>GITHUB</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </a>

              <a
                href="https://linkedin.com/in/rudra-bhullar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#2C2720] bg-[#14120E] text-[#F3EBD8] hover:border-[#EB7D00] hover:text-[#EB7D00] transition-colors font-mono-tag text-xs"
                data-cursor="pointer"
              >
                <Linkedin className="w-4 h-4" />
                <span>LINKEDIN</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </a>

              <a
                href="https://instagram.com/rudraism19"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#2C2720] bg-[#14120E] text-[#F3EBD8] hover:border-[#EB7D00] hover:text-[#EB7D00] transition-colors font-mono-tag text-xs"
                data-cursor="pointer"
              >
                <Instagram className="w-4 h-4" />
                <span>INSTAGRAM</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </a>

              <a
                href={`mailto:${emailAddress}`}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#2C2720] bg-[#14120E] text-[#EB7D00] hover:border-[#EB7D00] hover:bg-[#EB7D00]/10 transition-colors font-mono-tag text-xs font-semibold"
                data-cursor="pointer"
              >
                <Mail className="w-4 h-4" />
                <span>DIRECT EMAIL</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Direct Dispatch Terminal (5 cols) */}
        <div className="lg:col-span-5">
          <form
            onSubmit={handleSubmit}
            className="p-8 rounded-2xl bg-[#1D241F]/20 border border-[#2C2720] flex flex-col gap-5"
          >
            <div className="border-b border-[#2C2720]/80 pb-4 mb-2 flex items-center justify-between font-mono-tag text-xs">
              <span className="text-[#EB7D00] font-bold">TRANSMIT DISPATCH</span>
              <span className="text-[#A39E91]">DIRECT INBOX</span>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="font-mono-tag text-xs text-[#F3EBD8]">
                YOUR NAME / ORGANIZATION
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ada Lovelace"
                className="w-full px-4 py-3 rounded-xl bg-[#14120E] border border-[#2C2720] text-[#FAF8F2] placeholder-[#A39E91]/40 focus:border-[#EB7D00] focus:outline-none font-mono-tag text-xs transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="font-mono-tag text-xs text-[#F3EBD8]">
                YOUR EMAIL ADDRESS
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="ada@domain.com"
                className="w-full px-4 py-3 rounded-xl bg-[#14120E] border border-[#2C2720] text-[#FAF8F2] placeholder-[#A39E91]/40 focus:border-[#EB7D00] focus:outline-none font-mono-tag text-xs transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="font-mono-tag text-xs text-[#F3EBD8]">
                PROJECT CONTEXT / INQUIRY
              </label>
              <textarea
                id="message"
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell me about what you are engineering or exploring..."
                className="w-full px-4 py-3 rounded-xl bg-[#14120E] border border-[#2C2720] text-[#FAF8F2] placeholder-[#A39E91]/40 focus:border-[#EB7D00] focus:outline-none font-mono-tag text-xs transition-colors resize-none"
              />
            </div>

            <MagneticButton
              type="submit"
              variant="primary"
              className="w-full mt-2"
            >
              <span>GET IN TOUCH →</span>
              <Send className="w-4 h-4 text-[#14120E]" />
            </MagneticButton>

            {formSent && (
              <p className="font-mono-tag text-xs text-[#EB7D00] text-center mt-2">
                Draft prepared in mail client. Looking forward to our conversation!
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
