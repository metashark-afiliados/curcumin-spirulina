// .docs/USING_REACTBITS_GUIDE.md
/\*\*

- @file .docs/USING_REACTBITS_GUIDE.md
- @description Manual de Uso Canónico y Guía Táctica para la Integración de
-              Componentes ReactBits en el Proyecto Curcumin-Complex. Esta es la
-              SSoT para el proceso de "Naturalización" de componentes externos.
- @author L.I.A. Legacy
- @version 1.0.0
  \*/

# Manual de Uso: Integrando Componentes ReactBits en Curcumin-Complex

## 1. Propósito y Filosofía

Este documento es la guía de campo para cualquier desarrollador que integre un componente de la librería `ReactBits` en el ecosistema de **`curcumin-complex`**.

Nuestra filosofía es la **Asimilación Arquitectónica**. No consumimos componentes; los "naturalizamos". Cada componente externo debe ser meticulosamente refactorizado para convertirse en un ciudadano de primera clase de nuestra arquitectura, adhiriéndose a nuestros principios de **resiliencia, observabilidad, internacionalización (IMAS) y diseño semántico**.

**Directiva No Negociable:** Seguir este protocolo no es opcional. Garantiza que la velocidad ganada al usar componentes externos no se traduzca en deuda técnica o degradación de la calidad.

---

## 2. El Protocolo de Naturalización: Paso a Paso

Todo componente de `ReactBits` debe pasar por las siguientes cuatro fases para ser considerado "listo para producción".

### **Fase 1: Extracción y Verificación**

- **Plataforma:** `dev.reactbits.app` (El Showcase de Componentes)

1.  **Auditoría de Calidad:** Antes de considerar un componente, verifique su estado en la SSoT de `component-health`.
    - **Aprobado:** `status: "complete"` y `quality >= 8.0`.
    - **Rechazado:** Cualquier componente marcado como `incomplete` o `placeholder` (ej. Buttons, Forms, Loaders) está prohibido para su uso.
2.  **Selección de Variante:** Seleccione y copie el código de la variante **TypeScript + Tailwind CSS**. Esta es la única variante compatible con nuestra stack.
3.  **Identificación de Dependencias:** Anote las dependencias `npm` que el componente requiere (ej. `framer-motion`, `gsap`).

### **Fase 2: Aislamiento en el Proyecto**

- **Plataforma:** Codebase de `curcumin-complex`.

1.  **Creación del Aparato:** Cree un nuevo archivo `.tsx` en la ubicación correcta de nuestra arquitectura de Atomic Design. Para la mayoría de los componentes de UI, será `src/components/ui/`.
    - _Ejemplo:_ `src/components/ui/ThreadsBackground.tsx`
2.  **Instalación de Dependencias:** Si se identificaron dependencias en la Fase 1 que no existen en nuestro `package.json`, instálelas:
    ```bash
    pnpm install framer-motion
    ```
3.  **Saneamiento Inicial:** Pegue el código y ejecute `pnpm format` para alinear el estilo.

### **Fase 3: Nivelación Arquitectónica**

Esta es la fase de integración profunda. El componente es refactorizado para "hablar" el lenguaje de nuestra arquitectura.

- **[ ] Checklist de Nivelación:**
  1.  **Declarar Entorno:** Añada `"use client";` al inicio del archivo si el componente utiliza hooks o gestiona estado.
  2.  **Unificar Utilidades:** Reemplace cualquier importación de `clsx` o `tailwind-merge` con nuestra SSoT:
      ```typescript
      import { cn } from "@/lib/utils";
      ```
  3.  **Integrar Logging:**
      - Importe el logger de cliente: `import { clientLogger } from "@/lib/client-logger";`
      - Añada un log de `trace` para registrar el renderizado del componente, siguiendo la firma canónica:
      ```typescript
      clientLogger.trace("[ComponentName]", "Renderizando aparato.", { props });
      ```
  4.  **Internacionalizar (IMAS):**
      - **a. Identificar Textos:** Encuentre todas las cadenas de texto visibles para el usuario que estén hardcodeadas en el JSX.
      - **b. Crear Archivo de Mensajes:** Cree el archivo `.json` espejo en `src/messages/components/ui/ComponentName.json`.
      - **c. Registrar en Manifiesto:** Añada la nueva ruta al objeto `messagesManifest` en `src/messages/manifest.ts`.
      - **d. Refactorizar Componente:** Importe `useTranslations` y reemplace los textos fijos por llamadas a `t('clave')`.
  5.  **Crear Documentación:**
      - Genere el **Documento Espejo** en `.docs-espejo/components/ui/ComponentName.tsx.md`.
      - Añada **TSDoc completo** al componente, documentando su propósito y `props`.

### **Fase 4: Especialización y Branding**

La fase final asegura que el componente no solo funcione, sino que se vea y se sienta como parte de `curcumin-complex`.

1.  **Aplicar Sistema de Diseño:** Revise todas las clases de Tailwind.
    - **Colores:** Reemplace colores genéricos (`bg-blue-500`, `text-neutral-200`) por nuestras variables semánticas (`bg-brand-primary`, `text-white/80`).
    - **Geometría:** Ajuste valores como `padding`, `margin`, y `border-radius` (`rounded-xl` -> `rounded-lg`) para que coincidan con nuestros tokens de diseño.
2.  **Integrar Telemetría (si aplica):** Si la interacción con el componente es un evento de negocio significativo (ej. clic en un botón de un funnel), utilice `useTelemetry` para registrarlo.
3.  **Adaptar `Props`:** Modifique la interfaz de `props` del componente para que se alinee con los datos y la lógica de negocio de `curcumin-complex`.

---

## 3. Ejemplo Práctico: Naturalización de "Glow Button"

- **Objetivo:** Integrar el componente `GlowButton` de ReactBits.

1.  **Fase 1 (Extracción):** Se verifica que tiene estado `complete` (hipotéticamente) y se copia el código TS+Tailwind.
2.  **Fase 2 (Aislamiento):** Se crea `src/components/ui/GlowButton.tsx`.

3.  **Fase 3 (Nivelación):**
    - Se añade `"use client";`.
    - Se añade el log: `clientLogger.trace("[GlowButton]", "Renderizando.");`
    - Se crea `src/messages/components/ui/GlowButton.json` con la clave `buttonText`.
    - Se refactoriza el JSX:
      ```diff
      - <span className="relative">Glow Button</span>
      + <span className="relative">{t('buttonText')}</span>
      ```
    - Se crea el documento espejo y el TSDoc.

4.  **Fase 4 (Especialización):**
    - Se adaptan los colores al sistema de diseño de `curcumin-complex`:
      ```diff
      - <span className="... bg-purple-800 ..."></span>
      - <span className="... bg-pink-800 ..."></span>
      + <span className="... bg-brand-primary-dark ..."></span>
      + <span className="... bg-brand-accent ..."></span>
      ```
    - Se añade un `onClick` en las props que invoca `trackEvent('GLOW_BUTTON_CLICK')`.

**Resultado:** El `GlowButton` ahora es un componente nativo de nuestro ecosistema, listo para ser usado de forma segura en cualquier parte de la aplicación.
// .docs/USING_REACTBITS_GUIDE.md
