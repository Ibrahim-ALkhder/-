import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        cairo: ['Cairo', 'Tajawal', 'sans-serif'],
        jakarta: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      colors: {
        navy: {
          50: '#E8EDF5', 100: '#C2D0E8', 200: '#9CB3DB',
          300: '#6F8FC6', 400: '#3D6AAD', 500: '#0A2F6E',
          600: '#08265A', 700: '#071F4A', 800: '#051738', 900: '#030F25',
        },
        teal: {
          50: '#E6FCFD', 100: '#C0F7F9', 200: '#94F0F5',
          300: '#5CE6EF', 400: '#26DAE3', 500: '#00C4CC',
          600: '#00A8AF', 700: '#008A90', 800: '#006B70', 900: '#004D50',
        },
        gold: {
          50: '#FBF5E7', 100: '#F5E6C4', 200: '#EED49E',
          300: '#E5BF71', 400: '#D9A94A', 500: '#C9A84C',
          600: '#B8943A', 700: '#A07E2E', 800: '#856722', 900: '#6A5119',
        },
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      transitionTimingFunction: {
        'premium': 'cubic-bezier(0.32, 0.72, 0, 1)',
      },
    },
  },
  plugins: [require('tailwindcss-rtl')],
} satisfies Config
