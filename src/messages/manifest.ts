// src/messages/manifest.ts
import { ManifestModule } from "./types";

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 2.0.0
 * @description Manifiesto de Importación Dinámica y SSoT para el registro de
 *              todos los archivos de mensajes de i18n.
 * @see .docs/I18N_MANIFESTO_V2.md
 */
export const messagesManifest: Record<string, ManifestModule> = {
  // --- Componentes de UI ---
  "components.ui.BenefitsSection": () =>
    import("./components/ui/BenefitsSection.json"),
  "components.ui.FooterSection": () =>
    import("./components/ui/FooterSection.json"),
  "components.ui.HeroSection": () => import("./components/ui/HeroSection.json"),
  "components.ui.InfoSection": () => import("./components/ui/InfoSection.json"),
  "components.ui.OrderForm": () => import("./components/ui/OrderForm.json"),
  "components.ui.TestimonialsSection": () =>
    import("./components/ui/TestimonialsSection.json"),
  "components.ui.TreatmentCycleSection": () =>
    import("./components/ui/TreatmentCycleSection.json"),
};

/**
 * MEJORA CONTINUA
 *
 * @version 2.0.0
 * ---
 * @section Melhorias Futuras
 *
 * ((Vigente)) @priority High - GERAÇÃO AUTOMÁTICA: Este arquivo é o candidato ideal para ser gerado por um script (`pnpm gen:i18n:manifest`) que escaneie o diretório `src/messages` e construa o manifesto dinamicamente, eliminando a manutenção manual e o risco de erro humano.
 *
 * ---
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 2.0.0 - MANIFESTO COMPLETO E FUNCIONAL: O manifesto foi expandido para registrar todos os módulos de mensagens existentes na estrutura de arquivos. Esta refatorização corrige o erro crítico de renderização que mostrava as chaves de i18n em vez do texto traduzido, restaurando a funcionalidade da camada de internacionalização.
 * ((Implementada)) @version 1.0.0 - FUNDAÇÃO IMAS.
 */
