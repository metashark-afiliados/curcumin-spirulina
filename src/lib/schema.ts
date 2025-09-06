// src/lib/schema.ts
/**
 * @file schema.ts
 * @description Módulo de utilidades SSoT para generar objetos de datos
 *              estructurados (JSON-LD). Refactorizado para utilizar Inyección
 *              de Dependencias Explícita, recibiendo el logger transaccional
 *              en cada una de sus funciones.
 * @version 7.0.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/lib/schema.ts.md
 */
import "server-only";

import type pino from "pino";
import { type PostData } from "./blog";

// --- SSoT de Constantes del Módulo ---
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
const BRAND_NAME = "Curcumin+";

interface ReviewData {
  authorName: string;
  reviewBody: string;
  ratingValue: number;
}

export function generateProductSchema(logger: pino.Logger) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Curcumin Spirulina Complex",
    image: `${BASE_URL}/img/produto-curcuma-hero.png`,
    brand: { "@type": "Brand", name: BRAND_NAME },
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: "39.00",
      availability: "https://schema.org/InStock",
      url: `${BASE_URL}/#order-form`,
    },
  };
  logger.trace(
    { component: "SchemaGenerator", schemaType: "Product" },
    "Generado schema de Producto."
  );
  return schema;
}

export function generateReviewSchema(logger: pino.Logger, data: ReviewData) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Review",
    author: { "@type": "Person", name: data.authorName },
    reviewBody: data.reviewBody,
    reviewRating: {
      "@type": "Rating",
      ratingValue: data.ratingValue.toString(),
      bestRating: "5",
    },
    itemReviewed: {
      "@type": "Product",
      name: "Curcumin Spirulina Complex",
      image: `${BASE_URL}/img/produto-curcuma-hero.png`,
    },
  };
  logger.trace(
    { component: "SchemaGenerator", schemaType: "Review" },
    "Generado schema de Review."
  );
  return schema;
}

export function generateBlogPostingSchema(
  logger: pino.Logger,
  post: PostData,
  locale: string
) {
  const fullUrl = `${BASE_URL}/${locale}/blog/${post.slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: { "@type": "WebPage", "@id": fullUrl },
    headline: post.title,
    description: post.excerpt,
    image: `${BASE_URL}${post.featuredImage}`,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: BRAND_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/img/logo.png`,
      },
    },
    datePublished: post.date,
    dateModified: post.date,
  };
  logger.trace(
    {
      component: "SchemaGenerator",
      schemaType: "BlogPosting",
      slug: post.slug,
    },
    "Generado schema de BlogPosting."
  );
  return schema;
}
// src/lib/schema.ts
