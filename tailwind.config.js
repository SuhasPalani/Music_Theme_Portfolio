/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        surface: {
          DEFAULT: '#08080a',
          50: '#0c0c10',
          100: '#111116',
          200: '#18181f',
          300: '#1f1f28',
          400: '#2a2a35',
        },
        gold: {
          50: '#fdf8ef',
          100: '#f5e6c8',
          200: '#e8cc8a',
          300: '#d4a853',
          400: '#c49a3b',
          500: '#b08a30',
          600: '#8c6e26',
          700: '#6b5420',
          800: '#4a3a17',
          900: '#2d2410',
        },
        accent: {
          warm: '#d4a853',
          copper: '#c27840',
          rose: '#e84057',
          cyan: '#4ecdc4',
          blue: '#5b8def',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'slide-up': 'slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up-delayed': 'slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards',
        'fade-in': 'fade-in 1s ease-out forwards',
        'spin-slow': 'spin 20s linear infinite',
        'spin-reverse': 'spin-reverse 15s linear infinite',
        'waveform': 'waveform 1.2s ease-in-out infinite',
        'tilt-3d': 'tilt-3d 6s ease-in-out infinite',
        'orbit': 'orbit 12s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'vinyl-spin': 'spin 4s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotateX(0deg)' },
          '50%': { transform: 'translateY(-20px) rotateX(2deg)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.7' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(60px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        waveform: {
          '0%, 100%': { height: '4px' },
          '50%': { height: '28px' },
        },
        'tilt-3d': {
          '0%, 100%': { transform: 'rotateY(-5deg) rotateX(5deg)' },
          '50%': { transform: 'rotateY(5deg) rotateX(-5deg)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(100px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(100px) rotate(-360deg)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'spin-reverse': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
      },
      perspective: {
        '1000': '1000px',
        '2000': '2000px',
      },
      boxShadow: {
        'gold': '0 0 30px rgba(212, 168, 83, 0.1)',
        'gold-lg': '0 0 60px rgba(212, 168, 83, 0.15)',
        'card-3d': '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(212, 168, 83, 0.05)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
        'inner-glow': 'inset 0 1px 0 0 rgba(212, 168, 83, 0.1)',
      },
    },
  },
  plugins: [],
}
