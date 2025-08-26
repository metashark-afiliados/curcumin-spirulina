"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * @author L.I.A. Legacy & Gemini
 * @version 1.0.0
 * @description Componente de cliente puro. Envuelve a sus hijos en un `motion.div`
 *              para aplicar animaciones de Framer Motion. Este es el componente
 *              que vive en el lado del cliente y respeta el límite de RSC.
 */
export function AnimationWrapper({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
