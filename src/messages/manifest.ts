// src/messages/manifest.ts
/**
 * @file src/messages/manifest.ts
 * @description Manifiesto de Importación Dinámica y Única Fuente de Verdad (SSoT)
 *              para los módulos de mensajes de internacionalización (IMAS).
 *              Este archivo es el mapa maestro que el orquestador `i18n.ts` utiliza
 *              para descubrir y cargar de forma perezosa los archivos de traducción atómicos.
 * @author L.I.A. Legacy
 * @version 3.0.0
 * @see .docs/I18N_MANIFESTO_V2.md
 * @see .docs-espejo/messages/manifest.ts.md
 */
import { type AppLocale } from "@/lib/navigation";

/**
 * @public
 * @constant messagesManifest
 * @description Registro canónico de todos los namespaces de traducción. La clave
 *              es el namespace (derivado de la ruta del componente) y el valor
 *              es una función de importación dinámica. Se han eliminado las entradas
 *              para componentes que ya no existen para mantener la integridad.
 */
export const messagesManifest: Record<
  string,
  () => Promise<{ default: Record<AppLocale, Record<string, any>> }>
> = {
  // --- Páginas de App ---
  "app.notFound": () => import("./app/not-found.json"),
  // "app.selectLanguage": () => import("./app/select-language.json"), // Eliminado

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
