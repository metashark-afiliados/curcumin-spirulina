import { type LucideIcon } from "lucide-react";

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 1.0.0
 * @description Componente atómico de UI que muestra un beneficio específico
 *              con un ícono, título y subtítulo en un contenedor estilo "píldora".
 */
export interface BenefitPillProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
}

export function BenefitPill({ icon: Icon, title, subtitle }: BenefitPillProps) {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-brand-border bg-white/90 p-4 shadow-md backdrop-blur-sm">
      <div className="flex-shrink-0">
        <Icon className="h-10 w-10 text-brand-primary" />
      </div>
      <div>
        <h3 className="font-bold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>
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
 * ((Implementada)) @version 1.0.0 - ATOMICIDAD RADICAL: Este componente es una pieza de LEGO perfecta: autocontenido, reutilizable y enfocado en una única responsabilidad, listo para ser ensamblado en cualquier layout.
 * ((Implementada)) @version 1.0.0 - CONSUMO DEL MANIFIESTO DE BRANDING: Utiliza `brand-primary` y `brand-border` del `tailwind.config.ts`, asegurando la consistencia visual.
 */
