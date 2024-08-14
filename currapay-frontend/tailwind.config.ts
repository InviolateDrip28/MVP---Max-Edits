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
        background: "#FFFFFF",
        backgroundSecondary: "#D5D6D7",
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
        raleway: ['var(--font-raleway)'],
        dmSans: ['var(--font-dmSans)'],
        poppins: ['var(--font-poppins)'],
      },
      animation: {
        "fade-in": "fadeIn 0.15s ease-in-out", 
        "marquee": "marquee var(--duration, 30s) linear infinite",
      },
      keyframes: {
        marquee: {
          to: { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [flowbite.plugin()],
};
export default config;
