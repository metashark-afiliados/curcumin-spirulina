// .docs-espejo/lib/validators/i18n/errors/GenericErrors.schema.ts.md
/\*\*

- @file .docs-espejo/lib/validators/i18n/errors/GenericErrors.schema.ts.md
- @description Documento Espejo y SSoT conceptual para el schema de errores genéricos.
- @author RaZ Podestá - MetaShark Tech
- @version 1.0.0
  \*/

# Manifiesto Conceptual: Aparato `GenericErrors.schema`

## 1. Rol Estratégico y Propósito

Este aparato es la **piedra angular de la Arquitectura de Errores Soberanos Codificados (IMAS-E)**. Su propósito es definir un contrato de datos Zod para las claves de mensajes de error más comunes y reutilizables en toda la aplicación.

Actúa como la SSoT para el vocabulario de errores básicos, garantizando que conceptos como "error de servidor" o "permiso denegado" tengan una clave canónica y única.

## 2. Arquitectura y Flujo de Ejecución

Este es un aparato de "definición pura". No tiene un flujo de ejecución, sino que es consumido por otros aparatos en tiempo de compilación y ejecución.

```mermaid
graph TD
    A["GenericErrors.schema.ts <br> (Define 'error_server_generic', etc.)"] --> B["ValidationErrors.schema.ts <br> (Ensamblador)"];
    B --> C["actions.ts <br> (Infiere el tipo ValidationErrorKey)"];
    D["Server Action <br> (Retorna 'generic.error_server_generic')"] --> E["UI <br> (Traduce la clave)"];
3. Contrato de API
Exportación: export const GenericErrorsSchema: z.ZodObject<...>
Estructura: Un objeto de Zod donde cada clave es un identificador de error semántico y cada valor es z.string().
4. Zona de Mejoras Futuras
Expansión de Vocabulario: Ampliar el schema para incluir más errores genéricos comunes, como error_not_found, error_rate_limit_exceeded, error_update_failed.
Validación de Placeholders: Para claves de error que puedan necesitar interpolación de variables (ej. error_resource_not_found: "No se encontró el recurso con ID {id}"), usar .describe() para documentar los placeholders esperados.
Jerarquía de Errores: Organizar las claves en sub-objetos para una mayor granularidad, por ejemplo server: { unexpected: z.string() }, auth: { unauthenticated: z.string() }.
Generación Automática: Crear un script que pueda analizar el código en busca de usos de tErrors("generic.*") y alertar si una clave no está definida en este schema.
Documentación en Español: Traducir este documento espejo al español.
Integración con Sentry: Crear un mapeo entre estas claves de error y las "tags" de Sentry para facilitar el filtrado y la búsqueda de errores en la plataforma de monitoreo.
Schema para Mensajes de Éxito: Crear un GenericSuccess.schema.ts análogo para estandarizar los mensajes de éxito comunes (ej. generic.save_success).
Tipado de Placeholders: Investigar el uso de genéricos en Zod o helpers para validar no solo la existencia de un placeholder en la descripción, sino también su tipo.
Herencia de Schemas: Utilizar .extend() de Zod para que los schemas de error más específicos (ej. OrderFormErrors.schema.ts) puedan heredar de este schema base para reducir la duplicación.
Añadir Contexto de Severidad: Incluir en el .describe() de cada clave un nivel de severidad (ej. "info", "warning", "error") para guiar a la UI sobre cómo presentar el mensaje (ej. toast de información vs. toast de error).
// .docs-espejo/lib/validators/i18n/errors/GenericErrors.schema.ts.md
```
