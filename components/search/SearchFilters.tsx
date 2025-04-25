'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import ActiveFilters from './ActiveFilters';

interface SearchFiltersProps {
  filterData: {
    key: string;
    value: string;
  }[];
  activeFilters: Record<string, string[]>;
}

export default function SearchFilters({ filterData, activeFilters }: SearchFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  // Group filters by key with type safety
  const groupedFilters = filterData.reduce<Record<string, string[]>>((acc, filter) => {
    const key = filter.key;
    // Make sure key is a valid string
    if (key) {
      // Initialize the array if it doesn't exist
      if (!acc[key]) {
        acc[key] = [];
      }
      // Add the value to the array
      (acc[key] = acc[key] || []).push(filter.value);
    }
    return acc;
  }, {});

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category) ? prev.filter((cat) => cat !== category) : [...prev, category]
    );
  };

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    // Get current values for this key
    const currentValues = params.getAll(key);

    if (currentValues.includes(value)) {
      // Remove value if already selected
      const newValues = currentValues.filter((v) => v !== value);
      params.delete(key);
      newValues.forEach((v) => params.append(key, v));
    } else {
      // Add value if not selected
      params.append(key, value);
    }

    router.push(`/search?${params.toString()}`);
  };

  const clearAllFilters = () => {
    const params = new URLSearchParams();

    // Preserve search query and sort if present
    const q = searchParams.get('q');
    const sort = searchParams.get('sort');
    const order = searchParams.get('order');

    if (q) params.set('q', q);
    if (sort) params.set('sort', sort);
    if (order) params.set('order', order);

    router.push(`/search?${params.toString()}`);
  };

  // Create simple attribute and option labels for this component
  const attributeLabels: Record<string, string> = {};
  const optionLabels: Record<string, Record<string, string>> = {};

  return (
    <div className="rounded-lg border border-purple-100 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-purple-700">Filtros</h2>
        {Object.keys(activeFilters).length > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-purple-600 transition-colors hover:text-purple-800"
          >
            Limpiar todo
          </button>
        )}
      </div>

      <ActiveFilters
        activeFilters={activeFilters}
        attributeLabels={attributeLabels}
        optionLabels={optionLabels}
      />

      <div className="mt-4 space-y-0 divide-y divide-purple-100">
        {Object.entries(groupedFilters).map(([key, values]) => (
          <div key={key} className="py-2.5">
            <button
              className="group flex w-full items-center justify-between py-1 text-left font-medium"
              onClick={() => toggleCategory(key)}
            >
              <span className="capitalize text-purple-700 transition-colors group-hover:text-purple-900">
                {key.replace('_', ' ')}
              </span>
              <span className="text-purple-500 transition-colors group-hover:text-purple-700">
                {expandedCategories.includes(key) ? '▼' : '▶'}
              </span>
            </button>

            {expandedCategories.includes(key) && (
              <div className="mt-2 space-y-1.5">
                {values.map((value) => (
                  <label
                    key={`${key}-${value}`}
                    className="flex cursor-pointer items-center gap-2 rounded px-1 py-1 transition-colors hover:bg-purple-50"
                  >
                    <input
                      type="checkbox"
                      checked={activeFilters[key]?.includes(value) || false}
                      onChange={() => handleFilterChange(key, value)}
                      className="rounded border-purple-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">{value}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
