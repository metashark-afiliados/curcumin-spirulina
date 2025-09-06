// src/components/layout/_partials/FullHeader.tsx
/**
 * @file src/components/layout/_partials/FullHeader.tsx
 * @description Subcomponente de presentación puro y de cliente.
 *              Renderiza la variante de navegación completa del header para las
 *              páginas de contenido (no-landing pages). Gestiona el estado y la
 *              accesibilidad del menú de navegación móvil.
 *              Sincronizado con la SSoT de logging del cliente unificada.
 * @version 2.4.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/layout/_partials/FullHeader.tsx.md
 * @see src/lib/client-logger.ts (SSoT para el logger de cliente)
 * @see src/lib/types/logging.ts (SSoT para `LogContext`)
 */
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
// IMPORTACIÓN CORREGIDA: Añadir useCallback de React.
import { useEffect, useState, useCallback } from "react";
import { clientLogger } from "@/lib/client-logger";
import { Link, type Pathname } from "@/lib/navigation";
import { type LogContext } from "@/lib/types/logging";

/**
 * @interface NavItem
 * @description Define la estructura de un elemento de navegación.
 */
interface NavItem {
  href: Pathname;
  label: string;
}

/**
 * @interface FullHeaderProps
 * @description Propiedades del componente `FullHeader`.
 */
export interface FullHeaderProps {
  /**
   * @property {NavItem[]} navItems - Un array de objetos que definen los enlaces de navegación.
   */
  navItems: NavItem[];
  /**
   * @property {string} ctaButtonText - El texto para el botón principal de llamada a la acción.
   */
  ctaButtonText: string;
  /**
   * @property {string} brandName - El nombre de la marca a mostrar en el header.
   */
  brandName: string;
}

/**
 * @component FullHeader
 * @description Componente de presentación que muestra el header completo con navegación
 *              para páginas de contenido. Incluye un menú móvil y logging de sus interacciones.
 * @param {FullHeaderProps} props - Propiedades del componente.
 * @returns {React.ReactElement}
 */
export const FullHeader = ({
  navItems,
  ctaButtonText,
  brandName,
}: FullHeaderProps): React.ReactElement => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Efecto para controlar el scroll del cuerpo cuando el menú móvil está abierto.
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    // Limpieza: Asegura que el scroll se restablezca al desmontar el componente.
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  /**
   * @private
   * @function toggleMenu
   * @description Alterna el estado del menú móvil y registra la acción.
   */
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => {
      const newState = !prev;
      // USO DE CLIENTLOGGER CORREGIDO: (context, message)
      clientLogger.info(
        {
          component: "FullHeader",
          action: "toggleMenu",
          menuState: newState ? "aberto" : "fechado",
        } as LogContext, // Aserción de tipo
        `[FullHeader] Menú móvil ${newState ? "aberto" : "fechado"}.`
      );
      return newState;
    });
  }, []); // Dependencias vacías para useCallback porque setIsMenuOpen es estable.

  // USO DE CLIENTLOGGER: (context, message)
  clientLogger.trace(
    { component: "FullHeader", currentMenuState: isMenuOpen } as LogContext, // Aserción de tipo
    "Renderizando FullHeader."
  );

  return (
    <div className="container mx-auto flex h-full items-center justify-between">
      <Link href="/" className="text-xl font-bold text-white">
        {brandName}
      </Link>
      <nav className="hidden items-center gap-6 md:flex">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-white/80 transition-colors hover:text-white"
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="hidden items-center md:flex">
        <Link
          href="/#order-form"
          className="rounded-md bg-brand-accent px-4 py-2 text-sm font-bold text-on_brand shadow-lg transition-transform hover:scale-105 hover:bg-brand-accent-hover"
        >
          {ctaButtonText}
        </Link>
      </div>
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="z-50 text-white"
          aria-label="Abrir menu de navegação"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 top-16 z-40 bg-brand-primary-dark p-8 md:hidden"
          >
            <nav className="flex flex-col items-center gap-8 pt-10">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-2xl font-semibold text-white/80 transition-colors hover:text-white"
                  onClick={toggleMenu} // Cierra el menú al hacer clic en un enlace.
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/#order-form"
                className="mt-8 rounded-md bg-brand-accent px-6 py-3 text-lg font-bold text-on_brand shadow-lg"
                onClick={toggleMenu} // Cierra el menú al hacer clic en el CTA.
              >
                {ctaButtonText}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
// src/components/layout/_partials/FullHeader.tsx
