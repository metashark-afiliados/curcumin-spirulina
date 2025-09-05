// src/messages/types.ts
/**
 * @file types.ts
 * @description Contrato de datos de élite para la arquitectura de internacionalización
 *              atómica (IMAS). Define los tipos para los módulos de mensajes y
 *              el manifiesto que los orquesta.
 * @version 2.0.0
 * @author L.I.A. Legacy
 * @see .docs/I18N_MANIFESTO_V2.md
 * @see src/messages/manifest.ts (Consumidor)
 */
import { type AppLocale } from "@/lib/navigation";

/**
 * @public
 * @type MessageModule
 * @description Define la estructura que debe tener cada archivo .json de mensajes.
 *              Es un registro donde cada clave es un `AppLocale` soportado, y el valor
 *              es un objeto anidado de strings que representa las traducciones.
 */
export type MessageModule = {
  [key in AppLocale]: Record<string, any>;
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
