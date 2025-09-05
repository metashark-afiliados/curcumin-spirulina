// .docs-espejo/components/ui/AnimationWrapper.tsx.md
/**
 * @file .docs-espejo/components/ui/AnimationWrapper.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato AnimationWrapper.
 * @author L.I.A. Legacy
 * @version 5.1.0
 */
# Manifiesto Conceptual: Aparato `AnimationWrapper`

## 1. Rol Estratégico y Propósito

Este aparato es el **motor de la experiencia de usuario dinámica**. Su único propósito es proporcionar una manera declarativa y reutilizable de aplicar animaciones de entrada a cualquier componente, abstrayendo la complejidad de `framer-motion`.

## 2. Arquitectura de Élite

Es un **Componente de Cliente (`"use client"`) de presentación 100% puro**.
*   **Responsabilidad de Validación:** Este componente no necesita un esquema Zod. Sus `props` son validadas en tiempo de compilación por TypeScript.
*   **SSoT de Animaciones:** Centraliza las definiciones de las variantes de animación para garantizar la consistencia.

## 3. Contrato de API
### Props de Entrada (`AnimationWrapperProps`):
*   Hereda todas las props de `HTMLMotionProps<"div">`.
*   `variant?`: `"fadeInUp" | "fadeInLeft" | "scaleIn"`: El nombre de la animación predefinida.
*   `transition?`: `Transition`: Un objeto para sobrescribir la transición por defecto.

## 4. Zona de Melhorias Futuras
*   **ACCESIBILIDAD (useReducedMotion):** Integrar el hook `useReducedMotion` para desactivar automáticamente las animaciones si el usuario lo prefiere.
*   **ANIMACIONES EN CASCADA (staggerChildren):** Añadir una prop `stagger?: boolean` para simplificar la animación de listas de elementos.
*   **ANIMACIONES DE SALIDA (AnimatePresence):** Crear una variante que envuelva a los `children` con `<AnimatePresence />`.
// .docs-espejo/components/ui/AnimationWrapper.tsx.md