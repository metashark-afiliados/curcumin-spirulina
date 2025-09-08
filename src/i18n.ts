// src/i18n.ts
/**
 * @file src/i18n.ts
 * @description Orquestador de Internacionalización (i18n). Nivelado para
 *              utilizar la API canónica `getLocale()` de `next-intl@3.26.5`,
 *              resolviendo el error de importación TS2724.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.2.0
 * @see .docs-espejo/i18n.ts.md
 */
import "server-only";

// CORRECCIÓN: Se importa `getLocale` en lugar del inexistente `requestLocale`.
import { getLocale, getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

import { setNestedProperty } from "@/lib/helpers/set-nested-property.helper";
import { logger } from "@/lib/logger";
import { locales } from "@/lib/navigation";
import { messagesManifest } from "@/messages/manifest";
import { type AbstractIntlMessages } from "@/messages/types";

export default getRequestConfig(async () => {
  // CORRECCIÓN: Se obtiene el locale con la función correcta de la API.
  const locale = await getLocale();

  if (!locales.includes(locale as any)) {
    logger.warn(
      { requestedLocale: locale },
      "Intento de acceso con locale no válido."
    );
    notFound();
  }

  const messages: AbstractIntlMessages = {};

  for (const [namespace, importModule] of Object.entries(messagesManifest)) {
    try {
      const module = await importModule();
      const localeMessages =
        module.default[locale as keyof typeof module.default];

      if (localeMessages) {
        setNestedProperty(messages, namespace, localeMessages);
      } else {
        logger.warn(
          { namespace, locale },
          "No se encontraron traducciones para el locale en el módulo."
        );
      }
    } catch (error) {
      logger.error(
        { err: error, namespace, locale },
        "Fallo al cargar o procesar un módulo de mensajes."
      );
    }
  }

  return {
    locale,
    messages,
  };
});
// src/i18n.ts
