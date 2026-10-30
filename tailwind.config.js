/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FBF8F4',
        cream: '#F5EFE7',
        oatmeal: '#E8DECF',
        sand: '#DCCDBB',
        nude: '#D9BDAE',
        rose: '#C89B93',
        mocha: '#7A6354',
        taupe: '#A79384',
        ink: '#1F1C1A',
        graphite: '#2C2825',
        smoke: '#6E6359',
        clay: '#B9A99B',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['Jost', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        wordmark: '0.34em',
        wide2: '0.18em',
        wide3: '0.24em',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      transitionTimingFunction: {
        silk: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        riseIn: {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        sheetUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        kenburns: {
          '0%': { transform: 'scale(1.02)' },
          '100%': { transform: 'scale(1.1)' },
        },
      },
      animation: {
        riseIn: 'riseIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
        fadeIn: 'fadeIn 0.6s ease both',
        sheetUp: 'sheetUp 0.42s cubic-bezier(0.22, 1, 0.36, 1) both',
        kenburns: 'kenburns 18s ease-out both',
      },
    },
  },
  plugins: [],
};
