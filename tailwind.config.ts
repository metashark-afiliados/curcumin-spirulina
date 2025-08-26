import type { Config } from "tailwindcss";

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 2.0.0
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
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;

/**
 * MEJORA CONTINUA
 *
 * @version 2.0.0
 * ---
 * @section Melhorias Futuras
 *
 * ((Vigente)) @priority High - TIPOGRAFÍA PERSONALIZADA: Integrar la fuente `Inter` de Google Fonts a través de `next/font` y registrarla aquí en `theme.extend.fontFamily` para que pueda ser utilizada con clases como `font-sans`.
 * ((Vigente)) @priority Medium - ANIMACIONES Y TRANSICIONES: Definir un conjunto de animaciones de entrada (`fade-in`, `slide-up`) para ser reutilizadas en los componentes, mejorando la experiencia del usuario.
 *
 * ---
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 2.0.0 - MANIFIESTO DE BRANDING SEMÁNTICO: Se ha establecido una paleta de colores semántica (`brand-primary`, `brand-accent`, etc.) extraída directamente del diseño de referencia. Esto desacopla los componentes de los colores específicos, permitiendo cambios de branding globales desde un único SSoT.
 * ((Implementada)) @version 2.0.0 - CONFIGURACIÓN DE CONTENEDOR CENTRALIZADO: Se ha preconfigurado la clase `.container` para centrar el contenido automáticamente, una práctica de élite para mantener layouts consistentes.
 */
