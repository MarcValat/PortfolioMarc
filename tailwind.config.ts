import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-primary':   '#080808',
        'bg-secondary': '#111111',
        'gold':         '#C9A84C',
        'gold-light':   '#F0D080',
        'coral':        '#FF6B6B',
        'text-primary': '#FFFFFF',
        'text-muted':   'rgba(245,240,232,0.5)',
        'glass-bg':     'rgba(255,255,255,0.07)',
        'glass-border': 'rgba(201,168,76,0.15)',
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        body:    ['"Inter"',         'sans-serif'],
        mono:    ['"Space Mono"',    'monospace'],
      },
      backgroundImage: {
        'gold-gradient':  'linear-gradient(135deg, #C9A84C 0%, #F0D080 50%, #C9A84C 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
        'holographic':    'linear-gradient(135deg, #C9A84C, #F0D080, #FF6B6B, #C9A84C)',
      },
      boxShadow: {
        'gold-glow':    '0 0 20px rgba(201,168,76,0.4), 0 0 60px rgba(201,168,76,0.15)',
        'gold-glow-lg': '0 0 40px rgba(201,168,76,0.6), 0 0 100px rgba(201,168,76,0.2)',
        'glass':        '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
        'card-hover':   '0 20px 60px rgba(0,0,0,0.6), 0 0 30px rgba(201,168,76,0.2)',
      },
      backdropBlur: {
        'glass': '16px',
        'card':  '20px',
      },
      borderRadius: {
        'glass': '16px',
        'card':  '12px',
      },
      spacing: {
        'section':    '120px',
        'section-sm': '80px',
      },
      animation: {
        'gold-sweep':  'goldSweep 3s linear infinite',
        'float':       'float 6s ease-in-out infinite',
        'pulse-gold':  'pulseGold 2s ease-in-out infinite',
        'shimmer':     'shimmer 2.5s linear infinite',
      },
      keyframes: {
        goldSweep: {
          '0%':   { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-12px)' },
        },
        pulseGold: {
          '0%,100%': { boxShadow: '0 0 20px rgba(201,168,76,0.4)' },
          '50%':     { boxShadow: '0 0 40px rgba(201,168,76,0.8)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
