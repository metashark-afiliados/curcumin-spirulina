// .docs-espejo/components/ui/Button.tsx.md
/**
 * @file .docs-espejo/components/ui/Button.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato Button.
 * @author L.I.A. Legacy
 * @version 3.1.0
 */
# Manifiesto Conceptual: Aparato `Button`

## 1. Rol Estratégico y Propósito

Este aparato es el **átomo de interacción primario** de la aplicación. Su propósito es proporcionar una SSoT única, consistente y de élite para todos los elementos clicables que disparan una acción, ya sea un envío de formulario, una navegación o una interacción de UI.

Centraliza la lógica de estilo, estados (normal, hover, disabled, loading), accesibilidad y animaciones, garantizando que la experiencia de usuario sea coherente y adhiriéndose estrictamente al principio DRY.

## 2. Arquitectura de Élite

Es un componente de cliente (`"use client"`) polimórfico y compuesto:

*   **Polimorfismo:** Utiliza la primitiva `<Slot>` de Radix UI (a través de la prop `asChild`) para permitir que el botón se renderice como un componente hijo (ej. un `<Link>`), heredando los estilos y comportamientos.
*   **Estilo Declarativo:** Utiliza `class-variance-authority` (`cva`) para gestionar un conjunto extendido de variantes de estilo semánticas (`variant`, `size`).
*   **Estado de Carga Accesible:** Gestiona un estado `loading` que muestra un spinner, deshabilita el botón y notifica a los lectores de pantalla a través de atributos `aria-busy` y texto específico para lectores de pantalla.
*   **Microinteracciones:** Integra `framer-motion` para proporcionar feedback táctil y visual (`whileHover`, `whileTap`) y efectos avanzados.

## 3. Contrato de API

### Props de Entrada (`ButtonProps`):
*   Hereda todas las props de un `<button>` nativo de `framer-motion`.
*   **`variant?`**: `"default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "subtle" | "accent"`: El estilo visual semántico.
*   **`size?`**: `"default" | "sm" | "lg" | "icon" | "pill"`: El tamaño.
*   **`asChild?: boolean`**: Si es `true`, se renderiza como su hijo directo.
*   **`loading?: boolean`**: Si es `true`, muestra un spinner y se deshabilita.
*   **`loadingText?: string`**: **(Nuevo en v3.1.0)** Texto opcional que se anuncia a los lectores de pantalla durante el estado de carga, proporcionando un feedback de accesibilidad superior.

## 4. Zona de Melhorias Futuras

*   **SOPORTE PARA ICONOS DECLARATIVOS:** Añadir props `iconLeft?: LucideIcon` y `iconRight?: LucideIcon` que rendericen iconos de forma automática junto al texto.
*   **ESTADOS DE ÉXITO/ERROR VISUALES:** Añadir variantes visuales (ej. `variant: "success" | "error"`) que puedan ser activadas por un corto período tras una acción para feedback inmediato.
*   **FEEDBACK AUDITIVO:** Añadir un efecto sonoro sutil de clic (`onTap`) como feedback auditivo opcional.
*   **GRUPO DE BOTONES:** Crear un componente `ButtonGroup` que envuelva múltiples `Button` y aplique estilos para que parezcan un único control segmentado.
*   **TOOLTIP INTEGRADO:** Añadir una prop `tooltip?: string` que renderice un `Tooltip` de Radix al hacer hover sobre el botón.
// .docs-espejo/components/ui/Button.tsx.md