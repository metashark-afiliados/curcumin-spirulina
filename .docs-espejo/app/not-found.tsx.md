<!-- .docs-espejo/app/not-found.tsx.md -->
/**
 * @file .docs-espejo/app/not-found.tsx.md
 * @description Documento Espejo y SSoT conceptual para la página 404 global.
 * @author L.I.A. Legacy
 * @version 7.0.0
 */
# Manifiesto Conceptual: Aparato `not-found.tsx` (Página 404 Global)

## 1. Rol Estratégico y Propósito

Este aparato es la **red de seguridad soberana y observable** de la aplicación. Implementa el patrón de **"Aislamiento Contextual"** para garantizar una ejecución estable y trazable. Sus responsabilidades son:
1.  **Aislar `next-intl`:** Ejecuta `getTranslations` en un entorno puro.
2.  **Observabilidad Transaccional:** Establece un contexto de logging con `storage.run()` para el resto de la lógica.
3.  **Resiliencia:** Usa `try/catch` y validación Zod para asegurar que siempre se renderice, incluso con contenido de i18n corrupto.

## 2. Arquitectura de Flujo ("Aislamiento Contextual")

```mermaid
graph TD
    A[Next.js invoca `NotFoundPage`] --> B["Fase 1: getTranslations (Pura)"];
    B --> C["Fase 2: Inicia `storage.run()`"];
    subgraph "Contexto Transaccional Activo"
      C --> D[Lógica de App: Logging, Validación, Renderizado];
    end
    D --> E[HTML Final de la página 404];
3. Contrato de API
Props de Entrada: Ninguna. Es invocado por el framework.
Salida: El JSX.Element que representa la página 404 completa.
4. Zona de Mejoras Nuevas (Valor al Proyecto)
Logging de 404 Persistente: Implementar una Server Action para registrar las URLs que generan errores 404 en una base de datos o sistema de analíticas, proveyendo datos valiosos para SEO.
Campo de Búsqueda Interna: Añadir una barra de búsqueda a la página 404 para ayudar al usuario a encontrar lo que busca.
Sugerencias de Páginas Inteligentes: Implementar una lógica que sugiera páginas relevantes basadas en la URL mal escrita.
<!-- .docs-espejo/app/not-found.tsx.md -->