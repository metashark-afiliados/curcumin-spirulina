// .docs-espejo/next.config.mjs.md
/**
 * @file .docs-espejo/next.config.mjs.md
 * @description Documento Espejo y SSoT conceptual para la configuración de Next.js.
 * @author L.I.A. Legacy
 * @version 2.0.0
 */
# Manifiesto Conceptual: Aparato `next.config.mjs`

## 1. Rol Estratégico y Propósito

Este aparato es el **Manifiesto de Configuración del Framework**. Su única responsabilidad es instruir a Next.js sobre cómo debe compilar, servir y asegurar la aplicación. Actúa como la SSoT para:

1.  **Estrategia de Build y Despliegue:** Define si la aplicación se genera como un sitio estático (`output: 'export'`) o como una aplicación dinámica renderizada en el servidor (SSR/ISR).
2.  **Políticas de Seguridad:** Configura las cabeceras de seguridad HTTP, como la Política de Seguridad de Contenido (CSP), y define una lista blanca de dominios de imágenes permitidos (`remotePatterns`).
3.  **Integración de Plugins:** Orquesta la envoltura de la configuración con plugins de alto nivel como `next-intl` y `@sentry/nextjs`.

## 2. Arquitectura de la Configuración

La arquitectura se basa en la **composición de configuraciones** a través de funciones de orden superior (wrappers), garantizando un orden de ejecución predecible y una SSoT para cada integración.

```mermaid
graph TD
    A[Objeto `nextConfig` base] --> B["`withNextIntl()`"];
    B --> C["`withSentryConfig()`"];
    C --> D[Configuración Final Exportada];
nextConfig: Contiene las directivas nativas de Next.js (imágenes, cabeceras, etc.).
withNextIntl(nextConfig): Envuelve la configuración base, inyectando la lógica para el enrutamiento y renderizado internacionalizado.
withSentryConfig(...): Envuelve la configuración ya internacionalizada con la lógica para la subida de sourcemaps y la instrumentación de Sentry, consolidando todas las opciones de Sentry en una única invocación.
3. Contrato de API
Entrada: Variables de entorno (process.env) para configurar dinámicamente la CSP, Sentry, etc.
Salida: Un objeto de configuración final que la CLI de next utiliza para los comandos dev, build, y start.
4. Zona de Melhorias Futuras
ANÁLISE DE BUNDLE: Integrar @next/bundle-analyzer para gerar um relatório visual do tamanho dos pacotes de JavaScript, ajudando a identificar oportunidades de otimização.
REDIRECIONAMENTOS SEO: Implementar a função redirects() para configurar redirecionamentos 301 permanentes para rotas antigas ou URLs canônicas.
MANEJO DE CSP MAIS GRANULAR: Extrair a configuração da CSP para um arquivo separado (csp.config.mjs) para melhorar a manutenibilidade e permitir regras mais complexas por rota.
SUPORTE PARA PWA: Integrar @ducanh2912/next-pwa para adicionar capacidades de Progressive Web App.
VALIDAÇÃO DE VARIÁVEIS DE AMBIENTE: Utilizar env na configuração para validar que todas as variáveis de entorno necessárias estejam presentes durante o build, prevenindo falhas em produção.
// .docs-espejo/next.config.mjs.md