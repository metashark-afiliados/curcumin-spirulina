// .docs-espejo/messages/manifest.ts.md
/**
 * @file .docs-espejo/messages/manifest.ts.md
 * @description Documento Espejo y SSoT conceptual para el manifiesto de mensajes.
 * @author L.I.A. Legacy
 * @version 2.0.0
 */
# Manifiesto Conceptual: Aparato `messages/manifest.ts`

## 1. Rol Estratégico y Propósito

Este aparato es el **mapa maestro de la arquitectura IMAS**. Su única y crítica responsabilidad es proporcionar un registro centralizado de todos los módulos de traducción atómicos disponibles en la aplicación.

Actúa como una capa de descubrimiento que desacopla completamente al orquestador de i18n (`i18n.ts`) del conocimiento directo sobre la estructura de archivos en `src/messages/`. El orquestador simplemente lee este mapa y carga lo que está registrado, adhiriéndose al principio de "Configuración sobre Código".

## 2. Arquitectura y Flujo de Ejecución

Este es un aparato de configuración pura. No tiene lógica de ejecución propia, pero es fundamental en el flujo de inicialización de la i18n.

```mermaid
graph TD
    A["Archivos .json atómicos <br> (src/messages/...)"] -- "Son registrados en" --> B["`manifest.ts`"];
    B -- "Es consumido por" --> C["`i18n.ts` (Orquestador)"];
    C -- "Carga dinámicamente los módulos" --> A;
3. Contrato de API
Exportación: export const messagesManifest: Record<string, ManifestModule>
Estructura de Clave: Un string que representa el namespace, derivado de la ruta del archivo (ej. "components.ui.OrderForm").
Estructura de Valor: Una función de importación dinámica (() => import(...)) que devuelve una promesa que resuelve al módulo de mensajes.
4. Zona de Melhorias Futuras
GENERACIÓN AUTOMÁTICA: La mejora de mayor valor. Implementar un script (pnpm gen:i18n:manifest) que escanee el directorio src/messages y genere este archivo automáticamente. Esto eliminaría el registro manual, prevendría errores de omisión y garantizaría una sincronización perpetua entre los artefactos y su manifiesto.
VALIDACIÓN DE MANIFIESTO EN CI/CD: Añadir un paso en el pipeline de CI/CD que ejecute el script de generación y verifique si hay cambios. Si hay cambios sin "commitear", la build fallaría, forzando la sincronización del manifiesto.
COMENTARIOS DE ORIGEN: El script de generación podría añadir un comentario encima de cada entrada indicando la ruta del archivo original (// from: ./components/ui/OrderForm.json) para mejorar la trazabilidad.
// .docs-espejo/messages/manifest.ts.md