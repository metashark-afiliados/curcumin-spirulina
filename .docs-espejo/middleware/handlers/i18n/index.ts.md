// .docs-espejo/middleware/handlers/i18n/index.ts.md
/**
 * @file .docs-espejo/middleware/handlers/i18n/index.ts.md
 * @description Documento Espejo y SSoT conceptual para el aparato `i18n/index.ts`.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 */
# Manifiesto Conceptual: Manejador de Middleware de i18n

## 1. Rol Estratégico y Propósito

Este aparato es el **Orquestador de la Experiencia de Usuario Lingüística**. Actúa como el primer punto de contacto lógico en el pipeline del middleware para personalizar la experiencia del visitante.

Su propósito estratégico es consumir el resultado del `locale-detector.helper` y ejecutar la lógica de enrutamiento apropiada. Es el componente que traduce la "intención" del usuario (detectada) en una "acción" (renderizar la página en el idioma correcto o redirigir al selector de idioma).

## 2. Arquitectura y Flujo de Ejecución

El manejador opera como una máquina de estados simple basada en el resultado del `detectLocale`.

```mermaid
graph TD
    A[Petición Entrante] --> B(Invoca `detectLocale`);
    B --> C{Método de detección fue 'default'?};
    C -- Sí --> D[Redirige a `/select-language`];
    C -- No --> E[Crea instancia de `next-intl/middleware` <br> con el locale detectado];
    E --> F[Ejecuta y retorna la respuesta de `next-intl`];
    D --> G[Fin del Pipeline];
    F --> G;
3. Contrato de API
handleI18n(request: NextRequest, response: NextResponse): Promise<NextResponse>
Entrada:
request: El objeto de petición entrante.
response: El objeto de respuesta del manejador anterior en el pipeline.
Salida: Una Promise que resuelve a un objeto NextResponse, que puede ser una redirección o una respuesta procesada por next-intl.
4. Zona de Melhorias Futuras
Cacheo de Redirección: Para usuarios que llegan repetidamente sin cookie, la decisión de redirigir a /select-language podría ser cacheada (ej. en Vercel KV por IP) por un corto período.
Parámetro de Redirección next: La redirección a /select-language podría incluir un parámetro ?next= con la URL original, para que después de seleccionar un idioma, el usuario sea devuelto a la página que intentaba visitar.
Pruebas A/B de Idioma: Integrar con un sistema de feature flags para, en el caso de default, redirigir a un pequeño porcentaje de usuarios a un defaultLocale diferente para probar tasas de conversión.
Logging de Accept-Language: Registrar la cabecera Accept-Language completa en la telemetría para un análisis más profundo de las preferencias de idioma de los visitantes.
Manejo de Bots: Añadir una lógica para que los bots de motores de búsqueda siempre sean servidos con el defaultLocale para garantizar una indexación consistente.
Configuración de Rutas Excluidas: Permitir que el manejador reciba una lista de rutas a excluir del procesamiento de i18n (ej. /api/health).
Soporte para Dominios por Locale: Extender la lógica para soportar una configuración donde cada idioma tenga su propio dominio (ej. mi-sitio.it, mi-sitio.es).
Refactorización a Clase: Para una lógica más compleja, el manejador podría ser refactorizado a una clase I18nHandler para una mejor organización.
Almacenamiento de Preferencia: Después de una detección exitosa por GeoIP o cabecera, establecer proactivamente la cookie NEXT_LOCALE para que las visitas subsiguientes sean más rápidas.
Internacionalización de la Documentación: Traducir este documento espejo.
// .docs-espejo/middleware/handlers/i18n/index.ts.md