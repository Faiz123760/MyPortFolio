/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#050505",
        secondary: "#0B0618",
        purpleNeon: "#915EFF",
        purpleDark: "#6D28D9",
        blueNeon: "#00E5FF",
        accent: "#A855F7",
        textLight: "#FFFFFF",
        textMuted: "#9CA3AF"
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"]
      }
    },
  },
  plugins: [],
}