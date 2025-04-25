'use client';

import type { Product } from 'lib/bagisto/types';
import Image from 'next/image';
import Link from 'next/link';
import { useRecommendations } from './RecommendationsContext';

export default function ProductRecommendations() {
  const { products } = useRecommendations();

  if (!products || products.length === 0) {
    return (
      <div className="rounded-2xl border border-purple-100 bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold text-gray-900">Recomendaciones</h2>
        <div className="py-10 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-purple-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-gray-700">Buscando recomendaciones...</h3>
          <p className="text-gray-500">
            Estamos analizando tu consulta para encontrar los mejores regalos.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-lg">
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-4 text-white">
        <h2 className="text-xl font-bold">Recomendaciones para ti</h2>
        <p className="text-sm text-white/80">Basadas en tu consulta</p>
      </div>

      <div className="p-4">
        <h3 className="mb-3 flex items-center font-semibold text-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-5 w-5 text-purple-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
              clipRule="evenodd"
            />
          </svg>
          Mejores opciones
        </h3>

        <div className="grid grid-cols-2 gap-3">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} featured />
          ))}
        </div>

        {products.length > 4 && (
          <>
            <h3 className="mb-3 mt-6 flex items-center font-semibold text-gray-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-5 w-5 text-purple-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              También te puede gustar
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {products.slice(4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function ProductCard({ product, featured = false }: { product: Product; featured?: boolean }) {
  const imageUrl =
    product.images && product.images.length > 0
      ? product.images[0]!.url
      : '/image/placeholder.webp';

  const formatPrice = (price: string | undefined): string => {
    if (!price) return '0.00';

    const cleanPrice = price.replace(/[$€£]/g, '');

    const numPrice = Number.parseFloat(cleanPrice);
    return isNaN(numPrice) ? '0.00' : numPrice.toFixed(2);
  };

  const finalPrice = formatPrice(product.priceHtml?.finalPrice);
  const regularPrice = formatPrice(product.priceHtml?.regularPrice);

  const hasDiscount = Number.parseFloat(regularPrice) > Number.parseFloat(finalPrice);
  const discount = hasDiscount
    ? Math.round(
        ((Number.parseFloat(regularPrice) - Number.parseFloat(finalPrice)) /
          Number.parseFloat(regularPrice)) *
          100
      )
    : 0;

  const productUrl = product.urlKey.startsWith('/') ? product.urlKey : `/product/${product.urlKey}`;

  return (
    <Link
      href={productUrl}
      className={`block overflow-hidden rounded-lg border transition-all duration-300 hover:shadow-md ${
        featured ? 'border-purple-200 bg-purple-50/50' : 'border-gray-200'
      }`}
    >
      <div className="relative aspect-square bg-white">
        {discount > 0 && (
          <div className="absolute left-2 top-2 rounded-full bg-purple-600 px-2 py-1 text-xs font-bold text-white">
            -{discount}%
          </div>
        )}
        <Image
          src={imageUrl || '/placeholder.svg'}
          alt={product.name}
          width={200}
          height={200}
          className="h-full w-full object-contain p-2"
        />
      </div>
      <div className="p-3">
        <h4 className="line-clamp-2 h-10 text-sm font-medium text-gray-800">{product.name}</h4>
        <div className="mt-1 flex items-baseline gap-1">
          <span className="text-sm font-bold text-purple-700">${finalPrice}</span>
          {hasDiscount && (
            <span className="text-xs text-gray-500 line-through">${regularPrice}</span>
          )}
        </div>
        <button className="mt-2 w-full rounded-md bg-purple-600 py-1.5 text-xs font-medium text-white transition-colors hover:bg-purple-700">
          Regalar
        </button>
      </div>
    </Link>
  );
}
