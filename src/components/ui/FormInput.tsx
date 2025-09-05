// src/components/ui/FormInput.tsx
/**
 * @file FormInput.tsx
 * @description Aparato de UI atómico (Molécula) de élite para campos de
 *              entrada de formulario. Combina accesibilidad robusta con un
 *              feedback visual de vanguardia a través de un borde con gradiente
 *              interactivo y animado que reacciona a los estados de foco y error.
 * @version 5.2.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/ui/FormInput.tsx.md
 */
"use client";

import { motion, AnimatePresence, type Variants } from "framer-motion";
import { AlertCircle, type LucideIcon } from "lucide-react";
import * as React from "react";
import { clientLogger } from "@/lib/client-logger"; // <-- CORREÇÃO: Caminho correto do logger.
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/Label";

export interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  icon?: LucideIcon;
  error?: string;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ id, label, icon: Icon, error, className, ...props }, ref) => {
    const errorId = error ? `${id}-error` : undefined;
    const [isFocused, setIsFocused] = React.useState(false);

    const currentState = error ? "error" : isFocused ? "focused" : "default";
    clientLogger.trace("Renderizando campo de entrada.", {
      component: "FormInput",
      id,
      state: currentState,
    });

    const gradientVariants: Variants = {
      default: {
        background: "linear-gradient(90deg, #4B5563, #6B7280)",
      },
      focused: {
        background: "linear-gradient(90deg, #F97316, #FBBF24)",
      },
      error: {
        background: "linear-gradient(90deg, #DC2626, #EF4444)",
      },
    };

    return (
      <div className="relative w-full space-y-1.5">
        <Label
          htmlFor={id}
          className="font-semibold"
          variant={error ? "error" : "default"}
          required={props.required}
        >
          {label}
        </Label>
        <motion.div
          className="relative rounded-lg p-[1.5px] transition-all duration-300"
          variants={gradientVariants}
          animate={currentState}
          initial="default"
        >
          <div className="relative flex items-center rounded-[6.5px] bg-white">
            {Icon && (
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Icon
                  className={cn(
                    "h-5 w-5 text-gray-400 transition-colors",
                    isFocused && "text-brand-primary-dark"
                  )}
                  aria-hidden="true"
                />
              </div>
            )}
            <input
              id={id}
              ref={ref}
              className={cn(
                "h-12 w-full rounded-md border-none bg-transparent px-4 py-2 text-base text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-0",
                Icon ? "pl-10" : "pl-4",
                error && "pr-10",
                className
              )}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              aria-invalid={!!error}
              aria-describedby={errorId}
              {...props}
            />
            {error && (
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <AlertCircle
                  className="h-5 w-5 text-feedback-error"
                  aria-hidden="true"
                />
              </div>
            )}
          </div>
        </motion.div>
        <AnimatePresence>
          {error && (
            <motion.p
              id={errorId}
              className="pl-1 text-sm font-medium text-red-300"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              role="alert"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
FormInput.displayName = "FormInput";

export { FormInput };
// src/components/ui/FormInput.tsx
