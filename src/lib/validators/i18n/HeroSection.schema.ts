// src/lib/validators/i18n/HeroSection.schema.ts
/**
 * @file HeroSection.schema.ts
 * @description Aparato de Contrato de Datos y SSoT para el contenido de la
 *              HeroSection. Define la estructura canónica que el componente
 *              espera de su archivo de mensajes i18n.
 * @version 1.0.0
 * @author L.I.A. Legacy
 */
import { z } from "zod";

/**
 * @public
 * @constant HeroSectionContentSchema
 * @description El schema Zod que valida el contenido de la HeroSection.
 *              Garantiza la integridad de los datos y previene errores de
 *              renderizado por contenido malformado.
 */
export const HeroSectionContentSchema = z.object({
  mainTitle: z
    .string()
    .min(1, "El título principal no puede estar vacío.")
    .describe("El titular principal (H1) de la sección."),
  subtitle: z
    .string()
    .min(1, "El subtítulo no puede estar vacío.")
    .describe("El texto de apoyo que complementa al titular."),
  image: z
    .object({
      src: z
        .string()
        .startsWith(
          "/",
          "La ruta de la imagen debe ser relativa y empezar con '/'."
        )
        .describe(
          "La ruta a la imagen del producto, desde la carpeta /public."
        ),
      alt: z
        .string()
        .min(1, "El texto alternativo de la imagen no puede estar vacío.")
        .describe(
          "El texto alternativo accesible para la imagen del producto."
        ),
    })
    .describe("Objeto que contiene la información de la imagen del producto."),
});

/**
 * @public
 * @type HeroSectionContent
 * @description Infiere el tipo de TypeScript a partir del schema.
 */
export type HeroSectionContent = z.infer<typeof HeroSectionContentSchema>;
// src/lib/validators/i18n/HeroSection.schema.ts
