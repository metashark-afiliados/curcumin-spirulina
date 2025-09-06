<!-- .docs-espejo/components/ui/AnimationWrapper.tsx.md -->
/**
 * @file .docs-espejo/components/ui/AnimationWrapper.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato AnimationWrapper.
 * @author L.I.A. Legacy
 * @version 6.1.0
 */
# Manifiesto Conceptual: Aparato `AnimationWrapper`

## 1. Rol Estratégico y Propósito

Este aparato es el **motor de la experiencia de usuario dinámica**. Su único propósito es proporcionar una manera declarativa y reutilizable de aplicar animaciones de entrada a cualquier componente, abstrayendo la complejidad de `framer-motion`.

## 2. Arquitectura de Élite

Es un **Componente de Cliente (`"use client"`) de presentación 100% puro**.
*   **Responsabilidad de Validación:** Este componente no necesita un esquema Zod. Sus `props` son validadas en tiempo de compilación por TypeScript.
*   **SSoT de Animaciones:** Centraliza las definiciones de las variantes de animación para garantizar la consistencia.
*   **Observabilidad:** Utiliza el `clientLogger` (ahora con la API unificada `(context, message)`) para registrar su propio flujo, contribuyendo a la observabilidad del lado del cliente.

## 3. Contrato de API
### Props de Entrada (`AnimationWrapperProps`):
*   Hereda todas las props de `HTMLMotionProps<"div">`.
*   `variant?`: `"fadeInUp" | "fadeInLeft" | "scaleIn"`: El nombre de la animación predefinida.
*   `transition?`: `Transition`: Un objeto para sobrescribir la transición por defecto.
*   `children`: `ReactNode`: Los elementos hijos que serán envueltos por la animación.

## 4. Zona de Mejoras Nuevas (Valor al Proyecto)
*   **ACCESIBILIDAD (useReducedMotion):** Integrar el hook `useReducedMotion` de `framer-motion` para desactivar automáticamente las animaciones si el usuario ha configurado la preferencia de reducción de movimiento en su sistema operativo.
*   **ANIMACIONES EN CASCADA (staggerChildren):** Añadir una prop `stagger?: number` que, si se proporciona, aplique una animación escalonada a los hijos directos del `AnimationWrapper`, simplificando la animación de listas de elementos.
*   **ANIMACIONES DE SALIDA (AnimatePresence):** Crear una variante o una prop `exitAnimation` que envuelva a los `children` con `<AnimatePresence />` y aplique animaciones de salida cuando los componentes se desmontan.
*   **CONTROL DE VELOCIDAD GLOBAL:** Permitir una prop `speed?: 'slow' | 'normal' | 'fast'` que ajuste la `duration` de la transición por defecto, centralizando el control de la sensación de velocidad.
<!-- .docs-espejo/components/ui/AnimationWrapper.tsx.md -->