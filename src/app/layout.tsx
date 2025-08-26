import { NextIntlClientProvider, useMessages } from "next-intl";
import { Toaster } from "react-hot-toast";

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 2.0.0
 * @description Layout específico del locale. Su responsabilidad es configurar
 *              los proveedores de contexto para i18n y notificaciones,
 *              garantizando que estén disponibles para todos los Client Components.
 */
export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = useMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
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
 * @version 2.0.0
 * ---
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 2.0.0 - ARQUITECTURA DE PROVEEDORES DE ÉLITE: Implementa el patrón canónico para `next-intl` en el App Router, utilizando `NextIntlClientProvider` para hacer disponibles los mensajes a los Client Components.
 * ((Implementada)) @version 2.0.0 - INTEGRACIÓN DE FEEDBACK DE USUARIO: Se ha añadido el componente `<Toaster />` de `react-hot-toast`, estableciendo la infraestructura necesaria para mostrar notificaciones en toda la aplicación.
 * ((Implementada)) @version 2.0.0 - CORRECCIÓN ESTRUCTURAL: Este archivo ahora cumple su propósito como un layout de locale, manejando la etiqueta `<html>` y `<body>` y delegando el contenido a sus `children`.
 */
