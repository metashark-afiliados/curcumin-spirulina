// .docs-espejo/lib/actions/_helpers/error-log.helper.ts.md
/**
 * @file .docs-espejo/lib/actions/_helpers/error-log.helper.ts.md
 * @description Documento Espejo y SSoT conceptual para el aparato `error-log.helper.ts`.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 2.0.0
 */
# Manifiesto Conceptual: `error-log.helper.ts`

## 1. Rol Estratégico y Propósito

Este aparato é o **Orquestrador de Rexistro de Erros do Servidor**. A súa única e crítica responsabilidade é proporcionar unha función atómica, `logAndGenerateErrorId`, que actúa como a SSoT para o manexo de erros inesperados que ocorren na lóxica do backend (principalmente en Server Actions).

O seu propósito estratéxico é dobre:
1.  **Xerar Trazabilidade:** Crea un `errorId` único (UUID) que pode ser devolto á UI ou usado noutros logs para crear unha correlación perfecta entre un fallo e o seu rexistro.
2.  **Centralizar a Observabilidade:** Encapsula a lóxica de rexistro, utilizando o `serverLogger` (`pino`) para emitir un log de erro estruturado. Esta estratexia delega a "persistencia" e "notificación" á configuración do logger (que xa envía a Sentry en produción), desacoplando o helper da infraestrutura de almacenamento.

## 2. Arquitectura y Flujo de Ejecución

É unha función síncrona, pura e resiliente.

```mermaid
graph TD
    A[Server Action Falla] --> B{Bloque `catch`};
    B --> C(Invoca `logAndGenerateErrorId`);
    subgraph "Lógica del Helper"
        C --> D[Xera `errorId` con `crypto.randomUUID()`];
        D --> E[Constrúe obxecto de contexto de erro enriquecido];
        E --> F[Invoca `logger.error(contexto, mensaje)`];
    end
    F --> G[Retorna `errorId`];
    B --> H(Retorna `ActionResult` de erro á UI);
3. Contrato de API
logAndGenerateErrorId(source, error, metadata)
source: string: O nome da función onde se orixinou o erro.
error: Error: O obxecto de erro capturado.
metadata: Record<string, any>: Contexto adicional.
Retorno: string - O UUID do erro xerado.
4. Zona de Melhorias Futuras
Saneamento de Metadatos: Reintroducir unha función de saneamento para os metadata para garantir que non se rexistren datos sensibles ou non serializables, aínda que pino-redact xa ofrece unha capa de protección.
Tipado Estrito de source: Reemplazar string por un tipo de unión literal de todos os nomes de Server Actions válidos para unha maior seguridade de tipos en tempo de compilación.
Clasificación de Severidade: Engadir un parámetro level: 'error' | 'fatal' para permitir rexistrar con diferentes niveis de severidade, o que podería desencadear diferentes tipos de alertas.
Integración con Feature Flags: Permitir que a cantidade de metadatos rexistrados se poida controlar a través dun sistema de feature flags para unha depuración máis detallada en produción sen necesidade de redesplegar.
Probas Unitarias: Escribir probas unitarias para o helper, mockeando o logger para verificar que é chamado coa estrutura de contexto correcta.
// .docs-espejo/lib/actions/_helpers/error-log.helper.ts.md