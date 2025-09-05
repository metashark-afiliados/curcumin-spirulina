// .docs-espejo/lib/utils.ts.md
/**
 * @file .docs-espejo/lib/utils.ts.md
 * @description Documento Espejo y SSoT conceptual para el módulo de utilidades.
 * @author L.I.A. Legacy
 * @version 2.0.0
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
HELPER DE CAPITALIZACIÓN: Crear una función capitalize(string) que ponga en mayúscula la primera letra de una cadena de texto.
HELPER DE TRUNCAMIENTO: Crear una función truncate(string, maxLength) que corte un texto a una longitud máxima y añada puntos suspensivos.
HELPER sleep: Crear una función sleep(ms) que devuelva una promesa que se resuelve después de un tiempo determinado, útil para simular latencia en desarrollo.
HELPER getErrorMessage: Crear una utilidad getErrorMessage(error: unknown): string que extraiga de forma segura un mensaje de error de cualquier tipo de error capturado.
HELPER isBrowser: Crear una constante isBrowser = typeof window !== "undefined" para verificar de forma segura si el código se está ejecutando en el navegador.
// .docs-espejo/lib/utils.ts.md