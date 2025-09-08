// src/app/select-language/page.tsx
/**
 * @file src/app/select-language/page.tsx
 * @description Página de fallback minimalista para la selección de idioma.
 *              Su única función es permitir al usuario seleccionar un idioma o
 *              redirigir automáticamente tras un temporizador.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 3.0.0
 * @see .docs-espejo/app/select-language/page.tsx.md
 */
"use client";

import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { clientLogger } from "@/lib/client-logger";
import { locales, type AppLocale } from "@/lib/navigation";

const COUNTDOWN_SECONDS = 5;

// MEJORA: El contenido es ahora una constante local, eliminando la
// complejidad de la carga y validación asíncrona.
const content = {
  "it-IT": "Italiano",
  "en-US": "English (US)",
  "es-ES": "Español",
  "pt-BR": "Português (BR)",
};

export default function SelectLanguagePage(): React.ReactElement {
  const router = useRouter();
  const cookies = useCookies();
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);

  // LÓGICA: El temporizador de redirección automática se mantiene.
  useEffect(() => {
    if (countdown <= 0) {
      clientLogger.info(
        "[SelectLanguagePage]",
        "Temporizador finalizado. Redirigiendo al locale por defecto."
      );
      router.push("/");
      return;
    }
    const timerId = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearTimeout(timerId);
  }, [countdown, router]);

  // LÓGICA: La selección manual de idioma se mantiene.
  const handleLanguageSelect = (locale: AppLocale) => {
    clientLogger.info(
      "[SelectLanguagePage]",
      `Usuario seleccionó el idioma: ${locale}.`
    );
    cookies.set("NEXT_LOCALE", locale, { path: "/", expires: 365 });
    router.push("/");
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-brand-base-green-dark p-4 text-center text-white">
      <div className="my-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {locales.map((locale) => (
          <button
            key={locale}
            onClick={() => handleLanguageSelect(locale)}
            className="rounded-md border border-white/20 bg-white/10 px-6 py-3 font-semibold transition-colors hover:bg-white/20"
          >
            {content[locale]}
          </button>
        ))}
      </div>
    </main>
  );
}
// src/app/select-language/page.tsx
