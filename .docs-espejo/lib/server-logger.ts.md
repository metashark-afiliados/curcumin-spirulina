// .docs-espejo/lib/server-logger.ts.md
/**
 * @file .docs-espejo/lib/server-logger.ts.md
 * @description Documento Espejo y SSoT conceptual para el Aparato de Logging de Servidor.
 * @author L.I.A. Legacy
 * @version 2.0.0
 */
# Manifiesto Conceptual: Aparato `server-logger`

## 1. Rol Estratégico y Propósito

Este aparato es la **SSoT de observabilidad del lado del servidor**. Su única y soberana responsabilidad es proporcionar una interfaz de logging de alto rendimiento, estructurada y segura, blindada para su uso exclusivo en el servidor (`"server-only"`).

Implementa `pino` para emitir logs en formato JSON, con censura automática de datos sensibles y enriquecimiento con un ID de correlación por petición, cumpliendo con los más altos estándares de la arquitectura de observabilidad.

## 2. Arquitectura y Flujo de Ejecución

Es un módulo `"server-only"` que se instancia una única vez al iniciar la aplicación.

```mermaid
graph TD
    subgraph "Fase de Inicialización"
        A["`logger.config.ts` (SSoT de Censura)"] --> B["`server-logger.ts`"];
        C["`correlation-id.helper.ts`"] --> B;
        B -- "Configura e instancia" --> D["`pino` (Instancia `serverLogger`)"];
    end

    subgraph "Fase de Ejecución (por Petición)"
        E["Cualquier Módulo de Servidor"] -- "Invoca `serverLogger.info(...)`" --> D;
        D -- "Obtiene ID del contexto vía" --> C;
        D -- "Emite a `stdout`" --> F["Log JSON Estructurado y Seguro"];
    end
3. Contrato de API
Exportación: export const serverLogger: pino.Logger
Firma de Uso (Mandatoria): serverLogger.level({ contexto }, "mensaje")
4. Zona de Melhorias Futuras
TRANSPORTE A SENTRY: Implementar um transporte de pino dedicado (ex. pino-sentry-transport) para que os logs de servidor de nível error ou fatal sejam enviados automaticamente a Sentry.
CONFIGURAÇÃO DE NÍVEL DINÂMICA: Permitir que o level do logger possa ser sobrescrito por uma variável de ambiente (LOG_LEVEL), facilitando a depuração em produção sem um novo deploy.
INTEGRACIÓN CON OpenTelemetry: Integrar o correlationId com o traceId de OpenTelemetry para uma observabilidade distribuída completa.
// .docs-espejo/lib/server-logger.ts.md