// .docs-espejo/lib/helpers/i18n/formatting.helper.ts.md
/**
 * @file .docs-espejo/lib/helpers/i18n/formatting.helper.ts.md
 * @description Documento Espejo y SSoT conceptual para el aparato `formatting.helper.ts`.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 */
# Manifiesto Conceptual: `formatting.helper.ts`

## 1. Rol Estratégico y Propósito

Este aparato es la **Única Fuente de Verdad (SSoT) para la internacionalización de formatos de datos**. A súa responsabilidade é proporcionar un conxunto de funcións puras e resilientes para converter tipos de datos primitivos (como números ou datas) en cadeas de texto localizadas.

O seu primeiro compoñente, `formatPrice`, encapsula a lóxica de formato de moeda, abstraendo a complexidade da API `Intl.NumberFormat` e proporcionando un manexo de erros robusto.

## 2. Arquitectura y Flujo de Ejecución

É un módulo de utilidades puras e isomórficas (`"use client"` para máxima compatibilidade).

```mermaid
graph TD
    A[Componente de UI] -- Invoca `formatPrice(100, "it-IT", "EUR")` --> B{Helper `formatPrice`};
    subgraph "Lógica Interna"
      B --> C{`try...catch`};
      C -- Éxito --> D[Usa `Intl.NumberFormat`];
      D --> F[Retorna "100 €"];
      C -- Fallo --> E[Rexistra erro e usa fallback];
      E --> G[Retorna "100 EUR"];
    end
    F --> A;
    G --> A;
3. Contrato de API
formatPrice(price, locale, currency): string - Converte un número nunha cadea de moeda.
4. Zona de Melhorias Futuras
Helper formatDate: Engadir unha función formatDate que encapsule a lóxica de Intl.DateTimeFormat para centralizar o formato de datas.
Helper formatNumber: Engadir unha función xenérica formatNumber para números sen moeda (ex. con separadores de miles localizados).
Configuración Centralizada de Formato: O helper podería importar opcións de formato por defecto desde un ficheiro de configuración (formatting.config.ts) para garantir a consistencia en toda a aplicación.
Probas Unitarias Exhaustivas: Escribir probas unitarias para formatPrice que cubran múltiples locales, moedas e casos límite (ex. prezos negativos, cero).
Soporte para BigInt: Estender a función para aceptar BigInt para manexar prezos de moi alta precisión sen erros de punto flotante.
// .docs-espejo/lib/helpers/i18n/formatting.helper.ts.md