// src/components/ui/BenefitPill.tsx
/**
 * @file src/components/ui/BenefitPill.tsx
 * @description Aparato de UI atómico (Molécula) de presentación puro y accesible.
 *              Exibe un único beneficio del producto, utilizando HTML semántico
 *              (`<article>`) y ARIA para una experiencia de utilizador de elite.
 *              Se adhiere a la API de logging del cliente unificada para una
 *              observabilidad completa.
 * @version 3.2.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/ui/BenefitPill.tsx.md
 * @see src/lib/client-logger.ts (SSoT para el logger de cliente)
 * @see src/lib/types/logging.ts (SSoT para `LogContext`)
 */
"use client";

import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import React, { useId } from "react";
// IMPORTACIÓN CORREGIDA: Apunta a la nueva SSoT del clientLogger
import { clientLogger } from "@/lib/client-logger";
import { type LogContext } from "@/lib/types/logging"; // Importar LogContext

/**
 * @interface BenefitPillProps
 * @description Propiedades del componente `BenefitPill`.
 */
export interface BenefitPillProps {
  /**
   * @property {LucideIcon} icon - El componente de icono de Lucide a renderizar.
   */
  icon: LucideIcon;
  /**
   * @property {string} title - El título o nombre del beneficio.
   */
  title: string;
  /**
   * @property {string} description - Una descripción concisa del beneficio.
   */
  description: string;
  /**
   * @property {number} index - El índice del beneficio en una lista, utilizado para escalonar animaciones.
   */
  index: number;
}

/**
 * @component BenefitPill
 * @description Componente de presentación para mostrar un beneficio individual.
 *              Incluye animaciones `framer-motion` y logging de su renderizado.
 * @param {BenefitPillProps} props - Las propiedades para configurar el beneficio.
 * @returns {React.ReactElement}
 */
export function BenefitPill({
  icon: Icon,
  title,
  description,
  index,
}: BenefitPillProps): React.ReactElement {
  const titleId = useId();
  // USO DE CLIENTLOGGER CORREGIDO: (context, message)
  clientLogger.trace(
    { component: "BenefitPill", title, index },
    "Renderizando pílula de benefício."
  );

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
    >
      <div className="mb-4 flex-shrink-0 rounded-full bg-brand-accent p-3 text-on_brand shadow-md">
        <Icon size={28} />
      </div>
      <h3 id={titleId} className="mb-2 text-lg font-bold text-white">
        {title}
      </h3>
      <p className="text-sm text-white/70">{description}</p>
    </motion.article>
  );
}
// src/components/ui/BenefitPill.tsx
