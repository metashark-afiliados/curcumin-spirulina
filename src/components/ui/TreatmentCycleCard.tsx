// src/components/ui/TreatmentCycleCard.tsx
/**
 * @file TreatmentCycleCard.tsx
 * @description Aparato de UI atómico (Molécula) de apresentação puro e acessível.
 *              Exibe uma fase do programa de bem-estar, utilizando HTML semântico
 *              e ARIA para uma experiência de utilizador de elite.
 * @version 4.1.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/ui/TreatmentCycleCard.tsx.md
 */
"use client";

import { motion } from "framer-motion";
import React, { useId } from "react";
import { clientLogger } from "@/lib/client-logger";

export interface TreatmentCycleCardProps {
  duration: string;
  title: string;
  description: string;
  index: number;
}

export function TreatmentCycleCard({
  duration,
  title,
  description,
  index,
}: TreatmentCycleCardProps) {
  const titleId = useId();
  clientLogger.trace("Renderizando card de ciclo de tratamento.", {
    component: "TreatmentCycleCard",
    title,
  });

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
