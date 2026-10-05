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
      className="relative py-28 md:py-36 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#222225]/80"
    >
      {/* Section Tag */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-8 mb-12 border-b border-[#222225]/60 font-mono-tag text-xs text-[#8E8E93]">
        <div className="flex items-center gap-2">
          <span className="text-[#EDEAE4] font-bold">07 / INQUIRY & DISCOURSE</span>
          <span className="text-[#222225]">—</span>
          <span>GET IN TOUCH</span>
        </div>
        <div className="text-[#EDEAE4] text-[11px] sm:text-xs">
          [ OPEN TO NEW OPPORTUNITIES ]
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Massive Editorial Statement (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <h2 className="font-display text-4xl sm:text-6xl lg:text-[5.5rem] font-extrabold uppercase tracking-tight leading-[0.92] text-[#FAFAFA] mb-8 break-words">
              LET&apos;S BUILD <br />
              <span className="text-[#EDEAE4]">SOMETHING</span> <br />
              <span className="text-[#EDEAE4]">INTERESTING.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#8E8E93] max-w-xl leading-relaxed mb-8 break-words">
              Whether you are looking to collaborate on high-impact AI products, build cutting-edge web platforms, explore hackathon ventures, or discuss computer science architecture—my inbox is always open.
            </p>

            {/* Quick Email Box */}
            <div className="inline-flex flex-wrap sm:flex-nowrap items-center gap-3 p-3 rounded-xl bg-[#141416]/30 border border-[#222225] mb-10 max-w-full">
              <Mail className="w-5 h-5 text-[#EDEAE4] shrink-0" />
              <span className="font-mono-tag text-xs sm:text-sm text-[#FAFAFA] truncate">
                {emailAddress}
              </span>
              <button
                onClick={copyEmail}
                className="px-3 py-1.5 rounded-lg bg-[#0A0A0A] hover:bg-[#141416] text-[#EDEAE4] border border-[#222225] text-xs font-mono-tag flex items-center gap-1.5 transition-colors shrink-0 ml-auto sm:ml-0"
                data-cursor="pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#EDEAE4]" />
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
            <p className="font-mono-tag text-xs text-[#8E8E93] uppercase tracking-widest mb-4">
              NETWORK DIRECTORY
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://github.com/rudraism19"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#222225] bg-[#0A0A0A] text-[#EDEAE4] hover:border-[#EDEAE4] hover:text-[#EDEAE4] transition-colors font-mono-tag text-xs"
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
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#222225] bg-[#0A0A0A] text-[#EDEAE4] hover:border-[#EDEAE4] hover:text-[#EDEAE4] transition-colors font-mono-tag text-xs"
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
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#222225] bg-[#0A0A0A] text-[#EDEAE4] hover:border-[#EDEAE4] hover:text-[#EDEAE4] transition-colors font-mono-tag text-xs"
                data-cursor="pointer"
              >
                <Instagram className="w-4 h-4" />
                <span>INSTAGRAM</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </a>

              <a
                href={`mailto:${emailAddress}`}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#222225] bg-[#0A0A0A] text-[#EDEAE4] hover:border-[#EDEAE4] hover:bg-[#EDEAE4]/10 transition-colors font-mono-tag text-xs font-semibold"
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
            className="p-8 rounded-2xl bg-[#141416]/20 border border-[#222225] flex flex-col gap-5"
          >
            <div className="border-b border-[#222225]/80 pb-4 mb-2 flex items-center justify-between font-mono-tag text-xs">
              <span className="text-[#EDEAE4] font-bold">TRANSMIT DISPATCH</span>
              <span className="text-[#8E8E93]">DIRECT INBOX</span>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="font-mono-tag text-xs text-[#EDEAE4]">
                YOUR NAME / ORGANIZATION
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ada Lovelace"
                className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border border-[#222225] text-[#FAFAFA] placeholder-[#8E8E93]/40 focus:border-[#EDEAE4] focus:outline-none font-mono-tag text-xs transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="font-mono-tag text-xs text-[#EDEAE4]">
                YOUR EMAIL ADDRESS
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="ada@domain.com"
                className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border border-[#222225] text-[#FAFAFA] placeholder-[#8E8E93]/40 focus:border-[#EDEAE4] focus:outline-none font-mono-tag text-xs transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="font-mono-tag text-xs text-[#EDEAE4]">
                PROJECT CONTEXT / INQUIRY
              </label>
              <textarea
                id="message"
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell me about what you are engineering or exploring..."
                className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border border-[#222225] text-[#FAFAFA] placeholder-[#8E8E93]/40 focus:border-[#EDEAE4] focus:outline-none font-mono-tag text-xs transition-colors resize-none"
              />
            </div>

            <MagneticButton
              type="submit"
              variant="primary"
              className="w-full mt-2"
            >
              <span>GET IN TOUCH →</span>
              <Send className="w-4 h-4 text-[#0A0A0A]" />
            </MagneticButton>

            {formSent && (
              <p className="font-mono-tag text-xs text-[#EDEAE4] text-center mt-2">
                Draft prepared in mail client. Looking forward to our conversation!
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
