// .docs-espejo/lib/navigation.ts.md
/**
 * @file .docs-espejo/lib/navigation.ts.md
 * @description Documento Espejo y SSoT conceptual para el manifiesto de navegación.
 * @author L.I.A. Legacy
 * @version 2.0.0
 */
# Manifiesto Conceptual: Aparato `lib/navigation.ts`

## 1. Rol Estratégico y Propósito

Este aparato es el **mapa y el motor del enrutamiento internacionalizado**. Actúa como la Única Fuente de Verdad (SSoT) para tres dominios críticos:

1.  **Locales Soportados:** Define la lista canónica de idiomas (`locales`).
2.  **Mapeo de Rutas:** Define un manifiesto de todas las rutas estáticas conocidas (`pathnames`).
3.  **API de Navegación:** Configura y exporta directamente los componentes y hooks (`Link`, `useRouter`, etc.) de `next-intl`, asegurando que toda la navegación en la aplicación sea consciente del `locale`.

Estratégicamente, este archivo centraliza toda la configuración de enrutamiento, haciendo que la aplicación sea mantenible y fácilmente extensible.

## 2. Arquitectura y Flujo de Ejecución

Es un módulo de configuración que exporta constantes y las funciones de navegación generadas por `next-intl`.

```mermaid
graph TD
    A["`navigation.ts`"] -- Define `locales` y `pathnames` --> B["`createLocalizedPathnamesNavigation`"];
    B -- "Genera" --> C["`Link`, `useRouter`, etc."];
    C -- "Son consumidos por" --> D["Toda la Aplicación"];
    A -- "También es consumido por" --> E["`middleware.ts` y `i18n.ts`"];
La arquitectura es declarativa y confía en los tipos robustos proporcionados por la librería next-intl.
3. Contrato de API
locales: const string[]: Array inmutable de todos los AppLocale soportados.
defaultLocale: AppLocale: El locale de fallback.
pathnames: const object: Mapeo de rutas estáticas canónicas.
Pathname: type: Un tipo de unión de los literales de las claves de pathnames, útil para tipar navegación estática.
Link, redirect, usePathname, useRouter: Hooks y componentes de next-intl pre-configurados y listos para usar.
4. Zona de Melhorias Futuras
MAPEAMENTO DE ROTAS LOCALIZADAS: Expandir el objeto pathnames para incluir traducciones de las rutas para cada locale (ej. /blog: { "it-IT": "/diario" }), una práctica de SEO de élite.
GENERACIÓN AUTOMÁTICA DE pathnames: Crear un script que escanee el directorio src/app/[locale] y genere automáticamente el objeto pathnames, previniendo desincronizaciones.
INTEGRACIÓN CON sitemap.xml: Hacer que el generador de sitemap importe directamente locales y pathnames de este archivo para asegurar que siempre estén sincronizados.
CONFIGURACIÓN DE DOMINIOS POR LOCALE: Extender la configuración de next-intl para soportar una estrategia de dominios por locale (ej. example.it, example.com).
// .docs-espejo/lib/navigation.ts.md