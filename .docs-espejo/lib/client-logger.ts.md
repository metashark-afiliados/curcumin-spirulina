<!-- .docs-espejo/lib/client-logger.ts.md -->
/**
 * @file .docs-espejo/lib/client-logger.ts.md
 * @description Documento Espejo y SSoT conceptual para el aparato de logging del cliente.
 * @author L.I.A. Legacy
 * @version 1.0.0
 */
# Manifiesto Conceptual: Aparato `client-logger.ts` (Client-Side)

## 1. Rol Estratégico y Propósito

Este aparato es la **Única Fuente de Verdad (SSoT) para el sistema de logging del lado del cliente**. Su propósito es proporcionar una API de logging ultra-ligera, segura y consistente para todas las operaciones que se ejecutan en el entorno del navegador (Client Components, Hooks, Event Handlers).

Como aparato soberano y atómico, sus responsabilidades son:

1.  **Emisión de Logs Segura:** Utiliza un wrapper sobre los métodos nativos de `console` para emitir mensajes. Garantiza que el logging solo se realice cuando `console` y el método específico están disponibles, previniendo errores en entornos donde `console` podría ser suprimido.
2.  **API Unificada:** Implementa la interfaz `ILogger` (desde `src/lib/types/logging.ts`), asegurando que su firma `(context: LogContext, message: string)` sea consistente con el `serverLogger`. Esto reduce la carga cognitiva y mejora la experiencia del desarrollador (DX).
3.  **Contexto Enriquecido:** Permite adjuntar un objeto `LogContext` a cada mensaje, proporcionando información adicional estructurada que puede ser útil para la depuración en las herramientas de desarrollo del navegador.
4.  **Optimización del Bundle:** La directiva `"use client";` al principio del archivo indica a Next.js que este módulo está destinado al cliente, asegurando que solo el código relevante se incluya en el bundle del navegador y evitando dependencias innecesarias del lado del servidor.

## 2. Arquitectura y Flujo de Ejecución

Es un módulo de cliente puro (`"use client"`) que exporta una instancia de logger configurada.

```mermaid
graph TD
    A["`src/lib/types/logging.ts` <br> (ILogger, LogContext)"] --> B["`src/lib/client-logger.ts`"];

    B -- "1. Define `createSafeConsoleMethod`" --> C["`clientLogger` (ILogger)"];
    C -- "2. Se expone como `clientLogger`" --> D[Client Components, Client Hooks];
    D -- "3. Invoca `clientLogger.info({ context }, 'message')`" --> C;
    C -- "4. Formatea y llama a `console.method()`" --> E[Consola del Navegador (Developer Tools)];
3. Contrato de API
clientLogger: ILogger:
Propósito: La instancia principal del logger de cliente.
Métodos: trace (mapeado a console.debug), info, warn, error, todos siguiendo la firma (context: LogContext, message: string).
4. Zona de Mejoras Nuevas (Valor al Proyecto)
Captura y Envío de Logs a Telemetría: Integrar clientLogger con el sistema de telemetría (como TelemetryProvider) para que los logs emitidos puedan ser agrupados y enviados a un endpoint del servidor para persistencia centralizada, especialmente los logs de warn y error.
Filtrado Dinámico de Niveles: Permitir la configuración dinámica del nivel de log mínimo en el cliente (ej. a través de una variable de entorno inyectada en el build o una configuración remota), para poder ajustar la verbosidad en producción o staging.
Enriquecimiento Automático de Contexto: Explorar la posibilidad de inyectar automáticamente información contextual común (ej. sessionId, browserInfo, path) en cada LogContext sin que el desarrollador tenga que pasarla explícitamente.
Integración con Sentry (Frontend): Configurar clientLogger.error para que, además de a la consola, envíe los errores críticos a Sentry de forma estructurada.
Formateo de Salida Personalizable: Ofrecer la posibilidad de configurar el formato de salida para la consola del navegador, permitiendo mensajes más concisos o detallados según la preferencia del desarrollador.
<!-- .docs-espejo/lib/client-logger.ts.md -->