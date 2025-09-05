// src/lib/helpers/set-nested-property.helper.ts
/**
 * @file set-nested-property.helper.ts
 * @description Helper atómico, puro y de propósito general para la asignación
 *              de propiedades anidadas. Es el motor de ensamblaje de la
 *              arquitectura de internacionalización IMAS.
 * @version 2.1.0
 * @author RaZ Podestá - MetaShark Tech
 * @see src/i18n.ts (Consumidor Principal)
 * @see .docs-espejo/lib/helpers/set-nested-property.helper.ts.md
 */

/**
 * @public
 * @function setNestedProperty
 * @description Asigna un valor a una propiedad anidada dentro de un objeto,
 *              **mutando el objeto original** para un rendimiento óptimo. Crea las
 *              rutas de objetos intermediarios si no existen.
 * @param {Record<string, any>} obj El objeto a modificar directamente.
 * @param {string} path La ruta de la propiedad en notación de punto (ej. "a.b.c").
 * @param {any} value El valor a asignar en la ruta especificada.
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
    // Si la clave no existe o no es un objeto, se crea un objeto vacío.
    // Esto sobrescribirá valores primitivos si un path entra en conflicto.
    if (typeof current[key] !== "object" || current[key] === null) {
      current[key] = {};
    }
    current = current[key];
  }

  current[keys[keys.length - 1]] = value;
  return obj;
}
// src/lib/helpers/set-nested-property.helper.ts
