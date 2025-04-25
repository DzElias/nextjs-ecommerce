import { getCollectionProducts } from 'lib/bagisto';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const homepageItems = await getCollectionProducts({ collection: '' });

    if (!homepageItems || homepageItems.length === 0) {
      return NextResponse.json({ message: 'No hay productos disponibles.', products: [] });
    }

    const productList = homepageItems.map((p) => {
      return {
        id: p.id,
        name: p.name,
        description: p.description || 'Sin descripción.',
        priceHtml: {
          finalPrice: p.priceHtml?.finalPrice || '0',
          regularPrice: p.priceHtml?.regularPrice || '0',
          currencyCode: p.priceHtml?.currencyCode || 'PYG'
        },
        images:
          p.images && p.images.length > 0
            ? [{ url: p.images[0]!.url }]
            : [{ url: 'https://via.placeholder.com/150' }],
        urlKey: p.urlKey
      };
    });

    const productText = productList
      .map(
        (p) => `
        ID: ${p.id}
        Nombre: ${p.name}
        Descripción: ${p.description}
        Precio final: ${p.priceHtml.finalPrice} ${p.priceHtml.currencyCode}
        Precio regular: ${p.priceHtml.regularPrice} ${p.priceHtml.currencyCode}
        URL: /product/${p.urlKey}
        Imagen: ${p.images[0]!.url}
      `
      )
      .join('\n');

    const prompt = `
      Eres un asistente experto en regalos. Aquí tienes una lista de productos disponibles en la tienda:

      ${productText}

      Basado en la siguiente consulta del usuario, sugiere hasta 5 mejores productos (elige solo las que son compatibles con la consulta del usuario) y explica por qué son buenas opciones en el message.

      "${message}"

      Devuelve solo un JSON puro, sin texto adicional, en este formato exacto:

      {
        "message": "Texto con la explicación de la recomendación.",
        "products": [
          { 
            "id": "7", 
            "name": "Soporte Magnético para Celular", 
            "priceHtml": {
              "finalPrice": "$12.99",
              "regularPrice": "$12.99",
              "currencyCode": "USD"
            },
            "images": [{ "url": "https://tu-dominio.com/images/soporte-magnetico.jpg" }],
            "urlKey": "soporte-magnetico-celular"
          }
        ]
      }
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'system', content: prompt }],
      temperature: 0.7
    });

    let completionContent = response.choices?.[0]?.message?.content;
    if (!completionContent) {
      throw new Error('La respuesta de OpenAI no contiene un mensaje válido.');
    }

    completionContent = completionContent.replace(/```json|```/g, '').trim();

    const recommendations = JSON.parse(completionContent);

    return NextResponse.json(recommendations);
  } catch (error) {
    console.error('Error en la API de recomendaciones:', error);
    return NextResponse.json({
      message: 'Hubo un problema al obtener recomendaciones.',
      products: []
    });
  }
}
