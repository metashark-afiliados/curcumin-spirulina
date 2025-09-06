// src/i18n.ts
/**
 * @file src/i18n.ts
 * @description Orquestador de Internacionalización de Élite y Única Fuente de Verdad (SSoT)
 *              para la carga dinámica de mensajes del lado del servidor.
 *              Implementa la Arquitectura Atómica Espejada (IMAS) para la gestión
 *              de traducciones, asegurando un rendimiento óptimo y la correcta
 *              pre-renderización estática (SSG) de todas las páginas internacionalizadas.
 *              Valida el locale contra la SSoT canónica y proporciona trazabilidad
 *              de logs mediante `correlationId`. Resuelve los problemas de tipado
 *              y carga de módulos de mensajes, permitiendo un build limpio.
 * @author L.I.A. Legacy
 * @version 2.0.0
 * @see .docs-espejo/i18n.ts.md
 * @see .docs/I18N_MANIFESTO_V2.md (Manifiesto de Arquitectura IMAS)
 * @see src/lib/navigation.ts (SSoT para `locales`)
 * @see src/messages/manifest.ts (SSoT para el mapa de módulos de mensajes)
 * @see src/lib/helpers/set-nested-property.helper.ts (Helper para ensamblar objetos anidados)
 * @see src/lib/logger.ts (SSoT para el logger de servidor)
 * @see src/lib/helpers/correlation-id.helper.ts (SSoT para `withCorrelationId`)
 * @see src/messages/types.ts (SSoT para `AbstractIntlMessages`)
 */
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { logger } from "./lib/logger"; // SSoT del logger de servidor
import { locales, type AppLocale } from "./lib/navigation"; // SSoT de los locales soportados
import { messagesManifest } from "./messages/manifest"; // SSoT del manifiesto de mensajes
import { setNestedProperty } from "./lib/helpers/set-nested-property.helper"; // Helper para anidar propiedades
import { withCorrelationId } from "./lib/helpers/correlation-id.helper"; // Para trazabilidad
import { type AbstractIntlMessages } from "./messages/types"; // Importamos el tipo AbstractIntlMessages

/**
 * @public
 * @function getRequestConfig
 * @description Punto de entrada para la configuración de `next-intl` en el servidor.
 *              Esta función:
 *              1. Envuelve su ejecución con `withCorrelationId` para trazabilidad de logs.
 *              2. Valida que el `locale` solicitado sea uno de los soportados por la aplicación,
 *                 utilizando la SSoT `locales` de `src/lib/navigation.ts`.
 *              3. Carga dinámicamente y ensambla todos los módulos de mensajes relevantes
 *                 para el `locale` actual, siguiendo la arquitectura IMAS y utilizando
 *                 `src/messages/manifest.ts` y `setNestedProperty`.
 *              4. Tipa el objeto de mensajes resultante como `AbstractIntlMessages`
 *                 para asegurar la compatibilidad con `next-intl`.
 *              5. Retorna el objeto de mensajes completamente ensamblado para `next-intl`.
 * @param {object} params
 * @param {string} params.locale - El locale detectado por el middleware (ej. "it-IT").
 * @returns {Promise<object>} La configuración de mensajes para `next-intl`, incluyendo
 *          el objeto de mensajes ensamblado y, opcionalmente, la `timeZone` por defecto.
 */
export default getRequestConfig(async ({ locale }) =>
  withCorrelationId(async () => {
    logger.trace({ locale }, "[i18n] Iniciando getRequestConfig.");

    // 1. Validar que el locale solicitado sea uno de los soportados por la SSoT.
    // Usamos `locale as AppLocale` después de la verificación para garantizar el tipado correcto.
    if (!locales.includes(locale as AppLocale)) {
      logger.warn(
        { requestedLocale: locale },
        "[i18n] Se solicitó un locale no válido o no soportado. Devolviendo 404."
      );
      // next/navigation `notFound()` es el patrón recomendado para locales no válidos.
      notFound();
    }

    // Inicializamos el objeto de mensajes tipado correctamente como AbstractIntlMessages.
    const messages: AbstractIntlMessages = {};

    // 2. Cargar dinámicamente y ensamblar todos los módulos de mensajes.
    // Itera sobre el `messagesManifest` (SSoT de los namespaces).
    for (const namespace in messagesManifest) {
      // Aseguramos que la propiedad realmente pertenece al objeto y no es una propiedad heredada.
      if (Object.prototype.hasOwnProperty.call(messagesManifest, namespace)) {
        try {
          // Importa dinámicamente el módulo de mensajes.
          // module.default es de tipo MessageModule (ej. { "it-IT": { ... }, "en-US": { ... } })
          const module = await messagesManifest[namespace]();
          // Extrae las traducciones para el locale actual, ya validado como AppLocale.
          const localeMessages = module.default[locale as AppLocale];

          if (localeMessages) {
            // Ensambla el objeto de mensajes anidado usando setNestedProperty.
            // Ejemplo: namespace "components.ui.OrderForm" y localeMessages
            // se convierte en messages.components.ui.OrderForm = localeMessages
            setNestedProperty(messages, namespace, localeMessages);
            logger.trace(
              { namespace, locale },
              `[i18n] Namespace '${namespace}' cargado para locale '${locale}'.`
            );
          } else {
            logger.warn(
              { namespace, locale },
              `[i18n] Namespace '${namespace}' no contiene traducciones para el locale '${locale}'. Se ignorará.`
            );
          }
        } catch (error) {
          logger.error(
            { err: error, namespace, locale },
            `[i18n] Error crítico al cargar o procesar el namespace '${namespace}' para el locale '${locale}'.`
          );
          // Un error aquí podría significar un archivo JSON corrupto o faltante.
          // Aunque lo logueamos, no detenemos el proceso para ser resilientes si otros namespaces son válidos.
        }
      }
    }

    logger.info(
      { locale, loadedNamespaces: Object.keys(messagesManifest).length },
      "[i18n] Mensajes de internacionalización ensamblados con éxito."
    );

    // 3. Devolver la configuración final para `next-intl`.
    return {
      messages,
      // Opcional: Configurar timeZone y formatos para next-intl para un renderizado consistente.
      // timeZone: 'Europe/Rome', // Ejemplo: Configurar una zona horaria por defecto
      // formats: {
      //   dateTime: {
      //     short: {
      //       year: 'numeric',
      //       month: 'short',
      //       day: 'numeric',
      //     },
      //   },
      // },
    };
  })
);
// src/i18n.ts
