import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 2.1.0
 * @description Manifiesto de Branding y configuración del sistema de diseño para Tailwind CSS.
 *              Define la paleta de colores, tipografía y otras variables de diseño
 *              globales del proyecto, asegurando una consistencia visual de élite.
 */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
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
      colors: {
        brand: {
          primary: {
            DEFAULT: "#F97316", // Naranja vibrante principal
            dark: "#EA580C", // Naranja más oscuro para gradientes
          },
          accent: {
            DEFAULT: "#DC2626", // Rojo de alta conversión para CTAs
            hover: "#B91C1C", // Rojo más oscuro para hover
          },
          background: {
            dark: "#14532D", // Verde oscuro para el contenedor del formulario
          },
          border: "#FBBF24", // Amarillo/Dorado para bordes y acentos
        },
        feedback: {
          error: "#DC2626", // Rojo para errores de validación
        },
        on_brand: "#FFFFFF", // Color de texto para usar sobre colores de marca
      },
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
      },
      animation: {
        "infinite-scroll": "infinite-scroll 25s linear infinite",
      },
      keyframes: {
        "infinite-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
