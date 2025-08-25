// .docs/I18N_MANIFESTO.md
/**
 * @file I18N_MANIFESTO.md
 * @description Manifiesto Canónico y Única Fuente de Verdad (SSoT) para la
 *              Arquitectura de Internacionalización "IMAS" (I18n Mirrored Atomic Structure)
 *              del proyecto Curcumin-Spirulina.
 * @author L.I.A. Legacy
 * @version 1.0.0
 */

# Manifiesto de i18n: Arquitectura Atómica Espejada (IMAS)

## 1. Filosofía
Nuestra arquitectura de i18n se rige por el principio de **Cohesión y Mantenibilidad Radical**. Las traducciones de un aparato son parte intrínseca de ese aparato. Deben vivir lógicamente junto a él, en una estructura predecible y auto-documentada que facilite el desarrollo y la escalabilidad.

## 2. Arquitectura de Archivos: El "Sistema Espejo"
La SSoT de la organización es una estructura de directorios (`src/messages/`) que es un espejo directo de la estructura de nuestros aparatos de UI (`src/app/` y `src/components/`).

**Ejemplo Canónico:**
src/
├── components/
│ └── ui/
│ └── OrderForm.tsx
└── messages/
└── components/
└── ui/
└── OrderForm.json <-- Espejo Atómico
code
Code
## 3. Formato del Archivo de Mensajes Atómico
Cada archivo `.json` es una unidad autocontenida. Define las cadenas de texto para **TODOS los idiomas soportados**, pero exclusivamente para **un único aparato**.

**Ejemplo: `messages/components/ui/OrderForm.json`**
```json
{
  "it-IT": {
    "ctaButton": "ORDINARE ORA",
    "namePlaceholder": "Nome"
  },
  "en-US": {
    "ctaButton": "ORDER NOW",
    "namePlaceholder": "Name"
  },
  "es-ES": {
    "ctaButton": "ORDENAR AHORA",
    "namePlaceholder": "Nombre"
  }
}
4. Orquestación de Ensamblaje (i18n.ts)
El orquestador (src/i18n.ts) es el motor que ensambla los mensajes para cada petición. Su lógica es:
Leer un Manifiesto: Consume un messages/manifest.ts que mapea namespaces a rutas de archivos.
Carga Dinámica en Bucle: Itera sobre todos los namespaces registrados.
Extracción de locale: Para cada archivo cargado, extrae el objeto de traducciones correspondiente al locale de la petición actual.
Construcción de Objeto Anidado: Utiliza un helper para construir un único objeto de mensajes en memoria, donde las claves son los namespaces anidados. next-intl recibe este objeto completo.
5. Estrategia de Despliegue
La arquitectura es compatible tanto con Vercel (dinámico) como con Hostinger (estático), ya que la lógica de ensamblaje ocurre en tiempo de build o en el servidor, antes de enviar el HTML al cliente.
code
Code
---
**Reporte Post-Código**

*   **Análisis de Impacto y Deuda Técnica:** La base de código ha sido purgada de artefactos que contradecían la arquitectura de élite. La Única Fuente de Verdad para la estrategia de i18n ha sido establecida. El proyecto está ahora en un estado limpio, aunque aún no funcional debido a la dependencia pendiente de `src/lib/logging.ts` en `i18n.ts`.

*   **Protocolo de Transparencia (Métrica LOC):**
    *   **LOC `messages/it-IT.json`:** LOC Anterior: 91 | LOC Atual: 0 (Eliminado). **Justificación:** Eliminación de un aparato obsoleto que violaba la arquitectura IMAS.
    *   **LOC `.docs/I18N_MANIFESTO.md`:** LOC Anterior: N/A (Reemplazo de contenido incorrecto) | LOC Atual: 77. **Justificación:** Restauración de la SSoT arquitectónica correcta.

---