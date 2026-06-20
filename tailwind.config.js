/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#08227f', // couleur logo
        'benin-ochre': '#D9822B', // warm ochre (traditional)
        'benin-terra': '#A33E2B',  // terracotta
        'benin-green': '#2E7A4B',  // deep green
        'france-steel': '#3A506B', // modern steel blue
        'bridge-gradient-start': '#D9822B',
        'bridge-gradient-end': '#08227f',
      },
    },
  },
  plugins: [],
};
