// README.md

# Hub de Conteúdo de Elite "Curcumin Spirulina"

**Versão:** 2.0.0 (Production Ready)
**Status:** Pronto para Implantação

---

## 1. Visão Geral do Projeto

Este repositório contém o código-fonte para o Hub de Conteúdo de Autoridade do produto "Curcumin Spirulina". O projeto foi arquitetado como um micro-site de alta performance, utilizando Next.js 14, projetado para operar em duas frentes estratégicas:

1.  **A Landing Page (`Home`):** Uma máquina de conversão otimizada para tráfego pago (Google Ads), com o objetivo de capturar leads de alta qualidade através de um funil de pré-venda educativo.
2.  **O Blog (`/blog`):** Um motor de SEO projetado para atrair tráfego orgânico a longo prazo, construir autoridade no nicho de bem-estar e nutrir potenciais clientes.

A arquitetura foi concebida para máxima performance (via Geração de Site Estático - SSG), manutenibilidade e conformidade com as mais rigorosas políticas de publicidade.

## 2. Stack Tecnológico

-   **Framework:** Next.js 14 (App Router)
-   **Linguagem:** TypeScript
-   **Estilização:** Tailwind CSS
-   **Internacionalização (i18n):** `next-intl` (Modelo Consolidado)
-   **Gestão de Formulários:** `react-hook-form` & `zod`
-   **Animação:** `framer-motion`
-   **Testes:** Vitest & React Testing Library
-   **Linting/Formatting:** ESLint & Prettier

## 3. Pré-requisitos

Antes de iniciar, certifique-se de ter os seguintes softwares instalados em sua máquina:
-   Node.js (versão 20.x ou superior)
-   `pnpm` (gerenciador de pacotes recomendado para este projeto)

## 4. Configuração do Ambiente

Siga estes passos para configurar o ambiente de desenvolvimento local:

1.  **Clonar o Repositório:**
    ```bash
    git clone [URL_DO_REPOSITORIO]
    cd curcumin-spirulina-hub
    ```

2.  **Instalar as Dependências:**
    ```bash
    pnpm install
    ```

3.  **Configurar as Variáveis de Ambiente:**
    Crie um arquivo chamado `.env.local` na raiz do projeto, copiando o conteúdo de `.env.example`.

    **`.env.example`**
    ```env
    # URL completa do endpoint do produtor que processa os pedidos.
    # CRÍTICO para o funcionamento do formulário.
    NEXT_PUBLIC_PRODUCER_ENDPOINT="https://it4.curcumacomplex.com/order.php"

    # URL base do nosso site em produção. Usado para gerar metadados de SEO
    # e sitemaps.
    NEXT_PUBLIC_BASE_URL="https://www.nossodominio.com"
    ```
    Preencha o valor de `NEXT_PUBLIC_BASE_URL` com o domínio final que será usado em Hostinger.

## 5. Scripts Disponíveis

-   `pnpm dev`: Inicia o servidor de desenvolvimento em `http://localhost:3000`.
-   `pnpm build`: Gera a build de produção estática na pasta `out/`.
-   `pnpm start`: Inicia um servidor de produção local para testar a build.
-   `pnpm lint`: Executa o ESLint para verificar erros de código e estilo.
-   `pnpm test`: Executa os testes unitários com Vitest.

## 6. Estratégia de Conteúdo (Instruções para Marketing)

O blog é gerenciado através de arquivos MDX, permitindo a criação de artigos ricos com formatação e componentes React.

-   **Localização:** Todos os artigos devem ser criados na pasta `content/blog/[locale]/`. Por exemplo, um novo artigo em italiano deve ser criado em `content/blog/it-IT/`.

-   **Formato do Arquivo:** Cada artigo é um arquivo `.mdx`. O nome do arquivo se tornará a URL (slug). Ex: `meu-novo-artigo.mdx` será acessível em `.../blog/meu-novo-artigo`.

-   **Frontmatter (Metadados):** Cada arquivo DEVE começar com um bloco de "frontmatter" para definir seus metadados. Este é um exemplo obrigatório:

    ```yaml
    ---
    title: "O Título do Seu Artigo Fantástico"
    date: "2025-09-15"
    excerpt: "Este é um resumo curto e atraente do artigo, que aparecerá nos cards do blog e nos resultados de busca do Google."
    author: "Dr. Bianchi (Persona)"
    featuredImage: "/img/blog/imagem-do-artigo.jpg"
    tags: ["Benessere", "Metabolismo", "Curcuma"]
    ---

    # O Conteúdo do Seu Artigo Começa Aqui

    O corpo do artigo é escrito em Markdown...
    ```

## 7. Implantação em Produção (Hostinger)

O projeto foi otimizado para **Geração de Site Estático (SSG)**, a abordagem mais performática e segura para implantação.

1.  **Gerar a Build Estática:**
    A configuração `output: 'export'` já está definida em `next.config.mjs`. Execute o comando de build:
    ```bash
    pnpm build
    ```
    Este comando irá gerar uma pasta chamada `out` na raiz do seu projeto. Esta pasta contém todos os arquivos HTML, CSS, JS e imagens estáticas do seu site.

2.  **Fazer o Upload para Hostinger:**
    -   Acesse o painel de controle da sua hospedagem em Hostinger.
    -   Use o "Gerenciador de Arquivos" para navegar até a pasta raiz do seu site (geralmente `public_html`).
    -   **Limpe qualquer conteúdo existente** em `public_html` para evitar conflitos.
    -   Faça o upload de **todo o conteúdo** da pasta `out` (não a pasta em si) para o `public_html`.

Seu site estará no ar, com performance de nível mundial.

## 8. Checklist de Pré-Lançamento

**Execute esta lista de verificação ANTES de fazer o upload final para Hostinger.**

-   **[ ] Configuração:**
    -   [ ] O arquivo `.env.local` foi criado e a `NEXT_PUBLIC_BASE_URL` está configurada com o domínio de produção correto.
    -   [ ] Os IDs do Google Analytics e outros trackers foram inseridos corretamente (se aplicável).

-   **[ ] Conteúdo:**
    -   [ ] Todas as traduções no arquivo `messages/it-IT.json` foram revisadas e aprovadas.
    -   [ ] Todas as imagens de placeholder foram substituídas por imagens de produção e otimizadas.
    -   [ ] Todos os links internos e externos foram verificados e estão funcionando.
    -   [ ] O conteúdo do blog inicial foi criado e revisado (mínimo de 3 artigos recomendados para o lançamento).

-   **[ ] SEO Técnico:**
    -   [ ] Um arquivo `public/robots.txt` foi criado para guiar os motores de busca.
    -   [ ] Um sitemap (`sitemap.xml`) foi gerado e está presente na pasta `out` após o build.
    -   [ ] Um relatório do Lighthouse foi gerado a partir do `pnpm start` local, e as pontuações de Performance, Acessibilidade, Melhores Práticas e SEO estão **acima de 95**.

-   **[ ] Funcionalidade Crítica:**
    -   [ ] **Teste de Submissão de Formulário:** Foi realizado um teste end-to-end. Um pedido de teste foi enviado através do `OrderForm` e foi **confirmado com a rede de afiliados (Webvork)** que o lead foi recebido e **corretamente atribuído à nossa conta de afiliado.** (Este é o passo mais importante de todo o checklist).