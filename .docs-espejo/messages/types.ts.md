// .docs-espejo/messages/types.ts.md
/**
 * @file .docs-espejo/messages/types.ts.md
 * @description Documento Espejo y SSoT conceptual para los tipos de la arquitectura de mensajes.
 * @author L.I.A. Legacy
 * @version 2.0.0
 */
# Manifiesto Conceptual: Aparato `messages/types.ts`

## 1. Rol Estratégico y Propósito

Este aparato es el **diccionario de la arquitectura IMAS**. Su única responsabilidad es definir los **contratos de datos (tipos de TypeScript)** que gobiernan la estructura de los módulos de mensajes (`.json`) y el manifiesto (`manifest.ts`) que los registra.

Actúa como una SSoT para los tipos del dominio de mensajes, garantizando que el `messagesManifest` y el orquestador `i18n.ts` se comuniquen de forma segura y predecible.

## 2. Arquitectura y Flujo de Ejecución

Como archivo de definición de tipos, no tiene un flujo de ejecución, sino un flujo de dependencias conceptuales.

```mermaid
graph TD
    A["types.ts <br> (Define `ManifestModule`)"] --> B["manifest.ts <br> (Implementa `ManifestModule`)"];
    C["types.ts <br> (Define `MessageModule`)"] --> B;
    B --> D["i18n.ts <br> (Consume `manifest.ts`)"];
3. Contrato de API
MessageModule: type: Define la forma que debe tener cada archivo .json de mensajes: un objeto cuyas claves son los AppLocales soportados.
ManifestModule: type: Define la firma de las funciones de importación dinámica que contiene el messagesManifest.
4. Zona de Melhorias Futuras
GENERACIÓN DE TIPO Messages: Crear un script que ensamble un tipo Messages a partir de todos los módulos del manifiesto, proveyendo una visión holística y tipo-segura de todas las traducciones.
TIPO NestedKeyOf: Implementar un tipo de utilidad que transforme el futuro tipo Messages en una unión de strings con notación de punto para un autocompletado de élite en useTranslations.
DOCUMENTACIÓN EN ESPAÑOL: Traducir este documento espejo al español.
TIPADO DE PLACEHOLDERS: Investigar una forma de tipar los placeholders en las strings de traducción (ej. Bienvenido, {username}!) para que los componentes que las usan deban proveer las variables correctas.
TIPADO DE t.raw: Crear un tipo genérico que permita a t.raw inferir el tipo de la estructura de datos que devuelve, en lugar de any.
VALIDACIÓN DE AppLocale: El tipo MessageModule podría ser más estricto para asegurar que todos los locales definidos en navigation.ts estén presentes como claves.
SEPARACIÓN DE TIPOS: Dividir el archivo en types.ts (público) y _internal_types.ts si la complejidad aumenta, para una API más limpia.
INTEGRACIÓN CON ZOD: El futuro tipo Messages debería ser inferido de un schema maestro de Zod (i18n.schema.ts), convirtiendo a Zod en la SSoT definitiva.
COMENTARIOS EN TIPOS GENERADOS: Si se generan tipos, el script debería añadir comentarios TSDoc a cada propiedad para explicar su origen y uso.
MAPA DE TIPOS A SCHEMAS: Crear un tipo mapeado que, dado un namespace, devuelva el tipo de su schema Zod correspondiente.
// .docs-espejo/messages/types.ts.md