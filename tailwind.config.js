/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",  // এটা লাগবে ডার্ক মোডের জন্য
  theme: {
    extend: {},
  },
  plugins: [],
}