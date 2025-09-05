// src/components/ui/BenefitPill.tsx
/**
 * @file BenefitPill.tsx
 * @description Aparato de UI atômico (Molécula) de apresentação puro. Exibe um
 *              único benefício chave do produto de forma concisa e visual,
 *              com um ícone, título e descrição. É animado e interativo.
 * @version 3.0.0
 * @author RaZ Podestá - MetaShark Tech
 * @see src/components/ui/BenefitsSection.tsx (Consumidor)
 */
"use client";

import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import React from "react";
import { clientLogger } from "@/lib/logger";

/**
 * @interface BenefitPillProps
 * @description Contrato de propriedades para o componente BenefitPill.
 */
export interface BenefitPillProps {
  /** O componente de ícone (de lucide-react) a ser renderizado. */
  icon: LucideIcon;
  /** O título do benefício. */
  title: string;
  /** A descrição concisa do benefício. */
  description: string;
  /** O índice do benefício na lista, usado para escalonar a animação. */
  index: number;
}

/**
 * @component BenefitPill
 * @description Renderiza um card interativo para um único benefício, com
 *              animações de entrada e de hover.
 * @param {BenefitPillProps} props - As propriedades para renderizar o benefício.
 * @returns {React.ReactElement} Um card de benefício.
 */
export function BenefitPill({
  icon: Icon,
  title,
  description,
  index,
}: BenefitPillProps) {
  clientLogger.trace(
    { component: "BenefitPill", title },
    `Renderizando pílula de benefício.`
  );

  return (
    <motion.div
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
      <h3 className="mb-2 text-lg font-bold text-white">{title}</h3>
      <p className="text-sm text-white/70">{description}</p>
    </motion.div>
  );
}
// src/components/ui/BenefitPill.tsx
