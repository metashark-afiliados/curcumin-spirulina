// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 1.0.0
 * @function cn
 * @description Constrói classNames de forma inteligente e segura para componentes React com Tailwind CSS.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * MEJORA CONTINUA
 *
 * @version 1.0.0
 * ---
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 1.0.0 - PURGA DE CÓDIGO MORTO: A função `pick`, que era uma otimização prematura e incorreta, foi removida para manter o código limpo e aderir ao princípio YAGNI (You Ain't Gonna Need It).
 */
