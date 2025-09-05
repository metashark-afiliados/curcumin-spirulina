// src/i18n.ts
/**
 * @file i18n.ts
 * @description Orquestador de Internacionalización de élite. Implementa la
 *              arquitectura IMAS (I18n Mirrored Atomic Structure). Su
 *              responsabilidad es validar el locale y delegar la carga y
 *              ensamblaje de los módulos de mensajes a un helper atómico.
 * @version 5.2.0
 * @author L.I.A. Legacy
 * @see .docs/I18N_MANIFESTO_V2.md
 * @see .docs-espejo/i18n.ts.md
 */
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { type AbstractIntlMessages } from "next-intl";

import { setNestedProperty } from "@/lib/helpers/set-nested-property.helper";
import { defaultLocale, locales, type AppLocale } from "@/lib/navigation";
import { serverLogger } from "@/lib/server-logger";
import { messagesManifest } from "@/messages/manifest";

/**
 * @private
 * @async
 * @function assembleMessagesFromManifest
 * @description Ensamblador atómico y soberano. Itera sobre el manifiesto,
 *              carga dinámicamente cada módulo de mensajes y lo ensambla en un
 *              único objeto anidado. Implementa una estrategia de fallback a nivel
 *              de namespace para máxima resiliencia.
 * @param {AppLocale} locale - El locale para el cual ensamblar los mensajes.
 * @returns {Promise<AbstractIntlMessages>} Un objeto con todos los mensajes
 *              ensamblados, compatible con el contrato de `next-intl`.
 */
async function assembleMessagesFromManifest(
  locale: AppLocale
): Promise<AbstractIntlMessages> {
  const messages = {};
  const totalNamespaces = Object.keys(messagesManifest).length;
  let successfulNamespaces = 0;
  let fallbackCount = 0;

  serverLogger.trace(
    { locale, namespaceCount: totalNamespaces },
    "[I18N Assembler] Iniciando ensamblaje de mensajes atómicos."
  );

  for (const [namespace, moduleLoader] of Object.entries(messagesManifest)) {
    try {
      const module = await moduleLoader();
      let localeMessages = module.default[locale];

      if (!localeMessages && locale !== defaultLocale) {
        serverLogger.warn(
          { namespace, locale },
          `[I18N Assembler] Traducción no encontrada para el locale. Intentando fallback a '${defaultLocale}'.`
        );
        localeMessages = module.default[defaultLocale];
        if (localeMessages) {
          fallbackCount++;
        }
      }

      if (localeMessages) {
        setNestedProperty(messages, namespace, localeMessages);
        successfulNamespaces++;
      } else {
        serverLogger.warn(
          { namespace, locale },
          "[I18N Assembler] Namespace cargado, pero no contiene traducciones para el locale solicitado o para el fallback. Omitiendo."
        );
      }
    } catch (error) {
      serverLogger.error(
        {
          err: error instanceof Error ? error.message : String(error),
          namespace,
        },
        `[I18N Assembler] Módulo de mensajes para el namespace no encontrado o falló al cargar.`
      );
    }
  }

  serverLogger.info(
    {
      locale,
      namespacesLoaded: successfulNamespaces,
      fallbacksUsed: fallbackCount,
      totalNamespaces,
    },
    "[I18N Assembler] Ensamblaje de mensajes completado."
  );

  return messages as AbstractIntlMessages;
}

export default getRequestConfig(async ({ locale }) => {
  const typedLocale = locale as AppLocale;

  if (!locales.includes(typedLocale)) {
    serverLogger.error(
      { locale },
      "[I18N Orchestrator] Intento de acceso con locale inválido. Retornando 404."
    );
    notFound();
  }

  const messages = await assembleMessagesFromManifest(typedLocale);

  return { messages };
});
// src/i18n.ts
