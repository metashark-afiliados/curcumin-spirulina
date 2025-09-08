// src/hooks/useOrderForm.ts
/**
 * @file useOrderForm.ts
 * @description Hook soberano que encapsula toda la lógica de estado y de
 *              negocio para el OrderForm. Corregido para devolver un manejador
 *              `onSubmit` listo para usar, en lugar de la función `handleSubmit`
 *              de alto orden.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.1.0
 * @see .docs-espejo/hooks/useOrderForm.ts.md
 */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm, type SubmitHandler, type FieldErrors } from "react-hook-form";

import { useTelemetry } from "@/hooks/useTelemetry";
import { clientLogger } from "@/lib/client-logger";
import {
  getOrderFormSchema,
  type OrderFormData,
} from "@/lib/validators/OrderForm.schema";
import { type OrderFormContent } from "@/lib/validators/i18n/OrderFormContent.schema";

interface UseOrderFormProps {
  content: OrderFormContent;
}

export function useOrderForm({ content }: UseOrderFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { trackEvent } = useTelemetry();

  const formSchema = useMemo(
    () => getOrderFormSchema(content.validation),
    [content.validation]
  );

  const form = useForm<OrderFormData>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
  });

  const onValidSubmit: SubmitHandler<OrderFormData> = (data, event) => {
    clientLogger.info(
      "[useOrderForm]",
      "Validación de cliente exitosa. Sometiendo formulario.",
      { data }
    );
    trackEvent("FORM_SUBMIT_SUCCESS", { formId: "order_form_main" });
    setIsSubmitting(true);
    event?.target.submit();
  };

  const onInvalidSubmit = (errors: FieldErrors<OrderFormData>) => {
    clientLogger.warn(
      "[useOrderForm]",
      "Intento de envío falló la validación.",
      { errors }
    );
    trackEvent("FORM_SUBMIT_INVALID", {
      formId: "order_form_main",
      errors: Object.keys(errors),
    });
  };

  // CORRECCIÓN: Se crea el manejador `onSubmit` aquí, que es la responsabilidad
  // del hook de lógica.
  const onSubmitHandler = form.handleSubmit(onValidSubmit, onInvalidSubmit);

  return {
    ...form,
    onSubmitHandler, // Se devuelve el manejador listo.
    isSubmitting,
  };
}
// src/hooks/useOrderForm.ts
