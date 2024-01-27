/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      verySmMobile: "250px",
      smMobile: "340px",
      mobile: "640px",
      tablet: "960px",
      desktop: "1240px"
    },
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'bounce-slow': 'bounce 2s linear infinite',
      }
    }
  },
  plugins: [],
  darkMode: 'class',
})