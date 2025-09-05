// src/lib/utils.ts
/**
 * @file utils.ts
 * @description Módulo de utilidades puras, atómicas y universales (isomórficas)
 *              para el proyecto. Contiene la función `cn` como la SSoT para la
 *              fusión de clases de Tailwind CSS.
 * @version 2.1.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/lib/utils.ts.md
 */
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * @public
 * @function cn
 * @description Construye cadenas de `className` de forma inteligente y segura.
 *              Actúa como la SSoT para la lógica de estilos, utilizando `clsx`
 *              para combinar clases de forma flexible y `tailwind-merge` para
 *              resolver conflictos de clases de Tailwind de forma predecible.
 * @param {...ClassValue[]} inputs - Una secuencia de valores de clase a ser
 *              fusionados (strings, objetos, arrays, etc.).
 * @returns {string} Una única cadena de texto con las clases finales,
 *                   optimizada y sin conflictos.
 * @example
 * cn("p-4 font-bold", { "bg-red-500": hasError }, "p-2");
 * // Retorna: "font-bold bg-red-500 p-2"
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
// src/lib/utils.ts
