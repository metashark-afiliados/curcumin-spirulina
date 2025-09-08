// src/lib/validators/i18n/SelectLanguage.schema.ts
/**
 * @file src/lib/validators/i18n/SelectLanguage.schema.ts
 * @description Aparato de Contrato de Datos de élite. Refactorizado para ser
 *              dinámicamente consciente de los locales activos, garantizando
 *              que el contrato de contenido esté siempre sincronizado con la
 *              configuración de navegación.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 2.0.0
 * @see .docs-espejo/lib/validators/i18n/SelectLanguage.schema.ts.md
 */
import { z } from "zod";
import { locales } from "@/lib/navigation";

/**
 * @private
 * @constant languageSchema
 * @description Construye dinámicamente un objeto de schema Zod que requiere
 *              una clave para cada `locale` activo definido en `navigation.ts`.
 *              Esta es la SSoT de élite para el contrato de `languages`.
 */
const languageSchema = z.object(
  Object.fromEntries(
    locales.map((locale) => [
      locale,
      z
        .string()
        .min(1, `El nombre para el locale '${locale}' no puede estar vacío.`),
    ])
  )
);

export const SelectLanguageContentSchema = z.object({
  title: z.string().min(1, "El título de la página no puede estar vacío."),
  countdownText: z
    .string()
    .min(1, "El texto del contador no puede estar vacío.")
    .refine(
      (text) => text.includes("{seconds}"),
      "El texto del contador debe incluir el placeholder '{seconds}'."
    ),
  selectLanguageAriaLabel: z
    .string()
    .min(
      1,
      "La etiqueta ARIA para la selección de idioma no puede estar vacía."
    )
    .refine(
      (text) => text.includes("{language}"),
      "La etiqueta ARIA debe incluir el placeholder '{language}'."
    ),
  languages: languageSchema,
});

export type SelectLanguageContent = z.infer<typeof SelectLanguageContentSchema>;
// src/lib/validators/i18n/SelectLanguage.schema.ts
