// .docs-espejo/lib/validators/i18n/errors/GenericErrors.schema.ts.md
/**
 * @file .docs-espejo/lib/validators/i18n/errors/GenericErrors.schema.ts.md
 * @description Documento Espejo y SSoT conceptual para el schema de errores genéricos.
 * @author RaZ Podestá - MetaShark Tech
 * @version 1.1.0
 */
# Manifiesto Conceptual: Aparato `GenericErrors.schema`

## 1. Rol Estratégico y Propósito

Este aparato es la **piedra angular de la Arquitectura de Errores Soberanos Codificados (IMAS-E)**. Su propósito es definir un contrato de datos Zod para las claves de mensajes de error más comunes y reutilizables en toda la aplicación.

Actúa como la SSoT para el vocabulario de errores básicos, garantizando que conceptos como "error de servidor" o "permiso denegado" tengan una clave canónica y única. La documentación de cada clave está embebida directamente en el schema usando `.describe()`, haciéndolo auto-documentado.

## 2. Arquitectura y Flujo de Ejecución

Este es un aparato de "definición pura". No tiene un flujo de ejecución, sino que es consumido por otros aparatos en tiempo de compilación y ejecución.

```mermaid
graph TD
    A["`GenericErrors.schema.ts` <br> (Define 'error_server_generic', etc.)"] --> B["`ValidationErrors.schema.ts` <br> (Ensamblador)"];
    B --> C["`actions.ts` <br> (Infiere el tipo ValidationErrorKey)"];
    D["Server Action <br> (Retorna 'generic.error_server_generic')"] --> E["UI <br> (Traduce la clave)"];
3. Contrato de API
Exportación: export const GenericErrorsSchema: z.ZodObject<...>
Estructura: Un objeto de Zod donde cada clave es un identificador de error semántico y cada valor es z.string().describe(...).
4. Zona de Melhorias Futuras
Expansão de Vocabulário: Ampliar o schema para incluir mais erros genéricos comuns, como error_not_found, error_rate_limit_exceeded.
Validação de Placeholders: Para chaves de erro que possam necessitar de interpolação de variáveis, usar .describe() para documentar os placeholders esperados (ex: .describe('ID do recurso não encontrado: {id}')).
Integração com Sentry: Criar um mapeamento entre estas chaves de erro e as "tags" de Sentry para facilitar a filtragem e a busca de erros na plataforma de monitoramento.
Schema para Mensagens de Sucesso: Criar um GenericSuccess.schema.ts análogo para padronizar as mensagens de sucesso comuns (ex: generic.save_success).
// .docs-espejo/lib/validators/i18n/errors/GenericErrors.schema.ts.md