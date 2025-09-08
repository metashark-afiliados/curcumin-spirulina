// .docs-espejo/components/ui/PriceDisplay.tsx.md
/**
 * @file .docs-espejo/components/ui/PriceDisplay.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato `PriceDisplay`.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 2.0.0
 */
# Manifiesto Conceptual: `PriceDisplay.tsx`

## 1. Rol Estratégico y Propósito

Este aparato é unha **Molécula de UI de Presentación Soberana**. A súa única responsabilidade é mostrar de forma visualmente persuasiva un prezo orixinal e un prezo con desconto.

Na súa versión atomizada, delega toda a complexidade do formato de moeda ao helper `formatPrice`, centrándose exclusivamente na súa tarefa de renderizado. Carga de forma soberana as súas propias etiquetas e cadeas de texto (`useTranslations`), facéndoo un compoñente de "plug-and-play".

## 2. Arquitectura y Flujo de Ejecución

É un compoñente de cliente que consome un helper e a API de i18n.

```mermaid
graph TD
    A[Componente Pai] -- Pasa `props` (prezos numéricos) --> B(`PriceDisplay`);
    subgraph "Lógica Interna"
        B --> C[Obtén contido i18n con `useTranslations`];
        B -- Invoca --> D{Helper `formatPrice`};
        D --> E[Obtén prezos formateados];
        E --> F[Renderiza JSX con etiquetas `del` e `ins`];
    end
    F --> G[UI Final];
3. Contrato de API
Entradas: props: PriceDisplayProps
originalPrice: number
discountedPrice: number
4. Zona de Melhorias Futuras
Cálculo de Desconto Automático: O compoñente podería calcular e mostrar a porcentaxe de desconto automaticamente ((1 - discounted / original) * 100).
Schema de Prezos: Engadir unha prop schema: boolean que, se é true, inxecte os datos estruturados de Schema.org/Offer para mellorar o SEO.
Animación de Cambio de Prezo: Se os prezos puidesen cambiar dinamicamente, usar framer-motion para animar a transición entre o prezo antigo e o novo.
Variantes de Tamaño (cva): Crear variantes de tamaño (sm, md, lg) para controlar o tamaño da fonte dos prezos, facéndoo máis adaptable a diferentes contextos de UI.
Soporte para Franxas de Prezos: Modificar as props para aceptar rangos de prezos (ex. [minPrice, maxPrice]) e mostralos adecuadamente.
// .docs-espejo/components/ui/PriceDisplay.tsx.md