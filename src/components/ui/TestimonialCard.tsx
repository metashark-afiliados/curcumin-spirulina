// src/components/ui/TestimonialCard.tsx
/**
 * @file TestimonialCard.tsx
 * @description Aparato de UI soberano (Organismo) e de servidor. Exibe um
 *              único depoimento, sendo responsável por renderizar tanto a UI
 *              quanto o schema JSON-LD associado para SEO.
 * @version 6.1.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/ui/TestimonialCard.tsx.md
 */
import "server-only";

import Image from "next/image";
import { Star } from "lucide-react";

import { serverLogger } from "@/lib/server-logger";
import { generateReviewSchema } from "@/lib/schema";
import { SchemaInjector } from "@/components/ui/SchemaInjector";

export interface TestimonialData {
  imageUrl: string;
  author: string;
  location: string;
  rating: number;
  title: string;
  text: string;
}

export async function TestimonialCard(
  props: TestimonialData
): Promise<React.ReactElement> {
  const { imageUrl, author, location, rating, title, text } = props;
  // CORREÇÃO: Assinatura do logger corrigida para (contexto, mensagem).
  serverLogger.trace(
    { component: "TestimonialCard", author },
    "Renderizando depoimento no servidor."
  );

  const reviewSchema = generateReviewSchema({
    authorName: author,
    reviewBody: text,
    ratingValue: rating,
  });

  return (
    <div className="relative grid h-full grid-cols-1 items-center gap-8 rounded-xl bg-white/5 p-8 shadow-lg backdrop-blur-lg md:grid-cols-3 md:gap-12">
      <SchemaInjector schema={reviewSchema} />
      {/* ... JSX inalterado ... */}
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
