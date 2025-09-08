// src/components/shared/FullScreenError.tsx
/**
 * @file src/components/shared/FullScreenError.tsx
 * @description Aparato de UI de presentación atómico. Refactorizado para
 *              aceptar un nombre de ícono como string en lugar de un
 *              componente, resolviendo el error de serialización de RSC.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 3.1.0
 */
"use client";

import { ServerCrash, TriangleAlert, type LucideIcon } from "lucide-react";
import React from "react";

import { clientLogger } from "@/lib/client-logger";
import { cn } from "@/lib/utils";

// MEJORA: Se crea un mapa para renderizar el ícono en el cliente.
const iconMap: Record<string, LucideIcon> = {
  TriangleAlert: TriangleAlert,
  ServerCrash: ServerCrash,
};

export type IconName = keyof typeof iconMap;

export interface FullScreenErrorProps {
  // CORRECCIÓN: La prop ahora es el nombre del ícono.
  iconName: IconName;
  title: string;
  description: string;
  actionSlot: React.ReactNode;
  iconClassName?: string;
}

export function FullScreenError({
  iconName,
  title,
  description,
  actionSlot,
  iconClassName,
}: FullScreenErrorProps): React.ReactElement {
  // CORRECCIÓN: Se busca el componente del ícono en el mapa.
  const Icon = iconMap[iconName] || TriangleAlert; // Fallback seguro.

  clientLogger.trace(
    { component: "FullScreenError" },
    "Renderizando layout de error a pantalla completa."
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-brand-base-green-dark p-8 text-center">
      <Icon className={cn("h-24 w-24 text-feedback-error", iconClassName)} />
      <h1 className="mt-8 text-6xl font-extrabold tracking-tight text-white">
        {title}
      </h1>
      <p className="mt-4 max-w-md text-lg text-white/80">{description}</p>
      <div className="mt-12">{actionSlot}</div>
    </main>
  );
}
// src/components/shared/FullScreenError.tsx
