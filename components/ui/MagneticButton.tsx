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
    'relative inline-flex items-center justify-center font-mono-tag text-xs md:text-sm font-semibold tracking-wider transition-all duration-300 ease-out select-none active:scale-95 group focus:outline-none focus:ring-2 focus:ring-[#EDEAE4] focus:ring-offset-2 focus:ring-offset-[#0A0A0A]';

  const variants = {
    primary:
      'bg-[#EDEAE4] text-[#0A0A0A] hover:bg-[#EDEAE4] px-7 py-3.5',
    secondary:
      'bg-[#141416] text-[#FAFAFA] hover:bg-[#346651] border border-[#222225] px-6 py-3.5',
    outline:
      'bg-transparent text-[#EDEAE4] hover:text-[#EDEAE4] border border-[#222225] hover:border-[#EDEAE4] px-6 py-3.5',
    ghost:
      'bg-transparent text-[#8E8E93] hover:text-[#EDEAE4] px-4 py-2 hover:bg-[#222225]/20',
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
