/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#EB6162", // Replace with your primary color
      },
      backgroundImage: {
        "custom-bg": "url('/ChatBotBG.png')",
      },
    },
  },
  plugins: [],
};
