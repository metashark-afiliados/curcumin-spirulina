// .docs-espejo/config/logger.config.ts.md
/**
 * @file .docs-espejo/config/logger.config.ts.md
 * @description Documento Espejo y SSoT conceptual para el aparato `logger.config.ts`.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 */
# Manifiesto Conceptual: `logger.config.ts`

## 1. Rol Estratégico y Propósito

El aparato `logger.config.ts` es el **Guardián de la Privacidad** del sistema de observabilidad. Su única y crítica responsabilidad es actuar como la Única Fuente de Verdad (SSoT) que define qué información es considerada sensible y debe ser censurada (`[REDACTED]`) antes de ser escrita en cualquier log.

Este enfoque declarativo desacopla la lógica de seguridad de la lógica de logging, permitiendo una gestión centralizada y auditable de la privacidad de los datos.

## 2. Arquitectura y Flujo de Ejecución

Este aparato es un módulo de **configuración pura**. No tiene un flujo de ejecución, sino que exporta una estructura de datos (`REDACTED_PATHS`) que es consumida por otro aparato (`src/lib/logger.ts`) durante su fase de inicialización.

```mermaid
graph LR
    A["logger.config.ts <br> (Define REDACTED_PATHS)"] --> B["logger.ts <br> (Inicializa Pino)"];
    B --> C["Logs Estructurados <br> (JSON con datos censurados)"];
3. Contrato de API
Salidas:
REDACTED_PATHS: readonly string[]. Un array inmutable de cadenas que representan las rutas de claves a ofuscar, siguiendo el formato de pino-redact.
4. Zona de Melhorias Futuras
Carga desde Variables de Entorno: Permitir que la lista REDACTED_PATHS pueda ser extendida con rutas adicionales definidas en una variable de entorno (EXTRA_REDACTED_PATHS), para mayor flexibilidad en producción.
Niveles de Censura: Implementar diferentes listas de censura (ej. CRITICAL_PII_PATHS, GENERAL_SENSITIVE_PATHS) y configurar el logger para que aplique diferentes niveles de censura según el entorno (development vs. production).
Script de Auditoría: Crear un script de CI que escanee el código fuente en busca de claves comunes de PII (ej. address, zipCode) y advierta si no están presentes en REDACTED_PATHS.
Integración con Vault: Para una seguridad de élite, la configuración de censura podría ser cargada desde un servicio de gestión de secretos como HashiCorp Vault.
Validación de Formato: Implementar una prueba unitaria que valide que todas las cadenas en REDACTED_PATHS siguen un formato válido para pino-redact.
Documentación Embebida: Añadir comentarios a cada ruta en el array explicando por qué se considera sensible.
Soporte para Expresiones Regulares: Extender la configuración para permitir el uso de expresiones regulares en las rutas de censura para patrones de datos más complejos.
Redacción Parcial: Investigar plugins de pino que permitan una censura parcial (ej. mostrar solo los últimos 4 dígitos de un número de teléfono).
UI de Configuración: En una futura consola de administración, proporcionar una interfaz para que los administradores puedan añadir rutas de censura sin necesidad de modificar el código.
Internacionalización de la Documentación: Traducir este documento espejo a otros idiomas.
// .docs-espejo/config/logger.config.ts.md