// src/messages/types.ts
/**
 * @file src/messages/types.ts
 * @description Contrato de datos de élite y Única Fuente de Verdad (SSoT) para la
 *              arquitectura de internacionalización atómica (IMAS). Define los tipos
 *              para los módulos de mensajes (`MessageModule`), el manifiesto que los
 *              orquesta (`ManifestModule`), y la estructura recursiva esperada
 *              por `next-intl` (`AbstractIntlMessages`).
 *              Esta versión refactorizada alinea `AbstractIntlMessages` con la
 *              definición más estricta de `next-intl` para `messages`, resolviendo
 *              errores de incompatibilidad de tipos en el `i18n.ts`.
 * @author L.I.A. Legacy
 * @version 2.3.0
 * @see .docs/I18N_MANIFESTO_V2.md
 * @see src/messages/manifest.ts (Consumidor)
 * @see src/i18n.ts (Consumidor principal para la configuración de next-intl)
 * @see node_modules/next-intl/dist/types/src/core.d.ts (Origen conceptual de `AbstractIntlMessages` de next-intl)
 */
import { type AppLocale } from "@/lib/navigation";

// Hemos redefinido `AbstractIntlMessages` para que sea más compatible con la
// definición interna de `next-intl`, que generalmente espera `string` o un
// objeto recursivo de `AbstractIntlMessages`. Los arrays de objetos, números o
// booleanos deben ser manejados a través de `t.raw()` y validados con Zod
// en los componentes que los consumen, no directamente en el tipo recursivo de mensajes.
/**
 * @public
 * @type AbstractIntlMessages
 * @description Representa la estructura recursiva esperada por `next-intl` para los objetos de mensajes.
 *              Un mensaje puede ser una `string` (para textos simples) o un objeto
 *              que contenga más `AbstractIntlMessages` (para estructuras anidadas).
 *              Para acceder a arrays de objetos, números, booleanos u otros tipos complejos,
 *              se debe utilizar `t.raw('namespace.key')` en el componente y validar
 *              su estructura con Zod. Esta es la SSoT para la forma de las traducciones finales
 *              que `next-intl` puede procesar directamente para interpolación.
 */
export type AbstractIntlMessages = {
  [key: string]: string | AbstractIntlMessages;
};

/**
 * @public
 * @type MessageModule
 * @description Define la estructura que debe tener cada archivo `.json` de mensajes atómicos.
 *              Es un registro donde cada clave es un `AppLocale` soportado, y el valor
 *              es un objeto que contiene las traducciones para ese locale, con la
 *              estructura `AbstractIntlMessages`.
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
