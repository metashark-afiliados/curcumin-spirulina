<!-- .docs-espejo/app/[locale]/layout.tsx.md -->
/**
 * @file .docs-espejo/app/[locale]/layout.tsx.md
 * @description Documento Espejo y SSoT conceptual para el layout de locale,
 *              que actúa como el layout raíz funcional de la aplicación.
 * @author L.I.A. Legacy
 * @version 4.2.0
 */

# Manifiesto Conceptual: Aparato `[locale]/layout.tsx`

## 1. Rol Estratégico y Propósito

Este aparato es el **fundamento de la estructura HTML y del contexto del cliente** para toda la aplicación. Actúa como el orquestador principal que ensambla todos los elementos globales necesarios para una página funcional y observable.

Sus responsabilidades son:

1.  **Renderizar la Estructura HTML Raíz:** Es el único responsable de renderizar las etiquetas `<html>` y `<body>`, configurando el atributo `lang` dinámicamente.
2.  **Configurar la Internacionalización (i18n):** Establece el `NextIntlClientProvider` para el `locale` actual, proporcionando los mensajes ensamblados a los Client Components.
3.  **Cargar Recursos Globales:** Carga y aplica fuentes (`Inter`) y estilos (`globals.css`).
4.  **Orquestar Proveedores de Contexto:** Envuelve la aplicación en todos los proveedores globales (`CookiesProvider`, `GeoIPProvider`, `TelemetryProvider`), garantizando que los hooks del cliente funcionen correctamente.
5.  **Validación de Locale:** Realiza una validación temprana del `locale` extraído de la URL contra la SSoT de locales (`src/lib/navigation.ts`), redirigiendo a una página 404 si el locale no es soportado.
6.  **Inyectar Dependencias Críticas:** Utiliza el componente `<Script>` de Next.js para inyectar scripts de terceros esenciales para la lógica de negocio (`jquery-3.5.1.min.js`, `webvork.js`).
7.  **Observabilidad de Élite:** Utiliza `serverLogger` (con la API unificada `(context, message)`) para registrar eventos clave de su ciclo de vida (generación de static params, validación de locale, renderizado), contribuyendo a la trazabilidad de extremo a extremo.

## 2. Arquitectura de Proveedores

La arquitectura anidada de proveedores es crucial para el correcto funcionamiento de los hooks de cliente.

```mermaid
graph TD
    A[Petición a Next.js] --> B["`[locale]/layout.tsx`"];
    subgraph "Jerarquía de Proveedores"
        B -- "Renderiza" --> C["`CookiesProvider`"];
        C -- "Envuelve a" --> D["`NextIntlClientProvider`"];
        D -- "Envuelve a" --> E["`GeoIPProvider`"];
        E -- "Envuelve a" --> F["`TelemetryProvider`"];
        F -- "Envuelve a" --> G["`children` (Página actual)"];
        G -- "Envuelve a" --> H["`<Toaster />` (Notificaciones)"];
    end
    B -- "Utiliza `serverLogger`" --> I[Registro de Observabilidad];
    B -- "Inyecta Scripts con `<Script>`" --> J[Head del HTML];
3. Contrato de API
Props de Entrada:
children: React.ReactNode: El contenido de la página renderizada por el App Router.
params: { locale: string }: El locale activo extraído de la URL.
Salida:
Un elemento <html lang={locale}> completo que contiene toda la estructura de la página, los proveedores y los scripts.
4. Zona de Mejoras Nuevas (Valor al Proyecto)
PROVEEDOR DE TEMA (ThemeProvider): Añadir un ThemeProvider de next-themes u otra librería para habilitar un selector de tema claro/oscuro en toda la aplicación, permitiendo a los usuarios personalizar su experiencia visual.
ABSTRACCIÓN DE PROVEEDORES EN UN ÚNICO COMPONENTE: Crear un único componente AppProviders.tsx que encapsule a todos los proveedores (CookiesProvider, NextIntlClientProvider, etc.) y lo renderice dentro de este layout. Esto mantendría layout.tsx más limpio y fácil de leer.
ERROR BOUNDARY DE CLIENTE GLOBAL: Envolver children en un ErrorBoundary de React (para errores de renderizado del cliente) que, si se dispara, capture el error con clientLogger (y Sentry) y muestre una UI de fallback amigable, mejorando la resiliencia en el cliente.
INYECCIÓN DE nonce PARA CSP (Content Security Policy): Si se implementa una Content Security Policy (CSP) estricta, este layout sería responsable de generar y pasar un nonce a los componentes <Script> y a cualquier script o estilo inyectado dinámicamente, mejorando significativamente la seguridad contra ataques XSS.
GESTIÓN DE ESTADO GLOBAL LIGERO (Ej. Zustand/Context): Si la aplicación crece en complejidad y requiere un estado global de cliente compartido (ej. para preferencias del usuario, estado de la UI), este sería el lugar canónico para integrar un proveedor de estado ligero (ej. ZustandProvider o un CustomContextProvider).
<!-- .docs-espejo/app/[locale]/layout.tsx.md -->