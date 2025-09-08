// src/instrumentation-client.ts
/**
 * @file src/instrumentation-client.ts
 * @description Configuración y SSoT para la inicialización de Sentry en el cliente.
 *              Nivelado para alinearse con la API del SDK `@sentry/nextjs@8.x`,
 *              eliminando propiedades y exportaciones obsoletas para resolver
 *              errores de tipo.
 * @author L.I.A. Legacy
 * @version 2.0.0
 * @see https://docs.sentry.io/platforms/javascript/guides/nextjs/
 */

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Integraciones para funcionalidades adicionales. `replayIntegration` ha sido reemplazado por `Replay`.
  integrations: [
    Sentry.replayIntegration({
      // Opciones adicionales de Replay si son necesarias.
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],

  // La tasa de muestreo de trazas. Ajustar este valor en producción.
  tracesSampleRate: 1.0,

  // La propiedad `enableLogs` ha sido deprecada en esta versión del SDK.
  // La captura de logs se gestiona a través de integraciones o transportes.

  // Tasa de muestreo para eventos de Replay.
  replaysSessionSampleRate: 0.1,

  // Tasa de muestreo para eventos de Replay cuando ocurre un error.
  replaysOnErrorSampleRate: 1.0,

  // Habilitar `debug: true` imprimirá información útil en la consola durante la configuración.
  debug: false,
});

// La exportación `onRouterTransitionStart` ya no es necesaria ni está disponible.
// El tracing de Sentry maneja las transiciones de ruta automáticamente.
// src/instrumentation-client.ts
