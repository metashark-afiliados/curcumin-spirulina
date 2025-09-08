// src/lib/schema.ts
/**
 * @file schema.ts
 * @description Módulo de utilidades SSoT para generar objetos de datos
 *              estructurados (JSON-LD). Purificado para eliminar toda dependencia
 *              de logging y garantizar la compatibilidad con el ciclo de vida
 *              de renderizado de Next.js, adhiriéndose estrictamente al PRU.
 * @version 8.0.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/lib/schema.ts.md
 */
import "server-only";

import { type PostData } from "./blog";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
const BRAND_NAME = "Curcumin+";

interface ReviewData {
  authorName: string;
  reviewBody: string;
  ratingValue: number;
}

/**
 * @public
 * @function generateProductSchema
 * @description Genera el schema JSON-LD para el producto principal. Es una función pura.
 * @returns {object} El objeto de schema `Product`.
 */
export function generateProductSchema() {
  return {
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
}

/**
 * @public
 * @function generateReviewSchema
 * @description Genera el schema JSON-LD para una reseña de producto. Es una función pura.
 * @param {ReviewData} data - Los datos de la reseña.
 * @returns {object} El objeto de schema `Review`.
 */
export function generateReviewSchema(data: ReviewData) {
  return {
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
}

/**
 * @public
 * @function generateBlogPostingSchema
 * @description Genera el schema JSON-LD para un artículo de blog. Es una función pura.
 * @param {PostData} post - Los datos del post.
 * @param {string} locale - El locale del post.
 * @returns {object} El objeto de schema `BlogPosting`.
 */
export function generateBlogPostingSchema(post: PostData, locale: string) {
  const fullUrl = `${BASE_URL}/${locale}/blog/${post.slug}`;
  return {
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
}
// src/lib/schema.ts
