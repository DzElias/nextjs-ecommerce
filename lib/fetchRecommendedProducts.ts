import type { ImageInfo, Product } from './bagisto/types';

export async function fetchRecommendedProducts(userMessage: string): Promise<Product[]> {
  try {
    // Construir una URL absoluta
    const baseUrl =
      process.env.NEXT_PUBLIC_API_URL ||
      (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');

    // Asegurarse de que la URL esté correctamente formateada
    const apiUrl = new URL('/api/ai-recommendations', baseUrl).toString();

    console.log('Llamando a la API en:', apiUrl);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage }),
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`Error en la API: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Verificar que la respuesta contiene productos
    if (!data.products || !Array.isArray(data.products)) {
      console.warn('La respuesta de la API no contiene una lista de productos válida:', data);
      return [];
    }

    // Definir el tipo correcto de `p` basado en la respuesta
    const formattedProducts: Product[] = data.products.map((p: any) => ({
      id: p.id || '0',
      name: p.name || 'Producto sin nombre',
      description: p.description || 'Sin descripción.',
      priceHtml: {
        // Asegurarse de que los precios sean strings sin símbolos de moneda
        finalPrice:
          typeof p.priceHtml?.finalPrice === 'string'
            ? p.priceHtml.finalPrice.replace(/[$€£]/g, '')
            : '0',
        regularPrice:
          typeof p.priceHtml?.regularPrice === 'string'
            ? p.priceHtml.regularPrice.replace(/[$€£]/g, '')
            : '0',
        currencyCode: p.priceHtml?.currencyCode || 'PYG'
      },
      images:
        p.images && p.images.length > 0
          ? p.images.map((img: ImageInfo) => ({ url: img.url }))
          : [{ url: '/image/placeholder.webp' }], // Imagen de fallback
      urlKey: p.urlKey || `product-${p.id}`
    }));

    return formattedProducts; // Retornar productos formateados como `Product[]`
  } catch (error) {
    console.error('Error al obtener productos recomendados:', error);
    return []; // Retornar un array vacío en caso de error
  }
}
