// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 1.0.0
 * @function cn
 * @description Constrói classNames de forma inteligente e segura para componentes React com Tailwind CSS.
 *              Esta função combina a flexibilidade do `clsx` para classes condicionais com a robustez
 *              do `tailwind-merge` para resolver conflitos de classes do Tailwind de forma determinística.
 *              É a pedra angular para a criação de componentes de UI atômicos e componíveis.
 *
 * @param {...ClassValue[]} inputs - Uma sequência de valores de classe. Podem ser strings, arrays, ou objetos.
 * @returns {string} Uma string única de classNames, otimizada e sem conflitos.
 *
 * @example
 * // Retorna "bg-red-500 p-4"
 * cn("bg-blue-500 p-2", "bg-red-500 p-4");
 *
 * @example
 * // Retorna "font-bold"
 * cn({ "font-bold": true, "font-normal": false });
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * MEJORA CONTINUA
 *
 * @version 1.0.0
 *
 * ---
 *
 * @section Melhorias Futuras
 *
 * ((Vigente)) @priority Low - PERFORMANCE PROFILING: Em aplicações com um número massivo de componentes dinâmicos, realizar o profiling desta função para garantir que não se torne um gargalo de performance. Para 99.9% dos casos de uso, a performance atual é mais do que suficiente.
 *
 * ---
 *
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 1.0.0 - CONFLICT RESOLUTION: Integração do `tailwind-merge` para resolver deterministicamente conflitos de classes de utilitários do Tailwind (ex: `p-2` e `p-4` se torna `p-4`), prevenindo bugs de estilo difíceis de depurar.
 * ((Implementada)) @version 1.0.0 - CONDITIONAL CLASSES: Integração do `clsx` para permitir a aplicação de classes de forma condicional através de objetos ou arrays, simplificando a lógica de renderização nos componentes.
 * ((Implementada)) @version 1.0.0 - TYPE SAFETY: A função é totalmente tipada com `ClassValue`, garantindo a segurança de tipos ao passar diferentes formatos de entrada.
 *
 */
