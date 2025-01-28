/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        Popins: ["'Poppins'", "sans-serif"],
      },
      colors: {
        primary: "#319AF6",
        headerBg: "#f7f7fe",
        sideNavBg: "#2A2D3E",
        tableBg: "white",
        tableHeaderBg: "#f1f5f9",
        cardBg: "#FAFAFA",

        // E-commerce colors
        ePrimary: "#4f46e5",
      },
      container: {
        center: true,
        padding: "1rem",
      },
      screens: {
        xxs: "375px",
        xs: "425px",
        sm: "576px",

        md: "769px",

        lg: "992px",

        xl: "1200px",

        "2xl": "1400px",
        "3xl": "1900px",
      },
      fontSize: {
        xxs: ".35rem",
      },
    },
  },
  plugins: [],
};
