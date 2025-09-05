// src/components/ui/OrderForm.tsx
/**
 * @file OrderForm.tsx
 * @description Aparato de conversión de élite y soberano. Orquesta la captura,
 *              validación (con errores internacionalizados vía IMAS-E),
 *              enriquecimiento de datos (GeoIP) y submissão de leads.
 * @version 8.0.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/ui/OrderForm.tsx.md
 */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Phone, User } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useGeoIP } from "@/components/diagnostic/GeoIPLocator";
import { Button } from "@/components/ui/Button";
import { FormInput } from "@/components/ui/FormInput";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { clientLogger } from "@/lib/logger";
import {
  getOrderFormSchema,
  type OrderFormData,
} from "@/lib/validators/OrderForm.schema";

export function OrderForm() {
  const t = useTranslations("components.ui.OrderForm");
  const locale = useLocale();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const geoInputRef = useRef<HTMLInputElement>(null);
  const { geoData, isLoading: isGeoLoading } = useGeoIP();

  const formSchema = useMemo(() => getOrderFormSchema(t), [t]);

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
      clientLogger.info(
        { geo: geoData.countryCode },
        "GeoIP detectado y campo oculto actualizado."
      );
    }
  }, [geoData, isGeoLoading]);

  const onValidSubmit: SubmitHandler<OrderFormData> = (data) => {
    clientLogger.info(
      { component: "OrderForm", data },
      "Validación de cliente exitosa. Iniciando submissão nativa del formulario."
    );
    setIsSubmitting(true);
  };

  const onInvalidSubmit = (errors: any) => {
    clientLogger.warn(
      { component: "OrderForm", errors },
      "Tentativa de submissão do formulário falhou na validação do cliente."
    );
  };

  return (
    <div className="rounded-lg border border-white/20 bg-green-800 bg-opacity-80 p-6 shadow-2xl backdrop-blur-md">
      <form
        onSubmit={handleSubmit(onValidSubmit, onInvalidSubmit)}
        action={producerFormActionUrl}
        method="POST"
        className="space-y-4 wv_order-form"
        noValidate
      >
        <PriceDisplay originalPrice={78} discountedPrice={39} />

        <FormInput
          id="name"
          label={t("namePlaceholder")}
          icon={User}
          placeholder={t("namePlaceholder")}
          {...register("name")}
          error={errors.name?.message}
          autoComplete="name"
        />

        <FormInput
          id="phone"
          label={t("phonePlaceholder")}
          icon={Phone}
          type="tel"
          placeholder={t("phonePlaceholder")}
          {...register("phone")}
          error={errors.phone?.message}
          autoComplete="tel"
        />

        {/* --- CAMPOS OCULTOS PARA ATRIBUIÇÃO E TRACKING --- */}
        <input name="lang" type="hidden" defaultValue={locale.split("-")[0]} />
        <input ref={geoInputRef} name="geo" type="hidden" />
        <input name="landing_id" type="hidden" defaultValue="12157" />
        <input name="offer_id" type="hidden" defaultValue="357" />
        <input name="utm_source" type="hidden" />

        <Button
          type="submit"
          size="lg"
          className="!mt-6 w-full bg-red-600 hover:bg-red-700"
          disabled={isSubmitting}
          loading={isSubmitting}
        >
          {t("ctaButton")}
        </Button>

        <div className="text-center text-xs text-white/80">
          <p>{t("contactlessDelivery")}</p>
          <p className="font-bold">{t("freeDelivery")}</p>
        </div>
      </form>
    </div>
  );
}
// src/components/ui/OrderForm.tsx
