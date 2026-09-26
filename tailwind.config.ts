import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#090A0F",
        surface: "#12151F",
        border: "#1E2333",
        accent: {
          purple: "#9146FF",
          cyan: "#00F0FF",
          lime: "#22C55E",
        },
      },
    },
  },
} satisfies Config;
