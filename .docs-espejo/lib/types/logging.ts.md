<!-- .docs-espejo/lib/types/logging.ts.md -->
/**
 * @file .docs-espejo/lib/types/logging.ts.md
 * @description Documento Espejo y SSoT conceptual para los tipos de la arquitectura de logging.
 * @author L.I.A. Legacy
 * @version 1.0.0
 */
# Manifiesto Conceptual: Aparato `lib/types/logging.ts`

## 1. Rol Estratégico y Propósito

Este aparato es el **diccionario de la arquitectura de logging de élite**. Su única responsabilidad es definir los **contratos de datos (tipos de TypeScript)** que gobiernan la estructura de los contextos de logging y la interfaz de los loggers en toda la aplicación.

Actúa como una Única Fuente de Verdad (SSoT) para los tipos del dominio de logging, garantizando que el `serverLogger` y el `clientLogger` (y cualquier futuro logger) se comuniquen y se implementen de forma segura, consistente y predecible. Es un pilar para la "Unificación de la API de Logging" descrita en el `TODO.md`.

## 2. Arquitectura y Flujo de Ejecución

Como archivo de definición de tipos, no tiene un flujo de ejecución directo, sino un flujo de dependencias conceptuales y de compilación.

```mermaid
graph TD
    A["`logging.ts` <br> (Define `LogContext`, `ILogger`)"] --> B["`logger.ts` <br> (Implementa `ILogger`)"];
    A --> C["`client-logger.ts` <br> (Implementa `ILogger`)"];
    B & C --> D[Toda la Aplicación <br> (Consume Loggers Tipo-Seguros)];
3. Contrato de API
Tipos Exportados:
LogContext: type: Un tipo flexible para objetos que contienen información contextual para los logs.
ILogger: interface: Define la firma unificada ((context: LogContext, message: string)) para todos los métodos de logging (trace, info, warn, error).
4. Zona de Mejoras Nuevas (Valor al Proyecto)
Tipado de Payloads Específicos: A medida que la aplicación crezca, se podría extender LogContext con generics o uniones discriminadas para forzar tipos de payload específicos para ciertos eventNames o contextos, mejorando la seguridad de tipos para eventos de telemetría, por ejemplo.
Niveles de Log Configurable: Permitir que los niveles de log (LogLevel) sean configurables en tiempo de ejecución para diferentes módulos, proporcionando granularidad en la depuración sin recompilar.
<!-- .docs-espejo/lib/types/logging.ts.md -->