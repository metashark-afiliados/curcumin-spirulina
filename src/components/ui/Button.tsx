// src/components/ui/Button.tsx
/**
 * @file src/components/ui/Button.tsx
 * @description Aparato de UI atómico de élite para botones. Nivelado para una
 *              adherencia estricta a la API de logging del cliente unificada
 *              y un enriquecimiento de contexto de log tipo-seguro.
 * @version 4.0.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/ui/Button.tsx.md
 */
"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";
import * as React from "react";

import { clientLogger } from "@/lib/client-logger";
import { type LogContext } from "@/lib/types/logging";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-bold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-brand-primary text-on_brand hover:bg-brand-primary/90",
        destructive:
          "bg-feedback-error text-on_brand hover:bg-feedback-error/90",
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        subtle: "bg-white/10 text-white/80 hover:bg-white/20",
        accent:
          "bg-gradient-to-r from-brand-accent to-red-600 text-on_brand shadow-lg hover:shadow-xl",
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
  extends Omit<HTMLMotionProps<"button">, "children" | "color">,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  asChild?: boolean;
  loading?: boolean;
  loadingText?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      loadingText,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? motion(Slot) : motion.button;
    const isDisabled = loading || props.disabled;

    if (loading) {
      // Se estandariza la creación del contexto para el log.
      const logContext: LogContext = {
        component: "Button",
        loadingState: true,
        variant,
        size,
        loadingText,
      };
      clientLogger.trace(
        logContext,
        "Renderizando botón en estado de cargamento."
      );
    }

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
              <span>{children}</span>
              {loadingText && (
                <span className="sr-only" aria-live="polite">
                  {loadingText}
                </span>
              )}
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
