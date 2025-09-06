<!-- .docs-espejo/lib/validators/i18n/SelectLanguage.schema.ts.md -->
/**
 * @file .docs-espejo/lib/validators/i18n/SelectLanguage.schema.ts.md
 * @description Documento Espejo y SSoT conceptual para el esquema de validación del contenido de la página de selección de idioma.
 * @author L.I.A. Legacy
 * @version 1.2.0
 */
# Manifiesto Conceptual: Aparato `SelectLanguage.schema.ts`

## 1. Rol Estratégico y Propósito

Este aparato es la **Única Fuente de Verdad (SSoT) y el contrato de datos** para el contenido de la página de selección de idioma (`src/app/select-language/page.tsx`). Su propósito es definir y validar la estructura esperada del archivo de mensajes JSON correspondiente (`src/messages/app/select-language.json`).

Estratégicamente, este esquema Zod garantiza que:
1.  **Integridad del Contenido:** Los datos de traducción cargados en tiempo de ejecución cumplen con la forma esperada, previniendo errores de UI o de lógica debido a traducciones faltantes o mal formadas.
2.  **Resiliencia:** Permite que el componente `SelectLanguagePage` implemente el "Escudo de Resiliencia", usando textos de fallback si la validación falla.
3.  **Coherencia de Nomenclatura:** Establece los nombres canónicos para las claves de los mensajes (`title`, `countdownText`, `languages`), facilitando la colaboración y el mantenimiento.
4.  **Validación Robusta:** Asegura que las validaciones complejas (como la de tener al menos un idioma definido) se implementen correctamente con las capacidades idiomáticas de Zod.

## 2. Arquitectura y Flujo de Ejecución

Es un módulo de definición de esquema puro. No tiene un flujo de ejecución, sino que es consumido por el componente `SelectLanguagePage` para la validación en tiempo de ejecución.

```mermaid
graph TD
    A["`src/messages/app/select-language.json` <br> (Datos crudos i18n)"] --> B["`SelectLanguageContentSchema` <br> (Schema Zod)"];
    B --> C["`src/app/select-language/page.tsx` <br> (Componente Consumidor)"];
    C -- "Llama a `SelectLanguageContentSchema.safeParse()`" --> D{¿Datos Válidos?};
    D -- Sí --> E[Usa `content.data`];
    D -- No --> F[Loguea error y usa fallbacks];
3. Contrato de API
SelectLanguageContentSchema: z.ZodObject<...>:
Propósito: El objeto Zod que define y valida la estructura completa del contenido de la página de selección de idioma.
Estructura esperada:
title: string: El título principal de la página.
countdownText: string: El texto del contador regresivo (espera el placeholder {seconds}).
selectLanguageAriaLabel: string: La etiqueta ARIA para los botones de selección (espera el placeholder {language}).
languages: z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodString>, Record<string, string>, Record<string, string>>: Un objeto que mapea los códigos de locale a sus nombres traducidos (ej., "it-IT": "Italiano"). Se valida mediante .refine() para asegurar que contiene al menos una entrada.
SelectLanguageContent: type:
Propósito: El tipo de TypeScript inferido directamente de SelectLanguageContentSchema, proporcionando un contrato tipo-seguro para el acceso al contenido validado.
4. Zona de Mejoras Nuevas (Valor al Proyecto)
VALIDACIÓN DE PLACEHOLDERS ESPECÍFICOS MEJORADA: Mejorar la descripción del esquema para countdownText y selectLanguageAriaLabel para que no solo mencionen los placeholders esperados ({seconds}, {language}), sino que, si Zod lo permite en futuras versiones, validar su presencia con un regex o refine más estricto, asegurando que el contenido del JSON sea siempre interpolable.
GENERACIÓN AUTOMÁTICA DE SCHEMAS A PARTIR DE JSON: Implementar un script que, en tiempo de desarrollo, pueda generar o actualizar automáticamente estos archivos de esquema Zod a partir de los archivos JSON de mensajes. Esto mantendría el esquema siempre sincronizado con los datos reales, evitando errores manuales y la deuda técnica de mantenimiento.
AÑADIR meta PARA generateMetadata: Aunque la página ya tiene generateMetadata, el esquema podría incluir una clave meta (ej., meta: z.object({ title: z.string(), description: z.string() })) para validar los metadatos SEO específicos de la página de selección de idioma, haciendo que el componente sea totalmente soberano en su validación de contenido relevante para el SEO.
VALIDACIÓN DE AppLocale EN languages (Claves): Aunque z.record(z.string()) valida los valores, se podría añadir una validación de tiempo de ejecución (ej. con otro .refine()) para asegurar que las claves dentro del objeto languages (it-IT, en-US, etc.) sean realmente AppLocale válidos definidos en src/lib/navigation.ts.
<!-- .docs-espejo/lib/validators/i18n/SelectLanguage.schema.ts.md -->