/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#19459d",
        gray: {
          100: "#cdcdcd",
          500: "rgba(54, 57, 66, 1)"
        },
        white: {
          100: 'rgba(254, 255, 255, 1)'
        }
      },
      fontFamily: {
        othin: ["Outfit-Thin", "sans-serif"],
        oextralight: ["Outfit-ExtraLight", "sans-serif"],
        olight: ["Outfit-Light", "sans-serif"],
        oregular: ["Outfit-Regular", "sans-serif"],
        omedium: ["Outfit-Medium", "sans-serif"],
        osemibold: ["Outfit-SemiBold", "sans-serif"],
        obold: ["Outfit-Bold", "sans-serif"],
        oextrabold: ["Outfit-ExtraBold", "sans-serif"],
        oblack: ["Outfit-Black", "sans-serif"],
      }
    },
  },
  plugins: [],
}
