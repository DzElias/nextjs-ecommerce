'use client';

import type { SortOrder } from 'lib/bagisto/types';
import { useRouter, useSearchParams } from 'next/navigation';
import type React from 'react';
import { useState } from 'react';

interface SearchHeaderProps {
  searchQuery: string;
  totalResults: number;
  sortOrders: SortOrder[];
  currentSort: string;
  currentOrder: string;
}

export default function SearchHeader({
  searchQuery,
  totalResults,
  sortOrders,
  currentSort,
  currentOrder
}: SearchHeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sortKey, setSortKey] = useState(currentSort || 'relevance');
  const [sortOrder, setSortOrder] = useState(currentOrder || 'asc');

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = e.target.value;
    setSortKey(selectedSort);

    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', selectedSort);

    router.push(`/search?${params.toString()}`);
  };

  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOrder = e.target.value;
    setSortOrder(selectedOrder);

    const params = new URLSearchParams(searchParams.toString());
    params.set('order', selectedOrder);

    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="mb-6 flex flex-col items-start justify-between border-b py-6 md:flex-row md:items-center">
      <div>
        <h1 className="text-2xl font-bold text-purple-800">
          {searchQuery ? `Resultados para "${searchQuery}"` : 'Todos los Productos'}
        </h1>
        <p className="mt-1 text-gray-600">{totalResults} productos encontrados</p>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row md:mt-0">
        <div className="flex items-center gap-2">
          <label htmlFor="sort-by" className="text-sm font-medium text-gray-700">
            Ordenar por:
          </label>
          <select
            id="sort-by"
            className="rounded-md border border-purple-200 px-3 py-1.5 text-sm focus:border-purple-500 focus:ring-purple-500"
            value={sortKey}
            onChange={handleSortChange}
          >
            {sortOrders.map((sortOption) => (
              <option key={sortOption.key} value={sortOption.value}>
                {sortOption.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="sort-order" className="text-sm font-medium text-gray-700">
            Orden:
          </label>
          <select
            id="sort-order"
            className="rounded-md border border-purple-200 px-3 py-1.5 text-sm focus:border-purple-500 focus:ring-purple-500"
            value={sortOrder}
            onChange={handleOrderChange}
          >
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
        </div>
      </div>
    </div>
  );
}
