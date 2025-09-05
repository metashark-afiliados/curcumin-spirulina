// .docs-espejo/lib/types/actions.ts.md
/\*\*

- @file .docs-espejo/lib/types/actions.ts.md
- @description Documento Espejo y SSoT conceptual para los contratos de Server Action.
- @author RaZ Podestá - MetaShark Tech
- @version 1.0.0
  \*/

# Manifiesto Conceptual: Aparato de Tipos de Acción (IMAS-E)

## 1. Rol Estratégico y Propósito

Este aparato es el **pilar contractual de la Arquitectura de Resiliencia**. Su único propósito es definir los tipos de datos que gobiernan la comunicación entre las Server Actions (lógica de negocio) y la UI (presentación). Establece un lenguaje común y predecible que desacopla radicalmente el backend del frontend.

Implementa el "Contrato de Retorno de Server Action" exigido por la constitución, garantizando que toda la lógica de negocio "Falle Limpio".

## 2. Arquitectura y Flujo de Ejecución

Este es un aparato de "definición de tipos" y no tiene un flujo de ejecución directo. Su arquitectura se basa en la inferencia de tipos a partir de la SSoT de schemas Zod.

```mermaid
graph TD
    A["ValidationErrors.schema.ts <br> (SSoT de la forma de los errores)"] --> B["actions.ts"];
    B -- "Infiere" --> C["Tipo `ValidationErrorKey`"];
    B -- "Define" --> D["Tipo genérico `ActionResult<T>`"];
    E["Server Action"] -- "Retorna `ActionResult`" --> F["Hook de Cliente"];
    F -- "Usa `isActionError` para verificar" --> G["UI (Muestra Toast/Error)"];
3. Contrato de API
ValidationErrorKey: type: Una unión de strings que representa todas las rutas de claves de error válidas (ej. "generic.error_server_generic").
ActionResult<TSuccess, TErrorData>: type: Un tipo de unión discriminada (success: boolean) que representa un resultado exitoso o fallido.
isActionError(result): boolean: Un guardián de tipo que permite a la UI verificar de forma segura si un resultado es un error.
isActionSuccess<T>(result): boolean: Un guardián de tipo genérico que verifica si un resultado es exitoso y preserva el tipo de los datos de éxito.
4. Zona de Mejoras Futuras
Tipos de Éxito Soberanos: Crear un SuccessKey análogo a ValidationErrorKey para que las acciones retornen claves de éxito (ej. "orderForm.submit_success") en lugar de strings, completando la soberanía de la comunicación.
ActionResult con errorId: Extender el ActionResult de error para que incluya el errorId devuelto por createPersistentErrorLog, permitiendo a la UI mostrar un ID de referencia al usuario para el soporte técnico.
Documentación en Español: Traducir este documento espejo al español.
Generador de ValidationErrorKey: Crear un script de build que genere este tipo estáticamente a partir del schema, en lugar de depender de la inferencia en tiempo de compilación.
Guardianes de Tipo Más Específicos: Crear guardianes de tipo más específicos, como isValidationError(result) que no solo verifique success: false sino que también compruebe si error pertenece a un namespace específico.
Integración con un Result Monad: Investigar la refactorización de ActionResult para usar un patrón Monad (como la librería ts-results), lo que podría proporcionar una API más funcional y robusta para el manejo de errores.
ValidationErrorKey con Autocompletado Anidado: Mejorar el tipo NestedKeyOf para que el autocompletado en los IDEs sugiera los namespaces y luego las claves (generic. -> error_server_generic).
Documentación de Claves en el Propio Tipo: Explorar el uso de comentarios JSDoc en el tipo ValidationErrorKey generado para que los desarrolladores puedan ver la descripción del error al pasar el mouse sobre la clave.
Wrapper de Acción Genérico: Crear una función de orden superior (createActionHandler) que envuelva la lógica de una Server Action y maneje automáticamente el try/catch, la creación de logs y el retorno del ActionResult correcto, adhiriéndose al principio DRY.
Soporte para Múltiples Errores: Modificar el ActionResult de error para que pueda devolver un array de ValidationErrorKeys, útil para formularios donde múltiples campos pueden tener errores de validación simultáneamente.
// .docs-espejo/lib/types/actions.ts.md
```
