// src/i18n.ts
/**
 * @file src/i18n.ts
 * @description Orquestador de Internacionalización del Servidor (SSoT).
 *              Este aparato es una función pura, despojada de efectos secundarios
 *              (como el logging) para garantizar la compatibilidad con el motor de
 *              renderizado de Next.js y `next-intl`, resolviendo el conflicto
 *              `RSC-AsyncLocalStorage-Compatibility`. Su única responsabilidad es
 *              ensamblar los mensajes para una petición y locale específicos.
 * @author L.I.A. Legacy
 * @version 7.0.0
 * @see .docs-espejo/i18n.ts.md
 */
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { setNestedProperty } from "./lib/helpers/set-nested-property.helper";
import { locales, type AppLocale } from "./lib/navigation";
import { messagesManifest } from "./messages/manifest";
import { type AbstractIntlMessages } from "./messages/types";

export default getRequestConfig(async ({ locale }) => {
  // 1. Validación de Locale (Puro)
  // Valida que el locale solicitado esté en la SSoT de locales soportados.
  if (!locales.includes(locale as AppLocale)) {
    notFound();
  }

  const messages: AbstractIntlMessages = {};

  // 2. Ensamblaje de Mensajes (Puro)
  // Itera sobre el manifiesto para cargar y ensamblar dinámicamente
  // todos los módulos de mensajes necesarios.
  for (const namespace in messagesManifest) {
    if (Object.prototype.hasOwnProperty.call(messagesManifest, namespace)) {
      try {
        const module = await messagesManifest[namespace]();
        const localeMessages = module.default[locale as AppLocale];

        if (localeMessages) {
          setNestedProperty(messages, namespace, localeMessages);
        }
      } catch (error) {
        // En caso de un error crítico, se registra en la consola del servidor
        // por el propio motor de Next.js. No se interrumpe el ensamblaje de
        // los demás módulos para maximizar la resiliencia.
        console.error(
          `[i18n-bootstrap] Critical error loading namespace '${namespace}' for locale '${locale}'.`,
          error
        );
      }
    }
  }

  // 3. Retorno del Contrato (Puro)
  return {
    messages,
  };
});
// src/i18n.ts
