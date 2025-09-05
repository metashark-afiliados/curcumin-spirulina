// .docs-espejo/config/logger.config.ts.md
/**
 * @file .docs-espejo/config/logger.config.ts.md
 * @description Documento Espejo y SSoT conceptual para la configuración del logger.
 * @author L.I.A. Legacy
 * @version 1.0.0
 */
# Manifiesto Conceptual: Aparato `logger.config.ts`

## 1. Rol Estratégico y Propósito

Este aparato es el **guardián de la seguridad de los datos en la observabilidad**. Su única responsabilidad es actuar como una lista de control (un manifiesto declarativo) de todas las claves de datos que se consideran sensibles y que **nunca** deben aparecer en texto plano en los logs de la aplicación.

Estratégicamente, es un pilar de la seguridad y el cumplimiento normativo (ej. GDPR), ya que previene la fuga accidental de Información de Identificación Personal (PII) a sistemas de logging, que a menudo tienen políticas de retención y acceso diferentes a las de la base de datos de producción.

## 2. Arquitectura y Flujo de Ejecución

Es un módulo de configuración puro. No tiene lógica de ejecución, solo exporta una constante que es consumida por el motor de logging.

```mermaid
graph TD
    A["`logger.config.ts` <br> (Define `REDACTED_PATHS`)"] --> B["`logger.ts` (Aparato de Logging)"];
    B -- "Pasa la lista a la configuración de" --> C["Instancia de `pino`"];
    C -- "En cada llamada a `logger.info`, `logger.error`, etc." --> D{Motor de Censura de Pino};
    D -- "Censura claves coincidentes" --> E[Log JSON final y seguro enviado a `stdout`];
3. Contrato de API
Exportación: export const REDACTED_PATHS: readonly string[]
4. Zona de Melhorias Futuras
Configuración por Entorno: Permitir que la lista REDACTED_PATHS se extienda con variables de entorno, para poder añadir claves de censura específicas para producción sin exponerlas en el código.
Integración con Gestor de Secretos: Para configuraciones de máxima seguridad, las claves a censurar podrían ser cargadas desde un servicio como HashiCorp Vault o AWS Secrets Manager.
Documentación en Español: Traducir este documento espejo al español para consistencia.
Validación de Formato: Añadir un script de "linting" en el CI/CD que verifique que las rutas en REDACTED_PATHS siguen un formato válido para pino-redact.
Comentarios en Línea: Añadir comentarios a cada clave en la lista explicando por qué es sensible y dónde podría aparecer en los logs.
Niveles de Censura: Extender la configuración para permitir diferentes niveles de censura (ej. censura completa vs. parcial) si pino lo soporta en el futuro.
Generación Automática: Crear un script que analice el código en busca de patrones de datos sensibles (ej. user.password) y sugiera añadirlos a esta lista para reducir omisiones.
Sincronización con Tipos: Investigar si es posible usar TypeScript para generar estas rutas a partir de los tipos de datos de la aplicación (ej. keyof User), garantizando que siempre estén sincronizadas.
Recarga en Caliente (Hot-reloading): Para aplicaciones de larga duración (no serverless), implementar un mecanismo que permita recargar esta configuración sin reiniciar el servidor.
Logging de Censura: Configurar pino para que emita un log de nivel debug cada vez que una clave es censurada, facilitando la auditoría de seguridad.
// .docs-espejo/config/logger.config.ts.md