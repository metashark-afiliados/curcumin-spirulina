// src/messages/types.ts
/**
 * @file src/messages/types.ts
 * @description Contrato de datos de élite y SSoT para la arquitectura IMAS.
 *              Define los tipos para los módulos de mensajes, el manifiesto y la
 *              estructura `AbstractIntlMessages`. Ha sido refactorizado para
 *              permitir estructuras de datos complejas (arrays, objetos) que
 *              serán validadas a nivel de componente con Zod.
 * @author L.I.A. Legacy
 * @version 4.0.0
 * @see .docs/I18N_MANIFESTO_V2.md
 * @see .docs-espejo/messages/types.ts.md
 */
import { type AppLocale } from "@/lib/navigation";

/**
 * @public
 * @type AbstractIntlMessages
 * @description Representa la estructura recursiva que `next-intl` puede procesar.
 *              Permite strings para interpolación directa (`t('key')`) y `any` para
 *              estructuras complejas (`t.raw('key')`) que serán validadas con Zod
 *              en el componente consumidor.
 */
export type AbstractIntlMessages = {
  [key: string]: string | any; // Permite arrays y objetos anidados
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
