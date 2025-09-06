<!-- .docs-espejo/app/[locale]/layout.tsx.md -->
/**
 * @file .docs-espejo/app/[locale]/layout.tsx.md
 * @description Documento Espejo y SSoT conceptual para el layout de locale.
 * @author L.I.A. Legacy
 * @version 6.0.0
 */
# Manifiesto Conceptual: Aparato `[locale]/layout.tsx`

## 1. Rol Estratégico y Propósito

Este aparato es el **fundamento de la estructura HTML y del contexto del cliente** para toda la aplicación. Actúa como el orquestador principal que ensambla todos los elementos globales para una página funcional, observable y estáticamente generable.

Sus responsabilidades son:
1.  **Habilitar el Renderizado Estático:** Implementa `unstable_setRequestLocale(locale)`, una directiva crítica para `next-intl` que permite la Generación de Sitio Estático (SSG).
2.  **Renderizar la Estructura HTML Raíz:** Es el único responsable de renderizar las etiquetas `<html>` y `<body>`.
3.  **Observabilidad de Extremo a Extremo:** Inyecta el `correlationId` del renderizado del servidor en un `meta` tag, sentando las bases para que el logger de cliente pueda lograr una trazabilidad completa.
4.  **Orquestar Proveedores de Contexto:** Envuelve la aplicación en todos los proveedores globales (`NextIntlClientProvider`, `GeoIPProvider`, etc.).
5.  **Validación de `locale`:** Realiza una validación temprana del `locale` contra la SSoT, invocando `notFound()` si es inválido.

## 2. Arquitectura de Proveedores

La arquitectura anidada de proveedores es crucial para el correcto funcionamiento de los hooks de cliente.

```mermaid
graph TD
    A[Petición a Next.js] --> B["`[locale]/layout.tsx`"];
    subgraph "Jerarquía de Proveedores"
        B -- "Renderiza" --> D["`CookiesProvider`"];
        D -- "Envuelve a" --> E["`NextIntlClientProvider`"];
        E -- "Envuelve a" --> F["`GeoIPProvider`"];
        F -- "Envuelve a" --> G["`TelemetryProvider`"];
        G -- "Envuelve a" --> H["`children` (Página actual)"];
    end
    B -- "Inyecta `meta[name=correlation-id]`" --> I[HTML Head];
3. Contrato de API
Props de Entrada: { children: ReactNode, params: { locale: string } }.
Salida: Un elemento <html lang={locale}> completo que contiene toda la estructura de la página.
4. Zona de Mejoras Nuevas (Valor al Proyecto)
Proveedor de Tema (ThemeProvider): Añadir un ThemeProvider para habilitar un selector de tema claro/oscuro.
Abstracción de Proveedores: Crear un único componente AppProviders.tsx que encapsule a todos los proveedores para mantener este layout más limpio.
Error Boundary de Cliente Global: Envolver children en un ErrorBoundary de React para capturar errores de renderizado del cliente y mostrar una UI de fallback amigable.
Inyección de nonce para CSP: Si se implementa una Content Security Policy (CSP) estricta, este layout sería responsable de generar y pasar un nonce a los componentes <Script>.
Banner de Consentimiento de Cookies: Integrar aquí un componente para gestionar el consentimiento de cookies (GDPR), que es una funcionalidad global.
<!-- .docs-espejo/app/[locale]/layout.tsx.md -->