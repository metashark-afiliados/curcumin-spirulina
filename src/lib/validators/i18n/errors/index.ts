// src/lib/validators/i18n/errors/index.ts
/**
 * @file index.ts
 * @description Manifiesto (Barrel File) y API pública para todos los schemas
 *              de error atómicos. Ensambla y exporta todos los aparatos de
 *              contratos de error, proveyendo una fachada limpia para el
 *              ensamblador principal.
 * @version 1.0.0
 * @author L.I.A. Legacy
 * @see ../ValidationErrors.schema.ts (Consumidor)
 */
export { GenericErrorsSchema } from "./GenericErrors.schema";

// A medida que se añadan nuevos schemas de error (ej. Auth, Campaigns),
// se exportarán desde aquí para que el ensamblador los descubra.
// export { AuthErrorsSchema } from "./AuthErrors.schema";
// src/lib/validators/i18n/errors/index.ts
