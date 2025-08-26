import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";
import * as React from "react";
import { Input, type InputProps } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 1.0.0
 * @description Componente molecular que ensambla un `Input`, una `Label`
 *              accesible y un ícono en una unidad cohesiva. Diseñado para
 *              integrarse perfectamente con `react-hook-form`.
 */

export interface FormInputProps extends InputProps {
  id: string;
  label: string;
  icon?: LucideIcon;
  containerClassName?: string;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, containerClassName, id, label, icon: Icon, ...props }, ref) => {
    return (
      <div className={cn("relative", containerClassName)}>
        <Label htmlFor={id} className="sr-only">
          {label}
        </Label>
        <div className="relative flex items-center">
          {Icon && (
            <div className="pointer-events-none absolute left-3">
              <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
          )}
          <Input
            id={id}
            className={cn(Icon ? "pl-10" : "pl-4", className)}
            ref={ref}
            {...props}
          />
        </div>
      </div>
    );
  }
);
FormInput.displayName = "FormInput";

export { FormInput };

/**
 * MEJORA CONTINUA
 *
 * @version 1.0.0
 * ---
 * @section Melhorias Futuras
 *
 * ((Vigente)) @priority High - ESTADO DE ERRO EXPLÍCITO: Adicionar uma prop `error?: string` que, quando presente, renderize a mensagem de erro e aplique estilos visuais de erro (ex: borda vermelha) ao input e ao ícone, melhorando o feedback de validação.
 * ((Vigente)) @priority Low - POSIÇÃO DO ÍCONE: Adicionar uma prop `iconPosition?: 'left' | 'right'` para permitir a renderização do ícone no lado direito do campo, aumentando a flexibilidade do componente.
 *
 * ---
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 1.0.0 - COMPONENTE MOLECULAR ENSAMBLADO: Cria um componente reutilizável que combina `Input`, `Label` e `Icon`, seguindo os princípios do Atomic Design.
 * ((Implementada)) @version 1.0.0 - ACESSIBILIDADE GARANTIDA (A11Y): Utiliza uma `Label` associada via `htmlFor`, embora visualmente oculta (`sr-only`), para garantir que os campos de formulário sejam totalmente acessíveis para leitores de tela.
 * ((Implementada)) @version 1.0.0 - INTEGRAÇÃO COM `react-hook-form`: O componente encaminha a `ref` usando `React.forwardRef`, permitindo uma integração direta e robusta com o hook `register`.
 * ((Implementada)) @version 1.0.0 - ÍCONE VISUAL: Integra `lucide-react` para fornecer pistas visuais dentro do campo de entrada, melhorando a experiência do usuário.
 */
