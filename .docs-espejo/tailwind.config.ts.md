// .docs-espejo/tailwind.config.ts.md
/**
 * @file .docs-espejo/tailwind.config.ts.md
 * @description Documento Espejo y SSoT conceptual para el aparato `tailwind.config.ts`.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 */
# Manifiesto Conceptual: `tailwind.config.ts`

## 1. Rol Estratégico y Propósito

Este aparato es el **Puente Estratégico entre el Sistema de Diseño y el Framework de UI**. Su única y crítica responsabilidad es actuar como la Única Fuente de Verdad (SSoT) que instruye al compilador de Tailwind CSS sobre cómo interpretar y extender el sistema de utilidades base.

Su propósito estratégico é:
1.  **Mapear los Tokens de Diseño:** Traduce las variables CSS semánticas (ej. `--brand-primary-orange`) definidas em `globals.css` para classes de utilidade que os desenvolvedores podem usar (ej. `bg-brand-primary-orange`).
2.  **Definir o Escopo de Análise:** Especifica quais arquivos devem ser escaneados em busca de classes de utilidade para a purga de CSS em produção.
3.  **Integrar Plugins:** Estende a funcionalidade base do Tailwind com capacidades adicionais (animações, tipografia, etc.).

## 2. Arquitectura y Flujo de Ejecución

É um módulo de configuração estático que é consumido pelo processo de build do Next.js.

```mermaid
graph TD
    A["src/**/*.tsx <br> (Archivos con Clases)"] --> B{Compilador Tailwind};
    C["globals.css <br> (SSoT de Tokens de Diseño)"] --> D["tailwind.config.ts <br> (Mapeo de Tokens)"];
    D --> B;
    B --> E["CSS Final Optimizado"];
O fluxo é unidirecional: a configuração informa ao compilador como processar os arquivos de origem para gerar a folha de estilo final.
3. Contrato de API
O "contrato" deste aparato é a estrutura do objeto de configuração exportado:
content: string[] - Define os padrões de glob para os arquivos a serem escaneados.
theme.extend: object - Onde a magia acontece. Define as novas classes de utilidade (colors, borderRadius, keyframes, etc.) que estarão disponíveis no projeto.
plugins: Plugin[] - Um array de plugins que estendem as funcionalidades do Tailwind.
4. Zona de Melhorias Futuras
Tokens de Diseño como JSON SSoT: Externalizar todos os valores de tokens de design (cores HSL, tamanhos de fonte, etc.) para um arquivo JSON separado. Tanto globals.css quanto tailwind.config.ts seriam gerados a partir deste único arquivo SSoT por um script, garantindo consistência absoluta.
Plugin de Container Queries: Integrar o plugin oficial @tailwindcss/container-queries para permitir a criação de componentes verdadeiramente modulares que respondem ao tamanho de seu contêiner, não apenas da viewport.
Estrategia Multi-Tema: Implementar uma estratégia para múltiplos temas (ex: um tema "high-contrast") usando um plugin ou a estratégia de data-theme para alternar conjuntos de variáveis CSS.
Variantes Personalizadas: Criar variantes personalizadas do Tailwind para estados específicos da aplicação, como data-loading="true" ou data-error="true", para simplificar a estilização de estados de componentes (ui-loading:opacity-50).
Ordenação de Classes Automática: O plugin prettier-plugin-tailwindcss já está instalado, mas garantir que sua configuração seja otimizada para seguir uma ordem de classes canônica (ex: layout, espaçamento, tipografia, cor) pode melhorar a legibilidade.
// .docs-espejo/tailwind.config.ts.md