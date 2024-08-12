import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        mobile: {
          raw: "not all and (orientation: landscape) and (min-width: 768px)",
        },
      },
      colors: {
        background: "white",
        primary: "#0D0F28",
        secondary: "#54565A",
        muted: "#EEE5FF",
        accent: "#5E18EB",
      },
      dropShadow: {
        glow: [
          "0 0px 8px rgba(255,255, 255, 0.3)",
          "0 0px 8px rgba(255, 255,255, 0.3)",
        ],
        glowLight: [
          "0 0px 8px rgba(255,255, 255, 0.3)",
        ]
      },
      fontFamily: {
        poppins: ["Poppins", "serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.15s ease-in-out"
      },
    },
  },
  plugins: [],
};
export default config;
