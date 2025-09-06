// src/components/ui/TreatmentCycleCard.tsx
/**
 * @file src/components/ui/TreatmentCycleCard.tsx
 * @description Aparato de UI atómico (Molécula) de presentación puro y accesible.
 *              Exibe una fase del programa de bienestar, utilizando HTML semántico
 *              y ARIA para una experiencia de utilizador de elite.
 *              Se adhiere a la API de logging del cliente unificada para una
 *              observabilidad completa de los ciclos de tratamiento.
 * @version 4.2.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/ui/TreatmentCycleCard.tsx.md
 * @see src/lib/client-logger.ts (SSoT para el logger de cliente)
 * @see src/lib/types/logging.ts (SSoT para `LogContext`)
 */
"use client";

import { motion } from "framer-motion";
import React, { useId } from "react";
// IMPORTACIÓN CORREGIDA: Apunta a la nueva SSoT del clientLogger
import { clientLogger } from "@/lib/client-logger";
import { type LogContext } from "@/lib/types/logging"; // Importar LogContext

/**
 * @interface TreatmentCycleCardProps
 * @description Propiedades del componente `TreatmentCycleCard`.
 */
export interface TreatmentCycleCardProps {
  /**
   * @property {string} duration - La duración de la fase del tratamiento (ej., "30 Días").
   */
  duration: string;
  /**
   * @property {string} title - El título de la fase del tratamiento.
   */
  title: string;
  /**
   * @property {string} description - Una descripción detallada de lo que ocurre en esta fase.
   */
  description: string;
  /**
   * @property {number} index - El índice de la tarjeta en una lista, utilizado para escalonar animaciones.
   */
  index: number;
}

/**
 * @component TreatmentCycleCard
 * @description Componente de presentación para mostrar una fase individual del ciclo de tratamiento.
 *              Incluye animaciones `framer-motion` y logging de su renderizado.
 * @param {TreatmentCycleCardProps} props - Las propiedades para configurar la tarjeta de ciclo de tratamiento.
 * @returns {React.ReactElement}
 */
export function TreatmentCycleCard({
  duration,
  title,
  description,
  index,
}: TreatmentCycleCardProps): React.ReactElement {
  const titleId = useId();
  // USO DE CLIENTLOGGER CORREGIDO: (context, message)
  clientLogger.trace(
    { component: "TreatmentCycleCard", title, index, duration } as LogContext, // Aserción de tipo para LogContext
    "Renderizando card de ciclo de tratamiento."
  );

  return (
    <motion.section
      aria-labelledby={titleId}
      className="h-full rounded-xl border border-white/10 bg-white/5 p-8 text-left shadow-lg backdrop-blur-lg"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      whileHover={{
        translateY: -8,
        scale: 1.02,
        boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
      }}
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-brand-accent bg-brand-primary-dark text-xl font-bold text-brand-accent shadow-inner">
        {duration}
      </div>
      <h3 id={titleId} className="mb-3 text-xl font-bold text-white">
        {title}
      </h3>
      <p className="text-white/70">{description}</p>
    </motion.section>
  );
}
// src/components/ui/TreatmentCycleCard.tsx
