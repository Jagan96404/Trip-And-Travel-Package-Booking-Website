/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#000000',
          dark: '#0f172a',
          navy: '#0a192f',
          gold: '#b48a3c',
          goldDark: '#8c6b2d',
          goldLight: '#d4af37',
          turquoise: '#008b8b',
          teal: '#0d9488',
        }
      },
      fontFamily: {
        serif: ['"Times New Roman"', 'Times', 'Baskerville', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Times New Roman"', 'Times', 'serif'],
      },
      boxShadow: {
        'luxury': '0 10px 30px -5px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
        'luxury-hover': '0 20px 40px -10px rgba(0, 0, 0, 0.14), 0 8px 16px -4px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
}
