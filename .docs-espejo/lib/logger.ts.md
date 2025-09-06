<!-- .docs-espejo/lib/logger.ts.md -->
/**
 * @file .docs-espejo/lib/logger.ts.md
 * @description Documento Espejo y SSoT conceptual para el aparato de logging del servidor.
 * @author L.I.A. Legacy
 * @version 10.0.0
 */
# Manifiesto Conceptual: Aparato `logger.ts` (Server-Side)

## 1. Rol Estratégico y Propósito

Este aparato es la **Única Fuente de Verdad (SSoT) para la instancia de logging del servidor**. Su única responsabilidad es crear y exportar una instancia base de `pino`, pre-configurada con los ajustes de nivel, formato y seguridad (censura de PII) para toda la aplicación.

La arquitectura de observabilidad del proyecto se basa en la **Inyección de Dependencias**. Otros módulos son responsables de crear `child loggers` a partir de esta instancia base para lograr el logging transaccional.

## 2. Arquitectura y Flujo de Ejecución

Es un módulo de configuración que se ejecuta una vez para crear el singleton del logger.

```mermaid
graph TD
    A["`logger.config.ts` (Reglas de Censura)"] --> B["`logger.ts`"];
    C["`config.ts` (Nivel de Log)"] --> B;
    B -- "Crea instancia `pino`" --> D["`logger` (singleton)"];
    D -- "Es importado y usado para crear `childLoggers`" --> E[Toda la Aplicación];
3. Contrato de API
logger: pino.Logger: La instancia base de pino, lista para ser usada o extendida con .child().
4. Zona de Mejoras Nuevas (Valor al Proyecto)
Integración con Sentry Transport: Configurar pino para que en producción utilice pino-sentry-transport, enviando automáticamente logs de nivel error o superior a Sentry.
Contexto de Build Automático: Inyectar automáticamente en la configuración base información del entorno de build, como el GIT_COMMIT_SHA.
Serializadores Personalizados de Pino: Implementar pino.stdSerializers para manejar de forma robusta la serialización de objetos Error y Request.
Control de Nivel de Log Dinámico: Implementar un mecanismo (ej. vía Vercel Edge Config o un endpoint seguro) que pueda cambiar el serverLogLevel en tiempo de ejecución sin necesidad de un redespliegue.
<!-- .docs-espejo/lib/logger.ts.md -->