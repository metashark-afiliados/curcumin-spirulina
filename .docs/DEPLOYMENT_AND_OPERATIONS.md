// .docs/DEPLOYMENT_AND_OPERATIONS.md
/\*\*

- @file .docs/DEPLOYMENT_AND_OPERATIONS.md
- @description Manifiesto de Despliegue y Operaciones. Esta es la SSoT para
-              el ciclo de vida de la aplicación en producción, incluyendo CI/CD,
-              gestión de entornos, observabilidad y planes de continuidad.
- @author L.I.A. Legacy
- @version 1.0.0
  \*/

# Manifiesto de Despliegue y Operaciones: Curcumin-Complex

## 1. Filosofía Operacional

Nuestra filosofía es **"Despliegues Aburridos a través de la Automatización Robusta"**. El acto de desplegar a producción debe ser un evento predecible, frecuente y de bajo riesgo, orquestado enteramente por sistemas automatizados. La intervención humana se centra en la revisión y aprobación, no en la ejecución manual.

La salud de la aplicación en producción se monitoriza de forma continua y proactiva, no reactiva.

---

## 2. Pipeline de Integración y Despliegue Continuo (CI/CD)

La SSoT para toda la automatización es **GitHub Actions**, integrado nativamente con **Vercel** para los despliegues.

```mermaid
graph TD
    subgraph "Fase de Desarrollo"
        A[Desarrollador abre PR a `main`] --> B{Pipeline de Pull Request};
    end

    subgraph "Guardián de Calidad (CI)"
        B -- "Ejecuta en cada commit al PR" --> C[Job: Quality Check <br> (lint, format, types)];
        C --> D[Job: Run Tests <br> (unit, integration, e2e)];
        D --> E[Job: Build Validation];
    end

    subgraph "Fase de Revisión"
        E -- "Todos los jobs pasan" --> F{PR Aprobado};
        E -- "Algún job falla" --> G[PR Bloqueado];
    end

    subgraph "Fase de Despliegue (CD)"
        F -- "Autor fusiona PR a `main`" --> H[Commit a `main`];
        H -- "Vercel GitHub App detecta push" --> I[Inicia Despliegue a Producción];
        I --> J[Sitio en vivo actualizado];
    end
Pipeline 1: Guardián de Calidad (en pull_request)
Disparador: Cada commit a un Pull Request abierto contra main.
Propósito: Prevenir que código de baja calidad o que rompa la aplicación sea fusionado.
Pasos Mandatorios:
Chequeo de Calidad Estática: Ejecuta pnpm quality:check.
Ejecución de Pruebas: Ejecuta pnpm test (cubre unitarias y de integración).
Ejecución de Pruebas E2E: Ejecuta pnpm e2e.
Validación de Build: Ejecuta pnpm build para asegurar que el proyecto compila para producción.
Resultado: Un PR no puede ser fusionado si alguno de estos pasos falla.
Pipeline 2: Despliegue a Producción (en push a main)
Disparador: Cada commit a la rama main (que solo ocurre tras la fusión de un PR aprobado).
Propósito: Desplegar la última versión estable del código a producción.
Proceso: La integración de Vercel con GitHub gestiona esto automáticamente. Vercel detecta el nuevo commit, ejecuta su propio proceso de build y despliega el resultado.
3. Gestión de Entornos
Producción: https://www.curcumin-complex.com (o el dominio final). Refleja el estado de la rama main.
Preview (Staging): Generado automáticamente por Vercel para cada Pull Request. Cada PR tiene una URL de despliegue única y efímera. Este es el entorno canónico para la revisión de código visual y las pruebas manuales antes de la fusión.
Local: El entorno de desarrollo en la máquina de cada ingeniero (localhost:3000).
4. Gestión de Variables de Entorno
SSoT para Secretos: Vercel Environment Variables es la única fuente de verdad para todas las claves de API, tokens y configuraciones sensibles.
Variables de Producción: Aplicadas solo al entorno de producción (rama main).
Variables de Preview: Aplicadas a todos los despliegues de preview.
Sincronización Local: El archivo .env.example en el repositorio es el manifiesto de las variables que un desarrollador necesita para ejecutar el proyecto localmente. DEBE mantenerse sincronizado con las claves (no los valores) existentes en Vercel. Al añadir una nueva variable a Vercel, es mandatorio añadir su clave a .env.example.
5. Estrategia de Observabilidad en Producción
Monitoreo de Errores:
SSoT: Sentry.
Alcance: Captura errores no controlados tanto en el cliente (global-error.tsx) como en el servidor (middleware, server actions, renderizado), y errores de pino-sentry-transport.
Logging:
SSoT: Vercel Log Drains.
Alcance: Captura todo el stdout de la aplicación, lo que incluye todos los logs estructurados generados por nuestro logger (pino).
Analíticas y Rendimiento:
SSoT: Vercel Analytics y Vercel Speed Insights.
Propósito: Proporcionan métricas de rendimiento del mundo real (Core Web Vitals) y analíticas de tráfico básicas, respetando la privacidad del usuario.
6. Protocolos de Continuidad del Negocio
Plan de Rollback (Reversión)
En caso de que un despliegue a producción introduzca una regresión crítica, el procedimiento de rollback es inmediato y de bajo riesgo.
Navegar al panel de "Deployments" del proyecto en Vercel.
Identificar el último despliegue exitoso previo al problemático.
Hacer clic en el menú de opciones (...) de ese despliegue y seleccionar "Promote to Production".
Vercel redirigirá instantáneamente el tráfico de producción a esta versión estable.
Plan de Recuperación ante Desastres (DRP)
Alcance: Este plan cubre un escenario de fallo catastrófico del proveedor de infraestructura principal (Vercel).
Estrategia:
Comunicación: La prioridad es comunicar el estado del servicio a los stakeholders a través de los canales designados.
Dependencia del Proveedor: Confiamos en los planes de DRP y los Acuerdos de Nivel de Servicio (SLA) de Vercel para la restauración de la infraestructura. No se intentará una migración de emergencia a otro proveedor.
Post-Mortem: Una vez restaurado el servicio, se realizará un análisis post-mortem para documentar el impacto y las lecciones aprendidas.
// .docs/DEPLOYMENT_AND_OPERATIONS.md
```
