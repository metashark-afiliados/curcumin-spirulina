// src/components/ui/AnimationWrapper.tsx
/**
 * @file src/components/ui/AnimationWrapper.tsx
 * @description Aparato de UI utilitario de élite para animaciones.
 *              Su único propósito es proporcionar una manera declarativa y reutilizable
 *              de aplicar animaciones de entrada a cualquier componente,
 *              abstraiendo la complejidad de `framer-motion`. Se adhiere a la API
 *              de logging del cliente unificada para una observabilidad completa.
 * @version 6.1.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/ui/AnimationWrapper.tsx.md
 * @see src/lib/client-logger.ts (SSoT para el logger de cliente)
 * @see src/lib/types/logging.ts (SSoT para `LogContext`)
 */
"use client";

import {
  motion,
  type HTMLMotionProps,
  type Transition,
  type Variants,
} from "framer-motion";
import type { ReactNode } from "react";

// IMPORTACIÓN CORREGIDA: Apunta a la nueva SSoT del clientLogger
import { clientLogger } from "@/lib/client-logger";
import { type LogContext } from "@/lib/types/logging"; // Importar LogContext

/**
 * @private
 * @constant animationVariants
 * @description Define las variantes predefinidas de animación para `framer-motion`.
 *              Cada variante incluye un estado `hidden` (inicial) y `visible` (final).
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
 * @description Propiedades del componente `AnimationWrapper`.
 * @extends Omit<HTMLMotionProps<'div'>, 'transition'> - Hereda todas las props de `motion.div`
 *          excepto `transition`, que se redefine.
 */
export interface AnimationWrapperProps
  extends Omit<HTMLMotionProps<"div">, "transition"> {
  /**
   * @property {ReactNode} children - Los elementos hijos que serán envueltos por la animación.
   */
  children: ReactNode;
  /**
   * @property {'fadeInUp' | 'fadeInLeft' | 'scaleIn'} [variant='fadeInUp'] - El nombre de la
   *           variante de animación predefinida a aplicar.
   */
  variant?: keyof typeof animationVariants;
  /**
   * @property {Transition} [transition] - Un objeto opcional para sobrescribir la configuración
   *           de transición por defecto de `framer-motion`.
   */
  transition?: Transition;
}

/**
 * @component AnimationWrapper
 * @description Componente de alto orden para aplicar animaciones declarativas a sus hijos.
 *              Utiliza `framer-motion` para animaciones de entrada `whileInView`.
 *              Es un Client Component.
 * @param {AnimationWrapperProps} props - Las propiedades para configurar la animación y el contenido.
 * @returns {React.ReactElement}
 */
export function AnimationWrapper({
  children,
  variant = "fadeInUp",
  transition,
  ...restProps
}: AnimationWrapperProps): React.ReactElement {
  // USO DE CLIENTLOGGER CORREGIDO: (context, message)
  clientLogger.trace(
    { component: "AnimationWrapper", variant, ...(restProps as LogContext) }, // Añadir otras props al contexto si son relevantes para el log
    "Renderizando wrapper de animación."
  );

  const defaultTransition: Transition = { duration: 0.6, ease: "easeOut" };

  const motionProps: HTMLMotionProps<"div"> = {
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, amount: 0.2 }, // Anima solo una vez cuando entra en la vista
    variants: animationVariants[variant], // Selecciona la variante de animación
    transition: { ...defaultTransition, ...transition }, // Combina transiciones
    ...restProps, // Pasa cualquier otra prop de motion.div
  };

  return <motion.div {...motionProps}>{children}</motion.div>;
}
// src/components/ui/AnimationWrapper.tsx
