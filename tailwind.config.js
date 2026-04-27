module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        plum: {
          deepest: '#0D0618', dark: '#140D24', mid: '#1E1035',
          base: '#2D1B5E', light: '#6B46C1',
        },
        violet: { DEFAULT: '#7C3AED', light: '#A78BFA', pale: '#C4B5FD' },
        rose: { magic: '#F472B6', light: '#FBCFE8', gold: '#E8A598' },
        cream: { DEFAULT: '#FDF8FF', dark: '#F3EEF8' },
        gold: { magic: '#F0C080', light: '#FDE68A' },
      },
    },
  },
  plugins: [],
}
