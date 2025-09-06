// src/messages/manifest.ts
/**
 * @file src/messages/manifest.ts
 * @description Manifiesto de Importación Dinámica y Única Fuente de Verdad (SSoT) para los módulos de
 *              mensajes de internacionalización. Este archivo es el mapa maestro que el orquestador
 *              `i18n.ts` utiliza para descubrir y cargar de forma perezosa los archivos de traducción atómicos.
 *              Esta versión refactorizada ajusta el tipado de las importaciones para ser compatible
 *              con la estructura real de los archivos JSON de mensajes, incluyendo arrays de objetos
 *              y otros tipos complejos, resolviendo errores de compilación. La validación granular
 *              de estas estructuras recae en los schemas Zod de los componentes consumidores.
 * @version 2.1.0
 * @author L.I.A. Legacy
 * @see .docs/I18N_MANIFESTO_V2.md
 * @see .docs-espejo/messages/manifest.ts.md
 * @see src/i18n.ts (Consumidor)
 * @see src/messages/types.ts (SSoT para `MessageModule`, `AppLocale`)
 */

import { type ManifestModule } from "./types";
import { type AppLocale } from "@/lib/navigation"; // Necesario para tipar las claves de locale

/**
 * @public
 * @constant messagesManifest
 * @description Registro canónico de todos los namespaces de traducción.
 *              La clave es el namespace (derivado de la ruta del archivo), y el
 *              valor es una función de importación dinámica que carga el módulo
 *              JSON correspondiente de forma perezosa (lazy-loading).
 *              El tipo de retorno de las funciones de importación se ha flexibilizado
 *              a `Record<AppLocale, Record<string, any>>` para acomodar la estructura
 *              real de los archivos JSON (que pueden contener arrays de objetos, etc.)
 *              sin generar errores de tipo en el manifiesto. La validación profunda
 *              del contenido se realiza en los schemas Zod de los componentes que
 *              consumen `t.raw()`.
 */
export const messagesManifest: Record<
  string,
  () => Promise<{ default: Record<AppLocale, Record<string, any>> }>
> = {
  // --- Páginas de App ---
  "app.notFound": () => import("./app/not-found.json"),
  "app.selectLanguage": () => import("./app/select-language.json"),

  // --- Componentes de Blog ---
  "components.blog.ArticleCard": () =>
    import("./components/blog/ArticleCard.json"),
  "components.blog.CallToAction": () =>
    import("./components/blog/CallToAction.json"),

  // --- Componentes de Layout ---
  "components.layout.Footer": () => import("./components/layout/Footer.json"),
  "components.layout.Header": () => import("./components/layout/Header.json"),

  // --- Componentes de UI ---
  "components.ui.AnnouncementBar": () =>
    import("./components/ui/AnnouncementBar.json"),
  "components.ui.BenefitsSection": () =>
    import("./components/ui/BenefitsSection.json"),
  "components.ui.HeroSection": () => import("./components/ui/HeroSection.json"),
  "components.ui.InfoSection": () => import("./components/ui/InfoSection.json"),
  "components.ui.OrderForm": () => import("./components/ui/OrderForm.json"),
  "components.ui.PriceDisplay": () =>
    import("./components/ui/PriceDisplay.json"),
  "components.ui.TestimonialsSection": () =>
    import("./components/ui/TestimonialsSection.json"),
  "components.ui.TreatmentCycleSection": () =>
    import("./components/ui/TreatmentCycleSection.json"),
};
// src/messages/manifest.ts
