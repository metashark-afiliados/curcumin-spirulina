<!-- .docs-espejo/components/layout/_partials/MinimalHeader.tsx.md -->
/**
 * @file .docs-espejo/components/layout/_partials/MinimalHeader.tsx.md
 * @description Documento Espejo y SSoT conceptual para el subcomponente MinimalHeader.
 * @author L.I.A. Legacy
 * @version 3.1.0
 */
# Manifiesto Conceptual: Aparato `MinimalHeader`

## 1. Rol Estratégico y Propósito

Este aparato es una **molécula de UI de presentación pura**. Su única responsabilidad es renderizar la variante minimalista del `Header`, diseñada para la `HomePage`. Su propósito es eliminar distracciones y enfocar al usuario en la única acción deseada: hacer clic en el Call-to-Action.

## 2. Arquitectura de Élite

Es un **Componente de Cliente (`"use client"`)** que sigue los principios de **Atomic Design**.
*   **Composición Atómica:** No implementa su propia lógica de botón. En su lugar, compone el átomo `Button` con la prop `asChild`, delegándole toda la responsabilidad del estilo, la interacción y la accesibilidad.
*   **Responsabilidad de Validación:** Este componente no necesita un esquema Zod. Sus `props` son validadas en tiempo de compilación por TypeScript.
*   **Observabilidad:** Utiliza `clientLogger` (de `src/lib/client-logger.ts` con la API unificada `(context, message)`) para registrar su propio flujo, contribuyendo a la observabilidad del lado del cliente.

## 3. Contrato de API
### Props de Entrada (`MinimalHeaderProps`):
*   `ctaButtonText: string`: El texto para el botón principal de llamada a la acción.

## 4. Zona de Mejoras Nuevas (Valor al Proyecto)
*   **VARIANTE DE BOTÓN CONFIGURABLE:** Permitir pasar una prop `ctaVariant?: ButtonVariant` (del tipo de variantes del `Button` de `src/components/ui/Button.tsx`) para poder cambiar el estilo visual del botón sin modificar el componente `MinimalHeader` directamente.
*   **TRACKING DE EVENTOS DE CTA:** Integrar `useTelemetry` para registrar un evento `CTA_HEADER_CLICK` cuando el usuario haga clic en el botón. Esto proporcionaría métricas valiosas sobre la efectividad del CTA principal.
*   **TEXTO DEL CTA DINÁMICO:** Explorar la posibilidad de que el `ctaButtonText` provenga de un archivo de i18n o de un sistema de `feature flags`, permitiendo al equipo de marketing probar diferentes mensajes de CTA fácilmente.
<!-- .docs-espejo/components/layout/_partials/MinimalHeader.tsx.md -->