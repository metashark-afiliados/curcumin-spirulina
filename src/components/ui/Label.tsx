// src/components/ui/Label.tsx
/**
 * @file src/components/ui/Label.tsx
 * @description Aparato de UI atómico y soberano para etiquetas de formulario.
 *              Nivelado a la arquitectura de logging de ConvertiKit, garantizando
 *              una observabilidad consistente y tipo-segura.
 * @author L.I.A. Legacy
 * @version 6.1.0
 * @see .docs-espejo/components/ui/Label.tsx.md
 */
"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { useTranslations } from "next-intl";
import * as React from "react";
import { clientLogger } from "@/lib/client-logger";
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
  required?: boolean;
}

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, variant, required, children, ...props }, ref) => {
  const t = useTranslations("components.ui.Label");

  clientLogger.trace("[Label]", "Renderizando componente de etiqueta.", {
    htmlFor: props.htmlFor,
    variant,
    required,
  });

  return (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(labelVariants({ variant }), className)}
      {...props}
    >
      {children}
      {required && (
        <span
          className="ml-1 text-feedback-error font-semibold"
          aria-label={t("requiredIndicatorAriaLabel")}
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
