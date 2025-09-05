// .docs-espejo/components/ui/FormInput.tsx.md
/**
 * @file .docs-espejo/components/ui/FormInput.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato FormInput.
 * @author L.I.A. Legacy
 * @version 1.0.0
 */
# Manifiesto Conceptual: Aparato `FormInput`

## 1. Rol Estratégico y Propósito

Este aparato es una **molécula de UI fundamental** para cualquier formulario en la aplicación. Su propósito es encapsular la lógica de presentación de un campo de entrada (`<input>`), su etiqueta (`<Label>`) y sus iconos contextuales en un único componente cohesivo y reutilizable.

Su diseño se centra en proporcionar un **feedback visual de élite** al usuario, reaccionando a los estados de foco (`isFocused`) y error (`error` prop) para guiar la interacción y mejorar la experiencia de llenado del formulario.

## 2. Arquitectura y Flujo de Ejecución

Es un componente de cliente (`"use client"`) puro que gestiona un estado interno mínimo (`isFocused`) para controlar su apariencia.

```mermaid
graph TD
    A[Componente Padre (ej. `OrderForm`)] -- "Pasa props (id, label, error, icon)" --> B["`FormInput.tsx`"];
    B -- "Gestiona estado interno" --> C["`isFocused`"];
    B -- "Renderiza" --> D["`<Label>` visible"];
    B -- "Renderiza" --> E["`motion.div` (Borde animado)"];
    E -- "Contiene" --> F["`<input>`"];
    B -- "Renderiza condicionalmente" --> G["Icono de Prop"];
    B -- "Renderiza condicionalmente" --> H["Icono de Error"];
    B -- "Renderiza condicionalmente vía `AnimatePresence`" --> I["Mensaje de Error"];

    subgraph "Lógica de Estado Visual"
        C -- "Controla la variante de" --> E;
        J["Prop `error`"] -- "Controla la variante de" --> E;
    end
3. Contrato de API
Props de Entrada (FormInputProps):
Hereda todas las props de un <input> nativo.
id: string: ID único para la accesibilidad (htmlFor).
label: string: El texto visible para la etiqueta.
icon?: LucideIcon: Un icono opcional para mostrar a la izquierda.
error?: string: Un mensaje de error opcional. Su presencia activa el estado de error.
4. Zona de Melhorias Futuras
CAMPO DE CONTRASEÑA CON VISIBILIDAD: Añadir una lógica que, si type="password", renderice automáticamente un icono de "ojo" para alternar la visibilidad del campo.
INTEGRACIÓN CON react-imask: Añadir una prop mask que aplique una máscara de formato al input (ej. para números de teléfono, fechas).
ETIQUETA FLOTANTE (FLOATING LABEL): Implementar el patrón "Floating Label", donde el placeholder se transforma en una etiqueta que se anima y se posiciona por encima del campo cuando el usuario empieza a escribir.
ESTADO DE ÉXITO: Añadir una variante success al borde animado y un icono de CheckCircle para proporcionar feedback positivo cuando la validación asíncrona es exitosa.
PERSONALIZACIÓN DE ICONOS: Permitir pasar props para personalizar el color o tamaño de los iconos de prop y de error.
DOCUMENTACIÓN EN ESPAÑOL: Traducir este documento espejo al español.
SOPORTE PARA datalist: Añadir soporte para la etiqueta <datalist> de HTML5 para proporcionar sugerencias de autocompletado.
CONTADOR DE CARACTERES: Si se proporciona una prop maxLength, mostrar un contador de caracteres (ej. 15/140).
PRUEBAS DE ACCESIBILIDAD AUTOMATIZADAS: Integrar jest-axe en las pruebas unitarias de este componente para garantizar el cumplimiento continuo de las directrices de accesibilidad.
HISTORIAS EN STORYBOOK: Crear un conjunto completo de historias en Storybook que muestren el componente en todos sus estados (default, focused, error, disabled, con/sin icono).
// .docs-espejo/components/ui/FormInput.tsx.md