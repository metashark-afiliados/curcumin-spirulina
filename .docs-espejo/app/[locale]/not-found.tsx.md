// .docs-espejo/app/[locale]/not-found.tsx.md
/**
 * @file .docs-espejo/app/[locale]/not-found.tsx.md
 * @description Documento Espejo y SSoT conceptual para el manejador de 404 de locale.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 */
# Manifiesto Conceptual: `app/[locale]/not-found.tsx` (Locale Not Found)

## 1. Rol Estratégico y Propósito

Este aparato es el **Manejador de Errores 404 Internacionalizado**. Su responsabilidad es capturar peticiones a rutas que tienen un prefijo de `locale` válido pero que no corresponden a ninguna página existente.

Su propósito estratégico es proporcionar una experiencia de error localizada y amigable, manteniendo al usuario dentro del contexto lingüístico de su sesión y evitando el mensaje genérico del navegador.

## 2. Arquitectura y Flujo de Ejecución

Es un Server Component soberano que sigue la arquitectura IMAS para su contenido.

```mermaid
graph TD
    A[Petición a `/it-IT/ruta-invalida`] --> B{Next.js App Router};
    B -- No encuentra coincidencia en `/it-IT` --> C[Renderiza `app/[locale]/not-found.tsx`];
    subgraph "Lógica del Componente"
      C --> D[Establece locale con `unstable_setRequestLocale`];
      D --> E[Carga traducciones de `not-found.json`];
      E --> F[Valida contenido con `NotFoundContentSchema`];
      F --> G[Log de `warn` con contexto];
      G --> H(Renderiza `FullScreenError` con contenido traducido);
    end
3. Contrato de API
Entradas: Recibe params.locale del App Router.
Salidas: La Promise<React.ReactElement> que resuelve al JSX de la página 404 traducida.
4. Zona de Melhorias Futuras
Sugerencias de Páginas: Implementar una lógica de búsqueda "fuzzy" en el servidor que compare la ruta no encontrada con las rutas válidas y sugiera enlaces a páginas similares.
Integración con Sentry: Enviar un Sentry.captureMessage con severidad warning para tener una visibilidad clara de los 404s en Sentry.
Reporte de Enlaces Rotos: Incluir un botón de "Reportar enlace roto" que envíe un evento de telemetría con la URL actual y el document.referrer.
Sitemap en la Página 404: Mostrar una versión simplificada del sitemap del sitio para ayudar al usuario a encontrar lo que busca.
Pruebas de Integración: Escribir una prueba de Playwright que navegue a una ruta 404 para cada locale y verifique que el texto se muestra en el idioma correcto.
Contenido de 404 Personalizado: Cargar contenido diferente desde el CMS basándose en la sección de la ruta no encontrada (ej. un 404 para /blog/* vs. /products/*).
Humor y Branding: Añadir un toque de humor o una ilustración de marca en el componente FullScreenError para hacer la experiencia de error menos frustrante.
Logging de Referer: Asegurarse de que el log de warn incluya la cabecera Referer para poder identificar de dónde provienen los enlaces rotos.
Cacheo Inteligente: Configurar el cacheo de la página 404 para que sea servida rápidamente desde el Edge.
Internacionalización de la Documentación: Traducir este documento espejo.
// .docs-espejo/app/[locale]/not-found.tsx.md
