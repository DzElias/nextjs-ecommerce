import type { Product as BaseProduct } from 'lib/bagisto/types'; // Ajusta la ruta según donde esté definido el tipo Product original

// Extender el tipo Product para incluir attributes
export interface ProductWithAttributes extends BaseProduct {
  attributes?: {
    [key: string]: string | string[];
  };
}

// Tipo de utilidad para convertir Product a ProductWithAttributes
export function asProductWithAttributes(product: BaseProduct): ProductWithAttributes {
  return product as ProductWithAttributes;
}
