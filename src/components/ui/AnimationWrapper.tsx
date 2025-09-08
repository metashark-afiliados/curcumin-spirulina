// src/components/ui/AnimationWrapper.tsx
/**
 * @file src/components/ui/AnimationWrapper.tsx
 * @description Aparato de UI utilitario de élite para animaciones.
 *              Nivelado para una adherencia estricta a la API de logging del
 *              cliente unificada y una observabilidad tipo-segura.
 * @author L.I.A. Legacy
 * @version 7.1.0
 * @see .docs-espejo/components/ui/AnimationWrapper.tsx.md
 */
"use client";

import {
  motion,
  type HTMLMotionProps,
  type Transition,
  type Variants,
} from "framer-motion";
import type { ReactNode } from "react";

import { clientLogger } from "@/lib/client-logger";

const animationVariants: Record<string, Variants> = {
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
};

export interface AnimationWrapperProps
  extends Omit<HTMLMotionProps<"div">, "transition"> {
  children: ReactNode;
  variant?: keyof typeof animationVariants;
  transition?: Transition;
}

export function AnimationWrapper({
  children,
  variant = "fadeInUp",
  transition,
  ...restProps
}: AnimationWrapperProps): React.ReactElement {
  // Se extraen las props relevantes para el log.
  const logData = {
    variant,
    ...Object.fromEntries(
      Object.entries(restProps).filter(
        ([, value]) => typeof value === "string" || typeof value === "number"
      )
    ),
  };

  // Firma de logging de ConvertiKit: contexto estático, datos como objeto.
  clientLogger.trace(
    "[AnimationWrapper]",
    "Renderizando wrapper de animación.",
    logData
  );

  const defaultTransition: Transition = { duration: 0.6, ease: "easeOut" };

  const motionProps: HTMLMotionProps<"div"> = {
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, amount: 0.2 },
    variants: animationVariants[variant],
    transition: { ...defaultTransition, ...transition },
    ...restProps,
  };

  return <motion.div {...motionProps}>{children}</motion.div>;
}
// src/components/ui/AnimationWrapper.tsx
