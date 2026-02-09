/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkBg: "#050505", // Deep black
        neonBlue: "#00f3ff",
        neonOrange: "#ff6b00",
        neonPurple: "#9d00ff",
      },
      boxShadow: {
        'neon-blue': '0 0 10px #00f3ff, 0 0 20px #00f3ff',
        'neon-orange': '0 0 10px #ff6b00, 0 0 20px #ff6b00',
      }
    },
  },
  plugins: [],
}