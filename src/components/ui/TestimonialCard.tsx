// src/components/ui/TestimonialCard.tsx
/**
 * @file TestimonialCard.tsx
 * @description Aparato de UI de presentación puro. Nivelado a Server Component
 *              síncrono. Ya no es `async` y se elimina la directiva `server-only`
 *              explícita para permitir patrones de composición más flexibles
 *              manejados por Next.js. Delega la inyección de Schema.org a su
 *              orquestador.
 * @version 10.0.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/ui/TestimonialCard.tsx.md
 */
// "server-only" se elimina para permitir que Next.js gestione los límites
// de forma más flexible a través de la composición.

import Image from "next/image";
import { Star } from "lucide-react";

import { type TestimonialData } from "@/lib/validators/i18n/Testimonials.schema";
import { logger } from "@/lib/logger";

// Ya no extiende TestimonialData porque `SchemaInjector` no está aquí.
interface TestimonialCardProps extends TestimonialData {}

// La función ya no es `async`
export function TestimonialCard(
  props: TestimonialCardProps
): React.ReactElement {
  const { imageUrl, author, location, rating, title, text } = props;

  logger.trace(
    { component: "TestimonialCard", author },
    "Renderizando testimonio en el servidor."
  );

  return (
    <div className="relative grid h-full grid-cols-1 items-center gap-8 rounded-xl bg-white/5 p-8 shadow-lg backdrop-blur-lg md:grid-cols-3 md:gap-12">
      {/* SchemaInjector se moverá al orquestador (HomePage) */}
      <div className="relative h-48 w-48 justify-self-center overflow-hidden rounded-full shadow-lg md:h-56 md:w-56">
        <Image
          src={imageUrl}
          alt={`Foto de ${author}, cliente satisfecho(a).`}
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
