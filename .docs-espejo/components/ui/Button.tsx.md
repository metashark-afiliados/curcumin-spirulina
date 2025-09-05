// .docs-espejo/components/ui/Button.tsx.md
/**
 * @file .docs-espejo/components/ui/Button.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato Button.
 * @author L.I.A. Legacy
 * @version 2.0.0
 */
# Manifiesto Conceptual: Aparato `Button`

## 1. Rol Estratégico y Propósito

Este aparato es el **átomo de interacción primario** de la aplicación. Su propósito es proporcionar una SSoT única, consistente y de élite para todos los elementos clicables que disparan una acción, ya sea una subida de formulario, una navegación o una interacción de UI.

Centraliza la lógica de estilo, estados (normal, hover, disabled, loading) y animaciones, garantizando que la experiencia de usuario sea coherente en toda la plataforma y adhiriéndose estrictamente al principio DRY.

## 2. Arquitectura y Flujo de Ejecución

Es un componente de cliente (`"use client"`) polimórfico y compuesto.

-   **Polimorfismo:** Utiliza la primitiva `<Slot>` de Radix UI (a través de la prop `asChild`) para permitir que el botón se renderice como un componente hijo (ej. un `<Link>` de Next.js), heredando los estilos y comportamientos del botón.
-   **Estilo Declarativo:** Utiliza `class-variance-authority` (`cva`) para gestionar un conjunto extendido de variantes de estilo (`variant`, `size`) de forma declarativa.
-   **Estado de Carga:** Gestiona un estado `loading` que muestra un spinner y deshabilita automáticamente el botón.
-   **Animación:** Integra `framer-motion` para proporcionar microinteracciones (`whileHover`, `whileTap`) y efectos visuales avanzados en variantes específicas como `premium`.

## 3. Contrato de API

*   **Props de Entrada (`ButtonProps`):**
    *   Hereda todas las props de un `<button>` nativo.
    *   `variant?`: `"default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "subtle" | "premium"`: El estilo visual semántico del botón.
    *   `size?`: `"default" | "sm" | "lg" | "icon" | "pill"`: El tamaño del botón.
    *   `asChild?: boolean`: Si es `true`, el botón se renderiza como su hijo directo.
    *   `loading?: boolean`: Si es `true`, muestra un spinner y se deshabilita.

## 4. Zona de Melhorias Futuras

1.  **SOPORTE PARA ICONOS DECLARATIVOS:** Añadir props `iconLeft?: LucideIcon` y `iconRight?: LucideIcon` que rendericen iconos de forma automática junto al texto, simplificando la composición.
2.  **ESTADOS DE ÉXITO/ERROR:** Añadir variantes visuales (ej. `variant: "success" | "error"`) que puedan ser activadas por un corto período tras una acción para feedback visual inmediato.
3.  **FEEDBACK AUDITIVO:** Añadir un efecto sonoro sutil de clic (`onTap`) como feedback auditivo opcional.
4.  **GRUPO DE BOTONES:** Crear un componente `ButtonGroup` que envuelva múltiples `Button` y aplique estilos para que parezcan un único control segmentado.
5.  **MEJORA DE ACCESIBILIDAD (`aria-live`):** Cuando `loading` es true, añadir `aria-live="polite"` para que los lectores de pantalla anuncien el cambio de estado.

// .docs-espejo/components/ui/Button.tsx.md