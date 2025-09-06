<!-- .docs-espejo/components/layout/_partials/FullHeader.tsx.md -->
/**
 * @file .docs-espejo/components/layout/_partials/FullHeader.tsx.md
 * @description Documento Espejo y SSoT conceptual para el subcomponente FullHeader.
 * @author L.I.A. Legacy
 * @version 2.4.0
 */
# Manifiesto Conceptual: Aparato `FullHeader`

## 1. Rol Estratégico y Propósito

Este aparato es una **molécula de UI de presentación pura**. Su única responsabilidad es renderizar la variante de navegación completa del `Header`, diseñada para páginas de contenido (ej. `/blog`). Es un componente de cliente (`"use client"`) ya que necesita gestionar el estado interno para la visibilidad del menú de navegación móvil.

Como componente puro, es completamente agnóstico a la lógica de negocio; recibe todo su contenido a través de `props` desde su orquestador padre, el `Header`. Se integra con la API de logging unificada del cliente para una observabilidad completa de las interacciones del menú.

## 2. Arquitectura y Flujo de Ejecución

Es un componente de cliente que gestiona su propio estado de UI.

```mermaid
graph TD
    A["`Header.tsx` (Orquestador)"] -- "Pasa `FullHeaderProps`" --> B["`FullHeader.tsx`"];
    B -- "Gestiona estado interno `isMenuOpen`" --> C[UI del Menú Móvil (abrir/cerrar)];
    C -- "onClick `toggleMenu` (usa `useCallback`)" --> D["`clientLogger.info()`"];
    B -- "Renderiza `navItems` via `.map()`" --> E[Links de Navegación];
    C & E --> F[HTML Final Renderizado];
    B -- "Utiliza `clientLogger.trace()`" --> G[Registro de Observabilidad];
3. Contrato de API
Props de Entrada (FullHeaderProps):
navItems: { href: Pathname; label: string; }[]: Un array de objetos que definen los enlaces de navegación estáticos.
ctaButtonText: string: El texto para el botón principal de llamada a la acción.
brandName: string: El nombre de la marca a mostrar.
4. Zona de Mejoras Nuevas (Valor al Proyecto)
INDICADOR DE RUTA ACTIVA VISUAL: Implementar una lógica visual para resaltar el Link de navegación que corresponde a la ruta actual (usePathname). Esto mejora la usabilidad al orientar al usuario sobre su ubicación en el sitio.
HEADER INTELIGENTE (Headroom.js): Integrar una lógica que oculte el header al hacer scroll hacia abajo y lo muestre al hacer scroll hacia arriba (Headroom.js o implementación custom) para maximizar el espacio de pantalla en contenidos largos.
SUBMENÚS (DROPDOWNS) ACCESIBLES: Extender la interfaz NavItem y la lógica de renderizado para soportar menús desplegables (dropdowns) en la navegación de escritorio, asegurando que sean accesibles mediante teclado y lectores de pantalla.
PRUEBAS DE UI (Playwright) PARA MENÚ MÓVIL: Crear pruebas End-to-End (E2E) con Playwright que verifiquen la apertura, cierre, y funcionalidad de todos los enlaces del menú móvil en diferentes viewports, asegurando la robustez en la interacción.
CONTENIDO DE NAVEGACIÓN VÍA CMS: Permitir que los navItems provengan de un Headless CMS, lo que daría al equipo de marketing la flexibilidad de gestionar los enlaces del menú sin necesidad de un deploy de código.
<!-- .docs-espejo/components/layout/_partials/FullHeader.tsx.md -->