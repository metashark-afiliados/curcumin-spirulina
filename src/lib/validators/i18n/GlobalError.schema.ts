// src/lib/validators/i18n/GlobalError.schema.ts
/**
 * @file GlobalError.schema.ts
 * @description Aparato de Contrato de Datos y SSoT para el contenido de la
 *              página de error global. Define la estructura canónica que el
 *              componente `GlobalError` espera de su archivo de mensajes i18n.
 * @author L.I.A. Legacy
 * @version 1.0.0
 */
import { z } from "zod";

export const GlobalErrorContentSchema = z.object({
  title: z.string().min(1, "El título del error no puede estar vacío."),
  description: z
    .string()
    .min(1, "La descripción del error no puede estar vacía."),
  backToHomeButton: z
    .string()
    .min(1, "El texto del botón de volver al inicio no puede estar vacío."),
});

export type GlobalErrorContent = z.infer<typeof GlobalErrorContentSchema>;
// src/lib/validators/i18n/GlobalError.schema.ts
