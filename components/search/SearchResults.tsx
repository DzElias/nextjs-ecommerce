import ProductCard from 'components/product/ProductCard';
import type { Product } from 'lib/bagisto/types';

interface SearchResultsProps {
  products: Product[];
  activeFilters: Record<string, string[]>;
}

export default function SearchResults({ products, activeFilters }: SearchResultsProps) {
  if (products.length === 0) {
    return (
      <div className="mt-4 rounded-lg border border-purple-100 bg-white p-8 py-12 text-center shadow-sm">
        <h2 className="mb-2 text-xl font-medium text-purple-700">No se encontraron productos</h2>
        <p className="text-gray-600">Intenta ajustar tus criterios de búsqueda o filtros</p>
      </div>
    );
  }

  return (
    <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        // @ts-ignore - Ignoring type mismatch for now
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
