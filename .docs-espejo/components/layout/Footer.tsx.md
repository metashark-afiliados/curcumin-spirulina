// .docs-espejo/components/layout/Footer.tsx.md
/**
 * @file .docs-espejo/components/layout/Footer.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato Footer.
 * @author L.I.A. Legacy
 * @version 4.0.0
 */
# Manifiesto Conceptual: Aparato `Footer`

## 1. Rol Estratégico y Propósito

Este aparato es el **ancla soberana de confianza y navegación final** de la aplicación. Su propósito es triple:

1.  **Construir Confianza:** Proporciona acceso fácil a información legal (`/privacy-policy`, `/terms-of-service`) y disclaimers (`affiliate`, `scientific`).
2.  **Proveer Navegación Secundaria:** Ofrece una vía de contacto y enlaces a secciones importantes.
3.  **Reforzar la Marca:** Muestra el nombre de la marca, descripción y copyright.

Como **componente de servidor soberano**, obtiene su propio contenido de i18n de forma asíncrona, garantizando su reutilización y consistencia sin depender de `props` y mejorando el rendimiento.

## 2. Arquitectura y Flujo de Ejecución

Es un **Componente de Servidor (`"server-only"`) asíncrono y soberano** que obtiene su propio contenido.

```mermaid
graph TD
    A["`Footer.tsx` (Componente Soberano)"] -- "Invoca `await getTranslations()`" --> B[Obtiene todo el contenido del footer de su archivo JSON];
    B -- "Renderiza" --> C[Estructura HTML completa];
    B -- "Mapea `legalLinks[]` y renderiza" --> D["`<Link>` de `next-intl` tipo-seguro"];
    C & D --> E[HTML Final Renderizado no Servidor];
Esta arquitectura elimina el prop drilling, desacopla el componente y lo convierte en un aparato "plug-and-play" de alto rendimiento.
3. Contrato de API
Props de Entrada: Ninguna. Este es un componente soberano y autocontenido.
4. Zona de Melhorias Futuras
FORMULARIO DE NEWSLETTER: Integrar un NewsletterForm.tsx (Server Action) dentro del footer para una captura de leads persistente.
ICONOS DE REDES SOCIALES: Añadir una sección con iconos enlazados a los perfiles de redes sociales de la marca.
CONTENIDO DESDE CMS: Obtener los datos del footer desde un Headless CMS para permitir al equipo de marketing actualizarlos sin un deploy.
VARIANTES DE LAYOUT (cva): Crear variantes para diferentes diseños de footer (ej. compact, full, centered).
PRUEBAS DE UI CON PLAYWRIGHT: Crear pruebas E2E que verifiquen que todos los enlaces del footer apuntan a las URLs correctas.
// .docs-espejo/components/layout/Footer.tsx.md