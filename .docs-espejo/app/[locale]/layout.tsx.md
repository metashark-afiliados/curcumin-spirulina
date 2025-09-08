// .docs-espejo/app/[locale]/layout.tsx.md
/**
 * @file .docs-espejo/app/[locale]/layout.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato LocaleLayout.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 */
# Manifiesto Conceptual: `app/[locale]/layout.tsx` (LocaleLayout)

## 1. Rol Estratégico y Propósito

Este aparato es el **Proveedor de Contexto Universal y el Orquestador de UI Global** de la aplicación. Su propósito estratégico es envolver todas las páginas en un conjunto consistente de proveedores de contexto y componentes de layout.

Actúa como la SSoT para:
1.  **La estructura `<html>` y `<body>` de la página.**
2.  **La provisión de traducciones** a través de `NextIntlClientProvider`.
3.  **La inicialización de la telemetría del cliente** a través de `TelemetryProvider`.
4.  **El renderizado de la UI persistente** (Header, Footer).

## 2. Arquitectura y Flujo de Ejecución

Es un Server Component que recibe el `locale` de la URL y lo utiliza para configurar los proveedores.

```mermaid
graph TD
    A[Renderizado de Página] --> B{`[locale]/layout.tsx`};
    subgraph "Proveedores de Contexto"
        B --> C[Obtiene mensajes para el `locale`];
        C --> D(Renderiza `NextIntlClientProvider`);
        D --> E(Renderiza `TelemetryProvider`);
    end
    subgraph "Composición de UI"
        E --> F(Renderiza `Header`);
        F --> G[Renderiza `children` (la página activa)];
        G --> H(Renderiza `Footer`);
    end
3. Contrato de API
Entradas:
children: React.ReactNode. El contenido de la página actual.
params.locale: string. El locale activo, inyectado por el App Router.
Salidas: La estructura HTML completa de la página.
4. Zona de Melhorias Futuras
Proveedor de Tema (Theme Provider): Añadir un proveedor para gestionar temas claro/oscuro (ej. next-themes).
Proveedor de Notificaciones (Toasts): Integrar un proveedor para mostrar notificaciones globales (ej. react-hot-toast).
Gestión de Consentimiento de Cookies (CMP): Envolver TelemetryProvider en un ConsentProvider que solo lo active si el usuario ha aceptado las cookies de seguimiento.
Carga de Datos Globales: Este layout podría ser el lugar para cargar datos que son necesarios en todas las páginas.
Pruebas de Integración de Proveedores: Escribir pruebas que verifiquen que los componentes anidados pueden acceder correctamente a los contextos de i18n y telemetry.
Optimización de getMessages: Para aplicaciones con muchos mensajes, la función getMessages podría ser optimizada para cargar solo un subconjunto de mensajes globales.
Soporte para Múltiples Layouts de Locale: Utilizar Route Groups para tener diferentes layouts para diferentes secciones de la aplicación.
Inyección de nonce para CSP: Pasar el nonce generado en el middleware a este layout para ser inyectado en los scripts.
Soporte para draftMode: Añadir lógica para que, si el modo borrador de Next.js está activo, se muestre un banner indicándolo.
Internacionalización de la Documentación: Traducir este documento espejo.
// .docs-espejo/app/[locale]/layout.tsx.md