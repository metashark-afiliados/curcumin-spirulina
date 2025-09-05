// src/components/ui/TestimonialCard.tsx
/**
 * @file TestimonialCard.tsx
 * @description Aparato de UI atómico (Organismo) de presentación puro. Exibe um
 *              único depoimento de cliente de forma autêntica e crível, focando
 *              em uma imagem de estilo de vida, avaliação e uma história pessoal.
 *              Enriquecido com injeção de schema.org para SEO avançado.
 * @version 3.0.0
 * @author RaZ Podestá - MetaShark Tech
 * @see src/components/ui/TestimonialsSection.tsx (Consumidor)
 * @see https://schema.org/Review
 */
"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { clientLogger } from "@/lib/logger";
import { SchemaInjector } from "@/components/ui/SchemaInjector";
import { generateReviewSchema } from "@/lib/schema";

/**
 * @interface TestimonialData
 * @description Contrato de dados para um único depoimento.
 */
export interface TestimonialData {
  imageUrl: string;
  author: string;
  location: string;
  rating: number;
  title: string;
  text: string;
}

/**
 * @component TestimonialCard
 * @description Renderiza um card de depoimento completo, combinando imagem,
 *              avaliação por estrelas e o texto da citação. Injeta dados
 *              estruturados `Review` para rich snippets nos resultados de busca.
 * @param {TestimonialData} props - Os dados do depoimento.
 * @returns {React.ReactElement} O componente de card de depoimento.
 */
export function TestimonialCard(props: TestimonialData): React.ReactElement {
  const { imageUrl, author, location, rating, title, text } = props;
  clientLogger.trace(
    { component: "TestimonialCard", author },
    "Renderizando depoimento."
  );

  const reviewSchema = generateReviewSchema({
    authorName: author,
    reviewBody: text,
    ratingValue: rating,
  });

  return (
    <div className="relative grid h-full grid-cols-1 items-center gap-8 rounded-xl bg-white/5 p-8 shadow-lg backdrop-blur-lg md:grid-cols-3 md:gap-12">
      <SchemaInjector schema={reviewSchema} />

      {/* Imagem do Cliente */}
      <div className="relative h-48 w-48 justify-self-center overflow-hidden rounded-full shadow-lg md:h-56 md:w-56">
        <Image
          src={imageUrl}
          alt={`Foto de ${author}, cliente satisfeito(a).`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
      </div>

      {/* Conteúdo do Depoimento */}
      <div className="md:col-span-2">
        {/* Avaliação por Estrelas */}
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

        {/* Citação (Blockquote para semântica) */}
        <blockquote className="mt-4">
          <p className="text-xl font-bold text-white">"{title}"</p>
          <p className="mt-2 text-white/80">{text}</p>
        </blockquote>

        {/* Autor e Localização (Cite para semântica) */}
        <cite className="mt-4 block text-right font-semibold not-italic text-white">
          - {author},{" "}
          <span className="font-normal text-white/70">{location}</span>
        </cite>
      </div>
    </div>
  );
}
// src/components/ui/TestimonialCard.tsx
