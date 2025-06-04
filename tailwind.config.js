/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography";
import flowbite from "flowbite/plugin";

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [typography, flowbite],
  darkMode: "class",
};
