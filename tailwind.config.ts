import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#111315",
        graphite: "#1c2024",
        acid: "#7ed321",
        volt: "#b4ff39",
        mist: "#f4f6f8",
        smoke: "#d8dde3",
      },
      boxShadow: {
        glow: "0 0 42px rgba(126, 211, 33, 0.24)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
