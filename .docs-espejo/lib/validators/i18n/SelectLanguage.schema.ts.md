// .docs-espejo/lib/validators/i18n/SelectLanguage.schema.ts.md
/**
 * @file .docs-espejo/lib/validators/i18n/SelectLanguage.schema.ts.md
 * @description Documento Espejo y SSoT conceptual para el schema de contenido de la página de selección de idioma.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 2.0.0
 */
# Manifiesto Conceptual: `SelectLanguage.schema.ts`

## 1. Rol Estratégico y Propósito

Este aparato de validación es el **Guardián del Contrato de Contenido** para la página `select-language`. Su única responsabilidad es definir y hacer cumplir la estructura y los tipos de datos que el componente de UI (`select-language/page.tsx`) espera recibir de su archivo de mensajes.

Esta versión de élite es **dinámicamente consciente** de la configuración de navegación del proyecto. Se asegura de que exista una traducción para cada `locale` activo, creando una validación cruzada entre la configuración y el contenido.

## 2. Arquitectura y Flujo de Ejecución

Es un módulo de configuración que consume la SSoT de `navigation.ts` para construir y exportar un `Zod schema` dinámico.

```mermaid
graph TD
    A["navigation.ts <br> (SSoT de locales activos)"] --> B["SelectLanguage.schema.ts"];
    B -- "Construye un schema dinámico" --> C{Valida};
    D["messages/app/select-language.json <br> (Datos de Contenido)"] --> C;
    B -- "Infiere tipo estricto" --> E["select-language/page.tsx <br> (Consumidor de UI)"];
3. Contrato de API
SelectLanguageContentSchema: El objeto de schema de Zod dinámico.
SelectLanguageContent: El tipo de TypeScript inferido, que ahora garantiza la existencia de todas las claves de locale.
4. Zona de Melhorias Futuras
Factoría de Schemas Genérica: La lógica de construir un objeto de schema a partir de un array de locales podría ser extraída a una función helper (createLocaleRecordSchema) para ser reutilizada por otros schemas de contenido.
Mensajes de Error de Zod Internacionalizados: Los mensajes de error de validación podrían ser reemplazados por claves de ValidationErrors para ser traducidos.
Schema para Banderas (Flags): Si se añade la funcionalidad de banderas, el schema podría ser extendido para validar un objeto flags que mapee locale a un emoji de bandera.
Generación Automática: Un script podría generar este archivo completo a partir de una plantilla y la configuración de navigation.ts.
Refinamiento del Placeholder Check: El .refine podría ser reemplazado por un tipo de Zod personalizado (z.string().placeholder("{key}")) para una mayor reutilización.
Documentación de Placeholders: Utilizar .describe() en Zod para documentar explícitamente qué placeholders se esperan en cada clave.
Pruebas Unitarias del Schema: Escribir pruebas para el schema que verifiquen que valida correctamente los datos correctos y rechaza los incorrectos, incluyendo la falta de un locale.
Versión del Schema: Añadir un campo version al schema para gestionar futuras migraciones de la estructura del contenido.
Herramientas de Linter para i18n: Integrar un linter de i18n que utilice este schema para proporcionar feedback en tiempo real a los traductores.
Internacionalización de la Documentación: Traducir este documento espejo.
// .docs-espejo/lib/validators/i18n/SelectLanguage.schema.ts.md