// .docs/functionality/013_ADVANCED_TELEMETRY_MANIFEST.md
/**
 * @file .docs/functionality/013_ADVANCED_TELEMETRY_MANIFEST.md
 * @description Manifiesto Funcional y Blueprint para la futura arquitectura de
 *              Telemetría Avanzada y Segmentación de Audiencia.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 */
# Manifiesto Funcional: Telemetría Avanzada para Segmentación de Élite

## 1. Rol Estratégico y Propósito

El propósito de esta arquitectura es evolucionar nuestro sistema de telemetría de un simple registro de visitas a un **motor de inteligencia de audiencia**. El objetivo es recopilar un conjunto rico de datos del entorno del visitante para permitir una segmentación profunda y la personalización de la experiencia del usuario, con el fin último de maximizar la tasa de conversión.

## 2. Inventario Exhaustivo de Puntos de Datos Recopilables

A continuación se detalla toda la información que podemos obtener de una petición, tanto del lado del servidor (Middleware) como del cliente.

### 2.1. Datos Obtenibles en el Servidor (Middleware - `NextRequest`)
*   **IP y Geolocalización:**
    *   `request.ip`: Dirección IP del visitante.
    *   `request.geo`: `{ country, city, region, latitude, longitude }` (provisto por Vercel).
*   **Cabeceras (Headers):**
    *   `user-agent`: Identificador del navegador y sistema operativo.
    *   `accept-language`: Preferencias de idioma del navegador.
    *   `referer`: La página anterior desde la que llegó el visitante.
*   **URL:**
    *   `pathname`: La ruta específica visitada.
    *   `searchParams`: Parámetros UTM y otros.

### 2.2. Datos Obtenibles en el Cliente (Navegador - `window.navigator`)
*   **User-Agent Client Hints (Moderno y de Élite):**
    *   `navigator.userAgentData`: Un objeto estructurado que proporciona información detallada y más respetuosa con la privacidad que el string `user-agent`.
    *   Propiedades clave:
        *   `brands`: `{ brand, version }` (ej. "Google Chrome", "128").
        *   `mobile`: `true` o `false`.
        *   `platform`: El sistema operativo (ej. "Windows", "macOS", "Android").
*   **Fingerprinting Básico:**
    *   `screen.width`, `screen.height`: Resolución de la pantalla.
    *   `navigator.language`: Idioma principal del navegador.
    *   `new Date().getTimezoneOffset()`: Zona horaria del usuario.
    *   `navigator.platform`: (Legado) Plataforma del sistema.
    *   `navigator.vendor`: (Legado) Fabricante del navegador.

## 3. Estrategia de Implementación (Faseado)

La implementación se realizará en fases, respetando la directiva de simplicidad actual.

*   **Fase 1 (Actual):** Implementar la recolección de datos del lado del servidor (`ip`, `geo`, `user-agent`, `referer`) a través del manejador de telemetría en el middleware. Esta es la base mínima funcional.

*   **Fase 2 (Futura):**
    1.  **Refactorizar `TelemetryProvider`:** Modificarlo para que, al montarse en el cliente, recopile los datos del `navigator` (priorizando `userAgentData`).
    2.  **Crear Server Action `enrichTelemetryEvent`:** Esta acción recibirá los datos del cliente y los añadirá al registro de sesión existente en la base de datos de logs.
    3.  **Helper de Inferencia:** Crear un helper `inferDeviceInfo(userAgentData, userAgentString)` que, basándose en la información recopilada, infiera y devuelva un objeto estructurado como `{ deviceType: 'mobile', os: 'iOS', brand: 'Apple', model: 'iPhone' }`.

## 4. Casos de Uso Estratégicos (El "Porqué")

La recopilación de estos datos nos permitirá:
*   **Segmentación por Poder Adquisitivo:** Como indicaste, identificar usuarios con dispositivos de gama alta (ej. "iPhone 16 Pro") permite dirigirles ofertas premium o un trato prioritario.
*   **Optimización de UI/UX:** Si detectamos que la mayoría de nuestros visitantes en Android usan Chrome, podemos priorizar las pruebas en ese entorno.
*   **Personalización de Contenido:** Mostrar testimonios o imágenes que resuenen más con usuarios de un país o región específica.
*   **Detección de Fraude:** Analizar patrones en el `fingerprint` para identificar tráfico de bots o fraudulento.
// .docs/functionality/013_ADVANCED_TELEMETRY_MANIFEST.md