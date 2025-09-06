// src/lib/schema.ts
/**
 * @file schema.ts
 * @description Módulo de utilidades SSoT para generar objetos de datos
 *              estructurados (JSON-LD) conformes con Schema.org.
 * @version 5.0.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/lib/schema.ts.md
 */
import "server-only";
import { serverLogger } from "@/lib/logger";
import { type PostData } from "./blog";

// --- SSoT de Constantes del Módulo ---
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
const BRAND_NAME = "Curcumin+";

/**
 * @interface ReviewData
 * @description Contrato de datos para la generación de un schema de Review.
 */
interface ReviewData {
  authorName: string;
  reviewBody: string;
  ratingValue: number;
}

/**
 * @public
 * @function generateProductSchema
 * @description Genera un objeto JSON-LD para el schema `Product`.
 * @returns {object} El objeto de schema.
 */
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
      url: `${BASE_URL}/#order-form`,
    },
  };
  serverLogger.trace({ schemaType: "Product" }, "Gerado schema de Produto.");
  return schema;
}

/**
 * @public
 * @function generateReviewSchema
 * @description Genera un objeto JSON-LD para el schema `Review`.
 * @param {ReviewData} data - Los datos de la reseña.
 * @returns {object} El objeto de schema.
 */
export function generateReviewSchema(data: ReviewData) {
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

/**
 * @public
 * @function generateBlogPostingSchema
 * @description Genera un objeto JSON-LD para el schema `BlogPosting`.
 * @param {PostData} post - Los datos completos del post.
 * @param {string} locale - El locale del post para construir la URL canónica.
 * @returns {object} El objeto de schema.
 */
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
    dateModified: post.date, // Idealmente, se usaría una fecha de modificación si existiera.
  };
  serverLogger.trace(
    { schemaType: "BlogPosting", slug: post.slug },
    "Gerado schema de BlogPosting."
  );
  return schema;
}
// src/lib/schema.ts
