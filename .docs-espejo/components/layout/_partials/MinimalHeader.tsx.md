// .docs-espejo/components/layout/_partials/MinimalHeader.tsx.md
/**
 * @file .docs-espejo/components/layout/_partials/MinimalHeader.tsx.md
 * @description Documento Espejo y SSoT conceptual para el subcomponente MinimalHeader.
 * @author L.I.A. Legacy
 * @version 3.0.0
 */
# Manifiesto Conceptual: Aparato `MinimalHeader`

## 1. Rol Estratégico y Propósito

Este aparato es una **molécula de UI de presentación pura**. Su única responsabilidad es renderizar la variante minimalista del `Header`, diseñada para la `HomePage`. Su propósito es eliminar distracciones y enfocar al usuario en la única acción deseada: hacer clic en el Call-to-Action.

## 2. Arquitectura de Élite

Es un **Componente de Cliente (`"use client"`)** que sigue los principios de **Atomic Design**.
*   **Composición Atómica:** No implementa su propia lógica de botón. En su lugar, compone el átomo `Button` con la prop `asChild`, delegándole toda la responsabilidad del estilo, la interacción y la accesibilidad.
*   **Responsabilidad de Validación:** Este componente no necesita un esquema Zod. Sus `props` son validadas en tiempo de compilación por TypeScript.

## 3. Contrato de API
### Props de Entrada (`MinimalHeaderProps`):
*   `ctaButtonText: string`: El texto para el botón principal de llamada a la acción.

## 4. Zona de Melhorias Futuras
*   **VARIANTE DE BOTÓN CONFIGURABLE:** Permitir pasar una prop `ctaVariant?: ButtonVariant` para poder cambiar el estilo del botón sin modificar el componente.
*   **TRACKING DE EVENTOS:** Integrar `useTelemetry` para registrar un evento `CTA_HEADER_CLICK` cuando el usuario haga clic en el botón.
// .docs-espejo/components/layout/_partials/MinimalHeader.tsx.md