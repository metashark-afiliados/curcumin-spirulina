import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";
import * as React from "react";
import { Input, type InputProps } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

export interface FormInputProps extends InputProps {
  id: string;
  label: string;
  icon?: LucideIcon;
  containerClassName?: string;
  error?: string;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, containerClassName, id, label, icon: Icon, error, ...props }, ref) => {
    const errorId = `${id}-error`;
    return (
      <div className={cn("relative", containerClassName)}>
        <Label htmlFor={id} className="sr-only">
          {label}
        </Label>
        <div className="relative flex items-center">
          {Icon && (
            <div className="pointer-events-none absolute left-3">
              <Icon
                className={cn(
                  "h-5 w-5 text-gray-400",
                  error && "text-feedback-error" // Ícono también cambia de color
                )}
                aria-hidden="true"
              />
            </div>
          )}
          <Input
            id={id}
            className={cn(Icon ? "pl-10" : "pl-4", className)}
            ref={ref}
            hasError={!!error}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            {...props}
          />
        </div>
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