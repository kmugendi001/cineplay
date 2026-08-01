/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 20px 120px -80px rgba(255,255,255,0.35)',
      },
      colors: {
        brand: {
          50: '#ffecea',
          100: '#ffd5d4',
          200: '#ffb0a6',
          300: '#ff8b7a',
          400: '#ff5b6b',
          500: '#e50914',
          600: '#c40311',
          700: '#94020f',
          800: '#6f0210',
          900: '#4f010e',
        },
        surface: '#1a1a1a',
        border: '#2a2a2a',
        muted: '#808080',
        accent: '#ff3333',
        success: '#16c784',
        warning: '#f4b400',
        danger: '#ff4d4d',
        info: '#3b82f6',
      },
    },
  },
  plugins: [],
}

