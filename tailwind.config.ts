// tailwind.config.ts
import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

/**
 * @file tailwind.config.ts
 * @description Manifiesto de Branding y configuración de élite para el sistema de diseño
 *              Tailwind CSS. Define la estructura de los tokens de diseño consumiendo
 *              sus valores desde variables CSS, estableciendo `globals.css` como la SSoT
 *              para los valores del tema.
 * @version 4.0.0
 * @author L.I.A. Legacy
 * @see src/app/globals.css (SSoT de los valores de los tokens)
 */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.mdx",
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
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
      colors: {
        brand: {
          primary: "hsl(var(--brand-primary))",
          "primary-dark": "hsl(var(--brand-primary-dark))",
          accent: "hsl(var(--brand-accent))",
          "accent-hover": "hsl(var(--brand-accent-hover))",
          background: "hsl(var(--brand-background))",
          border: "hsl(var(--brand-border))",
        },
        feedback: {
          error: "hsl(var(--feedback-error))",
        },
        on_brand: "hsl(var(--on-brand))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
      },
      keyframes: {
        "infinite-scroll": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        "infinite-scroll": "infinite-scroll 25s linear infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("tailwindcss-debug-screens"),
    plugin(function ({ addUtilities, theme }) {
      addUtilities({
        ".text-shadow-md": {
          textShadow: `0 2px 4px ${theme("colors.black / 0.5")}`,
        },
      });
    }),
  ],
} satisfies Config;

export default config;
// tailwind.config.ts
