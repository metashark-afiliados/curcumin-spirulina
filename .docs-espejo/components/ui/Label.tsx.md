// .docs-espejo/components/ui/Label.tsx.md
/\*\*

- @file .docs-espejo/components/ui/Label.tsx.md
- @description Documento Espejo y SSoT conceptual para el aparato Label.
- @author RaZ Podestá - MetaShark Tech
- @version 1.0.0
  \*/

# Manifiesto Conceptual: Aparato `Label`

## 1. Rol Estratégico y Propósito

Este aparato es el **fundamento de la accesibilidad (A11Y) y la claridad** en todos los formularios de la aplicación. Su única responsabilidad es renderizar una etiqueta semántica (`<label>`) que se asocia correctamente con un campo de entrada.

Al ser un componente atómico, garantiza una apariencia y comportamiento consistentes para todas las etiquetas del sistema, promoviendo una experiencia de usuario predecible y profesional.

## 2. Arquitectura y Flujo de Ejecución

Es un componente de cliente (`"use client"`) puro, construido como un wrapper sobre la primitiva de Radix UI (`@radix-ui/react-label`) para una accesibilidad robusta.

```mermaid
graph TD
    A[Componente Padre (ej. `FormInput`)] -- "Pasa props (htmlFor, variant, required, children)" --> B["`Label.tsx`"];
    B -- "Usa `cva` para determinar clases" --> C{Clases de Estilo};
    B -- "Renderiza condicionalmente" --> D["Asterisco `*` (si `required`)"];
    B -- "Compone" --> E["`<LabelPrimitive.Root>` de Radix UI"];
    E -- "Renderiza" --> F[HTML `<label>` final];
3. Contrato de API
Props de Entrada (LabelProps):
Hereda todas las props de un <label> nativo (htmlFor es la más importante).
variant?: "default" | "error": Aplica un estilo visual para indicar un estado de error.
required?: boolean: Si es true, renderiza un asterisco rojo para indicar que el campo es obligatorio.
4. Zona de Melhorias Futuras
TOOLTIP DE AYUDA: Añadir una prop tooltip?: string que, si se proporciona, renderice un pequeño ícono de información junto a la etiqueta que muestre el tooltip al pasar el cursor.
INDICADOR OPCIONAL/REQUERIDO: En lugar de un booleano, la prop required podría ser un enum ('required' | 'optional' | 'none') para mostrar explícitamente "(opcional)" junto a la etiqueta.
INTEGRACIÓN CON CONTEXTO DE FORMULARIO: Crear un FormContext que pueda proveer el estado de los campos. El Label podría consumir este contexto para aplicar automáticamente la variante de error si el campo asociado tiene un error, sin necesidad de pasar la prop explícitamente.
VARIANTES DE TAMAÑO Y PESO: Extender cva para incluir variantes de size (sm, md, lg) y fontWeight (regular, medium, bold).
DOCUMENTACIÓN EN ESPAÑOL: Traducir este documento espejo al español.
PRUEBAS DE ACCESIBILIDAD (jest-axe): Crear un arnés de pruebas unitarias que utilice jest-axe para validar que el Label renderizado, en conjunto con un Input, no tenga violaciones de accesibilidad.
HISTORIAS EN STORYBOOK: Desarrollar un conjunto de historias en Storybook que muestren todas las variantes y estados del componente (default, error, required).
SOPORTE PARA ICONOS: Añadir una prop icon?: LucideIcon para renderizar un icono a la izquierda de la etiqueta, útil para una mayor guía visual.
SLOT PARA CONTENIDO ADICIONAL: Permitir pasar un ReactNode a una prop endSlot para renderizar contenido adicional al final de la etiqueta, como un enlace de "Olvidé mi contraseña".
ESTADO DESHABILITADO EXPLÍCITO: Aunque hereda el estado disabled de su Input asociado, podría tener una variante disabled explícita en cva para un control de estilo más granular.
// .docs-espejo/components/ui/Label.tsx.md
```
