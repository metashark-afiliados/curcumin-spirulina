// .docs-espejo/lib/helpers/set-nested-property.helper.ts.md
/\*\*

- @file .docs-espejo/lib/helpers/set-nested-property.helper.ts.md
- @description Documento Espejo y SSoT conceptual para el helper `setNestedProperty`.
- @author RaZ Podestá - MetaShark Tech
- @version 1.0.0
  \*/

# Manifiesto Conceptual: Aparato `setNestedProperty`

## 1. Rol Estratégico y Propósito

Este aparato es el **motor de ensamblaje de la arquitectura IMAS**. Su única responsabilidad es transformar una ruta de namespace de i18n en formato de string (ej. `"components.ui.OrderForm.ctaButton"`) en una estructura de objeto anidada dentro del objeto de mensajes principal.

Es una función de utilidad pura, de bajo nivel y de alto rendimiento, diseñada para ser universalmente compatible y no tener dependencias externas, lo que la hace fundamental para la orquestación de datos de i18n.

## 2. Arquitectura y Flujo de Ejecución

Es una función pura que itera sobre las claves de una ruta para construir una estructura de objeto.

```mermaid
graph TD
    A[Llamada a `setNestedProperty(obj, "a.b.c", "valor")`] --> B["Divide 'a.b.c' en ['a', 'b', 'c']"];
    B --> C{Itera hasta la penúltima clave};
    C -- "Clave 'a' no existe en `obj`?" --> D["Crea `obj.a = {}`"];
    C -- "Clave 'b' no existe en `obj.a`?" --> E["Crea `obj.a.b = {}`"];
    E --> F["Asigna el valor a la última clave: `obj.a.b.c = 'valor'`"];
    F --> G[Retorna `obj` modificado];
La función muta el objeto de entrada para optimizar el rendimiento, ya que se utiliza en un bucle dentro del orquestador de i18n.
3. Contrato de API
Entrada:
obj: Record<string, any>: El objeto a modificar.
path: string: La ruta de la propiedad en notación de punto.
value: any: El valor a asignar.
Salida: Record<string, any>: La referencia al objeto original modificado.
4. Zona de Melhorias Futuras
SOPORTE PARA RUTAS DE ARRAY: Extender la lógica para manejar sintaxis de array (ej. "items[0].name") para una mayor flexibilidad.
VERSIÓN INMUTABLE: Crear una variante setNestedPropertyImmutable que clone el objeto y sus rutas intermedias en lugar de mutarlos, para casos de uso que requieran inmutabilidad estricta.
TIPADO GENÉRICO AVANZADO: Mejorar la firma de tipos con genéricos avanzados para inferir la forma del objeto resultante basándose en la ruta del path.
DOCUMENTACIÓN EN ESPAÑOL: Traducir este documento espejo al español.
MANEJO DE ERRORES MEJORADO: Lanzar errores más descriptivos si el path no es un string válido o si se intenta asignar una propiedad a un primitivo en un modo estricto.
PRUEBAS DE RENDIMIENTO (BENCHMARK): Añadir pruebas de benchmark para medir el rendimiento con objetos y rutas muy profundas.
HELPER getNestedProperty: Crear la función complementaria getNestedProperty para leer valores de rutas anidadas de forma segura.
OPCIÓN DE SEPARADOR PERSONALIZADO: Permitir pasar un separador personalizado (ej. /) en lugar de estar fijado a ..
INTEGRACIÓN CON lodash: En un futuro, si se añade lodash al proyecto, considerar reemplazar esta implementación manual por _.set para aprovechar una solución probada en batalla, pero evaluando el impacto en el tamaño del bundle.
VALIDACIÓN DE ENTRADA: Añadir una validación al inicio para asegurar que obj sea realmente un objeto, lanzando un error si no lo es, para prevenir fallos silenciosos.
// .docs-espejo/lib/helpers/set-nested-property.helper.ts.md
```
