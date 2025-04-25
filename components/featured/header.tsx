import { BookmarkIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export function FeaturedHeader() {
  return (
    <div className="w-full px-6 pb-6 pt-12">
      <div className="mx-auto max-w-screen-xl">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          {/* Sección de título con ícono */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <BookmarkIcon className="h-10 w-10 text-purple-500" />
              <div className="absolute -top-1 left-1/2 flex -translate-x-1/2 transform gap-0.5">
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-purple-400"></div>
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-purple-400 delay-100"></div>
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-purple-400 delay-200"></div>
              </div>
            </div>
            <div className="flex items-baseline gap-3">
              <div className="rounded-full bg-purple-600 px-3 py-1 text-xs font-bold text-white">
                Destacados
              </div>
            </div>
          </div>

          {/* Enlace a más productos */}
          <Link
            href="/search?featured=true"
            className="group flex items-center gap-2 text-purple-600 transition-colors hover:text-purple-700"
          >
            <span className="text-sm font-medium">Explorar regalos</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 transform transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
