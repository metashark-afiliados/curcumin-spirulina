// src/lib/validators/i18n/errors/GenericErrors.schema.ts
/**
 * @file GenericErrors.schema.ts
 * @description Aparato de validación atómico y SSoT. Define el contrato de
 *              datos para los mensajes de error genéricos y transversales de la
 *              aplicación, como los errores de servidor o de permisos.
 * @version 1.0.0
 * @author RaZ Podestá - MetaShark Tech
 * @see LIA-SSoT-IMPLEMENTATION-GUIDE-V1 (Manifiesto de Implementación)
 * @see src/lib/validators/i18n/ValidationErrors.schema.ts (Consumidor)
 */
import { z } from "zod";

export const GenericErrorsSchema = z.object({
  /**
   * @property error_server_generic
   * @description Mensaje de error para fallos inesperados en el servidor.
   *              Es el fallback principal en los bloques catch de las Server Actions.
   */
  error_server_generic: z.string(),
  /**
   * @property error_unauthenticated
   * @description Mensaje de error para acciones que requieren autenticación y el
   *              usuario no tiene una sesión activa.
   */
  error_unauthenticated: z.string(),
  /**
   * @property error_permission_denied
   * @description Mensaje de error genérico cuando un usuario autenticado no tiene
   *              los permisos necesarios para realizar una acción.
   */
  error_permission_denied: z.string(),
  /**
   * @property error_invalid_data
   * @description Mensaje de error cuando los datos de entrada de una acción fallan
   *              la validación de Zod en el servidor.
   */
  error_invalid_data: z.string(),
});
// src/lib/validators/i18n/errors/GenericErrors.schema.ts
