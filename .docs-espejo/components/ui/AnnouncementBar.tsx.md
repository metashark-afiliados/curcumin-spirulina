<!-- .docs-espejo/components/ui/AnnouncementBar.tsx.md -->
/**
 * @file .docs-espejo/components/ui/AnnouncementBar.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato AnnouncementBar.
 * @author L.I.A. Legacy
 * @version 4.1.0
 */
# Manifiesto Conceptual: Aparato `AnnouncementBar`

## 1. Rol Estratégico y Propósito

Este aparato es una herramienta **soberana** de marketing y comunicación de alta visibilidad. Su propósito es mostrar un mensaje importante y conciso en la parte superior de la página, como ofertas por tiempo limitado, anuncios de envío gratuito o alertas importantes.

Como componente soberano, **obtiene y VALIDA su propio contenido de i18n** contra un contrato de datos Zod, garantizando que una alteración en el contenido nunca rompa la UI. Su diseño está optimizado para captar la atención sin ser intrusivo, utilizando un movimiento de scroll sutil que invita a la lectura. Se integra con la API de logging del cliente unificada para una observabilidad completa.

## 2. Arquitectura de Élite

Es un **Componente de Cliente (`"use client"`) soberano**. Su lógica de animación está completamente delegada a CSS para un rendimiento máximo.
*   **Responsabilidad de Validación:** Este componente implementa el "Escudo de Resiliencia". Antes de renderizar, construye un objeto con su contenido a partir de la capa de i18n (`t`) y lo valida contra el `AnnouncementBarContentSchema`. Si la validación falla, registra un error y renderiza `null`.
*   **Semántica y Accesibilidad:** Utiliza la etiqueta `<section>` y `aria-labelledby` para una estructura semántica y accesible. La interacción de pausa al pasar el cursor sobre la barra es accesible vía teclado (`tabIndex={0}`).
*   **Observabilidad:** Utiliza `clientLogger` (de `src/lib/client-logger.ts`) para registrar errores de validación de contenido y el flujo de renderizado, asegurando que cualquier problema sea visible en las herramientas de desarrollo.

## 3. Contrato de API
### Props de Entrada:
*   Ninguna. Este es un componente soberano y autocontenido que obtiene todas sus dependencias internamente.

## 4. Zona de Mejoras Nuevas (Valor al Proyecto)

*   **BARRA DESECHABLE (Dismissible):** Añadir una prop `isDismissible?: boolean` que, de ser `true`, renderice un botón "X". Al hacer clic, se ocultaría la barra y se guardaría su estado en `localStorage` para que no vuelva a aparecer en la misma sesión/navegador. Esto mejora la UX al permitir a los usuarios cerrar el anuncio si lo desean.
*   **CONTENIDO DINÁMICO DESDE CMS/FEATURE FLAGS:** En lugar de depender de `useTranslations`, el componente podría obtener el `message` y `mainTitle` desde un Headless CMS o un servicio de `feature flags`. Esto permitiría al equipo de marketing actualizar el anuncio o realizar pruebas A/B de diferentes mensajes sin necesidad de un deploy de código.
*   **VARIANTES DE COLOR (cva):** Utilizar `class-variance-authority` (`cva`) para crear variantes de color (ej., `variant: 'info' | 'warning' | 'success'`) que alteren el gradiente de fondo y el color del icono. Esto proporcionaría flexibilidad para diferentes tipos de anuncios.
*   **ENLACE CLICABLE GLOBAL:** Permitir que toda la barra de anuncios sea un enlace, pasando una prop `href: string` que envuelva el contenido en un `<a>` para dirigir al usuario a una página de destino (ej., la oferta).
*   **INDICADOR DE PROGRESO DE LA OFERTA:** Para ofertas por tiempo limitado, añadir un pequeño indicador visual (ej., una barra de progreso o un contador regresivo) que muestre el tiempo restante.
<!-- .docs-espejo/components/ui/AnnouncementBar.tsx.md -->