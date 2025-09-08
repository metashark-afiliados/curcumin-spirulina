// .docs-espejo/app/select-language/page.tsx.md
/**
 * @file .docs-espejo/app/select-language/page.tsx.md
 * @description Documento Espejo y SSoT conceptual para la página de selección de idioma.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 2.0.0
 */
# Manifiesto Conceptual: `select-language/page.tsx`

## 1. Rol Estratégico y Propósito

Este aparato es el **componente de UI para el fallback de internacionalización**. Su único propósito es presentarse cuando la detección automática de idioma falla, ofreciendo al usuario una opción explícita y evitando una experiencia de usuario frustrante en un idioma inesperado.

Es un componente de cliente que gestiona su propio estado (el temporizador) y efectos secundarios (la redirección). Actúa como una "sala de espera" temporal antes de dirigir al usuario al sitio principal. Como componente soberano, es responsable de cargar y validar su propio contenido de i18n.

## 2. Arquitectura y Flujo de Ejecución

La lógica se basa en un temporizador, la interacción del usuario y un cargador de contenido resiliente.

```mermaid
graph TD
    subgraph "Fase de Carga"
        A[Componente Monta] --> B(Invoca `useTranslations`);
        B --> C{Valida contenido con `SelectLanguageContentSchema`};
        C -- Falla --> D[Renderiza Fallback / No renderiza nada];
        C -- Éxito --> E[Renderiza UI con contenido i18n];
    end
    subgraph "Fase de Interacción"
        E --> F(Inicia temporizador de 5s);
        F --> G{Usuario hace clic en un idioma?};
        G -- Sí --> H[Establece Cookie `NEXT_LOCALE`];
        H --> J[Redirige a `/`];
        G -- No --> I{Temporizador llega a 0?};
        I -- Sí --> J;
        I -- No --> F;
    end
3. Contrato de API
Entradas: Es un componente de página, por lo que recibe params y searchParams de Next.js.
Salidas: No exporta ninguna funcionalidad. Su salida es la renderización de la UI y los efectos secundarios de redirección.
4. Zona de Melhorias Futuras
Redirección a la URL Original: Modificar el middleware para que añada un parámetro ?next=/ruta-original. Esta página leería ese parámetro y redirigiría al usuario a su destino original después de seleccionar un idioma.
Animación del Temporizador: Añadir una barra de progreso visual o una animación más elaborada para el temporizador.
Accesibilidad del Temporizador: Utilizar atributos aria-live para anunciar el tiempo restante a los lectores de pantalla.
Desactivación del Temporizador: Pausar la cuenta regresiva si el usuario interactúa con la página (ej. onMouseEnter sobre los botones).
Añadir Banderas: Incluir emojis de banderas junto al nombre de cada idioma para una identificación visual más rápida.
Pruebas Unitarias: Escribir pruebas unitarias con Vitest y Testing Library para simular el paso del tiempo y verificar que las funciones de redirección y establecimiento de cookies se llaman correctamente.
Logging de Telemetría: Registrar un evento (LANGUAGE_SELECTED o LANGUAGE_DEFAULTED) para analizar qué tan a menudo los usuarios eligen un idioma versus dejar que el temporizador expire.
Diseño Responsivo Avanzado: Mejorar el layout para pantallas ultra-anchas o muy pequeñas.
Componente Atómico LanguageButton: Extraer la lógica del botón de selección de idioma a su propio componente para mayor reutilización.
Internacionalización de la Documentación: Traducir este documento espejo.
// .docs-espejo/app/select-language/page.tsx.md