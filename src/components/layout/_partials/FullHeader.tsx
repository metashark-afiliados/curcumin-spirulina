// src/components/layout/_partials/FullHeader.tsx
/**
 * @file src/components/layout/_partials/FullHeader.tsx
 * @description Subcomponente de presentación puro y de cliente. Renderiza la
 *              variante de navegación completa del header. Gestiona el estado
 *              del menú móvil y su logging de interacción local.
 * @version 3.0.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/layout/_partials/FullHeader.tsx.md
 */
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { clientLogger } from "@/lib/client-logger";
import { Link, type Pathname } from "@/lib/navigation";
import { type LogContext } from "@/lib/types/logging";

interface NavItem {
  href: Pathname;
  label: string;
}

export interface FullHeaderProps {
  navItems: NavItem[];
  ctaButtonText: string;
  brandName: string;
}

export const FullHeader = ({
  navItems,
  ctaButtonText,
  brandName,
}: FullHeaderProps): React.ReactElement => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => {
      const newState = !prev;
      clientLogger.info(
        {
          component: "FullHeader",
          action: "toggleMenu",
          menuState: newState ? "abierto" : "cerrado",
        } as LogContext,
        `Menú móvil ${newState ? "abierto" : "cerrado"}.`
      );
      return newState;
    });
  }, []);

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
          aria-label="Abrir menu de navegación"
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
                  onClick={toggleMenu}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/#order-form"
                className="mt-8 rounded-md bg-brand-accent px-6 py-3 text-lg font-bold text-on_brand shadow-lg"
                onClick={toggleMenu}
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
