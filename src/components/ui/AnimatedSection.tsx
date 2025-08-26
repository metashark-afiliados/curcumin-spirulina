import { AnimationWrapper } from "./AnimationWrapper";
import type { ReactNode } from "react";

/**
 * @author L.I.A. Legacy & Gemini
 * @version 2.0.0
 * @description Componente de servidor que proporciona una API de animación limpia.
 *              Internamente, delega el renderizado a un Componente de Cliente
 *              (`AnimationWrapper`), respetando la arquitectura de RSC.
 */
export function AnimatedSection({ children }: { children: ReactNode }) {
  return <AnimationWrapper>{children}</AnimationWrapper>;
}
