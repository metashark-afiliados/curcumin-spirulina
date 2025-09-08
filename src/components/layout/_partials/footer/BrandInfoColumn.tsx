// src/components/layout/_partials/footer/BrandInfoColumn.tsx
/**
 * @file BrandInfoColumn.tsx
 * @description Subcomponente de presentación puro para el Footer. Muestra
 *              la información de la marca y los enlaces a redes sociales.
 *              Corregido para manejar de forma resiliente la posible ausencia
 *              de un ícono en el `iconMap`, resolviendo el error TS2604/TS2786.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 */
"use client";

import {
  Facebook,
  Instagram,
  Mail,
  Twitter,
  type LucideIcon,
} from "lucide-react";
import { type FooterContent } from "@/lib/validators/i18n/Footer.schema";

const iconMap: Record<string, LucideIcon> = {
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
};

type BrandInfoColumnProps = Pick<
  FooterContent,
  "brandName" | "brandDescription" | "contact" | "socialLinks"
>;

export function BrandInfoColumn({
  brandName,
  brandDescription,
  contact,
  socialLinks,
}: BrandInfoColumnProps): React.ReactElement {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white">{brandName}</h3>
      <p className="text-sm">{brandDescription}</p>
      <a
        href={`mailto:${contact.email}`}
        className="inline-flex items-center gap-2 transition-colors hover:text-white"
      >
        <Mail size={16} />
        <span>{contact.email}</span>
      </a>
      {socialLinks && socialLinks.length > 0 && (
        <div className="flex items-center gap-4 pt-2">
          {socialLinks.map((link) => {
            const Icon = iconMap[link.icon];
            // CORRECCIÓN: Si el ícono no se encuentra en el mapa, no se renderiza nada
            // para este enlace, evitando el error de renderizado.
            if (!Icon) return null;

            return (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                className="text-white/70 transition-colors hover:text-white"
              >
                <Icon size={20} />
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
// src/components/layout/_partials/footer/BrandInfoColumn.tsx
