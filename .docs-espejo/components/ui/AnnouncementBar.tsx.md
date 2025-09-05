// .docs-espejo/components/ui/AnnouncementBar.tsx.md
/**
 * @file .docs-espejo/components/ui/AnnouncementBar.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato AnnouncementBar.
 * @author L.I.A. Legacy
 * @version 2.0.0
 */
# Manifiesto Conceptual: Aparato `AnnouncementBar`

## 1. Rol Estratégico y Propósito

Este aparato es una herramienta **soberana** de marketing y comunicación de alta visibilidad. Su propósito es mostrar un mensaje importante y conciso en la parte superior de la página, como ofertas por tiempo limitado, anuncios de envío gratuito o alertas importantes.

Como componente soberano, **obtiene su propio contenido de i18n**, eliminando la dependencia de `props` y convirtiéndolo en un aparato "plug-and-play". Su diseño está optimizado para captar la atención sin ser intrusivo, utilizando un movimiento de scroll sutil que invita a la lectura.

## 2. Arquitectura y Flujo de Ejecución

Es un **Componente de Cliente (`"use client"`) soberano**. Su lógica de animación está completamente delegada a CSS para un rendimiento máximo.

```mermaid
graph TD
    A["`AnnouncementBar.tsx`"] -- "Invoca `useTranslations()`" --> B[Obtiene `message` de su archivo JSON];
    B -- "Renderiza" --> C[Contenedor con clase `group`];
    C -- "Contiene" --> D[Div animado con `animate-infinite-scroll` y `group-hover:pause`];
    D -- "Muestra" --> E["Texto del `message`"];
La clave de la UX es la interacción group y group-hover. Al pasar el cursor sobre el contenedor principal (C), la clase group-hover:[animation-play-state:paused] se activa en el hijo (D), pausando la animación CSS.
3. Contrato de API
Props de Entrada: Ninguna. Este es un componente soberano y autocontenido que obtiene todas sus dependencias internamente.
4. Zona de Melhorias Futuras
BARRA DESECHABLE (Dismissible): Añadir una prop isDismissible?: boolean que, de ser true, renderice un botón "X". Al hacer clic, se ocultaría la barra y se guardaría su estado en localStorage para que no vuelva a aparecer en la misma sesión.
CONTENIDO DINÁMICO DESDE CMS: En lugar de useTranslations, el componente podría usar un hook para obtener el message desde un Headless CMS, permitiendo al equipo de marketing actualizar el anuncio sin necesidad de un deploy.
VARIANTES DE COLOR: Utilizar cva para crear variantes de color (info, warning, success) que alteren el gradiente de fondo y el color del icono.
CONTROL DE VELOCIDAD: Añadir una prop speed?: 'slow' | 'normal' | 'fast' que aplique diferentes duraciones de animación CSS.
ENLACE CLICABLE: Permitir que toda la barra sea un enlace, pasando una prop href: string.
ICONO PERSONALIZABLE: Aceptar una prop icon?: LucideIconName para poder cambiar el icono de la llama por otro.
// .docs-espejo/components/ui/AnnouncementBar.tsx.md