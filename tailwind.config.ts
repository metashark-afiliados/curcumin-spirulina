// tailwind.config.ts
import type { Config } from "tailwindcss";

/**
 * @type {import('tailwindcss').Config}
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 1.0.0
 * @description Tailwind CSS configuration file for the Curcumin Spirulina project.
 *              Defines the core visual identity (colors, spacing, fonts) to ensure
 *              a consistent and scalable UI, following an atomic design philosophy.
 *              This configuration is tailored for Tailwind CSS v3.
 * @see https://tailwindcss.com/docs/configuration
 */
const config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        brand: {
          primary: "#FF6B00", // Main CTA Orange
          secondary: "#2A4B3A", // Dark Green from the form
          accent: "#F5C945", // Yellow from the bottle
        },
        text: {
          primary: "#1F2937", // Almost black for body text
          secondary: "#6B7280", // Gray for subtitles
          on_brand: "#FFFFFF", // White text on colored backgrounds
        },
        background: {
          light: "#FFFFFF", // Main background white
          medium: "#F9FAFB", // Light gray for section backgrounds
        },
        feedback: {
          error: "#EF4444", // Red for error states
        },
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;

/**
 * MEJORA CONTINUA
 *
 * @version 1.0.0
 *
 * ---
 *
 * @section Melhorias Futuras
 *
 * ((Vigente)) @priority Low - FONT INTEGRATION: Investigar e integrar a fonte exata utilizada no design original para máxima fidelidade visual. Atualmente, será utilizada a stack de fontes sans-serif padrão.
 * ((Vigente)) @priority Medium - ADVANCED ANIMATIONS: Desenvolver um conjunto de animações atômicas (fadeIn, slideUp) para serem aplicadas de forma consistente nos componentes, melhorando a UX.
 *
 * ---
 *
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 1.0.0 - REFACTOR A V3: O arquivo foi completamente refatorizado para ser compatível com Tailwind CSS v3, removendo a sintaxe experimental da v4.
 * ((Implementada)) @version 1.0.0 - TAILWIND-ANIMATE: Integração do plugin `tailwindcss-animate` para animações de UI de alta qualidade, alinhado com as dependências de elite instaladas.
 * ((Implementada)) @version 1.0.0 - PALETA SEMÂNTICA: Criação de uma paleta de cores baseada na identidade visual do design, utilizando nomes semânticos (brand.primary, text.secondary) para desacoplar a implementação da intenção de design.
 *
 */
