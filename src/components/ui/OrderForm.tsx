// src/components/ui/OrderForm.tsx
/**
 * @file src/components/ui/OrderForm.tsx
 * @description Aparato de conversión de élite, soberano y resiliente.
 *              Orquesta la validación de su propio contenido, la captura de datos del
 *              usuario, la validación de entrada, el enriquecimiento de datos
 *              (GeoIP) y la subida de leads directamente al endpoint del productor.
 *              Se adhiere a la API de logging del cliente unificada para una
 *              observabilidad completa de los eventos de conversión.
 * @version 9.2.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/ui/OrderForm.tsx.md
 * @see src/lib/client-logger.ts (SSoT para el logger de cliente)
 * @see src/lib/types/logging.ts (SSoT para `LogContext`)
 * @see src/components/diagnostic/GeoIPLocator.tsx (Consumidor de `useGeoIP`)
 * @see src/lib/validators/OrderForm.schema.ts (SSoT para la validación del formulario)
 * @see src/lib/validators/i18n/OrderFormContent.schema.ts (SSoT para el contenido i18n)
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
// IMPORTACIÓN CORREGIDA: Apunta a la nueva SSoT del clientLogger
import { clientLogger } from "@/lib/client-logger";
import {
  getOrderFormSchema,
  type OrderFormData,
} from "@/lib/validators/OrderForm.schema";
import {
  OrderFormContentSchema,
  type OrderFormContent,
} from "@/lib/validators/i18n/OrderFormContent.schema";
import { type LogContext } from "@/lib/types/logging"; // Importar LogContext

/**
 * @component OrderForm
 * @description Componente principal del formulario de pedido. Orquesta la presentación
 *              de la oferta, la captura de datos del usuario, la validación de entrada,
 *              el enriquecimiento de datos geográficos y la subida final del lead
 *              al endpoint del productor.
 * @returns {React.ReactElement | null} El formulario de pedido renderizado o `null` si falla
 *                                    la validación del contenido de internacionalización.
 */
export function OrderForm(): React.ReactElement | null {
  const t = useTranslations("components.ui.OrderForm");
  const locale = useLocale();
  const formTitleId = useId();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const geoInputRef = useRef<HTMLInputElement>(null);
  const { geoData, isLoading: isGeoLoading } = useGeoIP();

  let content: OrderFormContent;

  try {
    const rawContent = t.raw(""); // Obtenemos todo el namespace para validación.
    const validation = OrderFormContentSchema.safeParse(rawContent);
    if (!validation.success) {
      // USO DE CLIENTLOGGER CORREGIDO: (context, message)
      clientLogger.error(
        {
          component: "OrderForm",
          error: validation.error.flatten(),
          rawContent,
        },
        "Validação de conteúdo do OrderForm falhou."
      );
      throw new Error(
        `Validação de conteúdo do OrderForm falhou: ${JSON.stringify(
          validation.error.flatten()
        )}`
      );
    }
    content = validation.data;
  } catch (error) {
    // USO DE CLIENTLOGGER CORREGIDO: (context, message)
    clientLogger.error(
      { error, component: "OrderForm" } as LogContext, // Aserción de tipo para LogContext
      "Erro ao obter ou validar conteúdo do OrderForm. O componente não será renderizado."
    );
    return null;
  }

  // Memoiza el schema de Zod para evitar recrearlo en cada render,
  // mejorando el rendimiento de las validaciones.
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
    mode: "onTouched", // Valida en blur o al primer cambio.
  });

  // URL del endpoint del productor para la subida de leads.
  const producerFormActionUrl = process.env.NEXT_PUBLIC_PRODUCER_ENDPOINT || "";

  // Efecto para rellenar el campo oculto de geolocalización una vez que los datos estén disponibles.
  useEffect(() => {
    if (!isGeoLoading && geoData.countryCode && geoInputRef.current) {
      geoInputRef.current.value = geoData.countryCode;
      // OPORTUNIDAD DE ATOMIZACIÓN: Loggear GeoIP rellenado
      clientLogger.trace(
        {
          component: "OrderForm",
          field: "geo",
          countryCode: geoData.countryCode,
        },
        "Campo oculto 'geo' rellenado con datos de GeoIP."
      );
    }
  }, [geoData, isGeoLoading]);

  /**
   * @private
   * @function onValidSubmit
   * @description Manejador que se ejecuta cuando el formulario es válido.
   *              Registra el evento de subida y realiza la subida nativa del formulario.
   * @param {OrderFormData} data - Los datos validados del formulario.
   * @param {React.FormEvent<HTMLFormElement>} [event] - El evento de formulario.
   */
  const onValidSubmit: SubmitHandler<OrderFormData> = (data, event) => {
    // USO DE CLIENTLOGGER CORREGIDO: (context, message)
    clientLogger.info(
      { component: "OrderForm", data, eventType: event?.type },
      "Validación de cliente exitosa. Submetiendo formulario nativamente."
    );
    setIsSubmitting(true);
    // Realiza la subida nativa del formulario para asegurar la compatibilidad con el productor.
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
        className="space-y-4 wv_order-form" // Clase wv_order-form es crucial para webvork.js
        noValidate // Deshabilita la validación HTML5 nativa, confiando en Zod y react-hook-form
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

        {/* Campos ocultos esenciales para la atribución y lógica del productor */}
        <input name="lang" type="hidden" defaultValue={locale.split("-")[0]} />
        <input ref={geoInputRef} name="geo" type="hidden" />
        <input name="landing_id" type="hidden" defaultValue="12157" />
        <input name="offer_id" type="hidden" defaultValue="357" />
        <input name="utm_source" type="hidden" />
        {/*
          // OPORTUNIDAD DE ATOMIZACIÓN: Más campos ocultos para Webvork si son necesarios
          // <input name="from" type="hidden" value="nuestro-dominio.com" />
          // <input name="time_zone" type="hidden" value="Europe/Rome" />
        */}

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
