import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        portfolio: {
          bg: '#0A0A0A',
          green: '#141416',
          surface: '#141416',
          orange: '#EDEAE4',
          accent: '#FFFFFF',
          chalk: '#EDEAE4',
          vanilla: '#EDEAE4',
          text: '#FAFAFA',
          muted: '#8E8E93',
          border: '#222225',
        },
      },
      fontFamily: {
        headline: ['var(--font-headline)', '"Anton"', '"Bebas Neue"', 'Impact', 'sans-serif'],
        editorial: ['var(--font-editorial)', '"Syne"', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', '"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', '"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
