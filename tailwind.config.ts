import { THEME_COLOR } from "./src/config/theme";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screen: {
        'xs': '512px'
      },
      colors: {
        primary: THEME_COLOR.primary,
        secondary: THEME_COLOR.secondary,
        accent: THEME_COLOR.accentColor,
        "light-primary": THEME_COLOR["light-primary"],
        "light-secondary": THEME_COLOR["light-secondary"],
        background: THEME_COLOR.background,
        tertiary: THEME_COLOR.tertiary, 
        "light-background": THEME_COLOR["light-background"], 
        "light-grey": THEME_COLOR["light-grey"], 
        border: THEME_COLOR.border, 
        text: THEME_COLOR.text, 
      },
      fontFamily: {
        play: "var(--play)",
        capriola: "var(--capriola)",
      }
    },
  },
  plugins: [],
} satisfies Config;
