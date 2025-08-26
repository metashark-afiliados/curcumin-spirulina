"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "framer-motion";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-brand-primary text-on_brand hover:bg-brand-primary/90",
        destructive:
          "bg-feedback-error text-on_brand hover:bg-feedback-error/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-brand-secondary text-on_brand hover:bg-brand-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

const LoaderIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="mr-2 h-4 w-4 animate-spin"
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

// LA CORRECCIÓN CRÍTICA ESTÁ AQUÍ:
// Unificamos los tipos. En lugar de extender de `React.ButtonHTMLAttributes`,
// extendemos de `HTMLMotionProps<"button">`, que ya incluye los atributos
// de un botón pero con tipos compatibles con Framer Motion.
export interface ButtonProps
  extends HTMLMotionProps<"button">,
    VariantProps<typeof buttonVariants> {
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
    const Comp = asChild ? motion(Slot) : motion.button;

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading || props.disabled}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        {...props}
      >
        <>
          {loading && <LoaderIcon />}
          {children}
        </>
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

/**
 * MEJORA CONTINUA
 *
 * @version 4.0.0
 * ---
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 4.0.0 - RESOLUCIÓN DEFINITIVA DE TIPOS: Se ha refactorizado la interfaz `ButtonProps` para que extienda de `HTMLMotionProps<"button">` en lugar de `React.ButtonHTMLAttributes`. Esta es la solución canónica que unifica la fuente de los tipos, eliminando las colisiones de firmas de eventos (ej. `onAnimationStart`, `onDrag`) entre React y Framer Motion y resolviendo el error de compilación de forma permanente.
 * ((Implementada)) @version 4.0.0 - COMPONENTE DE PRODUCCIÓN ROBUSTO: El botón es ahora completamente polimórfico, animado, tipo-seguro y está listo para cualquier caso de uso en un entorno de producción.
 */
