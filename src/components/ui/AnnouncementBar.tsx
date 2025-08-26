import { getTranslations } from "next-intl/server";
import { Flame } from "lucide-react"; // Usaremos un ícono para añadir un toque visual

/**
 * @author L.I.A. Legacy & Gemini
 * @version 2.0.0
 * @description Componente de UI de producción. Muestra una barra de anuncios
 *              con scroll infinito. Diseñada con un gradiente sutil,
 *              tipografía elegante y efectos visuales para añadir
 *              profesionalismo y profundidad al diseño de la página.
 */
export async function AnnouncementBar() {
  const t = await getTranslations("components.ui.AnnouncementBar");
  const message = t("message");

  // Un contenedor para el contenido que se animará, con el mensaje duplicado
  // para un efecto de bucle perfecto.
  const ScrollingContent = () => (
    <div className="flex animate-infinite-scroll whitespace-nowrap">
      <div className="flex items-center">
        <Flame className="mx-6 h-4 w-4 flex-shrink-0 text-yellow-300" />
        <p className="[text-shadow:0_1px_2px_rgba(0,0,0,0.6)]">{message}</p>
      </div>
      <div className="flex items-center">
        <Flame className="mx-6 h-4 w-4 flex-shrink-0 text-yellow-300" />
        <p className="[text-shadow:0_1px_2px_rgba(0,0,0,0.6)]">{message}</p>
      </div>
    </div>
  );

  return (
    <div className="w-full overflow-hidden bg-gradient-to-r from-brand-accent to-red-800 py-3 text-sm font-medium italic text-white shadow-lg">
      <ScrollingContent />
    </div>
  );
}
