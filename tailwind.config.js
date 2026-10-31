/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#030712',
          900: '#070E20',
          850: '#0B132B',
          800: '#111C3A',
          700: '#1C2541',
          600: '#2A365B',
        },
        turquoise: {
          300: '#5FFBF1',
          400: '#26E6E6',
          500: '#00F0FF',
          600: '#00C2CB',
          700: '#0097A7',
        },
        gold: {
          300: '#FFE699',
          400: '#FCD34D',
          500: '#FFB703',
          600: '#F4A261',
          700: '#E0A96D',
          800: '#D4AF37',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        serif: ['Cinzel', 'Playfair Display', 'serif'],
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(var(--tw-gradient-stops))',
        'conic-gradient': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
        'gold-gradient': 'linear-gradient(135deg, #FFB703 0%, #F4A261 50%, #D4AF37 100%)',
        'cyan-gradient': 'linear-gradient(135deg, #00F0FF 0%, #00C2CB 50%, #38EF7D 100%)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
        'spin-slow': 'spin 30s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        }
      }
    },
  },
  plugins: [],
}

