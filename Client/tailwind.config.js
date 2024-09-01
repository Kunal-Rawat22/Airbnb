/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        pulseReduced: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.85 },
        },
      },
      animation: {
        pulseReduced: "pulseReduced 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      colors: {
        primary: "#EB6162", // Replace with your primary color
      },
      backgroundImage: {
        "custom-bg": "url('/ChatBotBG2.png')",
      },
    },
  },
  plugins: [],
};
