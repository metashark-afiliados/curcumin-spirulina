// src/tailwind.config.ts
/**
 * @file tailwind.config.ts
 * @description Manifiesto de Configuración y SSoT para Tailwind CSS.
 *              Este aparato define cómo se extiende el tema base de Tailwind
 *              para consumir los tokens de diseño (colores, geometría) definidos
 *              en `globals.css`, creando un sistema de diseño cohesivo y semántico.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 * @see .docs/BRANDING_SSOT.md (SSoT de la estrategia de branding)
 * @see src/app/globals.css (SSoT de los valores de los tokens)
 * @see .docs-espejo/tailwind.config.ts.md
 */
import { type Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import tailwindcssTypography from "@tailwindcss/typography";
import tailwindcssDebugScreens from "tailwindcss-debug-screens";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: ["class"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
      colors: {
        // --- Tokens Semánticos del Sistema de Diseño ---
        "brand-background": "hsl(var(--background))",
        "brand-border": "hsl(var(--brand-border))",

        // Paleta Primaria (Vitalidad)
        "brand-primary-orange": "hsl(var(--brand-primary-orange))",
        "brand-primary-orange-hover": "hsl(var(--brand-primary-orange-hover))",

        // Paleta Base (Confianza)
        "brand-base-green": "hsl(var(--brand-base-green))",
        "brand-base-green-dark": "hsl(var(--brand-base-green-dark))",

        // Paleta de Acentos
        "brand-accent-leaf-green": "hsl(var(--brand-accent-leaf-green))",

        // Paleta de Acción
        "brand-cta-red": "hsl(var(--brand-cta-red))",

        // Paleta de Feedback
        "feedback-error": "hsl(var(--feedback-error))",

        // Paleta de Texto
        foreground: "hsl(var(--foreground))",
        "foreground-muted": "hsl(var(--foreground-muted))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "infinite-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "infinite-scroll": "infinite-scroll 25s linear infinite",
      },
      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color)",
        DEFAULT: "0 2px 4px var(--tw-shadow-color)",
        lg: "0 8px 16px var(--tw-shadow-color)",
      },
    },
  },
  plugins: [tailwindcssAnimate, tailwindcssTypography, tailwindcssDebugScreens],
};

export default config;
// src/tailwind.config.ts
