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
    'relative inline-flex items-center justify-center font-mono-tag text-xs md:text-sm font-semibold tracking-wider transition-all duration-300 ease-out select-none active:scale-95 group focus:outline-none focus:ring-2 focus:ring-[#EB7D00] focus:ring-offset-2 focus:ring-offset-[#2E2910]';

  const variants = {
    primary:
      'bg-[#EB7D00] text-[#2E2910] hover:bg-[#EBE3A7] px-7 py-3.5 shadow-sm hover:shadow-md hover:shadow-[#EB7D00]/20',
    secondary:
      'bg-[#2C5745] text-[#F8F5E8] hover:bg-[#346651] border border-[#4A4322] px-6 py-3.5',
    outline:
      'bg-transparent text-[#EBE3A7] hover:text-[#EB7D00] border border-[#4A4322] hover:border-[#EB7D00] px-6 py-3.5',
    ghost:
      'bg-transparent text-[#BDB99F] hover:text-[#EB7D00] px-4 py-2 hover:bg-[#4A4322]/20',
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
