// src/app/select-language/page.tsx
/**
 * @file src/app/select-language/page.tsx
 * @description Página resiliente y accesible para la selección de idioma.
 *              Detecta el idioma preferido, proporciona una cuenta regresiva
 *              con redirección automática, y permite la selección manual.
 *              Valida su propio contenido de internacionalización (`i18n`)
 *              con Zod para garantizar la integridad y resiliencia de la UI.
 *              Se adhiere a la API de logging del cliente unificada para una
 *              observabilidad completa.
 * @version 4.0.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/app/select-language/page.tsx.md
 * @see src/lib/client-logger.ts (SSoT para el logger de cliente)
 * @see src/lib/types/logging.ts (SSoT para `LogContext`)
 * @see src/lib/navigation.ts (SSoT para `defaultLocale`, `locales`)
 * @see src/lib/validators/i18n/SelectLanguage.schema.ts (SSoT para la validación del contenido i18n)
 */
"use client";

import { motion } from "framer-motion";
import { Languages } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState, useId } from "react";

// IMPORTACIÓN CORREGIDA: Apunta a la nueva SSoT del clientLogger
import { clientLogger } from "@/lib/client-logger";
import { defaultLocale, locales } from "@/lib/navigation";
import {
  SelectLanguageContentSchema,
  type SelectLanguageContent,
} from "@/lib/validators/i18n/SelectLanguage.schema"; // Importar schema y tipo
import { type LogContext } from "@/lib/types/logging"; // Importar LogContext

// --- Subcomponentes de Presentación Puros ---

/**
 * @interface CountdownCircleProps
 * @description Propiedades del componente `CountdownCircle`.
 */
interface CountdownCircleProps {
  /**
   * @property {number} countdown - El número actual de segundos restantes en la cuenta regresiva.
   */
  countdown: number;
}

/**
 * @component CountdownCircle
 * @description Componente visual que muestra una cuenta regresiva animada en un círculo SVG.
 * @param {CountdownCircleProps} props - Propiedades del componente.
 * @returns {React.ReactElement}
 */
function CountdownCircle({
  countdown,
}: CountdownCircleProps): React.ReactElement {
  // USO DE CLIENTLOGGER: (context, message)
  clientLogger.trace(
    { component: "CountdownCircle", countdown },
    `Renderizando círculo de cuenta regresiva: ${countdown}.`
  );
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

// --- Orquestador Principal de la Página ---

/**
 * @component SelectLanguagePage
 * @description Página principal para la selección de idioma. Proporciona opciones de idioma
 *              y un contador regresivo para la redirección automática al idioma por defecto.
 *              Incluye validación de contenido i18n y logging de eventos.
 * @returns {React.ReactElement | null} La página de selección de idioma o `null` si falla
 *                                    la validación del contenido de internacionalización.
 */
export default function SelectLanguagePage(): React.ReactElement | null {
  const t = useTranslations("app.selectLanguage");
  const pageTitleId = useId(); // ID para la accesibilidad del título de la página.
  const [countdown, setCountdown] = useState(5);
  const router = useRouter();
  const cookies = useCookies();

  let content: SelectLanguageContent;
  const fallbackContent: SelectLanguageContent = {
    title: "Select Your Language",
    countdownText: "Redirecting automatically in {seconds} seconds...",
    selectLanguageAriaLabel: "Select language: {language}",
    languages: {
      "it-IT": "Italiano",
      "en-US": "English (US)",
      "es-ES": "Español",
      "pt-BR": "Português (BR)",
    },
  };

  try {
    const rawContent = t.raw(""); // Obtenemos todo el namespace para validación.
    const validation = SelectLanguageContentSchema.safeParse(rawContent);
    if (!validation.success) {
      // USO DE CLIENTLOGGER CORREGIDO: (context, message)
      clientLogger.error(
        {
          component: "SelectLanguagePage",
          error: validation.error.flatten(),
          rawContent,
        },
        "Validação de conteúdo de SelectLanguagePage falhou. Usando fallbacks."
      );
      content = fallbackContent; // Usa contenido de fallback si la validación falla.
    } else {
      content = validation.data;
    }
  } catch (error) {
    // USO DE CLIENTLOGGER CORREGIDO: (context, message)
    clientLogger.error(
      { error, component: "SelectLanguagePage" } as LogContext, // Aserción de tipo para LogContext
      "Erro ao obter conteúdo de SelectLanguagePage. Usando fallbacks."
    );
    content = fallbackContent; // Fallback en caso de errores inesperados de i18n.
  }

  /**
   * @private
   * @function handleLanguageSelect
   * @description Manejador para la selección de idioma del usuario.
   *              Establece la cookie de locale y redirige a la página principal.
   * @param {string} locale - El código de locale seleccionado (ej. "en-US").
   */
  const handleLanguageSelect = useCallback(
    (locale: string) => {
      // USO DE CLIENTLOGGER CORREGIDO: (context, message)
      clientLogger.info(
        { component: "SelectLanguagePage", selectedLocale: locale },
        "Idioma seleccionado por el usuario. Estableciendo cookie y redirigiendo."
      );
      cookies.set("NEXT_LOCALE", locale, { path: "/", expires: 365 });
      router.push("/");
    },
    [cookies, router]
  );

  // Efecto para gestionar el contador regresivo y la redirección automática.
  useEffect(() => {
    if (countdown === 0) {
      // USO DE CLIENTLOGGER CORREGIDO: (context, message)
      clientLogger.warn(
        { component: "SelectLanguagePage", defaultLocale },
        "Temporizador de selección de idioma expirado. Redireccionando al locale por defecto."
      );
      handleLanguageSelect(defaultLocale);
      return;
    }

    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, handleLanguageSelect]);

  // USO DE CLIENTLOGGER CORREGIDO: (context, message)
  clientLogger.trace(
    { component: "SelectLanguagePage", currentCountdown: countdown },
    "Renderizando página de selección de idioma."
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-brand-primary-dark p-8 text-center text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-lg border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-md"
      >
        <Languages className="mx-auto h-12 w-12 text-brand-accent" />
        <h1 id={pageTitleId} className="mt-4 text-3xl font-bold">
          {content.title}
        </h1>

        <div className="my-8 flex flex-col items-center gap-4">
          <CountdownCircle countdown={countdown} />
          <p className="text-sm text-white/70">
            {content.countdownText.replace("{seconds}", String(countdown))}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {locales.map((locale) => (
            <button
              key={locale}
              onClick={() => handleLanguageSelect(locale)}
              aria-label={content.selectLanguageAriaLabel.replace(
                "{language}",
                content.languages[locale] || locale
              )}
              className="rounded-md bg-white/10 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/20"
            >
              {content.languages[locale]}
            </button>
          ))}
        </div>
      </motion.div>
    </main>
  );
}
// src/app/select-language/page.tsx
