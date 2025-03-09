import { THEME_COLOR } from "./src/config/theme";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    './node_modules/antd/dist/reset.css',
  ],
  theme: {
    extend: {
      screen: {
        'xs': '512px'
      },
      colors: {
        primary: THEME_COLOR.primary,
        secondary: THEME_COLOR.secondary,
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
        montserrat: "var(--montserrat)",
        sofia: "var(--sofia)",
      }
    },
  },
  plugins: [],
} satisfies Config;
