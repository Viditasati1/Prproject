/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: '#06291D   ',
        secondary: "#145C43 ",
        tertiary: "#A2C1A9 ",
        "black-100": "#0F2E23",
        "black-200": "#143E37 ",
        "white-100": "#f3f3f3",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg2.png')",
      },
    },
  },
  plugins: [],
};
