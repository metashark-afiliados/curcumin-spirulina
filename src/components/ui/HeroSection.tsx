// src/components/ui/HeroSection.tsx
import { useTranslations } from "next-intl";

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 1.0.0
 * @description Componente de servidor que renderiza la sección principal (Hero) de la página.
 *              Es el contenedor principal para el título de la oferta, la imagen del producto
 *              y el formulario de pedido.
 */
export function HeroSection() {
  const t = useTranslations("HeroSection");

  return (
    <section className="relative w-full bg-orange-500 overflow-hidden">
      {/* Placeholder para el patrón de fondo */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 opacity-80"></div>

      <div className="container mx-auto px-4 py-8 md:py-16 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Columna Izquierda: Título e Imagen del Producto */}
          <div className="text-center md:text-left text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-lg">
              {t("title")}
            </h1>
            {/* Placeholder para la imagen del producto y beneficios iconicos */}
            <div className="mt-8">
              {/* Product Image Placeholder */}
              <div className="bg-white/20 h-96 rounded-lg flex items-center justify-center">
                <p className="text-white">Product Image Area</p>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Formulario de Pedido */}
          <div>
            {/* OrderForm Placeholder */}
            <div className="bg-white/10 backdrop-blur-sm h-[500px] rounded-lg flex items-center justify-center border border-white/20">
              <p className="text-white">OrderForm Component Area</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * MEJORA CONTINUA
 *
 * @version 1.0.0
 * ---
 * @section Melhorias Futuras
 *
 * ((Vigente)) @priority High - INTEGRAÇÃO DE COMPONENTES: Substituir os placeholders por componentes reais (`ProductImage`, `OrderForm`) para completar a seção.
 * ((Vigente)) @priority Medium - FUNDO DINÂMICO: Implementar o padrão de fundo com listras diagonais como um componente SVG ou via CSS para replicar fielmente o design.
 *
 * ---
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 1.0.0 - ESTRUTURA RESPONSIVA: O layout utiliza CSS Grid para se adaptar fluidamente de uma única coluna em dispositivos móveis para duas colunas em desktops.
 * ((Implementada)) @version 1.0.0 - CONSUMO DE I18N EM SERVER COMPONENT: O componente consome e renderiza com sucesso o título a partir do seu namespace de i18n atômico, validando a arquitetura IMAS.
 */
