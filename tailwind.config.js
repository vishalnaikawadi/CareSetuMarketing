/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#102B3D',
        navy: '#0C2235',
        teal: {
          50: '#EFF9F7',
          100: '#DCF3F0',
          200: '#BCE8E3',
          300: '#8ED9D2',
          500: '#1EAAA1',
          600: '#128E88',
          700: '#0B7F79',
          800: '#0C6864',
        },
        mist: '#F3F7F7',
        line: '#DCE7E6',
      },
      boxShadow: {
        soft: '0 24px 60px rgba(12, 34, 53, 0.09)',
        card: '0 2px 8px rgba(12, 34, 53, 0.04)',
      },
      fontFamily: {
        sans: ['Figtree', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1180px',
      },
    },
  },
  plugins: [],
}
