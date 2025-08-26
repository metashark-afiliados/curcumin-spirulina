// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 1.1.0
 * @function cn
 * @description Constrói classNames de forma inteligente e segura.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 1.0.0
 * @function pick
 * @description Extrae un subconjunto de propiedades de un objeto, creando uno nuevo.
 *              Es una pieza de infraestructura clave para proveer a los Client Components
 *              únicamente con los mensajes de i18n que necesitan, optimizando el payload.
 * @param {T} object El objeto fuente.
 * @param {K[]} keys Un array de claves para extraer.
 * @returns {Pick<T, K>} Un nuevo objeto con solo las propiedades seleccionadas.
 */
export function pick<T extends object, K extends keyof T>(
  object: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach((key) => {
    if (key in object) {
      result[key] = object[key];
    }
  });
  return result;
}

/**
 * MEJORA CONTINUA
 *
 * @version 1.1.0
 * ---
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 1.1.0 - HELPER DE UTILIDADE `pick`: Adicionada uma função `pick` genérica e puramente funcional. Este helper é a implementação canônica para a extração seletiva de namespaces de mensagens para o `NextIntlClientProvider`, resolvendo o erro de build `MISSING_MESSAGE` em Client Components.
 */
