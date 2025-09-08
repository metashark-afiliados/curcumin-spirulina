// .docs/REACTBITS_INTEGRATION_MANIFESTO.md
/**
 * @file .docs/REACTBITS_INTEGRATION_MANIFESTO.md
 * @description Manifiesto de Integración y Roadmap Estratégico. Esta es la
 *              Única Fuente de Verdad (SSoT) que gobierna la selección,
 *              adaptación y uso de componentes de la librería externa ReactBits
 *              dentro del ecosistema del proyecto Curcumin-Complex.
 * @author L.I.A. Legacy
 * @version 1.0.0
 */
# Manifiesto de Integración y Adaptación: ReactBits para Curcumin-Spirulina

## 1. Visión y Filosofía

Este documento establece la doctrina para la integración de componentes de `ReactBits`. Nuestra filosofía no es de simple consumo, sino de **asimilación estratégica**. El objetivo es acelerar el desarrollo de la interfaz de usuario (UI) y enriquecer la experiencia del usuario (UX) sin comprometer la integridad, resiliencia y observabilidad de nuestra arquitectura.

### Principios Rectores (No Negociables)

1.  **Aceleración, no Abandono:** Utilizamos `ReactBits` para construir *más rápido*, no para abandonar nuestros principios. Cada componente integrado es una oportunidad para demostrar la robustez de nuestra arquitectura.
2.  **El Componente se Adapta al Sistema, no al Revés:** La arquitectura de `curcumin-spirulina` es la SSoT. El componente externo debe ser refactorizado para conformarse a nuestros patrones de logging, internacionalización (IMAS), telemetría, sistema de diseño y gestión de estado.
3.  **Calidad y Transparencia sobre Cantidad:** La integración de un componente solo será considerada si su estado en la SSoT de `component-health.json` es **`complete`** y su `quality score` es aceptable (>= 8.0). Debemos ser transparentes con la deuda técnica y evitar componentes `incomplete` o `placeholder`.

---

## 2. El Protocolo de "Naturalización" de Componentes

Ningún componente de `ReactBits` será copiado y pegado directamente. Cada componente seleccionado debe pasar por un riguroso proceso de "naturalización" de cuatro fases para ser aprobado para su uso en producción.

### **Fase 1: Extracción Selectiva (Desde el Showcase)**

1.  **Auditoría Previa:** Consultar la plataforma `dev.reactbits.app` para visualizar el componente y sus variantes.
2.  **Verificación de Calidad:** Validar su estado (`status`) y puntuación (`quality`) contra la SSoT de `component-health`. Rechazar cualquier componente que no sea `complete`.
3.  **Selección de Variante:** Seleccionar la variante canónica: **TypeScript + Tailwind CSS**.
4.  **Extracción de Código:** Copiar el código fuente del componente y cualquier CSS personalizado asociado.

### **Fase 2: Aislamiento y Saneamiento (En `curcumin-cpmplex`)**

1.  **Ubicación Arquitectónica:** Crear el archivo `.tsx` del nuevo aparato en la ubicación correcta según nuestra filosofía de Atomic Design (generalmente en `src/components/ui/`).
2.  **Instalación de Dependencias:** Identificar y añadir cualquier dependencia externa (`npm` package) que el componente requiera (ej. `framer-motion`, `gsap`) a nuestro `package.json`.

### **Fase 3: Nivelación Arquitectónica (El Corazón del Proceso)**

Esta fase transforma el componente de un "invitado" a un "ciudadano" de nuestro ecosistema.

*   **[ ] Checklist de Nivelación Mandatoria:**
    *   **[ ] Declaración de Entorno:** Añadir `"use client";` si el componente requiere interactividad.
    *   **[ ] Integración de Logging:** Importar `clientLogger` desde `@/lib/logger` y añadir logs de ciclo de vida (`trace`) y de eventos de usuario (`info`), siguiendo la firma canónica.
    *   **[ ] Integración de Internacionalización (IMAS):**
        *   Identificar todas las cadenas de texto hardcodeadas.
        *   Crear el archivo de mensajes espejo (`src/messages/components/ui/[ComponentName].json`).
        *   Registrar el nuevo archivo en `src/messages/manifest.ts`.
        *   Refactorizar el componente para usar el hook `useTranslations` y consumir las claves de i18n.
    *   **[ ] Integración de Telemetría:** Para componentes interactivos clave (botones, carruseles), importar y usar el hook `useTelemetry` para registrar eventos de negocio.
    *   **[ ] Creación de Documentación SSoT:**
        *   Crear el **Documento Espejo** en `.docs-espejo/`.
        *   Añadir **TSDoc completo** al componente, explicando sus `props` y su propósito estratégico.

### **Fase 4: Especialización y Branding**

1.  **Adaptación al Sistema de Diseño:** Reemplazar todas las clases de Tailwind con valores fijos (ej. `bg-blue-500`, `rounded-xl`) con nuestras variables semánticas de `tailwind.config.ts` (ej. `bg-brand-primary`, `rounded-lg`).
2.  **Creación de Variantes (`cva`):** Si el componente es un átomo fundamental (como un botón), implementar `class-variance-authority` para crear variantes (`variant`, `size`) que se alineen con nuestro sistema de diseño.
3.  **Conexión con la Lógica de Negocio:** Adaptar la firma de `props` del componente para que reciba los datos y callbacks necesarios de sus componentes orquestadores dentro de `curcumin-spirulina`.

---

## 3. Gobernanza del Ecosistema de Componentes

*   **Registro Central:** Se creará un documento `INTEGRATED_COMPONENTS.md` en el directorio `.docs/` que listará todos los componentes de `ReactBits` que han sido "naturalizados", su ubicación en nuestro proyecto y su estado.
*   **Propuestas de Integración:** Cualquier desarrollador que desee integrar un nuevo componente debe abrir un "Issue" en el repositorio, justificando su valor estratégico y el coste estimado de su "naturalización".

---

## 4. Roadmap de Implementación Estratégica

La integración de `ReactBits` se ejecutará en fases controladas, después de la estabilización completa de la suite de `curcumin-Complex`.

### **Fase 0: Preparación y Habilitación (Prerrequisito)**

*   **Objetivo:** Crear las condiciones necesarias para una integración exitosa.
*   **Tareas Clave:**
    1.  **Estabilizar `curcumin-complex`:** Completar la nivelación actual y asegurar un build 100% limpio y una suite de pruebas robusta.
    2.  **Desplegar el Showcase:** Lanzar la primera versión de la aplicación `dev.reactbits.app` para que sirva como catálogo visual.
    3.  **Capacitación del Equipo:** Revisar y aprobar formalmente este manifiesto con todo el equipo de desarrollo.

### **Fase 1: Prueba de Concepto (PoC) - "El Canario en la Mina"**

*   **Objetivo:** Validar el Protocolo de Naturalización con un componente de bajo riesgo y documentar el proceso.
*   **Tareas Clave:**
    1.  **Selección del Candidato:** Elegir un componente de alta calidad (>= 9.0), puramente visual y sin lógica compleja. Candidato ideal: `Backgrounds > Threads`.
    2.  **Ejecución del Protocolo:** Aplicar las 4 fases de naturalización al componente `Threads`.
    3.  **Integración:** Usar el nuevo componente `ThreadsBackground` como fondo en una sección de la `HomePage`.
    4.  **Revisión y Documentación:** Documentar los desafíos y aprendizajes. Refinar este manifiesto si es necesario.

### **Fase 2: Mejora Estratégica de la Experiencia de Usuario (UX)**

*   **Objetivo:** Utilizar componentes de `ReactBits` para mejorar secciones clave de la `HomePage` y el `Blog`, enfocándose en el "factor sorpresa" y la micro-interactividad.
*   **Tareas Clave:**
    1.  **Reemplazo del Carrusel de Testimonios:** Naturalizar un componente de `Components > Carousel` o `Stack` para presentar los testimonios de una forma más fluida y moderna que la implementación actual con Embla.
    2.  **Animaciones de Texto en el Hero:** Naturalizar y aplicar un componente de `Text Animations > BlurText` o `SplitText` al título principal de la `HeroSection` para una carga más impactante.
    3.  **Efectos de Cursor Opcionales:** Naturalizar un componente de `Animations > Splash Cursor` o `Blob Cursor` y añadirlo como una mejora opcional que el usuario pueda activar/desactivar (buen caso de uso para un `ThemeProvider` futuro).

### **Fase 3: Aceleración de Desarrollo de Nuevas Funcionalidades**

*   **Objetivo:** Aprovechar `ReactBits` para construir rápidamente nuevas secciones o funcionalidades definidas en el `Blueprint` del proyecto.
*   **Tareas Clave:**
    1.  **Sección de FAQ:** Si el `Blueprint` requiere una sección de Preguntas Frecuentes, naturalizar el componente `Components > Accordion`.
    2.  **Visualización de Listas:** Para cualquier nueva lista de características o datos en el blog, naturalizar y usar `Components > AnimatedList`.

### **Fase 4: Madurez y Creación de Componentes Derivados**

*   **Objetivo:** Trascender la simple adaptación y comenzar a crear nuestros propios componentes de élite, inspirados en los patrones de `ReactBits`.
*   **Tareas Clave:**
    1.  **`CurcuminButton` v2.0:** Crear una nueva versión de nuestro `Button.tsx` que incorpore efectos de `ReactBits` (ej. `GlareHover`) como una nueva `variant`.
    2.  **`CurcuminCard` Soberano:** Diseñar y construir un componente de tarjeta (`<CurcuminCard />`) desde cero que combine los mejores aspectos de `PixelCard`, `SpotlightCard` y `TiltedCard`, pero que nazca 100% adaptado a nuestra arquitectura.

Este roadmap transforma la integración de `ReactBits` de una tarea táctica a una ventaja estratégica a largo plazo, garantizando que cada paso aumente el valor y la calidad de nuestro producto final.
// .docs/REACTBITS_INTEGRATION_MANIFESTO.md