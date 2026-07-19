/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0E0B1F",
        "bg-soft": "#161231",
        card: "#181433",
        border: "rgba(245,243,255,0.08)",
        ink: "#F5F3FF",
        "ink-dim": "#B8B2D9",
        pink: "#FF3D81",
        yellow: "#FFC93C",
        mint: "#3DDC97",
        blue: "#5B8DEF",
      },
      fontFamily: {
        display: ["var(--font-space)", "sans-serif"],
        sans: ["var(--font-sora)", "sans-serif"],
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(40px,-30px) scale(1.1)" },
          "66%": { transform: "translate(-30px,20px) scale(0.95)" },
        },
      },
      animation: {
        drift: "drift 22s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
