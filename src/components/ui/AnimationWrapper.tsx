// src/components/ui/AnimationWrapper.tsx
/**
 * @file AnimationWrapper.tsx
 * @description Aparato de UI utilitário de elite. Atua como um wrapper de animação
 *              de alta ordem que oferece uma biblioteca de animações pré-definidas
 *              e a flexibilidade de sobrescrevê-las com props customizadas.
 * @version 5.2.0
 * @author L.I.A. Legacy
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
}: AnimationWrapperProps) {
  // CORREÇÃO: Assinatura do logger corrigida para (mensagem, contexto).
  clientLogger.trace("Renderizando wrapper de animação.", {
    component: "AnimationWrapper",
    variant,
  });

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
