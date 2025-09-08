// src/components/ui/_partials/hero/HeroImage.tsx
/**
 * @file src/components/ui/_partials/hero/HeroImage.tsx
 * @description Molécula de UI atómica y de presentación pura. Su única
 *              responsabilidad es renderizar la imagen principal de la HeroSection.
 * @author L.I.A. Legacy
 * @version 1.0.0
 * @see .docs-espejo/components/ui/_partials/hero/HeroImage.tsx.md
 */
"use client";

import Image from "next/image";
import React from "react";

import { type HeroSectionContent } from "@/lib/validators/i18n/HeroSection.schema";
import { AnimationWrapper } from "@/components/ui/AnimationWrapper";

type HeroImageProps = HeroSectionContent["image"];

/**
 * @component HeroImage
 * @description Componente de presentación puro que muestra la imagen principal
 *              del producto con optimización de Next.js y animación de entrada.
 * @param {HeroImageProps} props Las propiedades de la imagen (src y alt).
 * @returns {React.ReactElement}
 */
export const HeroImage = ({ src, alt }: HeroImageProps): React.ReactElement => (
  <div className="relative flex items-center justify-center">
    <AnimationWrapper
      variant="scaleIn"
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <Image
        src={src}
        alt={alt}
        width={500}
        height={500}
        priority
        className="h-auto w-full max-w-sm drop-shadow-2xl"
        sizes="(max-width: 768px) 100vw, 500px"
      />
    </AnimationWrapper>
  </div>
);
// src/components/ui/_partials/hero/HeroImage.tsx
