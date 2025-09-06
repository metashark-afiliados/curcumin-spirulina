// src/components/ui/TreatmentCycleSection.tsx
/**
 * @file src/components/ui/TreatmentCycleSection.tsx
 * @description Aparato soberano, resiliente y de cliente. Orquesta la exhibición
 *              de las fases del tratamiento, obteniendo y VALIDANDO su propio contenido
 *              de i18n contra un schema Zod antes de renderizar.
 *              Se adhiere a la API de logging del cliente unificada para una
 *              observabilidad completa de los ciclos de tratamiento.
 * @version 6.4.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/ui/TreatmentCycleSection.tsx.md
 * @see src/lib/client-logger.ts (SSoT para el logger de cliente)
 * @see src/lib/types/logging.ts (SSoT para `LogContext`)
 * @see src/lib/validators/i18n/TreatmentCycleSection.schema.ts (SSoT para la validación del contenido)
 */
"use client";

import { useTranslations } from "next-intl";
import React, { useId } from "react";
import { AnimationWrapper } from "@/components/ui/AnimationWrapper";
import { TreatmentCycleCard } from "@/components/ui/TreatmentCycleCard";
// IMPORTACIÓN CORREGIDA: Apunta a la nueva SSoT del clientLogger
import { clientLogger } from "@/lib/client-logger";
import {
  TreatmentCycleSectionContentSchema,
  type TreatmentCycleSectionContent,
} from "@/lib/validators/i18n/TreatmentCycleSection.schema";
import { type LogContext } from "@/lib/types/logging"; // Importar LogContext

/**
 * @component TreatmentCycleSection
 * @description Muestra una sección que describe el ciclo de tratamiento del producto
 *              dividido en fases. Es un componente de cliente que obtiene y valida
 *              su propio contenido de i18n, y orquesta la renderización de las tarjetas
 *              de ciclo individual (`TreatmentCycleCard`).
 * @returns {React.ReactElement | null} La sección de ciclos de tratamiento renderizada
 *                                    o `null` si falla la validación del contenido.
 */
export function TreatmentCycleSection(): React.ReactElement | null {
  const t = useTranslations("components.ui.TreatmentCycleSection");
  const titleId = useId();
  let content: TreatmentCycleSectionContent;

  try {
    const rawContent = t.raw(""); // Obtenemos todo el namespace para validación.
    const validation = TreatmentCycleSectionContentSchema.safeParse(rawContent);
    if (!validation.success) {
      // USO DE CLIENTLOGGER CORREGIDO: (context, message)
      clientLogger.error(
        {
          component: "TreatmentCycleSection",
          error: validation.error.flatten(),
          rawContent,
        },
        "Validação de conteúdo de TreatmentCycleSection falhou."
      );
      throw new Error(
        `Validação de conteúdo de TreatmentCycleSection falhou: ${JSON.stringify(
          validation.error.flatten()
        )}`
      );
    }
    content = validation.data;
  } catch (error) {
    // USO DE CLIENTLOGGER CORREGIDO: (context, message)
    clientLogger.error(
      { error, component: "TreatmentCycleSection" } as LogContext, // Aserción de tipo para LogContext
      "Erro ao obter ou validar conteúdo da TreatmentCycleSection. A seção não será renderizada."
    );
    return null;
  }

  // USO DE CLIENTLOGGER CORREGIDO: (context, message)
  clientLogger.trace(
    {
      component: "TreatmentCycleSection",
      cycleCount: content.cycles.length,
    },
    "Renderizando seção de ciclos de tratamento soberana e validada."
  );

  return (
    <section aria-labelledby={titleId} className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <AnimationWrapper>
          <h2
            id={titleId}
            className="mb-4 text-center text-4xl font-bold text-white"
          >
            {content.mainTitle}
          </h2>
          <p className="mx-auto mb-16 max-w-2xl text-center text-lg text-white/80">
            {content.subtitle}
          </p>
        </AnimationWrapper>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {content.cycles.map((cycle, index) => (
            <TreatmentCycleCard key={cycle.title} {...cycle} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
// src/components/ui/TreatmentCycleSection.tsx
