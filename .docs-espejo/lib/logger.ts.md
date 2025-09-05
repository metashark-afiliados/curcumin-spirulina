// .docs-espejo/lib/logger.ts.md
/**
 * @file .docs-espejo/lib/logger.ts.md
 * @description Documento Espejo y SSoT conceptual para el aparato de Logging.
 * @author L.I.A. Legacy
 * @version 1.0.0
 */
# Manifiesto Conceptual: Aparato `logger`

## 1. Rol Estratégico y Propósito

Este aparato es el **sistema nervioso central de la observabilidad** de la aplicación. Su propósito es proporcionar una interfaz unificada, segura y de alto rendimiento para registrar eventos tanto en el servidor como en el cliente. Es la implementación técnica del "Pilar de Observabilidad" definido en los manifiestos de arquitectura.

## 2. Arquitectura y Flujo de Ejecución

El aparato se divide en dos componentes soberanos y desacoplados:

-   **`serverLogger` (Pino):**
    -   **Motor:** Utiliza la biblioteca `pino` por su rendimiento superior en la serialización de JSON.
    -   **Enriquecimiento:** Se integra con `correlation-id.helper.ts` para inyectar automáticamente un `correlationId` en cada log, permitiendo la trazabilidad completa de una petición.
    -   **Seguridad:** Consume `logger.config.ts` para censurar datos sensibles (`REDACTED_PATHS`) antes de que salgan de la aplicación.
    -   **Flujo de Salida:** En desarrollo, utiliza `pino-pretty` para una salida legible. En producción, emite JSON crudo a `stdout`, desacoplando la aplicación de la herramienta de recolección de logs (Vercel Logs, Datadog, etc.).

-   **`clientLogger` (Wrapper de `console`):**
    -   **Motor:** Actúa como un wrapper seguro alrededor de la API `console` del navegador.
    -   **Resiliencia:** La factoría `createSafeConsoleMethod` garantiza que las llamadas al logger no rompan la aplicación en entornos donde `console` no esté disponible.
    -   **Control de Ambiente:** Es verboso en `development` para facilitar la depuración, pero suprime los logs de `trace` e `info` en `production` para no contaminar la consola del usuario final y optimizar el rendimiento.

## 3. Contrato de API

-   **`serverLogger`**: `pino.Logger`
    -   **Firma de Uso:** `serverLogger.level({ contexto }, "mensaje")`
-   **`clientLogger`**: `{ trace, info, warn, error }`
    -   **Firma de Uso:** `clientLogger.level("mensaje", ...argumentosOpcionales)`

## 4. Zona de Melhorias Futuras

1.  **TRANSPORTE A SENTRY (SERVIDOR):** Implementar un transporte de `pino` (`pino-sentry-transport`) que envíe automáticamente los logs de nivel `error` y `fatal` a Sentry, enriquecidos con el `correlationId`.
2.  **TRANSPORTE A LOG DRAIN (CLIENTE):** Para una observabilidad completa del frontend, el `clientLogger` en producción podría enviar logs de `warn` y `error` a un endpoint de API (`/api/log-client-event`) que los registre en el `serverLogger`.
3.  **CONFIGURACIÓN DINÁMICA DE NIVEL:** Permitir que el `logLevel` pueda ser modificado dinámicamente en producción a través de variables de entorno o un feature flag, para facilitar la depuración en vivo sin necesidad de un redespliegue.
4.  **CONTEXTO GLOBAL AUTOMÁTICO:** Crear un wrapper para las Server Actions (`withActionContext`) que inyecte automáticamente información contextual relevante (como `userId` y `workspaceId`) en el `AsyncLocalStorage` para que aparezca en todos los logs de esa acción.
5.  **MÉTRICAS DE LOGGING:** Integrar métricas que registren el volumen de logs generados por nivel, para monitorear la salud de la aplicación y detectar picos de errores.
6.  **SOPORTE PARA MÚLTIPLES TRANSPORTES:** Refactorizar la configuración del transporte para permitir fácilmente múltiples destinos (ej. `stdout`, Sentry y un archivo local simultáneamente).
7.  **SANEAMIENTO DE CONTEXTO:** Implementar una función de saneamiento que se aplique al objeto de contexto en el `serverLogger` para prevenir la inyección de objetos circulares o datos excesivamente grandes.
8.  **DOCUMENTACIÓN EN ESPAÑOL:** Traducir este documento espejo al español para mantener la consistencia.
9.  **LOGGER DE PERFORMANCE:** Crear una instancia de logger especializada (`performanceLogger`) con un formato específico para registrar métricas de rendimiento (ej. tiempos de ejecución de funciones críticas).
10. **INTEGRACIÓN CON STORYBOOK:** Crear decoradores para Storybook que mockeen el `clientLogger` y muestren los logs en un panel de "Actions", facilitando la depuración de componentes de UI de forma aislada.

// .docs-espejo/lib/logger.ts.md