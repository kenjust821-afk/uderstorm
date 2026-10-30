import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: "#f7dfe5",
        cream: "#f8f4ef",
        nude: "#e7d5c5",
        rose: "#d8a6b0",
        mocha: "#2f241d",
        muted: "#6c5a52",
      },
      boxShadow: {
        soft: "0 15px 35px rgba(56, 35, 31, 0.08)",
      },
      fontFamily: {
        display: ["Georgia", "Times New Roman", "serif"],
      },
      backgroundImage: {
        grain: "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.7), transparent 35%), radial-gradient(circle at 80% 0%, rgba(223,180,176,0.2), transparent 30%)",
      },
    },
  },
  plugins: [],
};

export default config;
