// src/middleware/handlers/index.ts
/**
 * @file index.ts
 * @description Manifiesto (Barrel File) y API pública para todos los manejadores
 *              del middleware. Ensambla y exporta todos los aparatos de lógica
 *              atómicos del directorio, proveyendo una fachada limpia para el
 *              orquestador principal.
 * @version 1.0.0
 * @author RaZ Podestá - MetaShark Tech
 * @see src/middleware.ts (Consumidor)
 */
export { handleI18n } from "./i18n";
// A medida que se añadan nuevos manejadores (auth, telemetry, etc.), se exportarán aquí.
// src/middleware/handlers/index.ts
