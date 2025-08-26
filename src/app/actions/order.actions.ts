"use server";

import { z } from "zod";
import { logger } from "@/lib/logging";

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 1.0.0
 * @description Módulo de Server Actions para la gestión de pedidos.
 */

// Esquema de validación del lado del servidor. Coincide con el del cliente.
const OrderFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "A valid phone number is required"),
});

export interface FormState {
  success: boolean;
  message: string;
}

/**
 * @function submitOrder
 * @description Procesa el envío del formulario de pedido. Valida los datos y
 *              simula el envío a un sistema externo.
 * @param {FormState} prevState - El estado anterior del formulario (no se usa actualmente).
 * @param {FormData} formData - Los datos del formulario.
 * @returns {Promise<FormState>} El nuevo estado del formulario con un mensaje de éxito o error.
 */
export async function submitOrder(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const rawData = Object.fromEntries(formData.entries());
  const validatedFields = OrderFormSchema.safeParse(rawData);

  if (!validatedFields.success) {
    logger.warn("[SERVER_ACTION] Falló la validación del pedido.", {
      errors: validatedFields.error.flatten().fieldErrors,
    });
    return {
      success: false,
      message: "validationError", // Clave de i18n
    };
  }

  try {
    // Aquí iría la lógica para enviar a una API, CRM o base de datos.
    // Simulamos una operación de red exitosa.
    logger.info(
      "[SERVER_ACTION] Pedido enviado con éxito.",
      validatedFields.data
    );
    return {
      success: true,
      message: "submitSuccess", // Clave de i18n
    };
  } catch (error) {
    logger.error("[SERVER_ACTION] Error crítico al procesar el pedido.", {
      error: error instanceof Error ? error.message : String(error),
    });
    return {
      success: false,
      message: "submitError", // Clave de i18n
    };
  }
}
