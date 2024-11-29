import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        parchment: "#F4D3A8",
      },
      keyframes: {
        "spin-with-delay": {
          "0%": { transform: "rotate(0deg)" },
          "66.666%": { transform: "rotate(360deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "slamming-x": {
          "0%": { transform: "scale(0) rotate(0deg)", opacity: "0" },
          "50%": { transform: "scale(1.2) rotate(15deg)", opacity: "1" },
          "100%": { transform: "scale(1) rotate(0deg)", opacity: "1" },
        },
        "slide-in": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        "pulse-once": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" },
          "100%": { transform: "scale(1)" },
        },
        "spin-with-delay-2": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "spin-with-delay": "spin-with-delay 1.5s linear infinite",
        "slamming-x":
          "slamming-x 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards",
        "slide-in": "slide-in var(--cooldown-duration) linear forwards",
        "pulse-once": "pulse-once 0.5s ease-in-out",
        "spin-with-delay-2": "spin-with-delay 1s linear infinite",
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tailwindui.com",
        port: "",
        pathname: "/plus/img/logos/**",
      },
    ],
  },
  plugins: [],
} satisfies Config;
