// .docs-espejo/components/ui/AnimationWrapper.tsx.md
/\*\*

- @file .docs-espejo/components/ui/AnimationWrapper.tsx.md
- @description Documento Espejo y SSoT conceptual para el aparato AnimationWrapper.
- @author RaZ Podestá - MetaShark Tech
- @version 1.0.0
  \*/

# Manifiesto Conceptual: Aparato `AnimationWrapper`

## 1. Rol Estratégico y Propósito

Este aparato es el **motor de la experiencia de usuario dinámica** de la aplicación. Su único propósito es proporcionar una manera simple, declarativa y reutilizable de aplicar animaciones de entrada a cualquier componente o sección de la UI.

Actúa como un componente de orden superior que abstrae la complejidad de la API de `framer-motion`, ofreciendo un conjunto predefinido de animaciones (`variants`) y la flexibilidad para personalizarlas, adhiriéndose a los principios de DRY y SRP.

## 2. Arquitectura y Flujo de Ejecución

Es un **Componente de Cliente (`"use client"`) de presentación 100% puro**. Su lógica se centra en construir el objeto de `props` para el componente `motion.div`.

```mermaid
graph TD
    A[Componente Padre] -- "Pasa props (variant, transition, children)" --> B["`AnimationWrapper.tsx`"];
    B -- "Selecciona `Variants` de" --> C["SSoT `animationVariants`"];
    B -- "Fusiona `defaultTransition` con `props.transition`" --> D[Objeto de Transición Final];
    C & D --> E[Construye `motionProps`];
    E -- "Son esparcidas en" --> F["`<motion.div>`"];
    F -- "Envuelve a" --> G["`children`"];
3. Contrato de API
Props de Entrada (AnimationWrapperProps):
Hereda todas las props de HTMLMotionProps<"div"> excepto transition.
children: ReactNode: El contenido a ser animado.
variant?: "fadeInUp" | "fadeInLeft" | "scaleIn": El nombre de la animación predefinida a utilizar.
transition?: Transition: Un objeto de transición de framer-motion para sobrescribir o extender la transición por defecto.
4. Zona de Melhorias Futuras
ACCESIBILIDAD (useReducedMotion): Integrar el hook useReducedMotion de Framer Motion para desactivar automáticamente las animaciones si el usuario tiene activada la preferencia de "movimiento reducido" en su sistema operativo.
ANIMACIONES EN CASCADA (staggerChildren): Añadir una prop stagger?: boolean | number que aplique automáticamente las props staggerChildren y staggerDirection a la transition, simplificando la animación de listas de elementos.
ANIMACIONES DE SALIDA (AnimatePresence): Crear una variante del componente, AnimatedPresenceWrapper, que envuelva a los children con el componente <AnimatePresence /> para soportar animaciones de salida.
DOCUMENTACIÓN EN ESPAÑOL: Traducir este documento espejo al español.
NUEVAS VARIANTES DE ANIMACIÓN: Expandir la SSoT animationVariants con más efectos de entrada comunes (ej. slideInRight, zoomIn).
CONTROL PROGRAMÁTICO: Aceptar una prop controls (de useAnimationControls de Framer Motion) para permitir que el componente padre dispare la animación de forma programática.
EVENTOS DE ANIMACIÓN: Exponer los callbacks de eventos de animación de framer-motion (ej. onAnimationComplete) como props para que los componentes padres puedan reaccionar a la finalización de una animación.
PRUEBAS DE INTEGRACIÓN VISUAL: Utilizar una herramienta como Storybook con un addon de "visual regression testing" para tomar capturas de pantalla de las animaciones y prevenir regresiones visuales.
ANIMACIONES BASADAS EN SCROLL: Crear una variante que utilice los hooks useScroll y useTransform de Framer Motion para vincular la animación al progreso del scroll del usuario.
INTERACTIVIDAD MEJORADA: Añadir soporte para más gestos de framer-motion como whileTap o whileDrag a través de props, convirtiéndolo en un wrapper de interacción más completo.
// .docs-espejo/components/ui/AnimationWrapper.tsx.md
```
