// src/components/ui/TreatmentCycleCard.tsx
/**
 * @file TreatmentCycleCard.tsx
 * @description Aparato de UI atômico (Molécula) de apresentação puro. Exibe uma
 *              fase do programa de bem-estar, com duração, título e descrição.
 *              Projetado para ser informativo, visualmente atraente e interativo.
 * @version 4.0.0
 * @author RaZ Podestá - MetaShark Tech
 * @see src/components/ui/TreatmentCycleSection.tsx (Consumidor)
 */
"use client";

import { motion } from "framer-motion";
import React from "react";
import { clientLogger } from "@/lib/logger";

/**
 * @interface TreatmentCycleCardProps
 * @description Contrato de propriedades para o componente TreatmentCycleCard.
 */
export interface TreatmentCycleCardProps {
  /** A duração do ciclo (ex: "30 Dias"). */
  duration: string;
  /** O título da fase do ciclo. */
  title: string;
  /** A descrição dos efeitos esperados nesta fase. */
  description: string;
  /** O índice do card na lista, usado para escalonar a animação. */
  index: number;
}

/**
 * @component TreatmentCycleCard
 * @description Renderiza um card informativo para uma fase do tratamento.
 * @param {TreatmentCycleCardProps} props - As propriedades para renderizar o card.
 * @returns {React.ReactElement} Um card de fase do tratamento.
 */
export function TreatmentCycleCard({
  duration,
  title,
  description,
  index,
}: TreatmentCycleCardProps) {
  clientLogger.trace(
    { component: "TreatmentCycleCard", title },
    "Renderizando card de ciclo de tratamento."
  );

  return (
    <motion.div
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
      <h3 className="mb-3 text-xl font-bold text-white">{title}</h3>
      <p className="text-white/70">{description}</p>
    </motion.div>
  );
}
// src/components/ui/TreatmentCycleCard.tsx
