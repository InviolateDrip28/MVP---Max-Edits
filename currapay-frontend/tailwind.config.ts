import type { Config } from "tailwindcss";
const flowbite = require("flowbite-react/tailwind");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      screens: {
        mobile: {
          raw: "not all and (orientation: landscape) and (min-width: 768px)",
        },
        "xs": "480px",
        "3xl": "1680px",
      },
      colors: {
        background: "#F5F7FA",
        primary: "#000000",
        secondary: "#545556",
        accent: "#9A67FF",
        accentSecondary: "#21E2E2",
        accentLight: "#C2A4FF",
        accentDark: "#5C0AFF",
      },
      dropShadow: {
        glow: [
          "0 0px 8px rgba(255,255, 255, 0.3)",
          "0 0px 8px rgba(255, 255,255, 0.3)",
        ],
        glowLight: ["0 0px 8px rgba(255,255, 255, 0.3)"],
        "3xl": "0 35px 35px rgba(0, 0, 0, 0.25)",
        "4xl": [
          "0 35px 35px rgba(0, 0, 0, 0.25)",
          "0 45px 65px rgba(0, 0, 0, 0.15)",
        ],
        nav: [
          "0 0px 70px rgba(0, 0, 0, 0.50)",
          "0 50px 70px rgba(0, 0, 0, 0.30)",
        ],
      },
      fontFamily: {
        urbanist: ["var(--font-urbanist)"],
      },
      animation: {
        "fade-in": "fadeIn 0.15s ease-in-out",
        marquee: "marquee var(--duration, 40s) linear infinite",
        gradient: "gradient 14s linear infinite",
      },
      keyframes: {
        marquee: {
          to: { transform: "translateX(-50%)" },
        },
        gradient: {
          to: { "background-position": "200% center" },
        },
      },
    },
  },
  plugins: [
    require("flowbite/plugin")({
      charts: true,
    }),
  ],
};
export default config;
