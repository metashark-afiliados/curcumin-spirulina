// src/lib/types/actions.ts
/**
 * @file actions.ts
 * @description Aparato de Contratos de Datos y SSoT para la comunicación
 *              entre Server Actions y la UI. Define los tipos `ActionResult` y
 *              `ValidationErrorKey`, que son el núcleo de la arquitectura de
 *              errores soberanos (IMAS-E).
 * @version 1.0.0
 * @author RaZ Podestá - MetaShark Tech
 * @see LIA-SSoT-IMPLEMENTATION-GUIDE-V1 (Manifiesto de Implementación)
 */
import { z } from "zod";
import { ValidationErrorsSchema } from "@/lib/validators/i18n/ValidationErrors.schema";

/**
 * @public
 * @type NestedKeyOf
 * @description Tipo de utilidad avanzado que aplana un tipo de objeto anidado
 *              en una unión de strings con notación de punto.
 * @example
 * // Para: { a: { b: string } }
 * // El tipo resultante es: "a" | "a.b"
 */
type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T]-?: K extends string
        ? T[K] extends object
          ? `${K}` | `${K}.${NestedKeyOf<T[K]>}`
          : `${K}`
        : never;
    }[keyof T]
  : "";

/**
 * @public
 * @type ValidationErrorKey
 * @description Tipo soberano para todas las claves de error. Se infiere
 *              automáticamente del `ValidationErrorsSchema`, garantizando que
 *              solo se puedan usar claves de error válidas y existentes.
 *              Es la SSoT para los códigos de error.
 */
export type ValidationErrorKey = NestedKeyOf<
  z.infer<typeof ValidationErrorsSchema>
>;

/**
 * @public
 * @type ActionResult
 * @description Contrato de retorno genérico y soberano para todas las Server Actions.
 *              Asegura una interfaz de comunicación predecible entre el servidor y el cliente.
 * @template TSuccess - El tipo de los datos en caso de éxito.
 * @template TErrorData - El tipo de datos adicionales opcionales en caso de error.
 */
export type ActionResult<TSuccess, TErrorData = unknown> =
  | { success: true; data: TSuccess }
  | { success: false; error: ValidationErrorKey; data?: TErrorData };

/**
 * @public
 * @function isActionError
 * @description Guardián de tipo que verifica si un `ActionResult` es un resultado de error.
 * @param {unknown} result - El resultado de la acción a verificar.
 * @returns {result is { success: false; error: ValidationErrorKey; data?: unknown }}
 */
export function isActionError(
  result: unknown
): result is { success: false; error: ValidationErrorKey; data?: unknown } {
  return (
    typeof result === "object" &&
    result !== null &&
    "success" in result &&
    result.success === false &&
    "error" in result &&
    typeof result.error === "string"
  );
}

/**
 * @public
 * @function isActionSuccess
 * @description Guardián de tipo que verifica si un `ActionResult` es un resultado de éxito.
 * @template TSuccess - El tipo del payload de éxito esperado.
 * @param {unknown} result - El resultado de la acción a verificar.
 * @returns {result is { success: true; data: TSuccess }}
 */
export function isActionSuccess<TSuccess>(
  result: unknown
): result is { success: true; data: TSuccess } {
  return (
    typeof result === "object" &&
    result !== null &&
    "success" in result &&
    result.success === true
  );
}
// src/lib/types/actions.ts
