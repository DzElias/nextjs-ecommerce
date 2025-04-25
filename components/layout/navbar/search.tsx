'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { createUrl } from 'lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import type React from 'react';

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const val = e.target as HTMLFormElement;
    const search = val.search as HTMLInputElement;
    const newParams = new URLSearchParams(searchParams.toString());

    if (search.value) {
      newParams.set('q', search.value);
    } else {
      newParams.delete('q');
    }

    router.push(createUrl('/search', newParams));
  }

  return (
    <form onSubmit={onSubmit} className="relative w-full lg:w-80 xl:w-full">
      <input
        key={searchParams?.get('q')}
        type="text"
        name="search"
        placeholder="Busca el regalo perfecto..."
        autoComplete="off"
        defaultValue={searchParams?.get('q') || ''}
        className="w-full rounded-full border-2 border-purple-300/50 bg-white/90 px-5 py-2.5 text-sm text-black shadow-md backdrop-blur-sm 
                  transition-all duration-200 placeholder:text-neutral-500 focus:border-purple-400 
                  focus:outline-none focus:ring-2 focus:ring-purple-400/30 dark:border-purple-800/50 
                  dark:bg-purple-950/40 dark:text-white dark:placeholder:text-neutral-400"
      />
      <button
        type="submit"
        className="absolute right-0 top-0 mr-4 flex h-full items-center text-purple-500 transition-colors duration-200 hover:text-purple-700"
        aria-label="Buscar"
      >
        <MagnifyingGlassIcon className="h-5 w-5" />
      </button>
    </form>
  );
}

export function SearchSkeleton() {
  return (
    <form className="relative w-full lg:w-80 xl:w-full">
      <input
        placeholder="Busca el regalo perfecto..."
        className="w-full rounded-full border-2 border-purple-300/50 bg-white/90 px-5 py-2.5 text-sm text-black shadow-md backdrop-blur-sm 
                  placeholder:text-neutral-500 dark:border-purple-800/50 dark:bg-purple-950/40 dark:text-white dark:placeholder:text-neutral-400"
        disabled
      />
      <div className="absolute right-0 top-0 mr-4 flex h-full items-center text-purple-500">
        <MagnifyingGlassIcon className="h-5 w-5" />
      </div>
    </form>
  );
}
