// src/messages/manifest.ts
/**
 * @file src/messages/manifest.ts
 * @description Manifiesto de Importación Dinámica y Única Fuente de Verdad (SSoT)
 *              para los módulos de mensajes de internacionalización (IMAS).
 *              Esta versión ha sido auditada y corregida para resolver un error
 *              crítico de módulo no encontrado, restaurando la integridad del
 *              sistema de i18n.
 * @author L.I.A. Legacy
 * @version 6.0.2
 * @see .docs/I18N_MANIFESTO_V2.md
 * @see .docs-espejo/messages/manifest.ts.md
 */
import { type AppLocale } from "@/lib/navigation";
import { type ManifestModule } from "./types";

/**
 * @public
 * @constant messagesManifest
 * @description Registro canónico de todos los namespaces de traducción. La clave
 *              es el namespace (derivado de la ruta del componente) y el valor
 *              es una función de importación dinámica.
 */
export const messagesManifest: Record<string, ManifestModule> = {
  // ============================================================================
  // --- Páginas de App (app/) ---
  // ============================================================================
  "app.globalError": () => import("./app/global-error.json"),
  "app.notFound": () => import("./app/not-found.json"),
  "app.selectLanguage": () => import("./app/select-language.json"),

  // ============================================================================
  // --- Componentes de Dominio (components/) ---
  // ============================================================================
  "components.blog.ArticleCard": () =>
    import("./components/blog/ArticleCard.json"),
  "components.blog.CallToAction": () =>
    import("./components/blog/CallToAction.json"),
  "components.layout.Footer": () => import("./components/layout/Footer.json"),
  "components.layout.Header": () => import("./components/layout/Header.json"),
  // MEJORA: Se registra el nuevo módulo de mensajes para ArticleLayout.
  "components.layout.ArticleLayout": () =>
    import("./components/layout/ArticleLayout.json"),

  // ============================================================================
  // --- Componentes de UI Atómicos (components/ui/) ---
  // ============================================================================
  "components.ui.AnnouncementBar": () =>
    import("./components/ui/AnnouncementBar.json"),
  "components.ui.BenefitsSection": () =>
    import("./components/ui/BenefitsSection.json"),
  "components.ui.Button": () => import("./components/ui/Button.json"),
  "components.ui.HeroSection": () => import("./components/ui/HeroSection.json"),
  "components.ui.InfoSection": () => import("./components/ui/InfoSection.json"),
  "components.ui.Label": () => import("./components/ui/Label.json"),
  "components.ui.OrderForm": () => import("./components/ui/OrderForm.json"),
  "components.ui.PriceDisplay": () =>
    import("./components/ui/PriceDisplay.json"),
  "components.ui.TestimonialsSection": () =>
    import("./components/ui/TestimonialsSection.json"),
  "components.ui.TreatmentCycleSection": () =>
    import("./components/ui/TreatmentCycleSection.json"),
};
// src/messages/manifest.ts
