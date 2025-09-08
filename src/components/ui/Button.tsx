// src/components/ui/Button.tsx
/**
 * @file src/components/ui/Button.tsx
 * @description Aparato de UI atómico de élite para botones. Nivelado para ser
 *              soberano en su contenido de i18n, obteniendo sus propios textos
 *              y alineándose con la SSoT de logging unificada.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 6.0.0
 * @see .docs-espejo/components/ui/Button.tsx.md
 */
"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";

import { clientLogger } from "@/lib/client-logger";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-bold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-brand-primary-orange text-white hover:bg-brand-primary-orange-hover",
        destructive: "bg-feedback-error text-white hover:bg-feedback-error/90",
        outline: "border border-brand-border bg-transparent hover:bg-white/10",
        secondary:
          "bg-brand-base-green text-white hover:bg-brand-base-green/80",
        ghost: "hover:bg-white/10",
        link: "text-brand-primary-orange underline-offset-4 hover:underline",
        subtle: "bg-white/10 text-white/80 hover:bg-white/20",
        accent: "bg-brand-cta-red text-white shadow-lg hover:shadow-xl",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8 text-base",
        icon: "h-10 w-10",
        pill: "h-10 rounded-full px-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "children">,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      children,
      ...props
    },
    ref
  ) => {
    // MEJORA: Soberanía de contenido i18n.
    const t = useTranslations("components.ui.Button");
    const Comp = asChild ? motion(Slot) : motion.button;
    const isDisabled = loading || props.disabled;
    const loadingText = t("loadingText");

    // MEJORA: Observabilidade completa.
    clientLogger.trace("[Button]", "Renderizando botón.", {
      variant,
      size,
      loading,
      isDisabled,
    });

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isDisabled}
        aria-busy={loading ? "true" : undefined}
        whileHover={{ scale: isDisabled ? 1 : 1.05 }}
        whileTap={{ scale: isDisabled ? 1 : 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        {...props}
      >
        {variant === "accent" && !isDisabled && (
          <motion.div
            className="absolute inset-0 h-full w-full bg-white/20"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{ mixBlendMode: "soft-light" }}
          />
        )}
        <span className="relative z-10 flex items-center justify-center">
          {loading ? (
            <>
              <Loader2
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
              {/* CORRECCIÓN: Utiliza o texto obtido do hook t(). */}
              <span>{loadingText}</span>
              <span className="sr-only" aria-live="polite">
                {loadingText}
              </span>
            </>
          ) : (
            children
          )}
        </span>
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
// src/components/ui/Button.tsx
