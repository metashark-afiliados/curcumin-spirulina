// .docs-espejo/lib/navigation.ts.md
/**
 * @file .docs-espejo/lib/navigation.ts.md
 * @description Documento Espejo y SSoT conceptual para el aparato `navigation.ts`.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 2.0.0
 */
# Manifiesto Conceptual: `navigation.ts`

## 1. Rol Estratégico y Propósito

Este aparato es el **Orquestador de Enrutamiento Internacionalizado**. Su propósito es configurar y exportar las utilidades de navegación de `next-intl`, actuando como la SSoT para todas las operaciones de enrutamiento en la aplicación.

Consume la SSoT de locales (`locales.config.ts`) y la SSoT de rutas (`pathnames`) para generar componentes y hooks (`Link`, `useRouter`, etc.) que son conscientes del idioma y tipo-seguros.

## 2. Arquitectura y Flujo de Ejecución

Es un módulo de configuración que se ejecuta en el servidor durante la inicialización y el build, y exporta utilidades para ser usadas tanto en el servidor como en el cliente.

```mermaid
graph TD
    A["locales.config.ts <br> (SSoT de Locales)"] --> C{createLocalizedPathnamesNavigation};
    B["pathnames (Objeto de Rutas)"] --> C;
    C --> D["{ Link, redirect, <br> usePathname, useRouter }"];
    D --> E[Toda la Aplicación];
3. Contrato de API
locales: Un array de solo lectura de los códigos de locale activos para la aplicación.
defaultLocale: El código del locale por defecto.
pathnames: El mapeo de rutas canónicas.
Link, redirect, usePathname, useRouter: Las utilidades de navegación de next-intl, pre-configuradas.
Route: Un tipo de TypeScript que garantiza que solo se puedan usar rutas definidas en pathnames.
4. Zona de Melhorias Futuras
Enrutamiento Dinámico de Blog: Extender pathnames para soportar rutas de blog dinámicas (/blog/[slug]).
Traducción de Rutas (Pathname Internationalization): Implementar la traducción de las propias URLs (ej. /es-ES/sobre-nosotros en lugar de /es-ES/about) para un mejor SEO.
Middleware de Autenticación de Rutas: Integrar un middleware que verifique los permisos del usuario antes de permitir la navegación a rutas protegidas.
Generador de pathnames: Crear un script que escanee el directorio /app y genere automáticamente el objeto pathnames para evitar desincronizaciones.
Tipado Avanzado de Route: Mejorar el tipo Route para que sea consciente de los parámetros de ruta dinámicos (ej. Route<{ slug: string }>).
Pruebas de Enrutamiento: Escribir pruebas de integración que verifiquen que todas las rutas en pathnames renderizan el componente correcto para cada locale.
Hook useActiveRoute: Crear un hook personalizado que devuelva true si la ruta actual coincide con una ruta o un patrón de ruta dados, simplificando la lógica de estado "activo" en los componentes de navegación.
Gestión de Parámetros de Búsqueda: Extender los componentes Link y useRouter con helpers para manipular los searchParams de forma tipo-segura.
Prefetching Estratégico: Implementar una estrategia de pre-fetching más agresiva en los componentes Link para las rutas más visitadas, mejorando la performance percibida.
Internacionalización de la Documentación: Traducir este documento espejo.
// .docs-espejo/lib/navigation.ts.md