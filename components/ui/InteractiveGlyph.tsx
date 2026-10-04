'use client';

import React, { useState } from 'react';

interface InteractiveGlyphProps {
  type?: 'atom' | 'neural' | 'cube' | 'terminal' | 'circuit';
  className?: string;
  size?: number;
}

export default function InteractiveGlyph({
  type = 'neural',
  className = '',
  size = 64,
}: InteractiveGlyphProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative inline-flex items-center justify-center cursor-pointer transition-transform duration-300 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ width: size, height: size }}
      data-cursor="pointer"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-500 ease-out"
        style={{
          transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
        }}
      >
        {type === 'neural' && (
          <g className="transition-all duration-300">
            {/* Neural Connections */}
            <line
              x1="16" y1="20" x2="32" y2="44"
              stroke={isHovered ? '#EDEAE4' : '#222225'}
              strokeWidth="1.5"
              strokeDasharray={isHovered ? '2 2' : 'none'}
              className="transition-colors duration-300"
            />
            <line
              x1="48" y1="20" x2="32" y2="44"
              stroke={isHovered ? '#EDEAE4' : '#222225'}
              strokeWidth="1.5"
              strokeDasharray={isHovered ? '2 2' : 'none'}
              className="transition-colors duration-300"
            />
            <line
              x1="16" y1="20" x2="48" y2="20"
              stroke={isHovered ? '#EDEAE4' : '#141416'}
              strokeWidth="1.5"
              className="transition-colors duration-300"
            />
            {/* Synapse nodes */}
            <circle
              cx="16" cy="20" r="5"
              fill={isHovered ? '#EDEAE4' : '#141416'}
              stroke="#EDEAE4"
              strokeWidth="1.5"
            />
            <circle
              cx="48" cy="20" r="5"
              fill={isHovered ? '#EDEAE4' : '#141416'}
              stroke="#EDEAE4"
              strokeWidth="1.5"
            />
            <circle
              cx="32" cy="44" r="6"
              fill={isHovered ? '#EDEAE4' : '#EDEAE4'}
              stroke="#0A0A0A"
              strokeWidth="2"
            />
            {/* Synapse nodes */}
          </g>
        )}

        {type === 'cube' && (
          <g className="transition-all duration-300">
            <polygon
              points="32,10 52,22 32,34 12,22"
              fill={isHovered ? '#EDEAE4' : '#141416'}
              stroke="#222225"
              strokeWidth="1.5"
            />
            <polygon
              points="12,22 32,34 32,54 12,42"
              fill={isHovered ? '#EDEAE4' : '#0A0A0A'}
              stroke="#222225"
              strokeWidth="1.5"
            />
            <polygon
              points="32,34 52,22 52,42 32,54"
              fill={isHovered ? '#141416' : '#222225'}
              stroke="#222225"
              strokeWidth="1.5"
            />
          </g>
        )}

        {type === 'circuit' && (
          <g className="transition-all duration-300">
            <rect
              x="18" y="18" width="28" height="28"
              fill="#0A0A0A"
              stroke={isHovered ? '#EDEAE4' : '#141416'}
              strokeWidth="2"
            />
            <path
              d="M10 24h8M10 32h8M10 40h8M46 24h8M46 32h8M46 40h8M24 10v8M32 10v8M40 10v8M24 46v8M32 46v8M40 46v8"
              stroke={isHovered ? '#EDEAE4' : '#222225'}
              strokeWidth="1.5"
            />
            <circle
              cx="32" cy="32" r="4"
              fill={isHovered ? '#EDEAE4' : '#EDEAE4'}
            />
          </g>
        )}

        {type === 'terminal' && (
          <g className="transition-all duration-300">
            <rect
              x="12" y="16" width="40" height="32" rx="3"
              fill="#0A0A0A"
              stroke={isHovered ? '#EDEAE4' : '#222225'}
              strokeWidth="1.5"
            />
            <path
              d="M18 26l6 6-6 6"
              stroke={isHovered ? '#EDEAE4' : '#EDEAE4'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1="28" y1="38" x2="38" y2="38"
              stroke={isHovered ? '#EDEAE4' : '#8E8E93'}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>
        )}
      </svg>
    </div>
  );
}
