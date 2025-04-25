import AiChatInterface from 'components/ai-chat/AiChatInterface';
import LoadingSpinner from 'components/ai-chat/LoadingSpinner';
import ProductRecommendations from 'components/ai-chat/ProductRecommendations';
import { RecommendationsProvider } from 'components/ai-chat/RecommendationsContext';
import type { Product } from 'lib/bagisto/types';
import { fetchRecommendedProducts } from 'lib/fetchRecommendedProducts';
import Link from 'next/link';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default async function AiChatPage({ searchParams }: { searchParams: { query?: string } }) {
  const userQuery = searchParams.query || '';
  let recommendedProducts: Product[] = [];

  try {
    if (userQuery) {
      recommendedProducts = await fetchRecommendedProducts(decodeURIComponent(userQuery));
    }
  } catch (error) {
    console.error('Error al cargar recomendaciones:', error);
  }

  return (
    <div className="relative mx-auto max-w-6xl px-4 py-8">
      <Link
        href="/"
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md transition-colors hover:bg-gray-50"
        aria-label="Volver a la página principal"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-600"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </Link>

      <RecommendationsProvider initialProducts={recommendedProducts}>
        <div className="mt-8 flex flex-col gap-8 lg:flex-row">
          <div className="w-full lg:w-1/2">
            <Suspense fallback={<LoadingSpinner />}>
              <AiChatInterface initialQuery={decodeURIComponent(userQuery)} />
            </Suspense>
          </div>

          <div className="w-full lg:w-1/2">
            <Suspense fallback={<LoadingSpinner />}>
              <ProductRecommendations />
            </Suspense>
          </div>
        </div>
      </RecommendationsProvider>
    </div>
  );
}
