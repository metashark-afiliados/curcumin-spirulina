// src/lib/validators/i18n/SelectLanguage.schema.ts
/**
 * @file src/lib/validators/i18n/SelectLanguage.schema.ts
 * @description Aparato de Contrato de Datos y Única Fuente de Verdad (SSoT)
 *              para el contenido de la página de selección de idioma.
 *              Define la estructura canónica que el componente `SelectLanguagePage`
 *              espera de su archivo de mensajes de internacionalización (`.json`),
 *              garantizando la integridad y resiliencia del contenido. Esta versión
 *              corrige un error de validación de Zod, aplicando la validación
 *              de "al menos un idioma" correctamente a un `ZodRecord`.
 * @version 1.2.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/lib/validators/i18n/SelectLanguage.schema.ts.md
 * @see src/app/select-language/page.tsx (Consumidor principal para la validación)
 * @see src/messages/app/select-language.json (Fuente de datos validada)
 */
import { z } from "zod";

/**
 * @public
 * @constant SelectLanguageContentSchema
 * @description El schema Zod que valida la totalidade del contenido que el componente
 *              `SelectLanguagePage` consume de su archivo de mensajes.
 *              Asegura que todas las claves y estructuras esperadas estén presentes
 *              y tengan el tipo correcto, previniendo errores de renderizado por
 *              contenido malformado.
 */
export const SelectLanguageContentSchema = z.object({
  title: z
    .string()
    .min(
      1,
      "El título de la página de selección de idioma no puede estar vacío."
    ),
  countdownText: z
    .string()
    .min(1, "El texto del contador no puede estar vacío.")
    .describe("Debe incluir el placeholder '{seconds}' para la interpolación."),
  selectLanguageAriaLabel: z
    .string()
    .min(
      1,
      "La etiqueta ARIA para la selección de idioma no puede estar vacía."
    )
    .describe(
      "Debe incluir el placeholder '{language}' para la interpolación."
    ),
  languages: z
    .record(z.string().min(1))
    // CORRECCIÓN: z.record no tiene .min(). Se usa .refine() para verificar que el objeto no está vacío.
    .refine(
      (obj) => Object.keys(obj).length > 0,
      "Debe haber al menos un idioma definido."
    )
    .describe(
      "Un objeto que mapea las claves de locale a sus nombres traducidos (ej. `it-IT: Italiano`)."
    ),
});

/**
 * @public
 * @type SelectLanguageContent
 * @description Infiere el tipo de TypeScript a partir del `SelectLanguageContentSchema`,
 *              creando una Única Fuente de Verdad (SSoT) tipo-segura para el contenido
 *              de la página de selección de idioma.
 */
export type SelectLanguageContent = z.infer<typeof SelectLanguageContentSchema>;
// src/lib/validators/i18n/SelectLanguage.schema.ts
