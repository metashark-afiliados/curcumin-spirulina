// .docs-espejo/lib/helpers/set-nested-property.helper.ts.md
/**
 * @file .docs-espejo/lib/helpers/set-nested-property.helper.ts.md
 * @description Documento Espejo y SSoT conceptual para el helper `setNestedProperty`.
 * @author RaZ Podestá - MetaShark Tech
 * @version 1.1.0
 */
# Manifiesto Conceptual: Aparato `setNestedProperty`

## 1. Rol Estratégico y Propósito

Este aparato es el **motor de ensamblaje de la arquitectura IMAS**. Su única responsabilidad es transformar una ruta de namespace de i18n en formato de string (ej. `"components.ui.OrderForm"`) en una estructura de objeto anidada, que es el formato que `next-intl` requiere.

Es una función de utilidad pura, de bajo nivel y de alto rendimiento, diseñada para ser universalmente compatible y no tener dependencias externas.

## 2. Arquitectura y Flujo de Ejecución

Es una función pura que itera sobre las claves de una ruta para construir una estructura de objeto. **Muta el objeto de entrada** para optimizar el rendimiento, ya que se utiliza en un bucle de alta frecuencia dentro del orquestador de i18n.

```mermaid
graph TD
    A["`i18n.ts`"] -- "Llama a `setNestedProperty(obj, 'a.b.c', 'valor')`" --> B["`setNestedProperty`"];
    subgraph Lógica Interna
        B --> C["Divide 'a.b.c' en ['a', 'b', 'c']"];
        C --> D["Itera y crea `obj.a` y `obj.a.b` si no existen"];
        D --> E["Asigna `obj.a.b.c = 'valor'`"];
    end
    E --> F["Retorna `obj` modificado"];
    F --> A;
3. Contrato de API
Entrada:
obj: Record<string, any>: El objeto a modificar.
path: string: La ruta de la propiedad en notación de punto.
value: any: El valor a asignar.
Salida: Record<string, any>: La referencia al objeto original modificado.
4. Zona de Melhorias Futuras
SOPORTE PARA RUTAS DE ARRAY: Estender a lógica para lidar com a sintaxe de array (ex: "items[0].name") para maior flexibilidade.
VERSÃO IMUTÁVEL: Criar uma variante setNestedPropertyImmutable que clone o objeto e seus caminhos intermediários em vez de mutá-los, para casos de uso que exijam imutabilidade estrita.
HELPER getNestedProperty: Criar a função complementar getNestedProperty para ler valores de caminhos aninhados de forma segura.
// .docs-espejo/lib/helpers/set-nested-property.helper.ts.md