// src/app/[locale]/layout.tsx
import { NextIntlClientProvider, useMessages } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

import { locales } from "@/lib/navigation";
import { pick } from "@/lib/utils";
import "@/app/globals.css";

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 2.4.0
 * @description Layout específico del locale. Habilita la renderización estática
 *              y configura los proveedores de contexto, tipografía y estilos.
 */

const inter = Inter({ subsets: ["latin"] });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const messages = useMessages();

  // Extraer solo los mensajes para Client Components
  const clientComponentMessages = pick(messages, [
    "components.ui.OrderForm",
    "components.ui.TestimonialsSection",
  ]);

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider
          locale={locale}
          messages={clientComponentMessages}
        >
          {children}
          <Toaster position="top-center" />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

/**
 * MEJORA CONTINUA
 *
 * @version 2.4.0
 * ---
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 2.4.0 - ENTREGA DE MENSAGENS CIRÚRGICA: O layout agora utiliza um helper `pick` para extrair e passar ao `NextIntlClientProvider` apenas os namespaces de mensagens que são consumidos por Client Components. Esta é a correção arquitetônica definitiva que resolve o erro de build `MISSING_MESSAGE`, garantindo que os Client Components recebam os dados na estrutura esperada, sem sobrecarregar o payload do cliente.
 */
