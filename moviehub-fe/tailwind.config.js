/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'customDarkColor': "#100f12",
        'customOrangeColor': "#f55b03",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [],
  },
}
