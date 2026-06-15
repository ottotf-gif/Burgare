/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Träkol / mörk bas
        coal: {
          950: '#0a0a0a',
          900: '#121110',
          850: '#181614',
          800: '#1f1c19',
          700: '#2a2622',
          600: '#3a342e',
          500: '#4d453d',
        },
        // Loggans gröna – husfärgen
        leaf: {
          300: '#7fd17f',
          400: '#5cb85c',
          500: '#3f9d3f',
          600: '#2f7d30',
          700: '#245f24',
        },
        // Varm, aptitlig accent (grillröd)
        flame: {
          400: '#f2603c',
          500: '#e34a26',
          600: '#c23a1c',
        },
        // Senap / smör – för pris & detaljer
        butter: {
          300: '#f7d774',
          400: '#f0c34a',
          500: '#e0ad2e',
        },
        cream: '#f4ede2',
      },
      fontFamily: {
        display: ['Archivo', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        chalk: ['Caveat', 'cursive'],
      },
      fontWeight: {
        400: '400',
        500: '500',
        600: '600',
        700: '700',
        800: '800',
        900: '900',
      },
      letterSpacing: {
        mega: '0.18em',
      },
      boxShadow: {
        plate: '0 30px 60px -20px rgba(0,0,0,0.8)',
      },
    },
  },
  plugins: [],
};