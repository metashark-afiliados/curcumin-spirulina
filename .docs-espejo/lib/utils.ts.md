// .docs-espejo/lib/utils.ts.md
/**
 * @file .docs-espejo/lib/utils.ts.md
 * @description Documento Espejo y SSoT conceptual para el módulo de utilidades.
 * @author L.I.A. Legacy
 * @version 2.1.0
 */
# Manifiesto Conceptual: Aparato `lib/utils.ts`

## 1. Rol Estratégico y Propósito

Este aparato es la **caja de herramientas universal y pura** de la aplicación. Su propósito es albergar funciones atómicas y de bajo nivel que son completamente agnósticas al dominio de negocio y pueden ser utilizadas de forma segura en cualquier entorno (cliente o servidor).

Actúa como la SSoT para la lógica de utilidad transversal, adhiriéndose estrictamente al principio DRY al centralizar funciones como la fusión de clases de CSS.

## 2. Arquitectura y Flujo de Ejecución

Es un módulo de funciones puras exportadas. No tiene estado ni efectos secundarios.

```mermaid
graph TD
    A[Cualquier Componente o Helper] -- "Importa y llama a" --> B["`cn()`"];
    B -- "Usa `clsx` y `tailwind-merge`" --> C[Procesa clases];
    C -- "Retorna string optimizado" --> A;
3. Contrato de API
cn(...inputs: ClassValue[]): string:
Entrada: Una secuencia de clases de CSS en varios formatos (strings, objetos, arrays).
Salida: Una única cadena de texto con las clases fusionadas y sin conflictos.
4. Zona de Melhorias Futuras
HELPER DE CAPITALIZAÇÃO: Criar uma função capitalize(string) que coloque em maiúscula a primeira letra de uma cadeia de texto.
HELPER DE TRUNCAMENTO: Criar uma função truncate(string, maxLength) que corte um texto a um comprimento máximo e adicione reticências.
HELPER sleep: Criar uma função sleep(ms) que devolva uma promessa que se resolve após um tempo determinado, útil para simular latência no desenvolvimento.
HELPER getErrorMessage: Criar uma utilidade getErrorMessage(error: unknown): string que extraia de forma segura uma mensagem de erro de qualquer tipo de erro capturado.
HELPER isBrowser: Criar uma constante isBrowser = typeof window !== "undefined" para verificar de forma segura se o código está sendo executado no navegador.
// .docs-espejo/lib/utils.ts.md