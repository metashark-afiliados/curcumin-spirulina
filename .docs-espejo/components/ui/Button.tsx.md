// .docs-espejo/components/ui/Button.tsx.md
/**
 * @file .docs-espejo/components/ui/Button.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato atómico `Button`.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 */
# Manifiesto Conceptual: `Button.tsx`

## 1. Rol Estratégico y Propósito

O aparato `Button` é o **átomo fundamental da interactividade** na aplicación. O seu propósito estratéxico é proporcionar un compoñente de botón unificado, accesible e altamente personalizable que sirva como a Única Fonte de Verdade (SSoT) para todas as accións clicables.

Implementa un sistema de variantes robusto a través de `class-variance-authority` (cva) e está enriquecido con micro-interaccións de `framer-motion`, observabilidade e soberanía de contido.

## 2. Arquitectura y Flujo de Ejecución

É un Componente de Cliente (`"use client"`) que encapsula lóxica de presentación e estado interno (loading).

```mermaid
graph TD
    A[Componente Pai] --> B(Renderiza `<Button>`);
    subgraph "Lóxica Interna do Botón"
      B --> C[Obtén contido i18n con `useTranslations`];
      B --> D[Calcula clases CSS con `cva`];
      B --> E{Está en estado `loading`?};
      E -- Si --> F[Renderiza `Loader2` e texto de carga];
      E -- Non --> G[Renderiza `children`];
      B --> H(Engade animacións con `framer-motion`);
    end
    H --> I[Renderiza `<button>` ou `<Slot>` final];
3. Contrato de API
Props Principais:
variant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'subtle' | 'accent' - Define o estilo visual.
size: 'default' | 'sm' | 'lg' | 'icon' | 'pill' - Define as dimensións e o padding.
loading: boolean - Mostra un indicador de carga e desactiva o botón.
asChild: boolean - Permite que o botón delegue as súas propiedades e estilo a un compoñente fillo directo.
4. Zona de Melhorias Futuras
Icon Support Integrado: Engadir unha prop icon: LucideIcon e iconPosition: 'left' | 'right' para xestionar de forma nativa a colocación de iconas xunto ao texto, garantindo un espazado consistente.
Variante de Carregamento Esquelético: Crear unha variante de loading que mostre unha animación de esqueleto do mesmo tamaño que o botón, en lugar de cambiar o seu contido, para evitar cambios de layout (CLS).
Contador de Clics por Telemetría: Integrar o hook useTelemetry para que, opcionalmente, cada clic no botón poida ser rexistrado como un evento de telemetría, proporcionando datos sobre as interaccións máis comúns na UI.
Extracción do Hook useButton: Para compoñentes máis complexos, a lóxica de estado e cva podería ser extraída a un hook useButton para unha maior reutilización e testeabilidade.
Accesibilidade mellorada (Focus-visible): Aínda que xa está presente, auditar e mellorar os estilos de focus-visible para todas as variantes para garantir un alto contraste e unha clara indicación de foco para a navegación por teclado.
// .docs-espejo/components/ui/Button.tsx.md