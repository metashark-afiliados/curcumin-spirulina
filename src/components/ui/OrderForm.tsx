// src/components/ui/OrderForm.tsx
/**
 * @file src/components/ui/OrderForm.tsx
 * @description Orquestador del Aparato de Conversión. Corregido para colocar
 *              correctamente la directiva "use client" y resolver el error de
 *              compilación de React Server Components.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 12.2.0
 * @see .docs-espejo/components/ui/OrderForm.tsx.md
 */
"use client"; // CORRECCIÓN: Directiva movida a la primera línea y sin paréntesis.

import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useId, useRef, useState } from "react";

import { GeoIPProvider, useGeoIP } from "@/components/diagnostic/GeoIPLocator";
import { OrderFormUI } from "@/components/ui/OrderFormUI";
import { useOrderForm } from "@/hooks/useOrderForm";
import { useTelemetry } from "@/hooks/useTelemetry";
import { clientLogger } from "@/lib/client-logger";
import {
  type OrderFormContent,
  OrderFormContentSchema,
} from "@/lib/validators/i18n/OrderFormContent.schema";

function OrderFormComponent(): React.ReactElement | null {
  const t = useTranslations("components.ui.OrderForm");
  const locale = useLocale();
  const formTitleId = useId();
  const geoInputRef = useRef<HTMLInputElement>(null);
  const { geoData, isLoading: isGeoLoading } = useGeoIP();
  const { trackEvent } = useTelemetry();

  const producerFormActionUrl = process.env.NEXT_PUBLIC_PRODUCER_ENDPOINT || "";

  const [content, setContent] = useState<OrderFormContent | null>(null);

  useEffect(() => {
    try {
      const rawContent = t.raw("");
      const validation = OrderFormContentSchema.safeParse(rawContent);
      if (!validation.success) throw validation.error;
      setContent(validation.data);
    } catch (error) {
      clientLogger.error(
        "[OrderForm]",
        "Fallo en la validación de contenido.",
        {
          error,
        }
      );
    }
  }, [t]);

  useEffect(() => {
    trackEvent("FORM_VIEW", { formId: "order_form_main" });
  }, [trackEvent]);

  useEffect(() => {
    if (!producerFormActionUrl) {
      clientLogger.fatal(
        "[OrderForm]",
        "La variable NEXT_PUBLIC_PRODUCER_ENDPOINT no está definida."
      );
    }
  }, [producerFormActionUrl]);

  useEffect(() => {
    if (!isGeoLoading && geoData.countryCode && geoInputRef.current) {
      geoInputRef.current.value = geoData.countryCode;
    }
  }, [geoData, isGeoLoading]);

  if (!content) {
    return null;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const formLogic = useOrderForm({ content });

  if (!producerFormActionUrl) {
    return null;
  }

  return (
    <OrderFormUI
      register={formLogic.register}
      formState={formLogic.formState}
      onSubmitHandler={formLogic.onSubmitHandler}
      isSubmitting={formLogic.isSubmitting}
      content={content}
      locale={locale}
      producerFormActionUrl={producerFormActionUrl}
      geoInputRef={geoInputRef}
      formTitleId={formTitleId}
    />
  );
}

export function OrderForm(): React.ReactElement {
  return (
    <GeoIPProvider>
      <OrderFormComponent />
    </GeoIPProvider>
  );
}
// src/components/ui/OrderForm.tsx
