// .docs-espejo/components/layout/_partials/footer/BrandInfoColumn.tsx.md
/**
 * @file .docs-espejo/components/layout/_partials/footer/BrandInfoColumn.tsx.md
 * @description Documento Espejo y SSoT conceptual para el subcomponente `BrandInfoColumn`.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 */
# Manifiesto Conceptual: `BrandInfoColumn.tsx`

## 1. Rol Estratégico y Propósito

Este aparato é un **Átomo de Presentación de Layout** dentro do ecosistema do `Footer`. A súa única responsabilidade é renderizar a primeira columna do pé de páxina, que contén a información da marca, o contacto e os enlaces ás redes sociais.

Como compoñente de presentación puro, é completamente "parvo" (`dumb`), non ten estado propio e recibe todos os datos que necesita a través das `props`. A súa lóxica interna é resiliente, garantindo que non romperá se un nome de icona non se atopa no seu mapa de iconas interno.

## 2. Arquitectura y Flujo de Ejecución

É un compoñente de cliente (`"use client"`) que mapea as `props` a elementos JSX.

```mermaid
graph TD
    A[Componente `Footer`] -- Pasa `props` --> B(`BrandInfoColumn`);
    subgraph "Lógica de Renderizado"
        B --> C[Renderiza información da marca];
        B --> D{Hai enlaces sociais?};
        D -- Si --> E[Itera sobre `socialLinks`];
        E --> F{Atopa a icona no `iconMap`?};
        F -- Si --> G[Renderiza o enlace coa icona];
        F -- Non --> H[Non renderiza nada para ese enlace];
    end
    C & G & H --> I[JSX Final];
3. Contrato de API
Entradas: props: BrandInfoColumnProps - Un subconxunto das props de contido do Footer.
4. Zona de Melhorias Futuras
Mapa de Iconas Extensible: O iconMap podería ser importado dun ficheiro de configuración centralizado (icon.config.ts) para ser reutilizado por outros compoñentes.
Icona de Fallback (Fallback Icon): En lugar de non renderizar nada cando non se atopa unha icona, poderíase mostrar unha icona xenérica de "enlace" para garantir que o enlace siga sendo visible.
Observabilidade: Engadir un clientLogger.warn cando unha icona non se atope para facilitar a depuración de problemas de contido.
Probas de Snapshot con Vitest: Escribir probas de snapshot para este compoñente, incluíndo casos de proba con e sen enlaces sociais, e con nomes de iconas válidos e inválidos.
Animacións de Hover: Engadir unha animación sutil de framer-motion ao facer hover sobre as iconas sociais.
// .docs-espejo/components/layout/_partials/footer/BrandInfoColumn.tsx.md