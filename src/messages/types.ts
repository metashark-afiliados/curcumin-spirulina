// src/messages/types.ts
import { AppLocale } from "@/lib/navigation";

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 1.0.0
 * @description Contrato de datos para la arquitectura de mensajes atómicos (IMAS).
 *              Esta es la Única Fuente de Verdad para la estructura de CUALQUIER
 *              archivo de mensajes .json y del manifiesto que los registra.
 */

/**
 * @public
 * @type MessageModule
 * @description Define la estructura que debe tener cada archivo .json de mensajes.
 *              Es un registro donde cada clave es un `AppLocale` soportado.
 */
export type MessageModule = {
  [key in AppLocale]?: Record<string, any>;
};

/**
 * @public
 * @type ManifestModule
 * @description Define la firma de una función dentro del `messagesManifest`.
 *              Es una función asíncrona que resuelve a un módulo con una
 *              exportación `default` del tipo `MessageModule`.
 */
export type ManifestModule = () => Promise<{
  default: MessageModule;
}>;

/**
 * MEJORA CONTINUA
 *
 * @version 1.0.0
 * ---
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 1.0.0 - CONTRATO DE I18N SEGURO: Este aparato establece el contrato de datos para todo el sistema IMAS, permitiendo el tipado estricto del manifiesto y del orquestador.
 */
