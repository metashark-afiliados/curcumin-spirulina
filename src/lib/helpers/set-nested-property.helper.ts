// src/lib/helpers/set-nested-property.helper.ts
/**
 * @file set-nested-property.helper.ts
 * @description Helper atómico y puro para la asignación de propiedades anidadas.
 *              Es una utilidad de propósito general, compatible con cualquier
 *              entorno de JavaScript (cliente, servidor, Edge).
 * @version 2.0.0
 * @author RaZ Podestá - MetaShark Tech
 */

/**
 * @public
 * @function setNestedProperty
 * @description Asigna un valor a una propiedad anidada dentro de un objeto,
 *              mutando el objeto original. Crea las rutas de objetos intermediarios
 *              si no existen.
 * @param {Record<string, any>} obj - El objeto a modificar.
 * @param {string} path - La ruta de la propiedad en notación de punto (ej. "a.b.c").
 * @param {any} value - El valor a asignar.
 * @returns {Record<string, any>} La referencia al objeto original modificado.
 */
export function setNestedProperty(
  obj: Record<string, any>,
  path: string,
  value: any
): Record<string, any> {
  const keys = path.split(".");
  let current = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (typeof current[key] !== "object" || current[key] === null) {
      current[key] = {};
    }
    current = current[key];
  }

  current[keys[keys.length - 1]] = value;
  return obj;
}
// src/lib/helpers/set-nested-property.helper.ts
