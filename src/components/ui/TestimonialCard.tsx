// src/components/ui/TestimonialCard.tsx
/**
 * @file TestimonialCard.tsx
 * @description Aparato de UI soberano (Organismo) y de servidor. Exibe un
 *              único depoimento. Refactorizado para aceptar un logger
 *              transaccional vía props y propagarlo a sus dependencias
 *              (como `generateReviewSchema`), asegurando su correcta
 *              participación en la observabilidad de la arquitectura.
 * @version 8.0.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/ui/TestimonialCard.tsx.md
 */
import "server-only";

import Image from "next/image";
import { Star } from "lucide-react";
import type pino from "pino";

import { generateReviewSchema } from "@/lib/schema";
import { SchemaInjector } from "@/components/ui/SchemaInjector";
import { type TestimonialData } from "@/lib/validators/i18n/Testimonials.schema";

// La firma del componente se actualiza para incluir el logger.
interface TestimonialCardProps extends TestimonialData {
  logger: pino.Logger;
}

export async function TestimonialCard({
  logger,
  ...props
}: TestimonialCardProps): Promise<React.ReactElement> {
  const { imageUrl, author, location, rating, title, text } = props;

  const baseContext = { component: "TestimonialCard", author };
  // La llamada a `getCorrelationId()` es eliminada. Se usa el logger inyectado.
  logger.trace(baseContext, "Renderizando testimonio en el servidor.");

  // Se propaga el logger explícitamente a la función generadora de schemas.
  const reviewSchema = generateReviewSchema(logger, {
    authorName: author,
    reviewBody: text,
    ratingValue: rating,
  });

  return (
    <div className="relative grid h-full grid-cols-1 items-center gap-8 rounded-xl bg-white/5 p-8 shadow-lg backdrop-blur-lg md:grid-cols-3 md:gap-12">
      <SchemaInjector schema={reviewSchema} />
      <div className="relative h-48 w-48 justify-self-center overflow-hidden rounded-full shadow-lg md:h-56 md:w-56">
        <Image
          src={imageUrl}
          alt={`Foto de ${author}, cliente satisfeito(a).`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
      </div>

      <div className="md:col-span-2">
        <div className="flex items-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < rating ? "text-yellow-400" : "text-white/30"
              }`}
              fill={i < rating ? "currentColor" : "none"}
            />
          ))}
        </div>
        <blockquote className="mt-4">
          <p className="text-xl font-bold text-white">"{title}"</p>
          <p className="mt-2 text-white/80">{text}</p>
        </blockquote>
        <cite className="mt-4 block text-right font-semibold not-italic text-white">
          - {author},{" "}
          <span className="font-normal text-white/70">{location}</span>
        </cite>
      </div>
    </div>
  );
}
// src/components/ui/TestimonialCard.tsx
