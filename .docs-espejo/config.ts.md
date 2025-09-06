<!-- .docs-espejo/config/logger.config.ts.md -->
/**
 * @file .docs-espejo/config/logger.config.ts.md
 * @description Documento Espejo y SSoT conceptual para la configuración de la censura de logs.
 * @author L.I.A. Legacy
 * @version 2.1.0
 */
# Manifiesto Conceptual: Aparato `logger.config.ts` (Censura de PII)

## 1. Rol Estratégico y Propósito

Este aparato es el **guardián de la privacidad en la observabilidad**. Su única y atómica responsabilidad es actuar como una lista de control (un manifiesto declarativo) de todas las claves de datos que se consideran sensibles y que **nunca** deben aparecer en texto plano en los logs del servidor.

Actúa como la Única Fuente de Verdad (SSoT) para la configuración de la censura (`redact`), garantizando que la Información de Identificación Personal (PII) esté protegida conforme a las mejores prácticas de seguridad y privacidad.

## 2. Arquitectura y Flujo de Ejecución

Es un módulo de configuración `server-only` puro. No tiene lógica de ejecución; su contenido es una constante que es consumida por el motor de logging del servidor (`pino`).

```mermaid
graph TD
    A["`logger.config.ts` (Define `REDACTED_PATHS`)"] --> B["`logger.ts`"];
    B -- "Pasa las rutas a la configuración de `pino`" --> C["Instancia de Pino"];
    C -- "En cada llamada a `logger.info`, etc." --> D{Motor de Censura Interno};
    D -- "Censura claves coincidentes con `[REDACTED]`" --> E[Log JSON seguro enviado a `stdout`];
3. Contrato de API
REDACTED_PATHS: readonly string[]: Una lista inmutable de rutas de claves (usando notación de punto y comodines) que pino debe censurar automáticamente.
4. Zona de Mejoras Nuevas (Valor al Proyecto)
Validación de Rutas en CI/CD: Implementar un script en el pipeline de CI/CD que valide la sintaxis de las rutas definidas en REDACTED_PATHS.
Gestión Dinámica desde Secret Manager: Para entornos de alta seguridad, cargar esta lista de rutas desde un servicio de gestión de secretos (como Vercel Environment Variables o Doppler).
Pruebas de Integración de Censura: Crear pruebas que intencionalmente registren objetos con datos sensibles y verifiquen que la salida del logger contiene [REDACTED].
Generador de Reglas a partir de Schemas Zod: Crear un script que analice los schemas Zod de la aplicación y, si una propiedad tiene una descripción .describe("PII"), genere automáticamente una regla de censura para ella.
Diferentes Configuraciones por Entorno: Cargar un conjunto diferente de REDACTED_PATHS según NODE_ENV, permitiendo una censura menos agresiva en entornos de desarrollo para facilitar la depuración.
<!-- .docs-espejo/config/logger.config.ts.md -->