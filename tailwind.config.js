/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Crimson Text', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      colors: {
        'military-green': {
          50: '#f0f9f4',
          100: '#dcf2e3',
          200: '#bce5cb',
          300: '#8dd1a8',
          400: '#57b87f',
          500: '#339b5e',
          600: '#26804b',
          700: '#20653e',
          800: '#1d5135',
          900: '#1a3d2e',
        },
        'gold': {
          50: '#fefdf8',
          100: '#fdf9e7',
          200: '#faf0c2',
          300: '#f6e292',
          400: '#f0ce5f',
          500: '#eab536',
          600: '#d4af37',
          700: '#b8941f',
          800: '#96771e',
          900: '#7a611e',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
};