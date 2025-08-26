import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 1.0.0
 * @description Componente atómico de UI que muestra una tarjeta de ciclo de
 *              tratamiento con un número de días, título y descripción.
 *              Utiliza `cva` para manejar variantes visuales.
 */

const cardVariants = cva(
  "flex h-24 w-24 items-center justify-center rounded-full border-4 font-bold text-3xl",
  {
    variants: {
      variant: {
        default: "border-yellow-400 bg-yellow-300 text-yellow-800",
        success: "border-green-600 bg-green-500 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface TreatmentCycleCardProps
  extends VariantProps<typeof cardVariants> {
  className?: string;
  days: number;
  title: string;
  description: string;
}

export function TreatmentCycleCard({
  className,
  variant,
  days,
  title,
  description,
}: TreatmentCycleCardProps) {
  return (
    <div className={cn("text-center", className)}>
      <div className="flex justify-center">
        <div className={cn(cardVariants({ variant }))}>{days}</div>
      </div>
      <h3 className="mt-4 font-bold text-xl text-white">{title}</h3>
      <p className="mt-2 text-white/80">{description}</p>
    </div>
  );
}

/**
 * MEJORA CONTINUA
 *
 * @version 1.0.0
 * ---
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 1.0.0 - ARQUITECTURA DE VARIANTES (CVA): Utiliza `class-variance-authority` para gestionar los estilos de las variantes (ej. color), creando un componente atómico verdaderamente reutilizable y desacoplado.
 * ((Implementada)) @version 1.0.0 - ATOMICIDAD RADICAL: Componente autocontenido y enfocado en una única responsabilidad, listo para ser ensamblado.
 */
