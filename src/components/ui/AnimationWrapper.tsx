// src/components/ui/AnimationWrapper.tsx
/**
 * @file AnimationWrapper.tsx
 * @description Aparato de UI utilitário de elite. Atua como um wrapper de animação
 *              de alta ordem que oferece uma biblioteca de animações pré-definidas
 *              e a flexibilidade de sobrescrevê-las com props customizadas,
 *              incluindo a transição.
 * @version 5.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import {
  motion,
  type HTMLMotionProps,
  type Transition,
  type Variants,
} from "framer-motion";
import type { ReactNode } from "react";
import { clientLogger } from "@/lib/logger";

/**
 * @private
 * @constant animationVariants
 * @description SSoT para as animações pré-configuradas. Centraliza as definições
 *              de animação para consistência e fácil manutenção.
 */
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

/**
 * @interface AnimationWrapperProps
 * @description Contrato de propriedades para o AnimationWrapper.
 */
export interface AnimationWrapperProps
  extends Omit<HTMLMotionProps<"div">, "transition"> {
  children: ReactNode;
  variant?: keyof typeof animationVariants;
  /** Permite sobrescrever a transição padrão de forma explícita. */
  transition?: Transition;
}

/**
 * @component AnimationWrapper
 * @description Envolve seus filhos em um `motion.div`, aplicando uma animação
 *              baseada em uma variante nomeada ou em props customizadas.
 * @param {AnimationWrapperProps} props - As propriedades do componente.
 * @returns {React.ReactElement} O wrapper de animação.
 */
export function AnimationWrapper({
  children,
  variant = "fadeInUp",
  transition,
  ...restProps
}: AnimationWrapperProps) {
  clientLogger.trace(
    { component: "AnimationWrapper", variant },
    "Renderizando wrapper de animação."
  );

  const defaultTransition: Transition = { duration: 0.6, ease: "easeOut" };

  const motionProps: HTMLMotionProps<"div"> = {
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, amount: 0.2 },
    variants: animationVariants[variant],
    transition: { ...defaultTransition, ...transition }, // A transição customizada sobrescreve a padrão
    ...restProps,
  };

  return <motion.div {...motionProps}>{children}</motion.div>;
}
// src/components/ui/AnimationWrapper.tsx
