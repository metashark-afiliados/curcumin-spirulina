// .docs/I18N_MANIFESTO.md
/\*\*

- @file I18N_MANIFESTO.md
- @description Manifiesto Canónico y Única Fuente de Verdad (SSoT) para la
-              Arquitectura de Internacionalización "IMAS" (I18n Mirrored Atomic Structure)
-              del proyecto Curcumin-Spirulina.
- @author RaZ Podestá - MetaShark Tech
- @version 1.0.0
  \*/

# Manifiesto de i18n: Arquitectura Atómica Espejada (IMAS)

## 1. Filosofía

Nuestra arquitectura de i18n se rige por el principio de **Cohesión y Mantenibilidad Radical**. Las traducciones de un aparato son parte intrínseca de ese aparato. Deben vivir lógicamente junto a él, en una estructura predecible y auto-documentada que facilite el desarrollo y la escalabilidad.

## 2. Arquitectura de Archivos: El "Sistema Espejo"

La SSoT de la organización es una estructura de directorios (`src/messages/`) que es un espejo directo de la estructura de nuestros aparatos de UI (`src/app/` y `src/components/`).

**Ejemplo Canónico:**
src/
├── components/
│ └── ui/
│ └── OrderForm.tsx
└── messages/
└── components/
└── ui/
└── OrderForm.json <-- Espejo Atómico
code
Code

## 3. Formato del Archivo de Mensajes Atómico

Cada archivo `.json` es una unidad autocontenida. Define las cadenas de texto para **TODOS los idiomas soportados**, pero exclusivamente para **un único aparato**.

**Ejemplo: `messages/components/ui/OrderForm.json`**

```json
{
  "it-IT": {
    "ctaButton": "ORDINARE ORA",
    "namePlaceholder": "Nome"
  },
  "en-US": {
    "ctaButton": "ORDER NOW",
    "namePlaceholder": "Name"
  },
  "es-ES": {
    "ctaButton": "ORDENAR AHORA",
    "namePlaceholder": "Nombre"
  }
}
4. Orquestación de Ensamblaje (i18n.ts)
El orquestador (src/i18n.ts) es el motor que ensambla los mensajes para cada petición. Su lógica es:
Leer un Manifiesto: Consume un messages/manifest.ts que mapea namespaces a rutas de archivos.
Carga Dinámica en Bucle: Itera sobre todos los namespaces registrados.
Extracción de locale: Para cada archivo cargado, extrae el objeto de traducciones correspondiente al locale de la petición actual.
Construcción de Objeto Anidado: Utiliza un helper para construir un único objeto de mensajes en memoria, donde las claves son los namespaces anidados. next-intl recibe este objeto completo.
5. Estrategia de Despliegue
La arquitectura es compatible tanto con Vercel (dinámico) como con Hostinger (estático), ya que la lógica de ensamblaje ocurre en tiempo de build o en el servidor, antes de enviar el HTML al cliente.
code
Code
---
**Reporte Post-Código**

*   **Análisis de Impacto y Deuda Técnica:** La base de código ha sido purgada de artefactos que contradecían la arquitectura de élite. La Única Fuente de Verdad para la estrategia de i18n ha sido establecida. El proyecto está ahora en un estado limpio, aunque aún no funcional debido a la dependencia pendiente de `src/lib/logging.ts` en `i18n.ts`.

*   **Protocolo de Transparencia (Métrica LOC):**
    *   **LOC `messages/it-IT.json`:** LOC Anterior: 91 | LOC Atual: 0 (Eliminado). **Justificación:** Eliminación de un aparato obsoleto que violaba la arquitectura IMAS.
    *   **LOC `.docs/I18N_MANIFESTO.md`:** LOC Anterior: N/A (Reemplazo de contenido incorrecto) | LOC Atual: 77. **Justificación:** Restauración de la SSoT arquitectónica correcta.

---
// .docs/ROADMAP_PHASE_2.md
/**
 * @file .docs/ROADMAP_PHASE_2.md
 * @description Manifiesto de Roadmap y SSoT para la Fase 2 del Desarrollo.
 *              Define la lógica, estructura y convenciones para la construcción
 *              de las funcionalidades restantes y la infraestructura de pruebas.
 * @author RaZ Podestá - MetaShark Tech
 * @version 1.0.0
 * @date 2025-08-26
 */
# Roadmap de Desarrollo de Élite: Fase 2 - Funcionalidad y Blindaje

## 1. Filosofía y Principios Rectores (Recordatorio)

1.  **Arquitectura Soberana (SSoT):** Cada componente, hook o página es responsable de obtener sus propias dependencias (datos, i18n, estado). Se prohíbe el "prop drilling". La SSoT para cada dominio (datos, i18n, estado) reside en un hook soberano (ej. `useDashboardTranslations`, `useSitesPage`).
2.  **Atomicidad Radical (Filosofía LEGO):** Los componentes de UI son puros, de presentación y reutilizables. Los "Client Components" orquestadores (`-client.tsx`) ensamblan estos átomos y los conectan a la lógica de estado (hooks soberanos), pero no contienen JSX de layout.
3.  **Flujo de Datos Unidireccional y predecible:**
    *   **Server -> Client:** `page.tsx` (Servidor) -> `loader.tsx` (Servidor) -> `client.tsx` (Cliente). Los datos iniciales se cargan en el servidor y se pasan como `props` al orquestador de cliente.
    *   **Mutaciones:** Se realizan a través de `Server Actions`, con gestión de estado optimista en el cliente a través de hooks (`useOptimisticResourceManagement`).

## 2. Convenciones de Nomenclatura y Estructura (SSoT Estructural)

-   **Orquestadores de Cliente:** `[feature]-client.tsx` (ej. `sites-client.tsx`)
-   **Cargadores de Datos de Servidor:** `[feature]-page-loader.tsx` (ej. `sites-page-loader.tsx`)
-   **Hooks Soberanos de Lógica:** `use-[feature]-page.ts` (ej. `use-sites-page.ts`)
-   **Componentes de UI Atómicos:** `[ComponentName].tsx` (ej. `SiteCard.tsx`)
-   **SSoT de I18n:**
    -   **Hook Soberano:** `useDashboardTranslations.ts` (debe ser enriquecido para cada nueva página).
    -   **Schema (Contrato):** `src/lib/validators/i18n/[page].schema.ts`
    -   **Mensajes:** `src/messages/[page].json`

---

## 3. Épica 8: UI/UX - Gestión de Campañas

-   **Estado:** `((Pendiente))` ⏳
-   **Lógica:** Similar a "Mis Sitios", pero aplicado a la entidad `Campaigns`. Se creará un `layout.tsx` para `/dashboard/sites/[siteId]` que obtendrá los datos del sitio, y una página `campaigns/page.tsx` para listar las campañas.
-   **Roadmap Granular:**
    1.  **SSoT de I18n:** Crear `CampaignsPage.schema.ts` y su `json`. Enriquecer `useDashboardTranslations`.
    2.  **Hook Soberano:** Crear `use-campaigns-page.ts` (con búsqueda, paginación y vista dual).
    3.  **Componentes de UI Atómicos:**
        -   `CampaignCard.tsx`
        -   `CampaignsHeader.tsx`
        -   `CampaignsTable.tsx` y `CampaignsTableColumns.tsx`
    4.  **Cargador de Datos:** `campaigns-page-loader.tsx`
    5.  **Orquestador de Cliente:** `campaigns-client.tsx`

---

## 4. Épica 9: UI/UX - El "Builder" Visual

-   **Estado:** `((Pendiente))` ⏳
-   **Lógica:** Esta es la funcionalidad "core" de la aplicación. La arquitectura se basará en un estado global (posiblemente un nuevo `store` de Zustand, `useBuilderStore`) para gestionar los elementos, estilos y configuraciones de la página que se está construyendo.
-   **Roadmap Granular (Fase Inicial):**
    1.  **Análisis Arquitectónico:** Definir el `schema` de datos para un "Creation" (JSONB en la DB).
    2.  **Store de Estado:** Crear `useBuilderStore.ts`.
    3.  **Layout del Builder:** `src/app/[locale]/builder/[creationId]/layout.tsx` (carga los datos de la creación).
    4.  **Componentes Principales:**
        -   `BuilderHeader.tsx` (guardar, previsualizar, publicar).
        -   `BuilderSidebar.tsx` (panel de elementos: texto, imagen, etc.).
        -   `BuilderCanvas.tsx` (área de renderizado "drag-and-drop").
        -   `BuilderSettingsPanel.tsx` (panel contextual para el elemento seleccionado).
    5.  **Server Actions:** `saveCreationAction`, `publishCreationAction`.

---

## 5. Épica 10: Blindaje de Pruebas de Élite

-   **Estado:** `((Pendiente))` ⏳
-   **Lógica:** Una vez que las funcionalidades principales estén estabilizadas, se procederá a "blindarlas" con pruebas de integración y E2E.
-   **Roadmap Granular:**
    1.  **Pruebas de Integración (Vitest):**
        -   Crear arnés de prueba (`.test.tsx`) para cada hook soberano (`use-sites-page.test.tsx`).
        -   Crear arnés de prueba para cada orquestador de cliente (`sites-client.test.tsx`), mockeando sus dependencias.
    2.  **Pruebas End-to-End (Playwright):**
        -   Crear spec (`.spec.ts`) para los flujos de usuario críticos:
            -   `auth.spec.ts`: Registro, Login, Logout.
            -   `sites.spec.ts`: Creación, búsqueda, cambio de vista y eliminación de un sitio.
            -   `campaigns.spec.ts`: Creación y gestión de una campaña.

---
### **Próxima Directiva**

Para continuar en el nuevo hilo, la directiva inicial deberá ser:
**"L.I.A. Legacy, `snapshot` actualizado. Iniciar desarrollo de la Fase 2 según `.docs/ROADMAP_PHASE_2.md`. Proceder con la Épica 8, Tarea 1: creación de la SSoT de I18n para la página de Campañas."**

Este `Roadmap` garantiza que mantendremos la consistencia y la excelencia arquitectónica a medida que avanzamos.
/**
 * =====================================================================
 *                           MEJORA CONTINUA
 * =====================================================================
 * @subsection Melhorias Adicionadas
 * 1. ((Implementada)) **SSoT de Desarrollo:** Este documento centraliza la estrategia, lógica y convenciones, actuando como una guía de élite para prevenir errores y garantizar la coherencia arquitectónica en el futuro.
 * =====================================================================
 */
// .docs/ROADMAP_PHASE_2.md
```
