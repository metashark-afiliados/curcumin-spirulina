<!-- .docs-espejo/lib/client-logger.ts.md -->
/**
 * @file .docs-espejo/lib/client-logger.ts.md
 * @description Documento Espejo y SSoT conceptual para el aparato de logging del cliente.
 * @author L.I.A. Legacy
 * @version 5.0.0
 */
# Manifiesto Conceptual: Aparato `client-logger.ts` (Client-Side, SSG-Compatible)

## 1. Rol Estratégico y Propósito

Este aparato es la **SSoT para el sistema de logging del lado del cliente**. En una arquitectura de **Generación de Sitio Estático (SSG)**, su propósito es proporcionar una API de logging estructurado de alto rendimiento para todas las operaciones del navegador, con la **consola del desarrollador como su destino principal**.

Delega la recolección de errores remotos a servicios de terceros (ej. Sentry), manteniendo el logger ligero y enfocado en la observabilidad durante el desarrollo y la depuración.

## 2. Arquitectura y Flujo de Ejecución

Es un módulo de cliente (`"use client"`) que exporta una instancia de `pino` configurada para el navegador. El flujo de transmisión a un backend propio ha sido eliminado deliberadamente para mantener la compatibilidad con SSG.

```mermaid
graph TD
    A[Componente Cliente] -- "1. Llama a `clientLogger.info(ctx, msg)`" --> B["`clientLogger` (Adapter `ILogger`)"];
    B -- "2. Delega a `pinoBrowserLogger`" --> C["Instancia de Pino"];
    C -- "3. Registra en la consola del navegador" --> D["Consola DevTools"];
3. Contrato de API
clientLogger: ILogger: La instancia principal del logger de cliente.
Métodos: trace, info, warn, error, fatal, todos con la firma (context: LogContext, message: string).
4. Zona de Mejoras Nuevas (Valor al Proyecto)
Integración Directa con Sentry: Modificar los métodos error y fatal para que, además de console.error, también invoquen Sentry.captureException, combinando la observabilidad local con el poder de análisis de Sentry.
Offloading a Web Worker: Mover la instancia de pino a un Web Worker para garantizar un impacto nulo en el hilo principal de la UI, especialmente para aplicaciones con ráfagas de logs.
Filtrado de Datos Sensibles: Implementar una utilidad que aplique reglas de REDACTED_PATHS a los objetos de context antes de que sean registrados, como una primera línea de defensa contra la exposición de PII en logs visibles.
Sincronización con correlationId del Servidor: Implementar un mecanismo para leer un correlationId (si es proporcionado por el servidor en un meta tag) y añadirlo a todos los logs del cliente para permitir la correlación de sesiones.
Control de Nivel de Log Dinámico: Permitir que el browserLogLevel pueda ser sobrescrito para una sesión específica mediante un parámetro en la URL (?log_level=trace) o un comando en la consola.
<!-- .docs-espejo/lib/client-logger.ts.md -->