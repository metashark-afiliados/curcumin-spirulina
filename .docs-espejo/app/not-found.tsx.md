// .docs-espejo/app/not-found.tsx.md
/**
 * @file .docs-espejo/app/not-found.tsx.md
 * @description Documento Espejo y SSoT conceptual para el manejador de 404 global.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 */
# Manifiesto Conceptual: `app/not-found.tsx` (Global Not Found)

## 1. Rol Estratégico y Propósito

Este aparato es el **Fallback de Enrutamiento de Último Recurso**. Su única responsabilidad es capturar y manejar peticiones a rutas que no coinciden con ningún patrón definido en la aplicación, **incluyendo la ausencia de un prefijo de `locale`**.

Su propósito estratégico es proporcionar una experiencia de usuario controlada en un escenario de error de enrutamiento grave y registrar un log de alta severidad.

## 2. Arquitectura y Flujo de Ejecución

Es un Server Component que se renderiza directamente por el App Router de Next.js cuando ninguna otra ruta coincide.

```mermaid
graph TD
    A[Petición a `/ruta-invalida`] --> B{Next.js App Router};
    B -- No encuentra coincidencia --> C[Renderiza `app/not-found.tsx`];
    C --> D[Log de error crítico];
    C --> E(Renderiza `FullScreenError` con texto estático);
3. Contrato de API
Entradas: Ninguna.
Salidas: La Promise<React.ReactElement> que resuelve al JSX de la página 404.
4. Zona de Melhorias Futuras
Redirección Inteligente: Añadir una lógica que intente adivinar la intención del usuario a partir de la URL incorrecta.
Soporte i18n Básico: Intentar detectar el idioma desde la cabecera Accept-Language y mostrar un mensaje estático en ese idioma.
Componente Link del Lado del Servidor: Investigar si se puede crear una versión de nuestro Link de navigation.ts que no dependa del locale.
Integración con Sentry: Capturar un Sentry.captureMessage para que estos errores 404 sean visibles en Sentry.
Página de Estado del Sistema: El enlace de acción podría dirigir a una página de estado del sistema (/status).
Formulario de Feedback: Incluir un formulario para que los usuarios puedan reportar el enlace roto.
Diseño Personalizado: Crear una ilustración personalizada para la página 404.
Pruebas de Integración: Escribir una prueba de Playwright que verifique que esta página se renderiza correctamente.
Análisis de 404s: Configurar un log drain para analizar patrones en las rutas no encontradas.
Internacionalización de la Documentación: Traducir este documento espejo.
// .docs-espejo/app/not-found.tsx.md