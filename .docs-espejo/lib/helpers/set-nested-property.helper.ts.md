// .docs-espejo/lib/helpers/set-nested-property.helper.ts.md
/**
 * @file .docs-espejo/lib/helpers/set-nested-property.helper.ts.md
 * @description Documento Espejo y SSoT conceptual para el aparato `set-nested-property.helper.ts`.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 */
# Manifiesto Conceptual: `set-nested-property.helper.ts`

## 1. Rol Estratégico y Propósito

Este aparato es el **Motor de Ensamblaje de la Arquitectura de Internacionalización IMAS**. Su única y crítica responsabilidad es tomar una ruta de namespace en formato de cadena (ej. `"a.b.c"`) y un valor, y construir la estructura de objeto anidada correspondiente dentro de un objeto base.

Es una pieza de infraestructura fundamental que permite la carga dinámica y la construcción en memoria del objeto de mensajes completo que `next-intl` necesita, a partir de una lista plana de módulos de traducción.

## 2. Arquitectura y Flujo de Ejecución

Es una función pura, síncrona y de alto rendimiento que opera mediante la **mutación directa** del objeto de entrada para evitar la sobrecarga de la creación de copias.

```mermaid
graph TD
    A[Orquestador i18n] -- Invoca `setNestedProperty(obj, "a.b.c", "valor")` --> B{Función};
    subgraph "Lógica Interna"
        B -- 1. `path.split('.')` --> C["keys = ['a', 'b', 'c']"];
        C -- 2. Itera hasta 'b' --> D["Crea `obj.a` y `obj.a.b` si no existen"];
        D -- 3. Asigna en el último nivel --> E["`obj.a.b.c = 'valor'`"];
    end
    E --> F[Retorna `obj` mutado];
3. Contrato de API
setNestedProperty(obj, path, value)
obj: Record<string, any>: El objeto que será modificado.
path: string: La ruta de anidación.
value: any: El valor a asignar.
Retorno: A referencia ao obxecto orixinal modificado.
4. Zona de Melhorias Futuras
Versión Inmutable: Crear una variante setNestedPropertyImmutable que no mute el objeto original, sino que devuelva una nueva copia con los cambios. Sería útil en contextos de React donde la inmutabilidad es clave, aunque menos performante para este caso de uso específico.
Soporte para Índices de Array: Extender la sintaxis del path para soportar la creación de arrays e inserción en índices específicos (ej. "a.b[0].c").
Tipado Genérico Avanzado: Usar tipos genéricos avanzados de TypeScript para proporcionar seguridad de tipos en el path y el value basados en la estructura del obj de entrada.
Función getNestedProperty: Crear la función compañera que permita leer un valor de una propiedad anidada de forma segura, devolviendo undefined si la ruta no existe.
Benchmarking: Añadir pruebas de rendimiento (benchmarks) para comparar la versión mutable con una posible versión inmutable en escenarios de alta carga.
// .docs-espejo/lib/helpers/set-nested-property.helper.ts.md