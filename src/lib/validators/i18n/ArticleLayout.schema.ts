// src/lib/validators/i18n/ArticleLayout.schema.ts
/**
 * @file ArticleLayout.schema.ts
 * @description Aparato de Contrato de Datos y SSoT para el contenido del
 *              componente ArticleLayout. Define la estructura canónica que el
 *              componente espera de su archivo de mensajes i18n.
 * @author L.I.A. Legacy
 * @version 1.0.1
 */
import { z } from "zod";

export const ArticleLayoutContentSchema = z.object({
  backToBlogLink: z.string().min(1),
  authorLabel: z.string().min(1),
  imageAltText: z
    .string()
    .min(1)
    // CORRECCIÓN: Se utiliza la firma correcta de `.includes()`, pasando el
    // substring a buscar y el mensaje de error en el objeto de opciones.
    .includes("{title}", {
      message:
        "La plantilla para el texto alternativo de la imagen debe incluir '{title}'.",
    }),
});

export type ArticleLayoutContent = z.infer<typeof ArticleLayoutContentSchema>;
// src/lib/validators/i18n/ArticleLayout.schema.ts
