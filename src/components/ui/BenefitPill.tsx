// src/components/ui/BenefitPill.tsx
/**
 * @file src/components/ui/BenefitPill.tsx
 * @description Aparato de UI atómico (Molécula) de presentación puro y accesible.
 *              Nivelado para una adherencia estricta a la API de logging del
 *              cliente unificada, garantizando una observabilidad consistente.
 * @version 4.0.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/ui/BenefitPill.tsx.md
 */
"use client";

import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import React, { useId } from "react";
import { clientLogger } from "@/lib/client-logger";
import { type LogContext } from "@/lib/types/logging";

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
  const baseContext: LogContext = {
    component: "BenefitPill",
    title,
    index,
  };

  clientLogger.trace(baseContext, "Renderizando píldora de beneficio.");

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
