// src/lib/validators/GeoIP.schema.ts
/**
 * @file GeoIP.schema.ts
 * @description Aparato de Contrato de Dados y SSoT para a resposta da API
 *              de GeoIP. Define a estrutura canónica esperada da fonte externa.
 * @version 1.0.0
 * @author L.I.A. Legacy
 */
import { z } from "zod";

/**
 * @public
 * @constant GeoIPResponseSchema
 * @description O schema Zod que valida a resposta da API de GeoIP. Foca-se
 *              apenas nos campos que a aplicação consome, ignorando o resto.
 */
export const GeoIPResponseSchema = z.object({
  country_code: z
    .string()
    .optional()
    .nullable()
    .describe("O código do país no formato ISO 3166-1 Alpha-2."),
  country_name: z
    .string()
    .optional()
    .nullable()
    .describe("O nome completo do país."),
});

/**
 * @public
 * @type GeoIPResponse
 * @description Infiere el tipo de TypeScript a partir del schema.
 */
export type GeoIPResponse = z.infer<typeof GeoIPResponseSchema>;
// src/lib/validators/GeoIP.schema.ts
