// .docs-espejo/components/layout/Header.tsx.md
/**
 * @file .docs-espejo/components/layout/Header.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato Header.
 * @author L.I.A. Legacy
 * @version 3.0.0
 */
# Manifiesto Conceptual: Aparato `Header`

## 1. Rol Estratégico y Propósito

Este aparato es el **principal componente de navegación y orientación** de la aplicación. Su propósito estratégico es doble:

1.  **En la Landing Page (`/`):** Actuar de forma minimalista, eliminando distracciones y enfocando al usuario en la única acción deseada: hacer clic en el Call-to-Action (`#order-form`).
2.  **En Páginas de Contenido (`/blog`, etc.):** Proporcionar una navegación completa y consistente, reforzar la identidad de marca y ofrecer siempre una vía de regreso a la acción de conversión principal.

Como **orquestador soberano**, su responsabilidad es **obtener sus propias dependencias de i18n** y **adaptarse al contexto** (la ruta actual) para renderizar la experiencia de navegación más efectiva, delegando la presentación a subcomponentes atómicos.

## 2. Arquitectura y Flujo de Ejecución

Es un **Componente de Cliente (`"use client"`) orquestador** que obtiene su propio contenido y compone subcomponentes de presentación puros (`MinimalHeader`, `FullHeader`).

```mermaid
graph TD
    A["`Header.tsx` (Orquestador Soberano)"] -- "Invoca `useTranslations()`" --> B[Obtiene datos de i18n];
    A -- "Invoca `usePathname()`" --> C{¿Es Landing Page?};
    C -- Sí --> D["Renderiza `<MinimalHeader />`"];
    C -- No --> F["Renderiza `<FullHeader />`"];
    B -- "Pasa `ctaButtonText` a" --> D;
    B -- "Pasa props completas a" --> F;
    F -- "Gestiona estado `isMenuOpen`" --> G[Menú Móvil];
Esta arquitectura soberana elimina el prop drilling y adhiere a los principios de SRP y Atomicidad.
3. Contrato de API
Props de Entrada: Ninguna. Este es un componente soberano y autocontenido que obtiene todas sus dependencias internamente.
4. Zona de Melhorias Futuras
INDICADOR DE PÁGINA ACTIVA: En FullHeader, destacar visualmente el Link de navegación que corresponde a la página actual.
ANIMACIÓN DE SCROLL: Añadir un efecto visual sutil al header (ej. cambio de color de fondo) cuando el usuario desplaza la página hacia abajo.
SUBMENÚS (DROPDOWNS): Si la navegación se vuelve más compleja, mejorar FullHeader para soportar menús desplegables.
HEADER PEGAJOSO INTELIGENTE (Headroom): Implementar una lógica donde el header se oculte al hacer scroll hacia abajo y reaparezca al hacer scroll hacia arriba.
CONTENIDO DESDE CMS: Permitir que los navItems provengan de un Headless CMS para una gestión sin deploys.
PRUEBAS DE UI CON PLAYWRIGHT: Crear pruebas E2E que verifiquen que se renderiza el header correcto en cada ruta y que la navegación funciona.
// .docs-espejo/components/layout/Header.tsx.md