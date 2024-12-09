/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./JS/main.js", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
        serif: ["Alegreya SC", "serif"],
        mono: ["Martian Mono", "monospace"],
      },
    },
  },
  plugins: [require("daisyui")],
};
