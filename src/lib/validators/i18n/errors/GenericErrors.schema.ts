// src/lib/validators/i18n/errors/GenericErrors.schema.ts
/**
 * @file GenericErrors.schema.ts
 * @description Aparato de validación atómico y SSoT. Define el contrato de
 *              datos para los mensajes de error genéricos y transversales de la
 *              aplicación, como los errores de servidor o de permisos.
 *              Establece el vocabulario de errores canónico.
 * @version 1.1.0
 * @author RaZ Podestá - MetaShark Tech
 * @see .docs/manifiesto-estructura-basica.md
 * @see src/lib/validators/i18n/ValidationErrors.schema.ts (Consumidor)
 */
import { z } from "zod";

export const GenericErrorsSchema = z.object({
  error_server_generic: z
    .string()
    .describe(
      "Mensaje de error para fallos inesperados en el servidor. Es el fallback principal en los bloques catch de las Server Actions."
    ),

  error_unauthenticated: z
    .string()
    .describe(
      "Mensaje de error para acciones que requieren autenticación y el usuario no tiene una sesión activa."
    ),

  error_permission_denied: z
    .string()
    .describe(
      "Mensaje de error genérico cuando un usuario autenticado no tiene los permisos necesarios para realizar una acción."
    ),

  error_invalid_data: z
    .string()
    .describe(
      "Mensaje de error cuando los datos de entrada de una acción fallan la validación de Zod en el servidor."
    ),
});
// src/lib/validators/i18n/errors/GenericErrors.schema.ts
