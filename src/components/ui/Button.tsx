// src/components/ui/Button.tsx
/**
 * @file Button.tsx
 * @description Aparato de UI atómico de élite para botones. Es polimórfico,
 *              totalmente animado, accesible, tipo-seguro, y soporta un
 *              estado de carregamento declarativo y un conjunto extendido de
 *              variantes visuales.
 * @version 2.0.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/ui/Button.tsx.md
 */
"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";
import * as React from "react";
import { clientLogger } from "@/lib/logger";
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
          "bg-brand-secondary text-on_brand hover:bg-brand-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-text-primary underline-offset-4 hover:underline",
        subtle: "bg-white/10 text-white/80 hover:bg-white/20",
        premium:
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
  /** El contenido del botón. */
  children: React.ReactNode;
  /**
   * Si es `true`, el botón se renderizará como su hijo directo,
   * aplicando todos los estilos y comportamientos a ese hijo.
   * Ideal para envolver componentes como `<Link>`.
   */
  asChild?: boolean;
  /**
   * Si es `true`, muestra un spinner, deshabilita el botón y
   * suprime las animaciones de interacción.
   */
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
    const Comp = asChild ? motion(Slot) : motion.button;
    const isDisabled = loading || props.disabled;

    if (isDisabled) {
      clientLogger.trace(
        { component: "Button", loading, disabled: props.disabled },
        "Renderizando em estado desabilitado."
      );
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isDisabled}
        whileHover={{ scale: isDisabled ? 1 : 1.05 }}
        whileTap={{ scale: isDisabled ? 1 : 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        {...props}
      >
        {variant === "premium" && !isDisabled && (
          <motion.div
            className="absolute inset-0 w-full h-full bg-white/20"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{ mixBlendMode: "soft-light" }}
          />
        )}
        <span className="relative z-10 flex items-center justify-center">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>{children}</span>
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
