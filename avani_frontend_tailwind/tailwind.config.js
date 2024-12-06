module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#dfcc7f",
        primaryDark: "#c2ae5e",
      },
    },
  },
  plugins: [require("flowbite/plugin"), require("@tailwindcss/aspect-ratio")],
};
