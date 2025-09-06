<!-- .docs-espejo/components/ui/Label.tsx.md -->
/**
 * @file .docs-espejo/components/ui/Label.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato Label.
 * @author L.I.A. Legacy
 * @version 5.1.0
 */
# Manifiesto Conceptual: Aparato `Label`

## 1. Rol Estratégico y Propósito

Este aparato es el **fundamento atómico de la accesibilidad (A11Y) y la claridad** en todos los formularios. Como **aparato soberano**, su propósito es doble:
1.  **Renderizar una etiqueta semántica:** Utiliza la primitiva de Radix UI (`LabelPrimitive.Root`) para una implementación robusta de `<label>`.
2.  **Obtener su propio contenido de i18n:** Carga las traducciones para los atributos `aria-label` (ej., para el indicador de campo requerido), garantizando que elementos críticos sean totalmente accesibles en todos los idiomas. Se adhiere a la API de logging del cliente unificada para una observabilidad completa.

## 2. Arquitectura y Flujo de Ejecución

Es un componente de cliente (`"use client"`) soberano, construido sobre Radix UI para una accesibilidad robusta.

```mermaid
graph TD
    A[Componente Padre (ej. `FormInput`)] -- "Pasa props" --> B["`Label.tsx`"];
    B -- "Invoca `useTranslations()`" --> C["Obtiene `requiredIndicatorAriaLabel`"];
    C -- "Aplica a `aria-label`" --> D["Renderiza `*` (si `required`)"];
    B -- "Usa `cva` para determinar clases" --> E{Clases de Estilo};
    B -- "Renderiza" --> F["`<LabelPrimitive.Root>` de Radix UI"];
    B -- "Utiliza `clientLogger.trace()`" --> G[Registro de Observabilidad];
3. Contrato de API
Props de Entrada (LabelProps):
Hereda todas las props de un <label> nativo (prop htmlFor es la más importante).
variant?: "default" | "error": Aplica un estilo visual para indicar un estado (ej., de error).
required?: boolean: Si es true, renderiza un asterisco rojo accesible para indicar que el campo es obligatorio.
4. Zona de Mejoras Nuevas (Valor al Proyecto)
TOOLTIP DE AYUDA: Añadir una prop tooltip?: string que, si se proporciona, renderice un pequeño ícono de información (<Info/> de Lucide) junto a la etiqueta. Al pasar el cursor sobre este ícono, se mostraría un Tooltip (ej. de Radix UI) con información adicional, mejorando la UX sin sobrecargar el espacio visual.
INDICADOR OPCIONAL/REQUERIDO Explícito: En lugar de un booleano required, la prop podría ser un enum ('required' | 'optional' | 'none') para mostrar explícitamente "(opcional)" o "(obligatorio)" junto a la etiqueta, lo cual es útil para la claridad en formularios complejos.
VALIDACIÓN VISUAL DE ESTADO: Integrar una prop isValid?: boolean que, si es true y error es false, aplique un estilo visual de "éxito" a la etiqueta (ej. un borde verde o un icono de verificación), proporcionando feedback positivo.
EFECTO DE ANIMACIÓN DE ENTRADA: Utilizar framer-motion para una sutil animación de entrada de la etiqueta cuando el componente padre se monta o cuando se actualiza su estado de error/requerido, mejorando la fluidez de la interfaz.
<!-- .docs-espejo/components/ui/Label.tsx.md -->