'use client';

import React, { useRef, useState } from 'react';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  className?: string;
  asAnchor?: boolean;
  href?: string;
  target?: string;
  rel?: string;
}

export default function MagneticButton({
  children,
  variant = 'primary',
  className = '',
  asAnchor = false,
  href,
  target,
  rel,
  onClick,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    // Respect reduced motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.35;
    const y = (clientY - (top + height / 2)) * 0.35;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles =
    'relative inline-flex items-center justify-center font-mono-tag text-xs md:text-sm font-semibold tracking-wider transition-all duration-300 ease-out select-none active:scale-95 group focus:outline-none focus:ring-2 focus:ring-[#EB7D00] focus:ring-offset-2 focus:ring-offset-[#14120E]';

  const variants = {
    primary:
      'bg-[#EB7D00] text-[#14120E] hover:bg-[#F3EBD8] px-7 py-3.5',
    secondary:
      'bg-[#1D241F] text-[#FAF8F2] hover:bg-[#346651] border border-[#2C2720] px-6 py-3.5',
    outline:
      'bg-transparent text-[#F3EBD8] hover:text-[#EB7D00] border border-[#2C2720] hover:border-[#EB7D00] px-6 py-3.5',
    ghost:
      'bg-transparent text-[#A39E91] hover:text-[#EB7D00] px-4 py-2 hover:bg-[#2C2720]/20',
  };

  const transformStyle = {
    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
  };

  if (asAnchor && href) {
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        style={transformStyle}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        data-cursor="pointer"
        onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
      >
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      style={transformStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      data-cursor="pointer"
      onClick={onClick}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </button>
  );
}
