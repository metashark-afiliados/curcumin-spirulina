// src/i18n.ts
/**
 * @file i18n.ts
 * @description Orquestador de Internacionalización de élite. Implementa la
 *              arquitectura IMAS (I18n Mirrored Atomic Structure) al más alto
 *              nivel. Su única responsabilidad es leer el manifiesto de mensajes,
 *              cargar dinámicamente los módulos atómicos y ensamblarlos en el
 *              objeto anidado que `next-intl` espera, garantizando una carga
 *              perezosa y un rendimiento óptimo.
 * @version 4.0.0
 * @author L.I.A. Legacy
 * @see .docs/I18N_MANIFESTO_V2.md
 * @see .docs-espejo/i18n.ts.md
 */
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { setNestedProperty } from "@/lib/helpers/set-nested-property.helper";
import { serverLogger } from "@/lib/logger";
import { locales, type AppLocale } from "@/lib/navigation";
import { messagesManifest } from "@/messages/manifest";

export default getRequestConfig(async ({ locale }) => {
  const typedLocale = locale as AppLocale;

  // 1. Blindaje: Validar que el locale de la petición es soportado.
  if (!locales.includes(typedLocale)) {
    serverLogger.error(
      { locale },
      "[I18N Orchestrator] Tentativa de acesso com locale inválido. Retornando 404."
    );
    notFound();
  }

  const messages = {};
  let successfulNamespaces = 0;
  const totalNamespaces = Object.keys(messagesManifest).length;

  serverLogger.trace(
    { locale, namespaceCount: totalNamespaces },
    "[I18N Orchestrator] Iniciando montagem de mensagens atômicas."
  );

  // 2. Orquestación: Iterar sobre el manifiesto para ensamblar los mensajes.
  for (const [namespace, moduleLoader] of Object.entries(messagesManifest)) {
    try {
      const module = await moduleLoader();
      const localeMessages = module.default[typedLocale];

      // 3. Resiliencia y Observabilidad Granular:
      if (localeMessages) {
        setNestedProperty(messages, namespace, localeMessages);
        serverLogger.trace(
          { namespace },
          "[I18N Orchestrator] Namespace carregado e montado com sucesso."
        );
        successfulNamespaces++;
      } else {
        serverLogger.warn(
          { namespace, locale },
          "[I18N Orchestrator] Namespace carregado, mas não contém traduções para o locale solicitado. Ignorando."
        );
      }
    } catch (error) {
      serverLogger.error(
        { err: error, namespace },
        `[I18N Orchestrator] Módulo de mensagens para o namespace não encontrado ou falhou ao carregar.`
      );
    }
  }

  serverLogger.info(
    {
      locale,
      namespacesLoaded: successfulNamespaces,
      totalNamespaces,
    },
    "[I18N Orchestrator] Montagem de mensagens concluída."
  );

  return { messages };
});
// src/i18n.ts
