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
      },
      animation: {
        "spin-with-delay": "spin-with-delay 1.5s linear infinite",
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
