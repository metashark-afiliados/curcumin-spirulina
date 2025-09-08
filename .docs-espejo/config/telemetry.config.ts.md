// .docs-espejo/config/telemetry.config.ts.md
/**
 * @file .docs-espejo/config/telemetry.config.ts.md
 * @description Documento Espejo y SSoT conceptual para el aparato `telemetry.config.ts`.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 */
# Manifiesto Conceptual: `telemetry.config.ts`

## 1. Rol Estratégico y Propósito

Este aparato es el **Panel de Control de la Telemetría del Cliente**. Su única responsabilidad es definir y exportar todas las constantes y umbrales que gobiernan el comportamiento del sistema de tracking de eventos del lado del cliente.

Su propósito estratégico es centralizar la configuración, permitiendo un ajuste fino del comportamiento de la telemetría (ej. frecuencia de envío de lotes, hitos de scroll) sin necesidad de modificar la lógica de los componentes o hooks, lo que mejora drásticamente la mantenibilidad.

## 2. Arquitectura y Flujo de Ejecución

Es un módulo de configuración pura (`"use client"` para compatibilidad universal) que solo exporta constantes. Es consumido por aparatos de lógica de cliente.

```mermaid
graph TD
    A["telemetry.config.ts <br> (Define Constantes)"] --> B["TelemetryProvider.tsx"];
    A --> C["useScrollDepthTracker.ts"];
3. Contrato de API
SESSION_COOKIE_NAME: string - El nombre de la cookie de sesión.
BATCH_INTERVAL_MS: number - Intervalo en ms para enviar lotes de eventos.
MAX_BATCH_SIZE: number - Tamaño máximo del buffer de eventos.
SCROLL_DEPTH_MILESTONES: number[] - Porcentajes de scroll que disparan eventos.
4. Zona de Melhorias Futuras
Carga desde Variables de Entorno: Permitir que los valores de configuración (especialmente BATCH_INTERVAL_MS y MAX_BATCH_SIZE) puedan ser sobrescritos por variables de entorno NEXT_PUBLIC_, facilitando la experimentación en entornos de preview.
Configuración de Sesión: Añadir constantes para la duración de la cookie de sesión y sus atributos de seguridad (SameSite, Secure).
Hitos de Tiempo en Página: Definir un array de hitos (TIME_ON_PAGE_MILESTONES) para registrar eventos de telemetría basados en el tiempo que un usuario pasa en una página.
Lista de Eventos Ignorados: Exportar un array de eventName que deban ser ignorados por el sistema de telemetría, útil para filtrar eventos de bajo valor.
Configuración de Muestreo (Sampling): Añadir una constante SAMPLING_RATE (un número entre 0 y 1) para registrar solo un porcentaje de los eventos, reduciendo el volumen de datos en producción.
Tipado Estricto de Constantes: Utilizar as const para convertir los arrays y objetos en tuplas y objetos de solo lectura para una mayor seguridad de tipos.
Pruebas Unitarias de Configuración: Escribir una prueba simple que verifique que las constantes exportadas tienen los tipos y valores esperados.
Contexto para Traductores: Aunque no contiene texto, añadir comentarios explicando el propósito de cada constante puede ayudar a otros desarrolladores a entender el sistema.
Documentación de Impacto: En la TSDoc de cada constante, documentar el impacto en el rendimiento y en la experiencia del usuario al modificar su valor.
Internacionalización de la Documentación: Traducir este documento espejo.
// .docs-espejo/config/telemetry.config.ts.md