// .docs-espejo/components/layout/Header.tsx.md
/**
 * @file .docs-espejo/components/layout/Header.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato Header.
 * @author L.I.A. Legacy
 * @version 2.2.0
 */
# Manifiesto Conceptual: Aparato `Header`

## 1. Rol Estratégico y Propósito

Este aparato es el **principal componente de navegación y orientación**, actuando como un **orquestador soberano, inteligente y adaptativo**. Su propósito es doble:

1.  **En la Landing Page (`/`):** Actuar de forma minimalista (`MinimalHeader`), enfocando al usuario en la conversión.
2.  **En Páginas de Contenido (`/blog`, etc.):** Proporcionar una navegación completa (`FullHeader`), reforzar la identidad de marca y ofrecer siempre una vía de regreso a la conversión.

Como **orquestador soberano**, obtiene sus propias dependencias de i18n y se adapta al contexto de la ruta actual.

## 2. Arquitectura de Élite

Es un **Componente de Cliente (`"use client"`) orquestador**.
*   **Renderizado Condicional:** Utiliza el hook `usePathname` para determinar qué subcomponente de presentación (`MinimalHeader` o `FullHeader`) renderizar.
*   **Composición Atómica:** Delega la presentación de los botones a la SSoT `Button.tsx`.
*   **Responsabilidad de Validación:** Este componente no necesita un esquema Zod. Su contenido de i18n es validado por los componentes hijos que lo consumen o es simple (strings), cuya integridad es garantizada por TypeScript.

## 3. Contrato de API
### Props de Entrada:
*   Ninguna. Es un componente soberano que obtiene todas sus dependencias internamente.

## 4. Zona de Melhorias Futuras
*   **INDICADOR DE PÁGINA ACTIVA:** En `FullHeader`, destacar visualmente el `Link` de navegación que corresponde a la página actual.
*   **HEADER PEGAJOSO INTELIGENTE (Headroom):** Implementar una lógica donde el header se oculte al hacer scroll hacia abajo y reaparezca al hacer scroll hacia arriba.
*   **CONTENIDO VÍA CMS:** Permitir que los `navItems` provengan de un Headless CMS.
// .docs-espejo/components/layout/Header.tsx.md