"use client";

import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/Label";

export interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  icon?: LucideIcon;
  containerClassName?: string;
  error?: string;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ id, label, icon: Icon, error, ...props }, ref) => {
    const errorId = `${id}-error`;
    const [isFocused, setIsFocused] = React.useState(false);

    return (
      <div className="relative">
        <Label htmlFor={id} className="sr-only">
          {label}
        </Label>
        {/* Contenedor del gradiente para el efecto de borde */}
        <motion.div
          className="relative rounded-lg p-[1.5px] bg-gray-400 transition-all duration-300"
          animate={{
            background: isFocused
              ? "linear-gradient(90deg, #FBBF24, #F97316)"
              : "linear-gradient(90deg, #9CA3AF, #9CA3AF)",
          }}
        >
          <div className="relative flex items-center rounded-[6px] bg-white">
            {Icon && (
              <div className="pointer-events-none absolute left-3">
                <Icon
                  className={cn(
                    "h-5 w-5 text-gray-400 transition-colors",
                    error && "text-feedback-error",
                    isFocused && "text-brand-primary"
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
                Icon ? "pl-10" : "pl-4"
              )}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              aria-invalid={!!error}
              aria-describedby={error ? errorId : undefined}
              {...props}
            />
          </div>
        </motion.div>
        {error && (
          <p id={errorId} className="mt-1 text-sm text-red-300">
            {error}
          </p>
        )}
      </div>
    );
  }
);
FormInput.displayName = "FormInput";

export { FormInput };
