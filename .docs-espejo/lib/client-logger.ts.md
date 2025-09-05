// .docs-espejo/lib/client-logger.ts.md
/**
 * @file .docs-espejo/lib/client-logger.ts.md
 * @description Documento Espejo y SSoT conceptual para el Aparato de Logging de Cliente.
 * @author L.I.A. Legacy
 * @version 2.0.0
 */
# Manifiesto Conceptual: Aparato `client-logger`

## 1. Rol Estratégico y Propósito

Este aparato es la **SSoT de observabilidad del lado del cliente (`"use client"`)**. Su propósito es proporcionar una interfaz de logging híbrida y soberana que enruta los eventos del navegador a diferentes destinos según su severidad, garantizando una observabilidad completa del comportamiento del usuario.

*   **Capa 1 (Consola):** Proporciona feedback inmediato en el entorno de desarrollo.
*   **Capa 2 (Persistencia Local):** Mantiene un buffer rotativo de logs no críticos en `localStorage`, permitiendo un análisis post-sesión para depuración.
*   **Capa 3 (Reporte a Sentry):** Envía eventos de alta severidad (`warn`, `error`, `fatal`) a Sentry para un monitoreo proactivo y en tiempo real de los problemas que afectan al usuario.

## 2. Arquitectura y Flujo de Ejecución

La arquitectura sigue un patrón de "Despachador Multi-Capa".

```mermaid
graph TD
    A[Componente UI llama a `clientLogger.error(msg, ctx)`] --> B{Método de Logging};
    B -- "Siempre" --> C["Capa de Consola (console.error)"];
    B -- "Si no es 'fatal'" --> D["Capa de Persistencia (LocalStorageLogManager.add)"];
    B -- "Si es 'warn' o superior" --> E["Capa de Reporte (Sentry.captureMessage)"];
3. Contrato de API
Exportación: export const clientLogger: { trace, info, warn, error, fatal }
Firma de Uso: clientLogger.level("mensaje", { contextoOpcional })
4. Zona de Melhorias Futuras
UI DE VISUALIZAÇÃO DE LOGS: Criar um componente de UI de diagnóstico (ex. <ClientLogViewer />) que leia os logs de localStorage e os exiba em uma tabela para facilitar a depuração.
CARGA DE LOGS EM BATCH: Implementar uma função que possa coletar os logs de localStorage e enviá-los a um endpoint de API para um análise de contexto mais profundo no backend.
CONFIGURAÇÃO DE NÍVEIS REMOTA: Permitir que os níveis de log que se enviam a Sentry possam ser configurados remotamente através de um feature flag.
ROTACIÓN DE LOGS CONFIGURABLE: Abstraer las constantes MAX_LOGS y LOG_TTL_MS del LocalStorageLogManager para que puedan ser configuradas a través de variables de entorno del cliente (NEXT_PUBLIC_).
// .docs-espejo/lib/client-logger.ts.md