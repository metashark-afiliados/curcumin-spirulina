// .docs-espejo/components/layout/_partials/FullHeader.tsx.md
/**
 * @file .docs-espejo/components/layout/_partials/FullHeader.tsx.md
 * @description Documento Espejo y SSoT conceptual para el subcomponente FullHeader.
 * @author L.I.A. Legacy
 * @version 1.0.0
 */
# Manifiesto Conceptual: Aparato `FullHeader`

## 1. Rol Estratégico y Propósito

Este aparato es una **molécula de UI de presentación pura**. Su única responsabilidad es renderizar la variante de navegación completa del `Header`, diseñada para páginas de contenido (ej. `/blog`). Es un componente de cliente (`"use client"`) ya que necesita gestionar el estado interno para la visibilidad del menú de navegación móvil.

Como componente puro, es completamente agnóstico a la lógica de negocio; recibe todo su contenido a través de `props` desde su orquestador padre, el `Header`.

## 2. Arquitectura y Flujo de Ejecución

Es un componente de cliente que gestiona su propio estado de UI.

```mermaid
graph TD
    A["`Header.tsx` (Orquestador)"] -- "Pasa `FullHeaderProps`" --> B["`FullHeader.tsx`"];
    B -- "Gestiona estado interno `isMenuOpen`" --> C[UI del Menú Móvil];
    B -- "Renderiza `navItems` via `.map()`" --> D[Links de Navegación];
    C & D --> E[HTML Final Renderizado];
3. Contrato de API
Props de Entrada (FullHeaderProps):
navItems: { href: Pathname; label: string; }[]: Un array de objetos que definen los enlaces de navegación estáticos.
ctaButtonText: string: El texto para el botón principal de llamada a la acción.
brandName: string: El nombre de la marca a mostrar.
4. Zona de Melhorias Futuras
INDICADOR DE RUTA ACTIVA: Implementar una lógica visual para resaltar el Link de navegación que corresponde a la ruta actual (usePathname).
HEADER INTELIGENTE (Headroom): Integrar una lógica que oculte el header al hacer scroll hacia abajo y lo muestre al hacer scroll hacia arriba para maximizar el espacio de pantalla.
SUBMENÚS (DROPDOWNS): Extender la interfaz NavItem y la lógica de renderizado para soportar menús desplegables en la navegación de escritorio.
PRUEBAS DE UI (Playwright): Crear pruebas E2E que verifiquen la apertura, cierre y funcionalidad de los enlaces del menú móvil en diferentes viewports.
// .docs-espejo/components/layout/_partials/FullHeader.tsx.md