// .docs-espejo/lib/blog.ts.md
/**
 * @file .docs-espejo/lib/blog.ts.md
 * @description Documento Espejo y SSoT conceptual para el aparato de negocio `blog.ts`.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 */
# Manifiesto Conceptual: `lib/blog.ts`

## 1. Rol Estratégico y Propósito

Este aparato é o **Módulo de Lóxica de Negocio e Acceso a Datos (DAL)** para todo o contido do blog. A súa única responsabilidade é abstraer a complexidade da lectura e procesamento de ficheiros de contido do sistema de ficheiros, proporcionando unha API limpa e tipo-segura para o resto da aplicación.

Actúa como a Única Fonte de Verdade (SSoT) para:
1.  Os contratos de datos (`PostFrontmatter`, `PostData`).
2.  A lóxica para obter todos os posts (`getAllPosts`).
3.  As utilidades de formato relacionadas co blog (`formatDate`).

## 2. Arquitectura y Flujo de Ejecución

É un módulo `server-only` que interactúa co sistema de ficheiros de Node.js.

```mermaid
graph TD
    A[Páxina do Blog] -- Invoca --> B(`getAllPosts(locale)`);
    subgraph "Lóxica de `getAllPosts`"
        B --> C[Le o directorio `content/blog/{locale}`];
        C --> D[Itera sobre ficheiros `.mdx`];
        D --> E[Le o contido do ficheiro];
        E --> F[Parseia o `frontmatter` con `gray-matter`];
        F --> G[Constrúe obxecto `PostData`];
    end
    G --> H[Retorna `PostData[]` ordenado por data];
    H --> A;
3. Contrato de API
PostFrontmatter: interface - Define a estrutura dos metadatos YAML.
PostData: interface - Define a estrutura dun post completo.
getAllPosts(locale: string): Promise<PostData[]> - A función principal para obter o contido.
formatDate(dateString: string, locale: string): string - Unha función de utilidade pura.
4. Zona de Melhorias Futuras
Cacheo de Posts: Implementar unha capa de cacheo (ex. con React.cache ou Vercel Data Cache) na función getAllPosts para evitar ler do sistema de ficheiros en cada petición, mellorando drasticamente o rendemento.
Soporte para Borradores (Drafts): Engadir unha propiedade draft: true ao frontmatter e filtrar estes posts en getAllPosts se process.env.NODE_ENV === 'production'.
Procesamento de Imaxes: Integrar unha libraría como rehype-img-size para obter automaticamente as dimensións das imaxes do contido e pasalas ao compoñente next/image para previr o Cumulative Layout Shift (CLS).
Función getPostBySlug: Crear unha nova función para obter un único post polo seu slug, optimizando a carga de datos nas páxinas de artigos individuais.
Extracción de Táboa de Contidos (TOC): Usar un plugin de rehype ou remark para xerar automaticamente unha táboa de contidos a partir dos encabezados (h2, h3) do contido do post.
// .docs-espejo/lib/blog.ts.md