<!-- .docs-espejo/components/ui/FormInput.tsx.md -->
/**
 * @file .docs-espejo/components/ui/FormInput.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato FormInput.
 * @author L.I.A. Legacy
 * @version 5.3.0
 */
# Manifiesto Conceptual: Aparato `FormInput`

## 1. Rol Estratégico y Propósito

Este aparato es una **molécula de UI fundamental** para cualquier formulario en la aplicación. Su propósito es encapsular la lógica de presentación de un campo de entrada (`<input>`), su etiqueta (`<Label>`) y sus iconos contextuales en un único componente cohesivo y reutilizable.

Su diseño se centra en proporcionar un **feedback visual de élite** al usuario, reaccionando a los estados de foco (`isFocused`) y error (`error` prop) para guiar la interacción. Se garantiza que el estado de error se propaga visualmente tanto al borde del input como a la etiqueta (`Label`), asegurando una experiencia de usuario coherente. Se integra con la API de logging del cliente unificada para una observabilidad completa de las interacciones.

## 2. Clarificación Arquitectónica: Responsabilidad

Este aparato es un **componente de presentación puro**. **NO** contiene lógica de validación ni esquemas. Su responsabilidad es **mostrar** un estado de error que le es comunicado por un componente orquestador de formulario (ej. `OrderForm`) a través de la prop `error`. La SSoT de la validación reside en el orquestador.

## 3. Contrato de API
### Props de Entrada (`FormInputProps`):
*   Hereda todas las props de un `<input>` nativo.
*   **`id`**: `string`: ID único para la accesibilidad (`htmlFor`).
*   **`label`**: `string`: El texto visible para la etiqueta.
*   **`icon?`**: `LucideIcon`: Un icono opcional para mostrar a la izquierda.
*   **`error?`**: `string`: Un mensaje de error opcional. Su presencia activa el estado de error tanto en el borde como en la etiqueta.

## 4. Zona de Mejoras Nuevas (Valor al Proyecto)
*   **CAMPO DE CONTRASEÑA CON VISIBILIDAD:** Añadir una lógica que, si `type="password"`, renderice automáticamente un icono de "ojo" para alternar la visibilidad del campo. Esto mejora la usabilidad y seguridad percibida.
*   **INTEGRACIÓN CON `react-imask`:** Añadir una prop `mask?: string` que aplique una máscara de formato al input (ej. para números de teléfono, fechas). Esto mejora la entrada de datos por parte del usuario.
*   **ETIQUETA FLOTANTE (FLOATING LABEL):** Implementar el patrón "Floating Label", donde el placeholder se transforma en una etiqueta que se anima y se posiciona por encima del campo cuando el usuario empieza a escribir, liberando espacio en el input.
*   **ESTADO DE ÉXITO:** Añadir una variante `success` al borde animado y a la etiqueta para proporcionar feedback positivo cuando un campo se ha rellenado y validado correctamente.
*   **LOGGING DE CAMBIOS DE VALOR:** Implementar logging en el evento `onChange` del input para registrar los cambios de valor (ofuscando datos sensibles) y obtener una visión más detallada de cómo los usuarios interactúan con el formulario.
<!-- .docs-espejo/components/ui/FormInput.tsx.md -->