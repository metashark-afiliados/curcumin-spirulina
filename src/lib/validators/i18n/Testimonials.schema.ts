// src/lib/validators/i18n/Testimonials.schema.ts
/**
 * @file Testimonials.schema.ts
 * @description Aparato de Contrato de Datos y SSoT para el contenido de los
 *              testimonios. Define la estructura canónica que el orquestador
 *              `HomePage` espera del archivo de mensajes `TestimonialsSection.json`.
 * @version 1.0.0
 * @author L.I.A. Legacy
 */
import { z } from "zod";

export const TestimonialDataSchema = z.object({
  imageUrl: z.string().startsWith("/"),
  author: z.string().min(1),
  location: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  title: z.string().min(1),
  text: z.string().min(1),
});

export const TestimonialsSchema = z.array(TestimonialDataSchema);

export type TestimonialData = z.infer<typeof TestimonialDataSchema>;
// src/lib/validators/i18n/Testimonials.schema.ts
