// .docs-espejo/components/ui/Label.tsx.md
/**
 * @file .docs-espejo/components/ui/Label.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato Label.
 * @author L.I.A. Legacy
 * @version 5.0.0
 */
# Manifiesto Conceptual: Aparato `Label`

## 1. Rol Estratégico y Propósito

Este aparato es el **fundamento atómico de la accesibilidad (A11Y) y la claridad** en todos los formularios. Como **aparato soberano**, su propósito es doble:
1.  **Renderizar una etiqueta semántica:** Utiliza la primitiva de Radix UI para una implementación robusta de `<label>`.
2.  **Obtener su propio contenido de i18n:** Carga las traducciones para los atributos `aria-label`, garantizando que elementos como el indicador de "campo requerido" sean totalmente accesibles en todos los idiomas.

## 2. Arquitectura y Flujo de Ejecución

Es un componente de cliente (`"use client"`) soberano, construido sobre Radix UI para una accesibilidad robusta.

```mermaid
graph TD
    A[Componente Padre (ej. `FormInput`)] -- "Pasa props" --> B["`Label.tsx`"];
    B -- "Invoca `useTranslations()`" --> C["Obtiene `requiredIndicatorAriaLabel`"];
    C -- "Aplica a `aria-label`" --> D["Renderiza `*` (si `required`)"];
    B -- "Usa `cva` para determinar clases" --> E{Clases de Estilo};
    B -- "Renderiza" --> F["`<LabelPrimitive.Root>` de Radix UI"];
3. Contrato de API
Props de Entrada (LabelProps):
Hereda todas las props de un <label> nativo (htmlFor es la más importante).
variant?: "default" | "error": Aplica un estilo visual para indicar un estado de error.
required?: boolean: Si es true, renderiza un asterisco rojo accesible para indicar que el campo es obligatorio.
4. Zona de Melhorias Futuras
TOOLTIP DE AYUDA: Añadir una prop tooltip?: string que, si se proporciona, renderice un pequeño ícono de información junto a la etiqueta que muestre el tooltip al pasar el cursor.
INDICADOR OPCIONAL/REQUERIDO: En lugar de un booleano, la prop required podría ser un enum ('required' | 'optional' | 'none') para mostrar explícitamente "(opcional)" junto a la etiqueta.
// .docs-espejo/components/ui/Label.tsx.md