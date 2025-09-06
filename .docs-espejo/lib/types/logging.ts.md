<!-- .docs-espejo/lib/types/logging.ts.md -->
/**
 * @file .docs-espejo/lib/types/logging.ts.md
 * @description Documento Espejo y SSoT conceptual para los tipos de la arquitectura de logging.
 * @author L.I.A. Legacy
 * @version 2.0.0
 */
# Manifiesto Conceptual: Aparato `lib/types/logging.ts`

## 1. Rol Estratégico y Propósito

Este aparato es la **"Constitución" de la arquitectura de logging de élite**. Su única responsabilidad es definir los **contratos de datos (tipos de TypeScript)** que gobiernan la estructura de los contextos de logging y, más importante, la **interfaz `ILogger`** que todos los loggers de la aplicación deben implementar.

Actúa como una Única Fuente de Verdad (SSoT) para los tipos del dominio de logging, garantizando que el `serverLogger`, `clientLogger` y `edgeLogger` se comuniquen e implementen de forma segura, consistente y predecible.

## 2. Arquitectura y Flujo de Ejecución

Como archivo de definición de tipos, no tiene un flujo de ejecución directo, sino un flujo de dependencias conceptuales y de compilación.

```mermaid
graph TD
    A["`logging.ts` <br> (Define `LogContext`, `ILogger`)"] --> B["`logger.ts` <br> (Implementa `ILogger`)"];
    A --> C["`client-logger.ts` <br> (Implementa `ILogger`)"];
    A --> D["`edge-logger.ts` <br> (Implementa `ILogger`)"];
    B & C & D --> E[Toda la Aplicación <br> (Consume Loggers Tipo-Seguros)];```

## 3. Contrato de API

*   **`LogContext: type`**: Un tipo flexible para objetos que contienen información contextual para los logs.
*   **`ILogger: interface`**: Define la firma unificada `(context: LogContext, message: string)` para todos los métodos de logging (`trace`, `info`, `warn`, `error`, `fatal`).

## 4. Zona de Mejoras Nuevas (Valor al Proyecto)

*   **Tipado de Payloads Específicos:** A medida que la aplicación crezca, se podría extender `LogContext` con `generics` o uniones discriminadas para forzar tipos de `payload` específicos para ciertos `eventNames` o contextos, mejorando la seguridad de tipos para eventos de telemetría.
*   **Contrato para Loggers Asíncronos:** Definir una `IAsyncLogger` que devuelva `Promise<void>` en sus métodos, para sistemas de logging que realicen operaciones de red (ej. envío directo a un colector de logs) y necesiten ser esperados (`await`).
*   **Tipo `LogLevel` Exportado:** Exportar un tipo `LogLevel = 'trace' | 'info' | 'warn' | 'error' | 'fatal'` para ser usado en configuraciones dinámicas de nivel de log.
<!-- .docs-espejo/lib/types/logging.ts.md -->