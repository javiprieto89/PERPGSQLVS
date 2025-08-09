// tailwind.config.js
import type { Config } from "tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter"],
      },
    },
  },
} satisfies Config;
