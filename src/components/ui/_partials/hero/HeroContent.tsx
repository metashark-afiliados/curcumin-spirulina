// src/components/ui/_partials/hero/HeroContent.tsx
/**
 * @file src/components/ui/_partials/hero/HeroContent.tsx
 * @description Molécula de UI atómica y de presentación pura. Su única
 *              responsabilidad es renderizar el contenido textual de la HeroSection.
 * @author L.I.A. Legacy
 * @version 1.0.0
 * @see .docs-espejo/components/ui/_partials/hero/HeroContent.tsx.md
 */
"use client";

import React from "react";
import { type HeroSectionContent } from "@/lib/validators/i18n/HeroSection.schema";
import { AnimationWrapper } from "@/components/ui/AnimationWrapper";

interface HeroContentProps
  extends Pick<HeroSectionContent, "mainTitle" | "subtitle"> {
  titleId: string;
}

/**
 * @component HeroContent
 * @description Componente de presentación puro que muestra el título y subtítulo
 *              principales de la página, envueltos en una animación.
 * @param {HeroContentProps} props Las propiedades del componente.
 * @returns {React.ReactElement}
 */
export const HeroContent = ({
  mainTitle,
  subtitle,
  titleId,
}: HeroContentProps): React.ReactElement => (
  <AnimationWrapper>
    <h1
      id={titleId}
      className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl"
    >
      {mainTitle}
    </h1>
    <p className="mt-4 text-lg text-white/80 md:text-xl">{subtitle}</p>
  </AnimationWrapper>
);
// src/components/ui/_partials/hero/HeroContent.tsx
