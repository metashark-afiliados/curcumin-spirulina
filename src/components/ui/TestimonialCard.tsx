import Image from "next/image";

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 1.1.0
 * @description Componente atómico de UI que muestra un testimonio individual,
 *              incluyendo una imagen de "antes y después", el nombre del autor
 *              y el texto del testimonio. Ahora utiliza URLs para las imágenes.
 */
export interface TestimonialCardProps {
  beforeImageUrl: string;
  afterImageUrl: string;
  author: string;
  text: string;
}

export function TestimonialCard({
  beforeImageUrl,
  afterImageUrl,
  author,
  text,
}: TestimonialCardProps) {
  return (
    <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
      <div className="flex justify-center gap-2">
        <Image
          src={beforeImageUrl}
          alt={`Testimonio de ${author} - Antes`}
          width={200}
          height={300}
          className="h-auto w-1/2 rounded-lg object-cover shadow-lg"
        />
        <Image
          src={afterImageUrl}
          alt={`Testimonio de ${author} - Después`}
          width={200}
          height={300}
          className="h-auto w-1/2 rounded-lg object-cover shadow-lg"
        />
      </div>
      <div className="text-white">
        <h3 className="text-2xl font-bold">{author}</h3>
        <p className="mt-4 text-white/80">{text}</p>
      </div>
    </div>
  );
}

/**
 * MEJORA CONTINUA
 *
 * @version 1.1.0
 * ---
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 1.1.0 - DESACOPLAMENTO DE ASSETS: O componente foi refatorizado para aceitar URLs de imagem (`string`) em vez de objetos `StaticImageData`. Isso resolve o erro de compilação e torna o componente mais flexível, capaz de consumir imagens de um CDN ou de placeholders.
 * ((Implementada)) @version 1.1.0 - DIMENSIONAMENTO EXPLÍCITO DE IMAGEM: Foram adicionadas as props `width` e `height` ao componente `next/image` para garantir a otimização de imagem e prevenir o Cumulative Layout Shift (CLS).
 */