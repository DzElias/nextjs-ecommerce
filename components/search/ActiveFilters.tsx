'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface ActiveFiltersProps {
  activeFilters: Record<string, string[]>;
  attributeLabels: Record<string, string>;
  optionLabels: Record<string, Record<string, string>>;
}

export default function ActiveFilters({
  activeFilters,
  attributeLabels,
  optionLabels
}: ActiveFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleRemove = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    // Get current values for this key
    const currentValues = params.getAll(key);

    // Remove the value we want to delete
    const newValues = currentValues.filter((v) => v !== value);

    // Delete all values for this key
    params.delete(key);

    // Add back the filtered values
    newValues.forEach((v) => params.append(key, v));

    router.push(`/search?${params.toString()}`);
  };

  if (Object.keys(activeFilters).length === 0) {
    return null;
  }

  return (
    <div className="mb-4 mt-2">
      <h3 className="mb-2 text-sm font-medium text-purple-700">Filtros activos:</h3>
      <div className="flex flex-wrap gap-2">
        {Object.entries(activeFilters).map(([key, values]) =>
          values.map((value) => (
            <div
              key={`${key}-${value}`}
              className="group flex items-center rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-sm"
            >
              <span className="mr-1 capitalize text-purple-700">
                {attributeLabels[key] || key.replace('_', ' ')}:
              </span>
              <span className="text-purple-900">{optionLabels[key]?.[value] || value}</span>
              <button
                onClick={() => handleRemove(key, value)}
                className="ml-2 text-purple-400 transition-colors hover:text-purple-700 focus:outline-none"
                aria-label={`Eliminar filtro ${key} para ${value}`}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
