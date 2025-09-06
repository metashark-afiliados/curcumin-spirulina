<!-- .docs-espejo/messages/types.ts.md -->
/**
 * @file .docs-espejo/messages/types.ts.md
 * @description Documento Espejo y SSoT conceptual para los tipos de la arquitectura de mensajes.
 * @author L.I.A. Legacy
 * @version 3.0.0
 */
# Manifiesto Conceptual: Aparato `messages/types.ts`

## 1. Rol Estratégico y Propósito

Este aparato es el **diccionario de la arquitectura IMAS**. Su única responsabilidad es definir los **contratos de datos (tipos de TypeScript)** que gobiernan la estructura de los módulos de mensajes (`.json`), el manifiesto (`manifest.ts`), y la estructura recursiva esperada por `next-intl`.

Actúa como una SSoT para los tipos del dominio de mensajes, garantizando una comunicación segura y predecible entre el manifiesto y el orquestador `i18n.ts`.

## 2. Arquitectura y Flujo de Ejecución

Como archivo de definición de tipos, no tiene un flujo de ejecución, sino un flujo de dependencias de compilación.

```mermaid
graph TD
    A["`messages/types.ts` (Define Contratos)"] --> B["`messages/manifest.ts`"];
    A --> C["`i18n.ts`"];
    B & C --> D[Toda la Aplicación];
3. Contrato de API
AbstractIntlMessages: type: Define la estructura de mensajes que next-intl puede interpolar. Directiva Clave: No se debe usar para tipos complejos; para eso, se utiliza t.raw() y validación Zod en el componente.
MessageModule: type: Define la forma de cada archivo .json de mensajes.
ManifestModule: type: Define la firma de las funciones de importación en el manifiesto.
4. Zona de Mejoras Nuevas (Valor al Proyecto)
Generación de Tipos t.raw() Seguros: Crear un script que combine los schemas Zod de los componentes y los archivos .json para generar un tipo NestedKeyOf global, proporcionando autocompletado y seguridad de tipos para t.raw().
Tipado de Mensajes con Placeholders: Investigar el uso de "template literal types" para crear tipos que validen la presencia de placeholders en los strings de mensajes (ej. type MessageWithUser = \Hello, ${string}!``).
Tipado de Pluralización (ICU): Extender AbstractIntlMessages para soportar de forma tipo-segura los mensajes de pluralización en formato ICU que next-intl puede manejar ({count, plural, one {...} other {...}}).
Generador de Tipos desde CMS: Si los mensajes se gestionan en un Headless CMS, crear un script que obtenga el schema del CMS y genere estos tipos automáticamente.
Tipo para DateTimeFormat: Crear tipos específicos para las opciones de formato de fecha y hora que se pueden pasar a useTranslations, para garantizar un formato consistente.
Validación de Tipos en CI/CD: Añadir un paso en el CI/CD que utilice la API del compilador de TypeScript para asegurar que todos los archivos .json se adhieran al tipo MessageModule.
Tipo Namespace: Generar un tipo de unión de strings (type Namespace = "app.notFound" | "components.ui.OrderForm" ...) a partir de las claves de messagesManifest, para usarlo en getTranslations.
Contexto de Género (gender): Extender los tipos para soportar el formato ICU de selección por género, para traducciones más precisas.
Tipo para t.rich(): Crear un tipo que defina qué etiquetas HTML son permitidas en las traducciones de texto enriquecido, para mayor seguridad.
Documentación de Tipos Interactiva: Integrar una herramienta como TSDoc o TypeDoc para generar una documentación HTML interactiva a partir de los comentarios JSDoc en este archivo.
Plugin de ESLint para t.raw(): Crear una regla de ESLint que, al detectar un uso de t.raw(), exija que el resultado sea inmediatamente validado por un schema Zod.