// src/components/ui/Label.tsx
"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 1.0.0
 * @description Componente de UI atómico y de presentación puro para etiquetas de formulario.
 *              Construido sobre Radix UI para una accesibilidad de élite garantizada.
 */

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };

/**
 * MEJORA CONTINUA
 *
 * @version 1.0.0
 * ---
 * @section Melhorias Futuras
 *
 * ((Vigente)) @priority Low - INDICADOR DE OBRIGATORIEDADE: Adicionar uma prop `required?: boolean` que renderize um asterisco visualmente distinto ao lado da etiqueta para indicar que o campo associado é obrigatório.
 *
 * ---
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 1.0.0 - FUNDAÇÃO DE ACESSIBILIDADE (A11Y): Utiliza `Radix UI Label` como base, garantindo que a associação com campos de formulário (`htmlFor`) seja tratada de forma robusta e acessível.
 * ((Implementada)) @version 1.0.0 - ESTILIZAÇÃO VIA CVA: Utiliza `class-variance-authority` para definir os estilos base, permitindo futuras expansões com variantes de estilo de forma limpa e escalável.
 */
