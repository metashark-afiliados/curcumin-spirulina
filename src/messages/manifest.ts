// src/messages/manifest.ts
/**
 * @file manifest.ts
 * @description Manifiesto de Importación Dinámica y SSoT para los módulos de
 *              mensajes de internacionalización. Este archivo es la Única
 *              Fuente de Verdad que el orquestador `i18n.ts` utiliza para
 *              descubrir y cargar los archivos de traducción atómicos.
 * @version 2.0.0
 * @author L.I.A. Legacy
 * @see .docs/I18N_MANIFESTO_V2.md
 * @see .docs-espejo/messages/manifest.ts.md
 * @see src/i18n.ts (Consumidor)
 */

import { type ManifestModule } from "./types";

/**
 * @public
 * @constant messagesManifest
 * @description Registro canónico de todos los namespaces de traducción.
 *              La clave es el namespace (derivado de la ruta del archivo), y el
 *              valor es una función de importación dinámica que carga el módulo
 *              JSON correspondiente de forma perezosa (lazy-loading).
 */
export const messagesManifest: Record<string, ManifestModule> = {
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
