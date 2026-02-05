import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Void - The infinite dark
        void: {
          deep: '#050508',
          surface: '#0a0b0f',
          elevated: '#12131a',
        },
        // Forest Green Accent
        forest: {
          DEFAULT: '#1a3d2e',
          bright: '#2d6a4f',
        },
        // Quantum Cyan Accent
        cyan: {
          DEFAULT: '#40e0d0',
          muted: '#2dd4bf',
        },
        // Text colors
        text: {
          primary: '#f0f2f5',
          secondary: 'rgba(240, 242, 245, 0.7)',
          tertiary: 'rgba(240, 242, 245, 0.5)',
        },
        // Particle colors
        particle: {
          base: 'rgba(180, 190, 200, 0.5)',
          highlight: 'rgba(64, 224, 208, 0.8)',
        },
      },
      fontFamily: {
        display: ['Instrument Serif', 'Georgia', 'serif'],
        body: ['DM Sans', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        hero: ['clamp(3rem, 8vw, 5.5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        display: ['clamp(2rem, 5vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        title: ['clamp(1.5rem, 3vw, 2rem)', { lineHeight: '1.2' }],
        body: ['clamp(1rem, 1.5vw, 1.125rem)', { lineHeight: '1.65' }],
        small: ['clamp(0.75rem, 1vw, 0.875rem)', { lineHeight: '1.4', letterSpacing: '0.02em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      boxShadow: {
        'glow-cyan': '0 0 24px rgba(64, 224, 208, 0.3)',
        'glow-forest': '0 0 24px rgba(45, 106, 79, 0.4)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}

export default config
