// src/i18n.ts
import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

import { setNestedProperty } from '@/lib/helpers/set-nested-property.helper';
import { logger } from '@/lib/logging';
import { AppLocale, locales } from '@/lib/navigation';
import { messagesManifest } from '@/messages/manifest';
import { ManifestModule, MessageModule } from '@/messages/types';

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 1.2.0
 * @description Orquestador de configuración de i18n para el servidor.
 *              Implementa la arquitectura IMAS (I18n Mirrored Atomic Structure).
 *              Su lógica ensambla dinámicamente todos los mensajes de un locale
 *              a partir de un manifiesto, creando un único objeto anidado.
 * @see .docs/I18N_MANIFESTO.md
 */
export default getRequestConfig(async ({ locale }) => {
  const typedLocale = locale as AppLocale;

  if (!locales.includes(typedLocale)) {
    notFound();
  }

  // BLINDAJE DE TIPO: Se asegura de que todas las claves sean strings.
  const namespaces = Object.keys(messagesManifest).filter(
    (key): key is string => typeof key === 'string',
  );

  try {
    const modulePromises: Promise<{ default: MessageModule }>[] = namespaces.map(
      (ns) => (messagesManifest[ns as keyof typeof messagesManifest] as ManifestModule)(),
    );
    const modules = await Promise.all(modulePromises);

    const messages = modules.reduce(
      (acc: Record<string, any>, module, index) => {
        const namespace = namespaces[index];
        const localeMessages = module.default?.[typedLocale];

        if (localeMessages) {
          setNestedProperty(acc, namespace, localeMessages);
        } else {
          // BLINDAJE DE TIPO: Coerción explícita a string para el logger.
          logger.warn(
            `[I18N] Faltan traducciones para el namespace '${String(
              namespace,
            )}' en el locale '${typedLocale}'.`,
          );
        }
        return acc;
      },
      {},
    );

    return { messages };
  } catch (error) {
    logger.error('[I18N] Fallo crítico al ensamblar mensajes.', {
      locale: typedLocale,
      error: error instanceof Error ? error.message : String(error),
    });
    return { messages: {} };
  }
});

/**
 * MEJORA CONTINUA
 *
 * @version 1.2.0
 *
 * ---
 *
 * @section Melhorias Futuras
 *
 * ((Vigente)) @priority High - VALIDAÇÃO DE SCHEMA (ZOD): Integrar a validação do objeto de mensagens carregado contra um schema Zod mestre.
 *
 * ---
 *
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 1.2.0 - BLINDAGEM DE TIPOS DEFINITIVA: O uso de `.filter()` para garantir que `namespaces` seja `string[]` e a coerção explícita `String(namespace)` no logger resolvem de forma robusta e definitiva os erros de tipo `TS2345` e `TS2731`.
 * ((Implementada)) @version 1.1.0 - TIPOS EXPLÍCITOS: O arquivo foi refatorizado com tipos explícitos para resolver erros de "any implícito".
 * ((Implementada)) @version 1.0.0 - ARQUITETURA IMAS: Implementação do motor de ensamblaje.
 * ((Implementada)) @version 1.0.0 - RESILIÊNCIA E OBSERVABILIDADE: Processo de carga envolto em `try/catch` com logging.
 *
 */