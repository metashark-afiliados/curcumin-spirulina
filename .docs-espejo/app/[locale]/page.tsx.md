// .docs-espejo/app/[locale]/page.tsx.md
/**
 * @file .docs-espejo/app/[locale]/page.tsx.md
 * @description Documento Espejo y SSoT conceptual para la página principal (`HomePage`).
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 */
# Manifiesto Conceptual: `app/[locale]/page.tsx` (HomePage)

## 1. Rol Estratégico y Propósito

Este aparato es el **Orquestador de Conversión Principal**. Su rol estratégico es actuar como un Server Component de alto nivel que ensambla los diversos "organismos" de UI en la secuencia correcta para implementar el funnel de conversión definido en el `Blueprint` del proyecto.

Su propósito es ser una página de carga ultra-rápida, optimizada para SEO y Core Web Vitals, que delega toda la interactividad a los Client Components que renderiza.

## 2. Arquitectura y Flujo de Ejecución

Es un Server Component que sigue un patrón de "Composición de Organismos".

```mermaid
graph TD
    A[Petición de Ruta `/`] --> B{`page.tsx` (HomePage)};
    B --> C[Carga datos de servidor (ej. testimonios)];
    subgraph "Renderizado Secuencial"
        C --> D(Renderiza `AnnouncementBar`);
        D --> E(Renderiza `HeroSection`);
        E --> F(Renderiza `InfoSection`);
        F --> G(...)
        G --> H[Pasa `TestimonialCard`s a `TestimonialsSection`];
        H --> I(Inyecta `SchemaInjector` para SEO);
    end
    I --> J[Página HTML Final];
3. Contrato de API
Entradas: Recibe params.locale del App Router.
Salidas: La Promise<React.ReactElement> que resuelve al JSX de la página completa.
4. Zona de Melhorias Futuras
Carga de Contenido desde un CMS: Refactorizar la página para que la secuencia y el contenido de las secciones se carguen desde un CMS Headless.
Pruebas A/B de Secciones: Integrar con un sistema de feature flags para renderizar diferentes versiones de una sección (ej. HeroSectionV2).
Personalización Dinámica: Basándose en los datos de telemetría (ej. geo.country), la página podría reordenar o mostrar/ocultar secciones.
Streaming de Componentes: Envolver secciones más lentas en <Suspense> para aprovechar el streaming de UI de React 18.
Generación de Metadatos Dinámicos: Utilizar la función generateMetadata para obtener el título y la descripción de la página desde el sistema de i18n.
Pruebas de Integración de Layout: Escribir una prueba que verifique que todas las secciones esperadas se renderizan en el orden correcto.
Componente SectionWrapper: Crear un componente de layout SectionWrapper que encapsule los estilos comunes a todas las secciones.
Gestión de Estado de Scroll: Implementar una lógica para cambiar el estado de la URL (#section-id) a medida que el usuario se desplaza.
Mapa de Calor de Componentes: Integrar una herramienta de analíticas para rastrear qué secciones reciben más atención.
Internacionalización de la Documentación: Traducir este documento espejo.
// .docs-espejo/app/[locale]/page.tsx.md