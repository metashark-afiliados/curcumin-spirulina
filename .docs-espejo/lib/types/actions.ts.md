// .docs-espejo/lib/types/actions.ts.md
/**
 * @file .docs-espejo/lib/types/actions.ts.md
 * @description Documento Espejo y SSoT conceptual para los contratos de Server Action.
 * @author RaZ Podestá - MetaShark Tech
 * @version 1.1.0
 */
# Manifiesto Conceptual: Aparato de Tipos de Acción (IMAS-E)

## 1. Rol Estratégico y Propósito

Este aparato es el **pilar contractual de la Arquitectura de Resiliencia**. Su único propósito es definir los tipos de datos que gobiernan la comunicación entre las Server Actions (lógica de negocio) y la UI (presentación). Establece un lenguaje común y predecible que desacopla radicalmente el backend del frontend.

Implementa el "Contrato de Retorno de Server Action" exigido por la constitución, garantizando que toda la lógica de negocio "Falle Limpio".

## 2. Arquitectura y Flujo de Ejecución

Este es un aparato de "definición de tipos" y no tiene un flujo de ejecución directo. Su arquitectura se basa en la inferencia de tipos a partir de la SSoT de schemas Zod.

```mermaid
graph TD
    A["`ValidationErrors.schema.ts` <br> (SSoT de la forma de los errores)"] --> B["`actions.ts`"];
    B -- "Infiere con `NestedKeyOf`" --> C["Tipo `ValidationErrorKey`"];
    B -- "Define la unión discriminada" --> D["Tipo genérico `ActionResult<T>`"];
    E["Server Action"] -- "Retorna `ActionResult`" --> F["Hook de Cliente"];
    F -- "Usa `isActionError` para verificar" --> G["UI (Muestra Toast/Error)"];
3. Contrato de API
ValidationErrorKey: type: Una unión de strings que representa todas las rutas de claves de error válidas (ej. "generic.error_server_generic"). Es la SSoT de los "códigos de error".
ActionResult<TSuccess, TErrorData>: type: Un tipo de unión discriminada (success: boolean) que representa un resultado exitoso o fallido.
isActionError(result): boolean: Un guardián de tipo que permite a la UI verificar de forma segura si un resultado es un error.
isActionSuccess<T>(result): boolean: Un guardián de tipo genérico que verifica si un resultado es exitoso y preserva el tipo de los datos de éxito.
4. Zona de Melhorias Futuras
Tipos de Éxito Soberanos: Criar um SuccessKey análogo a ValidationErrorKey para que as ações retornem chaves de sucesso (ex: "orderForm.submit_success").
ActionResult com errorId: Estender o ActionResult de erro para que inclua o errorId retornado pela persistência de logs, permitindo à UI mostrar um ID de referência para o suporte técnico.
Wrapper de Ação Genérico: Criar uma função de ordem superior (createActionHandler) que envolva a lógica de uma Server Action e lide automaticamente com o try/catch, a criação de logs e o retorno do ActionResult correto.
Suporte para Múltiplos Erros: Modificar o ActionResult de erro para que possa devolver um array de ValidationErrorKeys, útil para validações de formulário.
// .docs-espejo/lib/types/actions.ts.md