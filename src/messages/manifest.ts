// src/messages/manifest.ts
import { ManifestModule } from './types';

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 1.3.0
 * @description Manifiesto de Importación Dinámica y SSoT para el registro de
 *              todos los archivos de mensajes de i18n.
 * @see .docs/I18N_MANIFESTO.md
 */
export const messagesManifest: Record<string, ManifestModule> = {
  'components.ui.HeroSection': () => import('./components/ui/HeroSection.json'),
  // --- INICIO DE REGISTRO DE APARATO ---
  'components.ui.OrderForm': () => import('./components/ui/OrderForm.json'),
  // --- FIN DE REGISTRO DE APARATO ---
};

/**
 * MEJORA CONTINUA
 *
 * @version 1.3.0
 * ---
 * @section Melhorias Futuras
 *
 * ((Vigente)) @priority High - GERAÇÃO AUTOMÁTICA: Este arquivo é o candidato ideal para ser gerado por um script (`pnpm gen:i18n:manifest`).
 *
 * ---
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 1.3.0 - REGISTRO DE `OrderForm`: Adicionado o namespace para o formulário de pedido, permitindo que seus componentes atômicos consumam suas traduções.
 * ((Implementada)) @version 1.1.0 - REGISTRO DE PRIMEIRO MÓDULO: O primeiro módulo de mensagens atômicas foi registrado.
 * ((Implementada)) @version 1.0.0 - FUNDAÇÃO IMAS: A criação deste manifesto estabelece o "mapa" para o orquestador `i18n.ts`.
 */