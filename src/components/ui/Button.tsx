// src/components/ui/Button.tsx
/**
 * @file src/components/ui/Button.tsx
 * @description Aparato de UI atómico de élite para botones. Es polimórfico,
 *              totalmente animado, accesible, tipo-seguro, y soporta un
 *              estado de carga declarativo y un conjunto extendido de
 *              variantes visuales semánticas. Se adhiere a la API de logging
 *              del cliente unificada para una observabilidad completa.
 * @version 3.2.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/ui/Button.tsx.md
 * @see src/lib/client-logger.ts (SSoT para el logger de cliente)
 * @see src/lib/types/logging.ts (SSoT para `LogContext`)
 */
"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";
import * as React from "react";

// IMPORTACIÓN CORREGIDA: Apunta a la nueva SSoT del clientLogger
import { clientLogger } from "@/lib/client-logger";
import { type LogContext } from "@/lib/types/logging"; // Importar LogContext
import { cn } from "@/lib/utils";

/**
 * @constant buttonVariants
 * @description Define las variantes visuales y de tamaño para el componente Button
 *              utilizando `class-variance-authority` (cva).
 */
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

/**
 * @interface ButtonProps
 * @description Propiedades del componente `Button`.
 * @extends Omit<HTMLMotionProps<'button'>, 'children' | 'color'> - Hereda props de `motion.button`.
 * @extends VariantProps<typeof buttonVariants> - Hereda props de variantes de `cva`.
 */
export interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "children" | "color">,
    VariantProps<typeof buttonVariants> {
  /**
   * @property {React.ReactNode} children - El contenido a renderizar dentro del botón.
   */
  children: React.ReactNode;
  /**
   * @property {boolean} [asChild=false] - Si es `true`, el botón se renderiza como su hijo directo
   *           (ej. un `Link`), fusionando props y estilos.
   */
  asChild?: boolean;
  /**
   * @property {boolean} [loading=false] - Si es `true`, el botón muestra un spinner de carga
   *           y se deshabilita.
   */
  loading?: boolean;
  /**
   * @property {string} [loadingText] - Texto opcional que se anuncia a los lectores de pantalla
   *           durante el estado de carga, proporcionando un feedback de accesibilidad superior.
   */
  loadingText?: string;
}

/**
 * @component Button
 * @description Componente polimórfico de botón con estilos variantes, soporte para estado de carga
 *              accesible, y microinteracciones animadas.
 * @param {ButtonProps} props - Las propiedades para configurar el botón.
 * @returns {React.ReactElement}
 */
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
      // USO DE CLIENTLOGGER CORREGIDO: (context, message)
      clientLogger.trace(
        {
          component: "Button",
          loadingState: true,
          variant,
          size,
          loadingText,
        } as LogContext, // Forzar el tipo a LogContext para asegurar compatibilidad
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
              {/* Para acessibilidade: o texto visual é mantido, mas um texto específico
                  para leitores de ecrã é fornecido, se disponível. */}
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
