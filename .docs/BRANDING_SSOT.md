// .docs/BRANDING_SSOT.md
/**
 * @file .docs/BRANDING_SSOT.md
 * @description Manifiesto Técnico de Branding y SSoT del Sistema de Diseño
 *              para el proyecto Curcumin-Complex. Este documento define la
 *              paleta de colores, tipografía y geometría, y audita su
 *              implementación técnica, proveyendo un plan de acción para su
 *              nivelación.
 * @author L.I.A. Legacy
 * @version 1.0.0
 */
# Manifiesto Técnico de Branding: Curcumin-Complex

## 1. Filosofía de Diseño

La identidad visual de `curcumin-complex` se basa en la dualidad de **Energía Natural y Confianza Científica**. El diseño debe comunicar vitalidad y calidez, al mismo tiempo que proyecta seguridad, limpieza y eficacia.

*   **Energía y Vitalidad:** Se logra a través de colores cálidos y vibrantes (naranjas, rojos) y un diseño dinámico.
*   **Confianza y Naturalidad:** Se refuerza con colores terrosos y naturales (verdes profundos) y una tipografía clara y legible.
*   **Claridad y Conversión:** La estructura es limpia, con un amplio espacio en blanco y una jerarquía visual fuerte que guía al usuario inequívocamente hacia la acción.

## 2. Paleta de Colores Canónica

Esta es la SSoT para todos los valores de color del proyecto. Los nombres de las variables CSS han sido redefinidos semánticamente para reflejar su verdadero propósito en la UI.

| Rol Estratégico            | Variable CSS Propuesta        | Valor HSL (SSoT)   | Descripción de Uso                                     |
| -------------------------- | ----------------------------- | ------------------ | ------------------------------------------------------ |
| **Primario (Vitalidad)**   | `--brand-primary-orange`      | `30 95% 55%`       | Color dominante para ganchos visuales, fondos y acentos. |
| **Primario (Hover)**       | `--brand-primary-orange-hover`| `30 95% 50%`       | Estado interactivo del color primario.                 |
| **Base (Confianza)**       | `--brand-base-green`          | `147 60% 20%`      | Fondos de secciones clave de confianza (ej. OrderForm).  |
| **Base (Oscuro)**          | `--brand-base-green-dark`     | `147 65% 15%`      | Fondos de Header/Footer, para mayor contraste.         |
| **Acento (Natural)**       | `--brand-accent-leaf-green`   | `85 50% 45%`       | **(NUEVO)** Para detalles sutiles que evocan naturaleza. |
| **Acción (CTA)**           | `--brand-cta-red`             | `0 72% 51%`        | **(SEMÁNTICO)** Botones de acción principales.         |
| **Fondo Principal**        | `--brand-background`          | `240 10% 4%`       | El fondo casi negro de la aplicación.                  |
| **Texto Principal**        | `--foreground`                | `0 0% 98%`         | Texto principal (blanco suave).                        |
| **Texto Secundario**       | `--foreground-muted`          | `(automático)`     | Texto con opacidad (`text-white/70`, `text-white/80`). |
| **Borde Sutil**            | `--brand-border`              | `240 5% 15%`       | Bordes y separadores.                                  |
| **Feedback (Error)**       | `--feedback-error`            | `0 72% 51%`        | Exclusivamente para estados de error en formularios.   |

## 3. Tipografía

La tipografía debe ser moderna, limpia y altamente legible, reforzando la claridad y la confianza.

*   **Familia Principal:** Inter (`--font-inter`), servida a través de `next/font`.
*   **Jerarquía:**
    *   **Titulares (`h1`, `h2`):** `font-extrabold`, `tracking-tight`. Comunican impacto y energía.
    *   **Subtítulos (`h3`):** `font-bold`. Guían al usuario a través del contenido.
    *   **Cuerpo de Texto (`p`):** `font-sans` (normal). Optimizado para la máxima legibilidad.

## 4. Geometría y Espaciado

La geometría del diseño es suave y orgánica, evitando ángulos duros para crear una sensación amigable y moderna.

*   **Radio de Borde (SSoT):** La variable `--radius` (`0.75rem` / `12px`) es la SSoT para el redondeo de todos los elementos principales (botones, tarjetas, formularios).
*   **Espaciado:** El diseño utiliza un espaciado generoso entre secciones y elementos para evitar la sobrecarga cognitiva y mejorar la legibilidad.

---

## 5. Auditoría de Consistencia y Plan de Acción de Nivelación

El análisis comparativo entre la imagen y el código (`globals.css`) revela las siguientes brechas que deben ser cerradas para alcanzar la coherencia total.

### **Diagnóstico de Inconsistencias:**

1.  **Inconsistencia Semántica #1 (Color Primario):** La variable `--brand-primary` en `globals.css` está definida como un verde profundo. Sin embargo, en el diseño visual, el color primario y dominante es el **naranja**. El verde actúa como un color base de confianza.
2.  **Inconsistencia Semántica #2 (Color de CTA):** El botón de acción principal (rojo) utiliza el color definido en la variable `--feedback-error`. Esto es un **error semántico crítico**. Un color de acción no debe provenir de un token de error, ya que confunde el propósito del sistema de diseño y dificulta el mantenimiento.
3.  **Omisión de Token (Verde Hoja):** El **verde vivo y natural** de las hojas que flotan en el diseño está completamente **ausente** en la paleta de colores técnica. Este color es clave para comunicar el aspecto "natural" del producto.

### **Roadmap de Nivelación del Sistema de Diseño (No Bloqueante)**

Se debe ejecutar el siguiente plan de refactorización para alinear la SSoT técnica con la SSoT visual.

#### **Tarea 1: Refactorizar `src/app/globals.css`**

*   **Objetivo:** Implementar la Paleta de Colores Canónica y corregir las inconsistencias.

*   **Checklist de Cambios:**
    *   [ ] **Renombrar `--brand-primary` a `--brand-base-green`**.
    *   [ ] **Renombrar `--brand-primary-dark` a `--brand-base-green-dark`**.
    *   [ ] **Renombrar `--brand-accent` a `--brand-primary-orange`**.
    *   [ ] **Renombrar `--brand-accent-hover` a `--brand-primary-orange-hover`**.
    *   [ ] **Crear la nueva variable `--brand-accent-leaf-green: 85 50% 45%;`**.
    *   [ ] **Crear la nueva variable semántica `--brand-cta-red: 0 72% 51%;`**.
    *   [ ] **(Opcional pero recomendado)** Mantener `--feedback-error` con el mismo valor, pero dedicarlo exclusivamente a mensajes de error.

#### **Tarea 2: Refactorizar `tailwind.config.ts`**

*   **Objetivo:** Actualizar el mapa de configuración de Tailwind para que consuma las nuevas variables semánticas.

*   **Checklist de Cambios:**
    *   [ ] Actualizar el objeto `colors` para que refleje los nuevos nombres de variables. Ejemplo:
        ```diff
        - primary: "hsl(var(--brand-primary))",
        - accent: "hsl(var(--brand-accent))",
        + "primary-orange": "hsl(var(--brand-primary-orange))",
        + "base-green": "hsl(var(--brand-base-green))",
        + "accent-leaf-green": "hsl(var(--brand-accent-leaf-green))",
        + "cta-red": "hsl(var(--brand-cta-red))",
        ```

#### **Tarea 3: Refactorizar Componentes de UI**

*   **Objetivo:** Actualizar los componentes que consumen los colores renombrados.

*   **Checklist de Cambios:**
    *   [ ] Auditar la base de código en busca de clases como `bg-brand-primary`, `bg-brand-accent` y `bg-feedback-error` (cuando se usa en un CTA).
    *   [ ] Reemplazarlas con las nuevas clases semánticas: `bg-base-green`, `bg-primary-orange`, `bg-cta-red`.
    *   [ ] **Componente Clave Afectado:** `src/components/ui/Button.tsx`. La variante `destructive` debe usar `bg-feedback-error`, mientras que una nueva variante o el uso directo en el CTA debe usar `bg-cta-red`.

Al completar este roadmap, el sistema de diseño del proyecto `curcumin-complex` estará en un estado de élite: semánticamente correcto, consistente con la visión de la marca y técnicamente robusto.
// .docs/BRANDING_SSOT.md