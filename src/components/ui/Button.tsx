// src/components/ui/Button.tsx
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils"; // Nota: Este helper se creará en el siguiente paso.

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 1.0.0
 * @description Define as variantes de estilo para o componente Button usando class-variance-authority.
 *              Isso permite uma combinação atômica e reutilizável de estilos.
 */
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

/**
 * @interface ButtonProps
 * @extends React.ButtonHTMLAttributes<HTMLButtonElement>
 * @extends VariantProps<typeof buttonVariants>
 * @property {boolean} [asChild=false] - Se true, renderiza o componente como um filho direto,
 *                                      passando as props para ele. Útil para wrappers como `next/link`.
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

/**
 * @component Button
 * @description Um componente de botão atômico e altamente reutilizável com variantes de estilo e tamanho.
 *              Construído com base nos princípios de atomicidade e reutilização.
 * @param {ButtonProps} props - As propriedades do componente.
 * @returns {React.ReactElement} O componente de botão renderizado.
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

/**
 * MEJORA CONTINUA
 *
 * @version 1.0.0
 *
 * ---
 *
 * @section Melhorias Futuras
 *
 * ((Vigente)) @priority Low - LOADING STATE: Adicionar uma variante visual para o estado de "carregando" (loading), que poderia exibir um ícone de spinner e desabilitar o botão, melhorando o feedback ao usuário durante operações assíncronas.
 * ((Vigente)) @priority Medium - POLYMORPHIC `as` PROP: Expandir a prop `asChild` para uma prop `as` mais flexível, permitindo renderizar o botão como qualquer elemento HTML (ex: `div`, `span`) para casos de uso semânticos mais complexos.
 *
 * ---
 *
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 1.0.0 - CVA INTEGRATION: Utilização de `class-variance-authority` para criar um sistema de variantes de estilo e tamanho robusto e escalável, eliminando a necessidade de classes condicionais complexas.
 * ((Implementada)) @version 1.0.0 - `asChild` PROP: Inclusão da propriedade `asChild` com `@radix-ui/react-slot` para permitir a composição com outros componentes (como `next/link`) sem quebrar a estilização, garantindo flexibilidade máxima.
 * ((Implementada)) @version 1.0.0 - REF FORWARDING: O componente encaminha a `ref`, permitindo que componentes pais acessem o nó do DOM do botão subjacente, o que é crucial para integrações com formulários e animações.
 *
 */
