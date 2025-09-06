// src/messages/types.ts
/**
 * @file src/messages/types.ts
 * @description Contrato de datos de élite y SSoT para la arquitectura IMAS.
 *              Define los tipos para los módulos de mensajes, el manifiesto y la
 *              estructura recursiva `AbstractIntlMessages` esperada por `next-intl`.
 *              Esta versión simplifica y clarifica el tipo `AbstractIntlMessages`
 *              para una alineación estricta con las expectativas de `next-intl`.
 * @author L.I.A. Legacy
 * @version 3.0.0
 * @see .docs/I18N_MANIFESTO_V2.md
 * @see .docs-espejo/messages/types.ts.md
 */
import { type AppLocale } from "@/lib/navigation";

/**
 * @public
 * @type AbstractIntlMessages
 * @description Representa la estructura recursiva que `next-intl` puede procesar
 *              directamente para interpolación. Un mensaje puede ser una `string` o
 *              un objeto anidado de más mensajes. Para tipos de datos complejos
 *              (arrays, números, booleanos), se debe usar `t.raw('namespace.key')`
 *              en el componente consumidor y validar su estructura con Zod.
 */
export type AbstractIntlMessages = {
  [key: string]: string | AbstractIntlMessages;
};

/**
 * @public
 * @type MessageModule
 * @description Define la estructura que debe tener la exportación `default` de cada
 *              archivo `.json` de mensajes atómicos: un registro donde cada clave
 *              es un `AppLocale` soportado y el valor es un objeto de mensajes.
 */
export type MessageModule = {
  [key in AppLocale]: AbstractIntlMessages;
};

/**
 * @public
 * @type ManifestModule
 * @description Define la firma de una función dentro del `messagesManifest`.
 *              Es una función asíncrona que devuelve una promesa que resuelve a un
 *              módulo con una exportación `default` del tipo `MessageModule`.
 */
export type ManifestModule = () => Promise<{
  default: MessageModule;
}>;
// src/messages/types.ts
