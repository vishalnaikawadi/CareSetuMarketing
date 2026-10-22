/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F2F4EE',
        ink: '#1E2B25',
        forest: '#2F4A3E',
        sage: {
          50: '#EEF2EB',
          100: '#E3EADF',
          200: '#C9D6C5',
          300: '#A9BDA9',
          400: '#8BA592',
          600: '#4F6F5D',
          700: '#3E5A4B',
        },
        clay: {
          50: '#FBEEE8',
          100: '#F3DDD2',
          500: '#B5563A',
          600: '#9A4630',
          700: '#7E3926',
        },
        turmeric: { 100: '#F6E7C4', 500: '#D9A23B', 700: '#8A5F12' },
        line: '#D8DFD3',
        muted: '#5B6B62',
      },
      boxShadow: {
        lift: '0 1px 0 rgba(30, 43, 37, 0.04), 0 28px 56px -28px rgba(47, 74, 62, 0.45)',
        tag: '0 1px 2px rgba(30, 43, 37, 0.08)',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"Atkinson Hyperlegible Next"', '"Atkinson Hyperlegible"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1200px',
      },
    },
  },
  plugins: [],
}
