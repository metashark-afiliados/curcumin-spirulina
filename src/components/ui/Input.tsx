// src/components/ui/Input.tsx
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 1.0.0
 * @description Componente de UI atómico y de presentación puro para campos de entrada.
 *              Diseñado para ser accesible, reutilizable y totalmente controlable,
 *              formando la base para todos los campos de formulario en la aplicación.
 */

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-base ring-offset-white placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };

/**
 * MEJORA CONTINUA
 *
 * @version 1.0.0
 * ---
 * @section Melhorias Futuras
 *
 * ((Vigente)) @priority Medium - ESTADO DE ERRO VISUAL: Adicionar uma prop `hasError?: boolean` que aplique classes de estilo de erro (ex: `border-red-500`, `ring-red-500`) para fornecer feedback de validação visual instantâneo.
 *
 * ---
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 1.0.0 - COMPONENTE PURO E CONTROLADO: O `Input` é 100% agnóstico ao conteúdo e estado, recebendo todos os seus atributos através de props.
 * ((Implementada)) @version 1.0.0 - REF FORWARDING: O componente encaminha a `ref`, permitindo uma integração perfeita com `react-hook-form`.
 * ((Implementada)) @version 1.0.0 - ESTILOS DE FOCO ACESSÍVEIS: Utiliza `focus-visible` para fornecer um contorno de foco claro apenas para usuários de teclado.
 */
