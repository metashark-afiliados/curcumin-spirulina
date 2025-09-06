<!-- .docs-espejo/components/layout/Header.tsx.md -->
/**
 * @file .docs-espejo/components/layout/Header.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato Header.
 * @author L.I.A. Legacy
 * @version 4.1.0
 */
# Manifiesto Conceptual: Aparato `Header`

## 1. Rol Estratégico y Propósito

Este aparato es el **principal componente de navegación y orientación**, actuando como un **orquestador soberano, inteligente y adaptativo**. Su propósito es doble:

1.  **En la Landing Page (`/`):** Actuar de forma minimalista (`MinimalHeader`), enfocando al usuario en la conversión.
2.  **En Páginas de Contenido (`/blog`, etc.):** Proporcionar una navegación completa (`FullHeader`), reforzar la identidad de marca y ofrecer siempre una vía de regreso a la conversión.

Como **orquestador soberano**, obtiene sus propias dependencias de i18n y se adapta al contexto de la ruta actual. Se integra con la API de logging unificada del cliente para una observabilidad completa de la selección y renderizado de sus variantes.

## 2. Arquitectura de Élite

Es un **Componente de Cliente (`"use client"`) orquestador**.
*   **Renderizado Condicional:** Utiliza el hook `usePathname` de `next-intl` para determinar qué subcomponente de presentación (`MinimalHeader` o `FullHeader`) renderizar.
*   **Composición Atómica:** Delega la presentación de los botones a la SSoT `Button.tsx`.
*   **Responsabilidad de Validación:** Este componente no necesita un esquema Zod. Su contenido de i18n es validado por los componentes hijos que lo consumen (ej. `FullHeader` puede acceder a `t.raw("navItems")`) o es simple (strings), cuya integridad es garantizada por TypeScript.
*   **Observabilidad:** Utiliza `clientLogger` (de `src/lib/client-logger.ts` con la API unificada `(context, message)`) para registrar la variante del header que se está renderizando en función de la ruta, lo que es útil para el diagnóstico de la navegación y la UX.

## 3. Contrato de API
### Props de Entrada:
*   Ninguna. Es un componente soberano que obtiene todas sus dependencias internamente.

## 4. Zona de Mejoras Nuevas (Valor al Proyecto)

*   **INDICADOR DE PÁGINA ACTIVA EN `FullHeader`:** En la variante `FullHeader`, implementar una lógica visual (ej. un subrayado, un cambio de color de texto) para destacar el `Link` de navegación que corresponde a la página actual (`usePathname`).
*   **HEADER PEGAJOSO INTELIGENTE (Headroom.js o custom hook):** Implementar una lógica donde el header se oculte suavemente al hacer scroll hacia abajo y reaparezca al hacer scroll hacia arriba. Esto maximiza el espacio vertical para el contenido en dispositivos móviles y desktops con pantallas pequeñas.
*   **CONTENIDO DE NAVEGACIÓN VÍA CMS/FEATURE FLAGS:** Permitir que la estructura y los elementos de `navItems` provengan de un Headless CMS o de un sistema de `feature flags`. Esto otorgaría al equipo de marketing una gran flexibilidad para gestionar los enlaces del menú y realizar pruebas A/B de la navegación sin necesidad de un deploy de código.
*   **EFECTO DE SCROLL EN `MinimalHeader`:** Para la `HomePage`, al hacer scroll hacia abajo, el `MinimalHeader` podría transformarse en una versión aún más compacta o incluso ocultarse para dar más prominencia al contenido, reapareciendo si el usuario hace scroll hacia arriba.
<!-- .docs-espejo/components/layout/Header.tsx.md -->