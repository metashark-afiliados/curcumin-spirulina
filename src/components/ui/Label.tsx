// src/components/ui/Label.tsx
/**
 * @file src/components/ui/Label.tsx
 * @description Aparato de UI atómico y soberano para etiquetas de formulario.
 *              Obtiene su propio contenido de i18n para la accesibilidad
 *              y proporciona variantes de estado visual. Se adhiere a la API
 *              de logging del cliente unificada para una observabilidad completa.
 * @version 5.1.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/ui/Label.tsx.md
 * @see src/lib/client-logger.ts (SSoT para el logger de cliente)
 * @see src/lib/types/logging.ts (SSoT para `LogContext`)
 */
"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { useTranslations } from "next-intl";
import * as React from "react";
// IMPORTACIÓN CORREGIDA: Apunta a la nueva SSoT del clientLogger
import { clientLogger } from "@/lib/client-logger";
import { type LogContext } from "@/lib/types/logging"; // Importar LogContext
import { cn } from "@/lib/utils";

/**
 * @constant labelVariants
 * @description Define las variantes de estilo para el componente Label
 *              utilizando `class-variance-authority` (cva).
 */
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

/**
 * @interface LabelProps
 * @description Propiedades del componente `Label`.
 * @extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> - Hereda props de la primitiva de Radix Label.
 * @extends VariantProps<typeof labelVariants> - Hereda props de variantes de `cva`.
 */
export interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {
  /**
   * @property {boolean} [required] - Si es `true`, renderiza un asterisco rojo accesible
   *           para indicar que el campo asociado es obligatorio.
   */
  required?: boolean;
}

/**
 * @component Label
 * @description Componente de etiqueta de formulario. Proporciona accesibilidad robusta
 *              y feedback visual para estados (ej., requerido, error).
 *              Es un Client Component.
 * @param {LabelProps} props - Las propiedades para configurar la etiqueta.
 * @returns {React.ReactElement}
 */
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, variant, required, children, ...props }, ref) => {
  const t = useTranslations("components.ui.Label");
  // USO DE CLIENTLOGGER CORREGIDO: (context, message)
  clientLogger.trace(
    {
      component: "Label",
      htmlFor: props.htmlFor,
      variant,
      required,
    } as LogContext, // Forzar el tipo a LogContext para asegurar compatibilidad
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
