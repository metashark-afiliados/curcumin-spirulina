// src/middleware.ts
import createMiddleware from "next-intl/middleware";
import { localePrefix, locales } from "./lib/navigation";

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 1.0.0
 * @description Middleware de internacionalización. Este aparato intercepta todas
 *              las peticiones y utiliza la lógica de `next-intl` para gestionar
 *              el enrutamiento basado en el locale.
 *
 * @see .docs/I18N_MANIFESTO.md
 * @see https://next-intl.vercel.app/docs/routing/middleware
 */
export default createMiddleware({
  // Una lista de todos los locales que son soportados
  locales,

  // El locale por defecto que se usará si no se puede detectar ninguno
  defaultLocale: "it-IT",

  // Configuración del prefijo del locale en la URL
  localePrefix,
});

export const config = {
  // Coincidir solo en rutas que necesiten internacionalización. Evitar
  // que se ejecute en assets estáticos como imágenes o el favicon.
  matcher: ["/", "/((?!api|_next|_vercel|.*\\..*).*)"],
};

/**
 * MEJORA CONTINUA
 *
 * @version 1.0.0
 *
 * ---
 *
 * @section Melhorias Futuras
 *
 * ((Vigente)) @priority High - INTEGRAÇÃO DE AUTENTICAÇÃO: Adicionar um `AuthHandler` ao pipeline do middleware para proteger rotas e gerenciar sessões de usuário, executando-o após o handler de i18n.
 * ((Vigente)) @priority Medium - MODO DE MANUTENÇÃO: Adicionar um `MaintenanceHandler` que possa interceptar todo o tráfego e redirecionar para uma página de manutenção, com bypass por IP.
 *
 * ---
 *
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 1.0.0 - DELEGAÇÃO A PADRÃO DE ELITE: O middleware delega 100% da lógica de roteamento de i18n para a biblioteca `next-intl`, que é o padrão da indústria, garantindo uma implementação robusta e de fácil manutenção.
 * ((Implementada)) @version 1.0.0 - CONFIGURAÇÃO DECLARATIVA: O middleware consome a configuração da SSoT `navigation.ts`, aderindo ao princípio de "Configuração sobre Código".
 * ((Implementada)) @version 1.0.0 - MATCHER OTIMIZADO: A configuração do `matcher` é otimizada para evitar a execução desnecessária do middleware em requisições de assets estáticos, melhorando o desempenho.
 *
 */
