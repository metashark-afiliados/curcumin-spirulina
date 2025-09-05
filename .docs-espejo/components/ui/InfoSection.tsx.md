// .docs-espejo/components/ui/InfoSection.tsx.md
/**
 * @file .docs-espejo/components/ui/InfoSection.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato InfoSection.
 * @author L.I.A. Legacy
 * @version 2.0.0
 */
# Manifiesto Conceptual: Aparato `InfoSection`

## 1. Rol Estratégico y Propósito

Este aparato es el **pilar soberano de la construcción de autoridad y confianza** en la landing page. Su propósito es guiar al usuario a través de una narrativa persuasiva que sigue la fórmula psicológica clásica: "Problema -> Agitación -> Solución".

Actúa como un "mini-artículo" que educa al visitante, valida sus puntos de dolor y presenta la solución de una manera lógica y basada en evidencia. Como **componente soberano**, obtiene todo su contenido (incluyendo HTML enriquecido) de su propio archivo de mensajes, eliminando la dependencia de `props`.

## 2. Arquitectura y Flujo de Ejecución

Es un **Componente de Cliente (`"use client"`) soberano**. Su característica técnica clave es el uso de `dangerouslySetInnerHTML` para renderizar HTML directamente desde la capa de contenido i18n, la cual es obtenida por el propio componente.

```mermaid
graph TD
    A["`InfoSection.tsx`"] -- "Invoca `useTranslations()` y `t.raw()`" --> B[Obtiene todo su contenido, incluyendo HTML, de su archivo JSON];
    B -- "Renderiza Títulos y Componentes (`Image`, `<a>`)" --> C[Estructura HTML];
    B -- "Usa `dangerouslySetInnerHTML` para" --> D[Renderizar Párrafos y Citas con formato];
    C & D --> E[Sección Final Renderizada];
Esta arquitectura soberana permite que el equipo de marketing y copywriting tenga un control granular sobre el formato del texto directamente en los archivos .json, sin requerir modificaciones en el código de los componentes padres.
3. Contrato de API
Props de Entrada: Ninguna. Este es un componente soberano y autocontenido.
4. Zona de Melhorias Futuras
CARDS DE INGREDIENTES INTERACTIVOS: Reemplazar los párrafos de la solución con "cards" o "pestañas" interactivas para cada ingrediente clave (Cúrcuma, Piperina).
INFOGRAFÍAS VISUALES: Permitir pasar un componente SVG o una URL de imagen para un infográfico que complemente el texto.
VARIANTES DE LAYOUT: Crear variantes (image-left, image-right, no-image) que modifiquen la disposición del texto y la imagen.
SANEAMIENTO DE HTML: Integrar una librería como DOMPurify para sanear el contenido antes de pasarlo a dangerouslySetInnerHTML, aumentando la seguridad.
SOPORTE PARA VÍDEO: Permitir pasar una videoUrl desde el archivo de i18n para renderizar un vídeo embebido en lugar de la imagen.
// .docs-espejo/components/ui/InfoSection.tsx.md