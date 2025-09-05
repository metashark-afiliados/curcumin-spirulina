// src/app/select-language/page.tsx
/**
 * @file page.tsx
 * @description Página de selección de idioma. Se muestra a los usuarios
 *              nuevos cuyo idioma no puede ser detectado automáticamente.
 *              Incluye un temporizador con redirección automática.
 * @version 1.2.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/app/select-language/page.tsx.md
 */
"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Languages } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { useCookies } from "next-client-cookies";
import { defaultLocale, locales } from "@/lib/navigation";
import { clientLogger } from "@/lib/logger";

/**
 * @interface CountdownCircleProps
 * @description Contrato de props para el componente atómico CountdownCircle.
 */
interface CountdownCircleProps {
  /** El número actual de la cuenta regresiva a mostrar. */
  countdown: number;
}

/**
 * @private
 * @component CountdownCircle
 * @description Componente de UI atómico y de presentación puro que renderiza
 *              un círculo de cuenta regresiva animado con SVG.
 * @param {CountdownCircleProps} props - Las propiedades del componente.
 * @returns {React.ReactElement}
 */
function CountdownCircle({ countdown }: CountdownCircleProps): React.ReactElement {
  return (
    <div className="relative h-24 w-24">
      <svg className="h-full w-full" viewBox="0 0 100 100">
        <circle
          className="stroke-current text-white/10"
          strokeWidth="10"
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
        />
        <motion.circle
          className="stroke-current text-brand-accent"
          strokeWidth="10"
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
          strokeLinecap="round"
          pathLength="1"
          initial={{ pathLength: 1, rotate: -90 }}
          animate={{ pathLength: 0 }}
          transition={{ duration: 5, ease: "linear" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-white">
        {countdown}
      </div>
    </div>
  );
}

/**
 * @public
 * @page SelectLanguagePage
 * @description Orquesta la lógica para la selección manual de idioma del usuario.
 * @returns {React.ReactElement}
 */
export default function SelectLanguagePage(): React.ReactElement {
  const t = useTranslations("app.selectLanguage");
  const [countdown, setCountdown] = useState(5);
  const router = useRouter();
  const cookies = useCookies();

  const handleLanguageSelect = useCallback(
    (locale: string) => {
      clientLogger.info({ locale }, "Idioma seleccionado.");
      cookies.set("NEXT_LOCALE", locale, { path: "/", expires: 365 });
      router.push("/");
    },
    [cookies, router]
  );

  useEffect(() => {
    if (countdown === 0) {
      clientLogger.warn(
        "Temporizador de selección de idioma expirado. Redireccionando al default."
      );
      handleLanguageSelect(defaultLocale);
      return;
    }

    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, handleLanguageSelect]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-brand-primary-dark p-8 text-center text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-lg border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-md"
      >
        <Languages className="mx-auto h-12 w-12 text-brand-accent" />
        <h1 className="mt-4 text-3xl font-bold">{t("title")}</h1>

        <div className="my-8 flex flex-col items-center gap-4">
          <CountdownCircle countdown={countdown} />
          <p className="text-sm text-white/70">
            {t("countdownText", { seconds: countdown })}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {locales.map((locale) => (
            <button
              key={locale}
              onClick={() => handleLanguageSelect(locale)}
              aria-label={t("selectLanguageAriaLabel", {
                language: t(`languages.${locale}`),
              })}
              className="rounded-md bg-white/10 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/20"
            >
              {t(`languages.${locale}`)}
            </button>
          ))}
        </div>
      </motion.div>
    </main>
  );
}
// src/app/select-language/page.tsx