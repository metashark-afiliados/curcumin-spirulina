<!-- .docs-espejo/config/logger.config.ts.md -->
/**
 * @file .docs-espejo/config/logger.config.ts.md
 * @description Documento Espejo y SSoT conceptual para la configuración del logger.
 * @author L.I.A. Legacy
 * @version 1.1.0
 */
# Manifiesto Conceptual: Aparato `logger.config.ts`

## 1. Rol Estratégico y Propósito

Este aparato es el **guardián de la seguridad de los datos en la observabilidad**. Su única y atómica responsabilidad es actuar como una lista de control (un manifiesto declarativo) de todas las claves de datos que se consideran sensibles y que **nunca** deben aparecer en texto plano en los logs de la aplicación.

Está diseñado para ser la Única Fuente de Verdad (SSoT) para la configuración de la censura de logs, garantizando que la Información de Identificación Personal (PII) esté protegida conforme a las políticas de privacidad y requisitos legales, al tiempo que se mantiene la capacidad de depuración y análisis.

## 2. Arquitectura y Flujo de Ejecución

Es un módulo de configuración puro. No tiene lógica de ejecución propia; su contenido es una constante que es consumida por el motor de logging del servidor (Pino).

```mermaid
graph TD
    A["`src/config/logger.config.ts` <br> (Define `REDACTED_PATHS`)"] --> B["`src/lib/logger.ts` (Aparato de Logging del Servidor)"];
    B -- "Pasa `REDACTED_PATHS` a la configuración de" --> C["Instancia de `pino`"];
    C -- "En cada llamada a `logger.info`, `logger.error`, etc." --> D{Motor de Censura de Pino};
    D -- "Censura claves coincidentes" --> E[Log JSON final y seguro enviado a `stdout`];
3. Contrato de API
REDACTED_PATHS: readonly string[]:
Propósito: Una lista inmutable de rutas de claves de objetos (usando notación de punto y comodines) que el logger debe censurar automáticamente.
Ejemplo: ["email", "user.password", "*.accessToken"]
4. Zona de Mejoras Nuevas (Valor al Proyecto)
Carga Dinámica de Reglas: Para entornos muy complejos o con requisitos de privacidad cambiantes, se podría considerar un mecanismo para cargar esta lista de rutas censuradas desde una fuente externa (ej. un servicio de configuración centralizado o un archivo .json específico que pueda ser actualizado sin un redeploy de la aplicación).
Validación de Reglas de Censura: Implementar un script en el CI/CD que valide la sintaxis de las rutas definidas en REDACTED_PATHS (ej. si usan comodines o notación de punto correctamente), previniendo errores de configuración en la censura.
Mapeo de Tipos de Datos Sensibles: Crear un enum o type para clasificar tipos de datos sensibles (ej. PII.Email, PII.Password) y mapear estos tipos a las rutas de REDACTED_PATHS. Esto mejoraría la semántica y la escalabilidad de la configuración de privacidad.
<!-- .docs-espejo/config/logger.config.ts.md -->