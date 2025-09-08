// sentry.server.config.ts
/**
 * @file sentry.server.config.ts
 * @description Configuración y SSoT para la inicialización de Sentry en el servidor.
 *              Nivelado para alinearse con la API del SDK `@sentry/nextjs@8.x`,
 *              eliminando propiedades obsoletas y obteniendo el DSN desde las
 *              variables de entorno.
 * @author L.I.A. Legacy
 * @version 2.0.0
 * @see https://docs.sentry.io/platforms/javascript/guides/nextjs/
 */
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  // Obtiene el DSN desde las variables de entorno para mayor seguridad y flexibilidad.
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Define qué tan probable es que se muestreen las trazas.
  // Ajustar este valor en producción o usar tracesSampler para un mayor control.
  tracesSampleRate: 1.0,

  // La propiedad `enableLogs` ha sido deprecada en esta versión del SDK.
  // La captura de logs se gestiona a través de integraciones o transportes, como `pino-sentry-transport`.

  // Activar `debug: true` imprimirá información útil en la consola durante la configuración.
  debug: false,
});
// sentry.server.config.ts
