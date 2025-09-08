// src/components/ui/OrderFormUI.tsx
/**
 * @file OrderFormUI.tsx
 * @description Componente de presentación puro y "tonto" para la UI del OrderForm.
 *              Corregido para aceptar un manejador `onSubmit` pre-construido.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.1.0
 * @see .docs-espejo/components/ui/OrderFormUI.tsx.md
 */
"use client";

import { Phone, User } from "lucide-react";
import React, { type RefObject, type FormEventHandler } from "react";
import { type UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/Button";
import { FormInput } from "@/components/ui/FormInput";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { type OrderFormData } from "@/lib/validators/OrderForm.schema";
import { type OrderFormContent } from "@/lib/validators/i18n/OrderFormContent.schema";

interface OrderFormUIProps
  extends Pick<UseFormReturn<OrderFormData>, "register" | "formState"> {
  isSubmitting: boolean;
  content: OrderFormContent;
  locale: string;
  producerFormActionUrl: string;
  geoInputRef: RefObject<HTMLInputElement>;
  formTitleId: string;
  // CORRECCIÓN: La prop ahora espera un manejador de eventos de formulario estándar.
  onSubmitHandler: FormEventHandler<HTMLFormElement>;
}

export function OrderFormUI({
  register,
  formState: { errors },
  onSubmitHandler,
  isSubmitting,
  content,
  locale,
  producerFormActionUrl,
  geoInputRef,
  formTitleId,
}: OrderFormUIProps): React.ReactElement {
  return (
    <section
      aria-labelledby={formTitleId}
      className="rounded-lg border border-white/20 bg-brand-base-green bg-opacity-80 p-6 shadow-2xl backdrop-blur-md"
    >
      <h2 id={formTitleId} className="sr-only">
        {content.formTitle}
      </h2>
      <form
        // CORRECCIÓN: Se asigna el manejador directamente.
        onSubmit={onSubmitHandler}
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
// src/components/ui/OrderFormUI.tsx
