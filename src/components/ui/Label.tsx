// src/components/ui/Label.tsx
/**
 * @file Label.tsx
 * @description Aparato de UI atómico y de presentación puro para etiquetas de
 *              formulario. Es la fundación de la accesibilidad (A11Y) y la
 *              claridad visual en nuestros formularios. Enriquecido con variantes
 *              de estado y un indicador de campo requerido.
 * @version 4.0.0
 * @author RaZ Podestá - MetaShark Tech
 * @see LIA-SSoT-IMPLEMENTATION-GUIDE-V1
 */
"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { clientLogger } from "@/lib/logger";
import { cn } from "@/lib/utils";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      variant: {
        default: "text-white/90",
        error: "text-red-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {
  /**
   * Si es `true`, renderiza un asterisco visual para indicar que el campo es
   * obligatorio, mejorando la UX y la claridad del formulario.
   */
  required?: boolean;
}

/**
 * @component Label
 * @description Renderiza una etiqueta de formulário accesible. Construído sobre
 *              Radix UI para garantir a conformidade com as diretrizes da WAI-ARIA.
 *              A associação com um input é feita através da prop `htmlFor`.
 * @param {LabelProps} props - As propriedades do componente.
 * @returns {React.ReactElement} O componente de etiqueta.
 */
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, variant, required, children, ...props }, ref) => {
  clientLogger.trace(
    { component: "Label", for: props.htmlFor, variant, required },
    "Renderizando componente de etiqueta."
  );

  return (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(labelVariants({ variant }), className)}
      {...props}
    >
      {children}
      {required && (
        <span
          className="ml-1 text-destructive font-semibold"
          aria-hidden="true"
        >
          *
        </span>
      )}
    </LabelPrimitive.Root>
  );
});
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
// src/components/ui/Label.tsx
