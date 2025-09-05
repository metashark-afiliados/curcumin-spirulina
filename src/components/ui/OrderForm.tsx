// src/components/ui/OrderForm.tsx
/**
 * @file OrderForm.tsx
 * @description Aparato de conversión de élite, soberano y resiliente. Orquesta
 *              la validación de su propio contenido, la captura de datos del
 *              usuario, la validación de entrada, el enriquecimiento de datos
 *              (GeoIP) y la subida de leads.
 * @version 9.1.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/ui/OrderForm.tsx.md
 */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Phone, User } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useMemo, useRef, useState, useId } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

import { useGeoIP } from "@/components/diagnostic/GeoIPLocator";
import { Button } from "@/components/ui/Button";
import { FormInput } from "@/components/ui/FormInput";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { clientLogger } from "@/lib/client-logger";
import {
  getOrderFormSchema,
  type OrderFormData,
} from "@/lib/validators/OrderForm.schema";
import {
  OrderFormContentSchema,
  type OrderFormContent,
} from "@/lib/validators/i18n/OrderFormContent.schema";

export function OrderForm(): React.ReactElement | null {
  const t = useTranslations("components.ui.OrderForm");
  const locale = useLocale();
  const formTitleId = useId();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const geoInputRef = useRef<HTMLInputElement>(null);
  const { geoData, isLoading: isGeoLoading } = useGeoIP();

  let content: OrderFormContent;

  try {
    const rawContent = t.raw("");
    const validation = OrderFormContentSchema.safeParse(rawContent);
    if (!validation.success) throw validation.error;
    content = validation.data;
  } catch (error) {
    clientLogger.error("Erro ao obter ou validar conteúdo do OrderForm.", {
      error,
    });
    return null;
  }

  const formSchema = useMemo(
    () => getOrderFormSchema(content.validation),
    [content.validation]
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderFormData>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
  });

  const producerFormActionUrl = process.env.NEXT_PUBLIC_PRODUCER_ENDPOINT || "";

  useEffect(() => {
    if (!isGeoLoading && geoData.countryCode && geoInputRef.current) {
      geoInputRef.current.value = geoData.countryCode;
    }
  }, [geoData, isGeoLoading]);

  const onValidSubmit: SubmitHandler<OrderFormData> = (data, event) => {
    clientLogger.info("Validação de cliente exitosa. Submetendo formulário.", {
      data,
    });
    setIsSubmitting(true);
    event?.target.submit();
  };

  return (
    <section
      aria-labelledby={formTitleId}
      className="rounded-lg border border-white/20 bg-green-800 bg-opacity-80 p-6 shadow-2xl backdrop-blur-md"
    >
      <h2 id={formTitleId} className="sr-only">
        {content.formTitle}
      </h2>
      <form
        onSubmit={handleSubmit(onValidSubmit)}
        action={producerFormActionUrl}
        method="POST"
        className="space-y-4 wv_order-form"
        noValidate
      >
        <PriceDisplay originalPrice={78} discountedPrice={39} />
        <FormInput
          id="name"
          label={content.namePlaceholder}
          icon={User}
          {...register("name")}
          error={errors.name?.message}
          autoComplete="name"
          required
        />
        <FormInput
          id="phone"
          label={content.phonePlaceholder}
          icon={Phone}
          type="tel"
          {...register("phone")}
          error={errors.phone?.message}
          autoComplete="tel"
          required
        />

        <input name="lang" type="hidden" defaultValue={locale.split("-")[0]} />
        <input ref={geoInputRef} name="geo" type="hidden" />
        <input name="landing_id" type="hidden" defaultValue="12157" />
        <input name="offer_id" type="hidden" defaultValue="357" />
        <input name="utm_source" type="hidden" />

        <Button
          type="submit"
          size="lg"
          variant="accent"
          className="!mt-6 w-full"
          loading={isSubmitting}
          loadingText={content.submittingText}
        >
          {content.ctaButton}
        </Button>

        <div className="text-center text-xs text-white/80">
          <p>{content.contactlessDelivery}</p>
          <p className="font-bold">{content.freeDelivery}</p>
        </div>
      </form>
    </section>
  );
}
// src/components/ui/OrderForm.tsx
