import { getRequestConfig } from "next-intl/server";

import { setNestedProperty } from "@/lib/helpers/set-nested-property.helper";
import { logger } from "@/lib/logging";
import { AppLocale } from "@/lib/navigation";
import { messagesManifest } from "@/messages/manifest";
import { ManifestModule, MessageModule } from "@/messages/types";

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 1.3.1
 * @description Orquestador de configuración de i18n para el servidor.
 *              Su única responsabilidad es ensamblar los mensajes para un locale
 *              validado previamente por el middleware.
 * @see .docs/I18N_MANIFESTO_V2.md
 */
export default getRequestConfig(async ({ locale }) => {
  // Se asume que el middleware ya ha validado que el locale es uno de los
  // soportados. Se realiza una coerción de tipo segura.
  const typedLocale = locale as AppLocale;

  const namespaces = Object.keys(messagesManifest);

  try {
    const modulePromises = namespaces.map((ns) =>
      (
        messagesManifest[ns as keyof typeof messagesManifest] as ManifestModule
      )()
    );
    const modules = await Promise.all(modulePromises);

    const messages = modules.reduce(
      (acc: Record<string, any>, module, index) => {
        const namespace = namespaces[index];
        const localeMessages = module.default?.[typedLocale];

        if (localeMessages) {
          setNestedProperty(acc, namespace, localeMessages);
        } else {
          logger.warn(
            `[I18N] Faltan traducciones para el namespace '${namespace}' en el locale '${typedLocale}'.`
          );
        }
        return acc;
      },
      {}
    );

    return { messages };
  } catch (error) {
    logger.error("[I18N] Fallo crítico al ensamblar mensajes.", {
      locale: typedLocale,
      error: error instanceof Error ? error.message : String(error),
    });
    return { messages: {} };
  }
});

/**
 * MEJORA CONTINUA
 *
 * @version 1.3.1
 * ---
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 1.3.1 - CORREÇÃO DE ARQUITETURA CRÍTICA: Se eliminó la llamada a `notFound()` dentro de `getRequestConfig`. Esta llamada violaba el contrato de la API de Next.js y era la causa raíz del error de ejecución. La responsabilidad de validar la existencia del `locale` se delega correctamente al `middleware`, restaurando la integridad arquitectónica y la funcionalidad de la aplicación.
 * ((Implementada)) @version 1.3.0 - OBSERVABILIDAD ROBUSTA: El aparato mantiene un logging verboso dentro del bloque `try/catch` para reportar fallos en su responsabilidad real: el ensamblaje de mensajes.
 */
