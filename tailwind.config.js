/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      ueventBg: "#111010",
      ueventSecondary: "#1A1A1A",
      ueventContrast: "#078c9e",
      ueventText: "#F8F9FB",
    },
    extend: {
      blur: {
        small: '3px'
      }
    },
  },
  plugins: [require("flowbite/plugin")],
  darkMode: "media",
};
