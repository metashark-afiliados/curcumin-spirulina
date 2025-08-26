"use client";

import { motion } from "framer-motion";

/**
 * @author L.I.A. Legacy & Gemini
 * @version 1.0.0
 * @description Componente de cliente reutilizable que envuelve secciones para
 *              aplicar una animación de entrada (fade-in y slide-up) cuando
 *              la sección entra en el viewport.
 */
export function AnimatedSection({ children }: { children: React.ReactNode }) {
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
