// .docs-espejo/messages/app/select-language.json.md
/**
 * @file .docs-espejo/messages/app/select-language.json.md
 * @description Documento Espejo y SSoT conceptual para el archivo de mensajes `select-language.json`.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 */
# Manifiesto Conceptual: `select-language.json`

## 1. Rol Estratégico y Propósito

Este aparato es el **Manifiesto de Contenido Atómico** para la página de selección de idioma. Su única responsabilidad es proporcionar el contenido textual para todos los idiomas soportados, exclusivamente para el componente `select-language/page.tsx`.

Actúa como la SSoT de contenido, desacoplando completamente el texto de la lógica de presentación y cumpliendo con el pilar fundamental de la arquitectura de internacionalización IMAS.

## 2. Arquitectura y Flujo de Ejecución

Es un archivo de datos estático (`.json`). No tiene un flujo de ejecución, sino que es consumido por la infraestructura de `next-intl` durante el build y en tiempo de ejecución.

```mermaid
graph TD
    A["select-language.json <br> (Datos de Contenido)"] --> B["i18n.ts <br> (Orquestador de `next-intl`)"];
    B --> C["select-language/page.tsx <br> (consume con `useTranslations`)"];
    A --> D["SelectLanguage.schema.ts <br> (Valida la estructura de A)"];
3. Contrato de API
Estructura: Un objeto JSON donde las claves de nivel superior son los códigos de AppLocale (ej. "it-IT").
Contenido: El valor de cada clave de locale debe ser un objeto que cumpla con la estructura definida en SelectLanguageContentSchema.
4. Zona de Melhorias Futuras
Integración con un CMS: El contenido de este archivo podría ser gestionado a través de un CMS (Content Management System) para permitir que los equipos de marketing o traductores lo actualicen sin tocar el código.
Validación en CI/CD: Implementar un script en el pipeline de CI que valide este archivo contra su schema (SelectLanguage.schema.ts) para detectar errores de formato o de contrato antes del despliegue.
Generación de Claves Faltantes: Crear un script que compare los objetos de locale y alerte si una clave de traducción existe en un idioma pero falta en otro.
Autocompletado para Traductores: Integrar herramientas como i18next-parser o plugins de IDE que lean el schema y proporcionen autocompletado a los traductores.
A/B Testing de Contenido: La estructura podría ser extendida para soportar variantes de texto para pruebas A/B (ej. "title_variant_A": "...", "title_variant_B": "...").
Contexto Plural: Para claves futuras, implementar reglas de pluralización de next-intl.
Notas para Traductores: Utilizar una convención (ej. claves con sufijo _comment) para añadir notas dentro del JSON que guíen a los traductores sobre el contexto de una clave.
Carga Parcial: Si el archivo se vuelve muy grande, investigar estrategias de next-intl para dividirlo en sub-namespaces.
Herramienta de Visualización: Crear una pequeña aplicación interna que renderice todos los mensajes de un archivo JSON para una fácil revisión visual por parte del equipo de contenido.
Internacionalización de la Documentación: Traducir este documento espejo.
// .docs-espejo/messages/app/select-language.json.md