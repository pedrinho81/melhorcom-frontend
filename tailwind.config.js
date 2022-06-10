/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'nunito': ['Nunito']
    },
    screens: {
      'laptop': '1024px'
    }
  },
  plugins: [],
}