// .docs-espejo/middleware/handlers/i18n/index.ts.md
/\*\*

- @file .docs-espejo/middleware/handlers/i18n/index.ts.md
- @description Documento Espejo y SSoT conceptual para el manejador de i18n.
- @author RaZ Podestá - MetaShark Tech
- @version 1.0.0
  \*/

# Manifiesto Conceptual: Aparato `handleI18n`

## 1. Rol Estratégico y Propósito

Este aparato es el **guardián de la internacionalización en el Edge**. Su única responsabilidad es interceptar cada petición, determinar el `locale` correcto para el usuario y configurar el contexto de `next-intl` antes de que la petición llegue a los componentes del servidor.

Actúa como una capa de abstracción sobre la librería `next-intl`, centralizando su configuración y lógica en un único punto atómico dentro del pipeline del middleware.

## 2. Arquitectura y Flujo de Ejecución

El manejador delega la lógica principal a `createNextIntlMiddleware`, pero la enriquece con observabilidad.

```mermaid
graph TD
    A[Petición Entrante] --> B["`handleI18n`"];
    B -- "Configura y Llama a" --> C["`createNextIntlMiddleware`"];
    C -- "Detecta locale (cookie/header/default)" --> C;
    C -- "Retorna `NextResponse` con cookie y cabeceras" --> B;
    B -- "Añade cabecera `x-app-locale`" --> B;
    B --> D[Retorna `NextResponse` al Orquestador];
3. Contrato de API
handleI18n(request: NextRequest): Promise<NextResponse>:
Entrada: NextRequest.
Salida: Una promesa que resuelve a NextResponse, que puede ser una redirección (si falta el locale en la URL) o la respuesta original con cabeceras de i18n añadidas.
4. Zona de Mejoras Futuras
Detección por GeoIP: Implementar una llamada al servicio lookupIpAddress para detectar el país del usuario y mapearlo a un locale por defecto. Esto mejoraría la experiencia del primer contacto para usuarios sin cookies o cabeceras de idioma configuradas.
Fallback de Locale Inteligente: Si un locale detectado (ej. fr-FR) no está en nuestra lista de locales soportados, implementar una lógica de fallback más inteligente que busque un idioma base (en-US) en lugar de simplemente usar el defaultLocale global.
A/B Testing de Locales: Integrar con un sistema de feature flags para poder forzar un locale específico a un porcentaje de usuarios, permitiendo pruebas de mercado.
Configuración de Rutas Excluidas: Permitir pasar un array de rutas a excluir explícitamente del procesamiento de i18n.
Cacheo de Detección: Cachear el resultado de la detección de locale (especialmente de GeoIP) en Vercel KV para reducir la latencia en peticiones subsiguientes de la misma IP.
Documentación en Español: Traducir este documento espejo al español.
Soporte para Dominios por Locale: Extender la lógica para soportar una estrategia de i18n basada en dominios (ej. dominio.es, dominio.it) además de prefijos de ruta.
Logging de Performance: Medir y registrar el tiempo de ejecución específico de este manejador para monitorear su impacto en la latencia total del middleware.
Pruebas de Integración: Crear un arnés de pruebas de integración que simule diferentes NextRequest (con varias cookies y cabeceras Accept-Language) y verifique que el locale detectado es el correcto.
Manejo de Errores de next-intl: Envolver la llamada a handle(request) en un try/catch para manejar y registrar cualquier error inesperado que pueda provenir de la librería next-intl.
// .docs-espejo/middleware/handlers/i18n/index.ts.md
```
