/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FFF8EC',
        'cream-dark': '#F5EDD6',
        'green-dark': '#2D5A27',
        'green-mid': '#4A7C42',
        'green-light': '#E8F5E0',
        'green-avail': '#2E8B2E',
        amber: '#E89320',
        'amber-light': '#FFF3E0',
        stale: '#9E9E9E',
        'stale-light': '#F0F0F0',
        brown: '#5C3D2E',
        'brown-light': '#8B6F5E',
        earth: '#8B6914',
      },
    },
  },
  plugins: [],
}
