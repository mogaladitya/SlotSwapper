/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0EA5E9",
        secondary: "#3B82F6",
      },
      borderRadius: {
        button: "8px",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        pacifico: ["Pacifico", "cursive"],
      },
    },
  },
  plugins: [],
};
