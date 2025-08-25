// src/app/[locale]/page.tsx
import { HeroSection } from "@/components/ui/HeroSection";

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 1.1.0
 * @description Página de inicio (Landing Page). Este Server Component orquestará
 *              y ensamblará todos los componentes atómicos que conforman la página.
 */
export default function HomePage() {
  return (
    <main>
      <HeroSection />
      {/* O resto dos componentes da página serão adicionados aqui */}
    </main>
  );
}

/**
 * MEJORA CONTINUA
 *
 * @version 1.1.0
 * ---
 * @section Melhorias Futuras
 *
 * ((Vigente)) @priority High - ENSAMBLAJE COMPLETO: Continuar o ensamblaje adicionando os componentes `BenefitsSection`, `InfoSection`, etc., para construir a página completa.
 *
 * ---
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 1.1.0 - ENSAMBLAJE DE PRIMEIRO COMPONENTE: A página agora monta o componente `HeroSection`, iniciando a construção da UI real da landing page.
 * ((Implementada)) @version 1.0.0 - CONSUMO DE I18N EM SERVER COMPONENT: A página demonstra o padrão canônico de consumo de traduções.
 */
