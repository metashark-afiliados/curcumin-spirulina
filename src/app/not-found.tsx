// src/app/not-found.tsx
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 1.0.0
 * @description Página 404 estática y localizada. Utiliza un locale por defecto
 *              y `unstable_setRequestLocale` para ser compatible con la
 *              generación de sitios estáticos (SSG).
 */
export default function NotFoundPage() {
  // NOTA: Se usa 'it-IT' como locale por defecto para la página 404 estática.
  // Esto es una decisión de diseño para el build; en una navegación normal,
  // el middleware redirigirá al locale correcto.
  unstable_setRequestLocale("it-IT");
  const t = useTranslations("components.ui.OrderForm"); // Reutilizamos un namespace existente

  return (
    <html lang="it-IT">
      <body>
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-brand-primary to-brand-primary-dark text-white">
          <h1 className="text-6xl font-bold">404</h1>
          <p className="mt-4 text-2xl">Pagina non trovata</p>
          <a
            href="/it-IT"
            className="mt-8 rounded-md bg-white px-6 py-3 font-semibold text-brand-primary-dark transition hover:bg-white/90"
          >
            Torna alla Home
          </a>
        </main>
      </body>
    </html>
  );
}
