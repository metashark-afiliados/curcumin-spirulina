// sentry.edge.config.ts
/**
 * @file sentry.edge.config.ts
 * @description Configuración y SSoT para la inicialización de Sentry en el Edge Runtime.
 *              Nivelado para alinearse con la API del SDK `@sentry/nextjs@8.x`,
 *              eliminando propiedades obsoletas.
 * @author L.I.A. Legacy
 * @version 2.0.0
 * @see https://docs.sentry.io/platforms/javascript/guides/nextjs/
 */
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  // Obtiene el DSN desde las variables de entorno.
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Define qué tan probable es que se muestreen las trazas.
  tracesSampleRate: 1.0,

  // La propiedad `enableLogs` ha sido deprecada en esta versión del SDK.

  // Activar `debug: true` imprimirá información útil en la consola durante la configuración.
  debug: false,
});
// sentry.edge.config.ts
