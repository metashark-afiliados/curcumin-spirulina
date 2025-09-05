// src/lib/schema.ts
/**
 * @file schema.ts
 * @description Módulo de utilidades SSoT para generar objetos de datos
 *              estructurados (JSON-LD) em conformidade com Schema.org.
 * @version 4.1.0
 * @author L.I.A. Legacy
 */
import "server-only";
import { serverLogger } from "@/lib/logger";
import { type PostData } from "./blog";

// CORRECCIÓN: Constantes definidas dentro del módulo.
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
const BRAND_NAME = "Curcumin+";

interface ReviewData {
  authorName: string;
  reviewBody: string;
  ratingValue: number;
}

export function generateProductSchema() {
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
      url: `${BASE_URL}/it-IT#order-form`, // Nota: idealmente, el locale debería ser dinámico.
    },
  };
  serverLogger.trace({ schemaType: "Product" }, "Gerado schema de Produto.");
  return schema;
}

export function generateReviewSchema(data: ReviewData) {
  // <-- CORRECCIÓN: Función ahora exportada
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
  serverLogger.trace({ schemaType: "Review" }, "Gerado schema de Review.");
  return schema;
}

export function generateBlogPostingSchema(post: PostData, locale: string) {
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
  serverLogger.trace(
    { schemaType: "BlogPosting", slug: post.slug },
    "Gerado schema de BlogPosting."
  );
  return schema;
}
// src/lib/schema.ts
