// src/components/ui/BenefitPill.tsx
/**
 * @file src/components/ui/BenefitPill.tsx
 * @description Aparato de UI atómico (Molécula). Nivelado para una observabilidad
 *              de élite, integrando telemetría para rastrear el interés del
 *              usuario (hover). Se mejora la accesibilidad del icono.
 * @author L.I.A. Legacy
 * @version 5.0.0
 * @see .docs-espejo/components/ui/BenefitPill.tsx.md
 */
"use client";

import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import React, { useCallback, useId } from "react";

import { useTelemetry } from "@/hooks/useTelemetry";
import { clientLogger } from "@/lib/client-logger";

export interface BenefitPillProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

export function BenefitPill({
  icon: Icon,
  title,
  description,
  index,
}: BenefitPillProps): React.ReactElement {
  const titleId = useId();
  const { trackEvent } = useTelemetry();

  /**
   * @private
   * @function handleMouseEnter
   * @description Registra un evento de telemetría y un log de información cuando
   *              el usuario interactúa con la píldora, indicando interés.
   */
  const handleMouseEnter = useCallback(() => {
    clientLogger.info(
      "[BenefitPill]",
      "Hover detectado en píldora de beneficio.",
      {
        title,
      }
    );
    trackEvent("BENEFIT_HOVER", { benefitTitle: title });
  }, [trackEvent, title]);

  clientLogger.trace("[BenefitPill]", "Renderizando píldora de beneficio.", {
    title,
    index,
  });

  return (
    <motion.article
      aria-labelledby={titleId}
      className="flex h-full flex-col items-center rounded-xl border border-white/10 bg-white/5 p-6 text-center shadow-lg backdrop-blur-lg"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{
        y: -5,
        scale: 1.03,
        boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
      }}
      onMouseEnter={handleMouseEnter} // MEJORA: Se añade el tracker de telemetría.
    >
      <div className="mb-4 flex-shrink-0 rounded-full bg-brand-accent p-3 text-on_brand shadow-md">
        {/* MEJORA: El icono es decorativo y se oculta a los lectores de pantalla. */}
        <Icon size={28} aria-hidden="true" />
      </div>
      <h3 id={titleId} className="mb-2 text-lg font-bold text-white">
        {title}
      </h3>
      <p className="text-sm text-white/70">{description}</p>
    </motion.article>
  );
}
// src/components/ui/BenefitPill.tsx
