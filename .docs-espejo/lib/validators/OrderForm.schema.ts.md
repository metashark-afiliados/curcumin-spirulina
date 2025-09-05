// .docs-espejo/lib/validators/OrderForm.schema.ts.md
/**
 * @file .docs-espejo/lib/validators/OrderForm.schema.ts.md
 * @description Documento Espejo y SSoT conceptual para la factoría de schemas del OrderForm.
 * @author L.I.A. Legacy
 * @version 1.0.0
 */
# Manifiesto Conceptual: Aparato `OrderForm.schema`

## 1. Rol Estratégico y Propósito

Este aparato es una **factoría de contratos de datos soberana**. Su única responsabilidad es construir y retornar un schema de validación de `Zod` para el formulario de pedido.

Implementa el patrón de élite **IMAS-E (Internationalization Modular Atomic Strategy for Errors)** para formularios. Al aceptar un objeto de mensajes como parámetro, permite que los errores de validación sean completamente internacionalizados, desacoplando la lógica de validación (el *qué*) del contenido de los mensajes (el *cómo se muestra*).

## 2. Arquitectura y Flujo de Ejecución

Es un módulo de lógica pura que sigue el patrón de Inversión de Dependencias.

```mermaid
graph TD
    A["`OrderForm.tsx` (Componente de Cliente)"] -- "1. Invoca `useTranslations('components.ui.OrderForm')`" --> B[Obtiene `t`];
    B -- "2. Llama a `t.raw('validation')`" --> C[Objeto `ValidationMessages`];
    C -- "3. Pasa como argumento a" --> D["`getOrderFormSchema(messages)`"];
    D -- "4. Retorna Schema Zod configurado" --> E;
    E -- "5. Es usado por `zodResolver` en" --> A;
3. Contrato de API
interface ValidationMessages: Define el contrato de datos que el objeto de mensajes debe cumplir.
function getOrderFormSchema(messages: ValidationMessages): La función de la factoría.
type OrderFormData: El tipo de datos del formulario, inferido directamente desde el schema para una SSoT tipo-segura.
4. Zona de Melhorias Futuras
VALIDACIÓN DE TELÉFONO INTERNACIONAL: Integrar una librería como libphonenumber-js y un .refine() de Zod para realizar una validación de formato de número de teléfono mucho más robusta y consciente del país del usuario (obtenido vía GeoIP).
GENERACIÓN DE TIPOS DESDE JSON: Crear un script que genere automáticamente la interfaz ValidationMessages a partir de la estructura del archivo OrderForm.json, garantizando que el contrato de tipos y el contenido estén siempre sincronizados.
REGEX INTERNACIONALIZABLES: Permitir que las expresiones regulares (ej. para el nombre) también provengan del objeto de mensajes para soportar diferentes conjuntos de caracteres.
SCHEMA DE ÉXITO: Crear una factoría análoga que genere un schema para los datos de éxito de la subida, si la respuesta del productor tuviera una estructura predecible.
// .docs-espejo/lib/validators/OrderForm.schema.ts.md