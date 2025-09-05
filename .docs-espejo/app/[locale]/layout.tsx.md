// .docs-espejo/app/[locale]/layout.tsx.md
/**
 * @file .docs-espejo/app/[locale]/layout.tsx.md
 * @description Documento Espejo y SSoT conceptual para el layout de locale,
 *              que actúa como el layout raíz funcional de la aplicación.
 * @author RaZ Podestá - MetaShark Tech
 * @version 2.1.0
 */

# Manifiesto Conceptual: Aparato `[locale]/layout.tsx`

## 1. Rol Estratégico y Propósito

Este aparato es el **fundamento de la estructura HTML y del contexto del cliente** para toda la aplicación. Ha asumido la responsabilidad del layout raíz, convirtiéndose en el orquestador principal que ensambla todos los elementos globales necesarios para una página.

Sus responsabilidades son:

1.  **Renderizar la Estructura HTML Raíz:** Es el único responsable de renderizar las etiquetas `<html>` y `<body>`.
2.  **Configurar la Internacionalización (i18n):** Establece el atributo `lang` de la página de forma dinámica.
3.  **Cargar Recursos Globales:** Carga y aplica fuentes (`Inter`) y estilos (`globals.css`).
4.  **Orquestar Proveedores de Contexto:** Envuelve la aplicación en todos los proveedores (`CookiesProvider`, `NextIntlClientProvider`, `GeoIPProvider`), garantizando que los hooks del cliente (`useCookies`, `useTranslations`, `useGeoIP`) funcionen correctamente.
5.  **Inyectar Dependencias Críticas:** Utiliza el componente `<Script>` de Next.js para inyectar scripts de terceros esenciales para la lógica de negocio (`webvork.js`).

## 2. Arquitectura y Flujo de Ejecución

Es un Server Component que renderiza la estructura principal de la página y anida a los proveedores de cliente en el orden correcto.

```mermaid
graph TD
    A[Petición a Next.js] --> B["`app/layout.tsx` (Pass-through)"];
    B --> C["`[locale]/layout.tsx`"];
    C -- "Renderiza `<html>` y `<body>`" --> D[Estructura HTML];
    C -- "Carga Fuente `Inter` y `globals.css`" --> D;
    C -- "Renderiza y Configura" --> E["`CookiesProvider`"];
    E -- "Envuelve a" --> F["`NextIntlClientProvider`"];
    F -- "Envuelve a" --> G["`GeoIPProvider`"];
    G -- "Envuelve a" --> H["`children` (Página actual)"];
    C -- "Inyecta Scripts" --> D;
3. Contrato de API
Props de Entrada:
children: React.ReactNode: El contenido de la página renderizada por el App Router.
params: { locale: string }: El locale activo extraído de la URL.
Salida: Un elemento <html lang={locale}> completo que contiene toda la estructura de la página, los proveedores y los scripts.
4. Zona de Melhorias Futuras
PROVEEDOR DE TEMA (ThemeProvider): Añadir un ThemeProvider de next-themes para habilitar un selector de tema claro/oscuro.
ABSTRACCIÓN DE PROVEEDORES: Crear un único componente AppProviders que encapsule a todos los proveedores para mantener este layout más limpio.
ERROR BOUNDARY: Envolver children en un ErrorBoundary de React para capturar errores de renderizado del cliente de forma más elegante.
INYECCIÓN DE nonce PARA CSP: Si se implementa una Content Security Policy (CSP), este layout sería responsable de pasar el nonce a los componentes <Script>.
// .docs-espejo/app/[locale]/layout.tsx.md
