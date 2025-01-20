/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: ["./*.html", "./*.js"],
  theme: {
    extend: {
      colors: {
        'temarengi' : '#D95B00',
        'temarengi2' : '#f36906',
      }
    }
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["light", "dark"]
  }
};