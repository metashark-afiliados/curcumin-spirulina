// .docs-espejo/lib/client-logger.ts.md
/**
 * @file .docs-espejo/lib/client-logger.ts.md
 * @description Documento Espejo y SSoT conceptual para el aparato `client-logger.ts`.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 */
# Manifiesto Conceptual: `client-logger.ts`

## 1. Rol Estratégico y Propósito

El aparato `client-logger.ts` es la **Única Fuente de Verdad (SSoT) para el logging en el entorno del navegador**. Su propósito es proporcionar una API de logging segura, ligera y consistente para ser utilizada en todos los Componentes de Cliente (`"use client"`).

Actúa como una **capa de abstracción** sobre el `console` del navegador. Esto nos proporciona un punto de control centralizado: si en el futuro decidimos enviar logs de cliente a un colector externo, solo necesitaremos modificar este archivo, sin tener que refactorizar cada componente que lo consume.

## 2. Arquitectura y Flujo de Ejecución

Es un módulo de cliente puro. No tiene dependencias de servidor.

1.  **Inicialización:** El módulo exporta un objeto `clientLogger`.
2.  **Invocación:** Un Componente de Cliente importa y llama a un método, ej: `clientLogger.info("Componente montado")`.
3.  **Ejecución:** La función wrapper correspondiente se ejecuta, añadiendo un prefijo `[INFO]` al mensaje y delegando la impresión al `console.info()` nativo del navegador.

## 3. Contrato de API

*   **`clientLogger`**: Objeto con los siguientes métodos:
    *   `trace(...args: any[])`
    *   `info(...args: any[])`
    *   `warn(...args: any[])`
    *   `error(...args: any[])`
    *   `fatal(...args: any[])`

## 4. Zona de Melhorias Futuras

1.  **Envío de Logs al Servidor (Log Shipping):** Implementar una lógica que, además de imprimir en la consola, acumule los logs en un buffer y los envíe periódicamente a un endpoint de API (`/api/log-client-events`) para su persistencia y análisis centralizado.
2.  **Filtrado por Nivel de Log:** Añadir una configuración (posiblemente desde una cookie o `localStorage`) que permita cambiar el nivel de log visible en la consola en producción para depuración remota.
3.  **Integración con Sentry:** Enriquecer el método `error` para que también llame a `Sentry.captureMessage` o `Sentry.captureException`, unificando el reporte de errores del cliente.
4.  **Contexto de Sesión:** Integrar el logger con el `TelemetryProvider` para que cada log incluya automáticamente el `sessionId` actual.
5.  **Supresión de Logs en Producción:** Implementar una lógica que deshabilite los logs de `trace` e `info` en el entorno de producción para evitar el "ruido" en la consola del usuario final.
6.  **Formateo de Objetos:** Mejorar los wrappers para que manejen el formateo de objetos y arrays de manera más legible, similar a `pino-pretty`.
7.  **Soporte para Grupos de Logs:** Añadir métodos `group` y `groupEnd` para agrupar visualmente logs relacionados en la consola.
8.  **Medición de Performance:** Añadir un método `time(label)` y `timeEnd(label)` que utilice `performance.now()` para medir y registrar la duración de operaciones en el cliente.
9.  **Tipado de Contexto:** Definir un tipo `ClientLogContext` para estandarizar las claves de contexto comunes (ej. `componentName`, `userAction`).
10. **Internacionalización de la Documentación:** Traducir este documento espejo.
// .docs-espejo/lib/client-logger.ts.md