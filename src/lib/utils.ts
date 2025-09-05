// src/lib/utils.ts
/**
 * @file utils.ts
 * @description Módulo de utilidades puras y universales (isomórficas) para el proyecto.
 *              Contiene la función `cn` como la SSoT para la fusión de clases
 *              de Tailwind CSS.
 * @version 2.0.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/lib/utils.ts.md
 */
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * @function cn
 * @description Construye classNames de forma inteligente y segura para componentes React con Tailwind CSS.
 *              Utiliza `clsx` para combinar clases de forma flexible y `tailwind-merge` para
 *              resolver conflictos de clases de Tailwind de forma predecible y determinística.
 * @param {...ClassValue[]} inputs - Una secuencia de clases a serem mescladas (strings, objetos, arrays).
 * @returns {string} A string de classes finais, otimizada e sem conflitos.
 * @example
 * cn("p-4 font-bold", { "bg-red-500": hasError }, "p-2"); // Retorna: "font-bold bg-red-500 p-2"
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
// src/lib/utils.ts
