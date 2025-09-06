<!-- .docs-espejo/components/layout/Footer.tsx.md -->
/**
 * @file .docs-espejo/components/layout/Footer.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato Footer.
 * @author L.I.A. Legacy
 * @version 6.0.0
 */
# Manifiesto Conceptual: Aparato `Footer`

## 1. Rol Estratégico y Propósito

Este aparato es el **ancla soberana de confianza y navegación final** de la aplicación. Su propósito es triple:
1.  **Construir Confianza:** Proporciona acceso a información legal y disclaimers.
2.  **Proveer Navegación Secundaria:** Ofrece vías de contacto y enlaces a secciones importantes.
3.  **Reforzar la Marca:** Muestra la identidad y el copyright.

Como **componente de servidor soberano**, obtiene y valida su propio contenido de i18n y participa en la **observabilidad transaccional** al enriquecer sus logs con el `correlationId` del contexto de renderizado.

## 2. Arquitectura y Flujo de Ejecución

Es un **Componente de Servidor (`"server-only"`) asíncrono y soberano** que se ejecuta dentro de un contexto de logging.

```mermaid
graph TD
    A["`Footer` (Componente Soberano)"] -- "1. `getCorrelationId()`" --> B[Contexto de Logging];
    A -- "2. `getTranslations()` y valida" --> C[Contenido del Footer];
    B & C -- "3. `serverLogger.trace()`" --> D[Log Enriquecido];
    C -- "4. Renderiza..." --> E[HTML Final del Footer];
3. Contrato de API
Props de Entrada: Ninguna. Es un componente soberano y autocontenido.
Contrato de Datos (i18n): Debe cumplir la estructura definida en FooterContentSchema.
4. Zona de Mejoras Nuevas (Valor al Proyecto)
Formulario de Newsletter: Integrar un NewsletterForm.tsx (que utilice una Server Action) dentro del footer para una captura de leads persistente.
Iconos de Redes Sociales: Añadir una sección con iconos enlazados a los perfiles de redes sociales de la marca.
Contenido desde CMS: Obtener los datos del footer desde un Headless CMS para permitir al equipo de marketing actualizarlos sin un deploy.
Pruebas de Integración (Playwright): Crear pruebas E2E que verifiquen que todos los enlaces del footer apuntan a las URLs correctas y son funcionales.
<!-- .docs-espejo/components/layout/Footer.tsx.md -->