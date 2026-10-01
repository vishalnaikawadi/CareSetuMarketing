/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0B2034',
        navy: '#123451',
        teal: {
          50: '#EDFBFA',
          100: '#D3F5F1',
          200: '#A9EAE4',
          500: '#0F9F92',
          600: '#087F76',
          700: '#08665F',
        },
        mist: '#F4F8FA',
        line: '#DCE7EC',
        coral: '#E05C55',
      },
      boxShadow: {
        soft: '0 20px 60px rgba(11, 32, 52, 0.09)',
        card: '0 8px 30px rgba(11, 32, 52, 0.06)',
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
