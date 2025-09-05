// .docs-espejo/components/ui/TestimonialCard.tsx.md
/\*\*

- @file .docs-espejo/components/ui/TestimonialCard.tsx.md
- @description Documento Espejo y SSoT conceptual para el aparato TestimonialCard.
- @author RaZ Podestá - MetaShark Tech
- @version 1.0.0
  \*/

# Manifiesto Conceptual: Aparato `TestimonialCard`

## 1. Rol Estratégico y Propósito

Este aparato es un **organismo de UI de prueba social y construcción de confianza**. Su único propósito es presentar el testimonio de un cliente de una manera auténtica, creíble y visualmente atractiva.

Estratégicamente, no solo busca persuadir al usuario, sino también **mejorar el SEO** al inyectar datos estructurados de `Review` (Schema.org). Esto puede resultar en la aparición de "rich snippets" (estrellas de valoración) directamente en los resultados de búsqueda de Google, aumentando drásticamente la tasa de clics (CTR).

## 2. Arquitectura y Flujo de Ejecución

Es un **Componente de Cliente (`"use client"`) de presentación 100% puro**. Es cliente para poder usar el `SchemaInjector` (que utiliza un hook `useEffect` internamente) y para futuras interacciones.

```mermaid
graph TD
    A[Componente Padre (ej. `TestimonialsSection`)] -- "Pasa props (`TestimonialData`)" --> B["`TestimonialCard.tsx`"];
    B -- "Usa `props` para llamar a" --> C["`generateReviewSchema()`"];
    C -- "Retorna objeto JSON-LD" --> B;
    B -- "Pasa schema a" --> D["`SchemaInjector`"];
    D -- "Renderiza `<script>` en el DOM" --> E[HTML Head];
    B -- "Renderiza el resto de la UI" --> F[HTML del Card];
3. Contrato de API
Props de Entrada (TestimonialData):
imageUrl: string: URL de la imagen del cliente.
author: string: Nombre del cliente.
location: string: Ubicación del cliente.
rating: number: Valoración de 1 a 5.
title: string: Título o titular de la reseña.
text: string: El cuerpo del testimonio.
4. Zona de Melhorias Futuras
BADGE DE "CLIENTE VERIFICADO": Añadir una prop isVerified?: boolean que renderice un pequeño "sello" de "Cliente Verificado" sobre la imagen para aumentar aún más la percepción de autenticidad.
ANIMACIÓN DE ENTRADA DE ESTRELLAS: Animar las estrellas para que se "iluminen" una a una cuando el componente entre en el viewport, creando un micro-momento de deleite visual.
MODAL DE VIDEO TESTIMONIO: Al hacer clic en la tarjeta, podría abrirse un modal para reproducir un video testimonio del cliente, si se proporciona una videoUrl.
DOCUMENTACIÓN EN ESPAÑOL: Traducir este documento espejo al español.
VARIANTES DE LAYOUT (cva): Crear variantes para diferentes disposiciones (ej. image-top, condensed) para adaptarse a distintos contextos de UI.
PRUEBAS DE INTEGRACIÓN DE SCHEMA: Crear pruebas que rendericen el componente y luego verifiquen que la etiqueta <script type="application/ld+json"> se ha inyectado en el document.head con el contenido correcto.
SOPORTE PARA AVATAR GENERADO: Si imageUrl no se proporciona, generar un avatar con las iniciales del autor, similar al AvatarFallback de Radix.
FECHA DE LA RESEÑA: Añadir una prop date: string y mostrarla en la tarjeta, lo que también enriquece el Review schema.
ENLACE AL PERFIL DEL CLIENTE: Permitir una prop profileUrl?: string que convierta el nombre del autor en un enlace.
INTERACCIÓN DE "VOTO ÚTIL": Añadir botones de "pulgar arriba/abajo" que, al hacer clic, invoquen una Server Action para registrar el feedback sobre la utilidad del testimonio.
// .docs-espejo/components/ui/TestimonialCard.tsx.md
```
