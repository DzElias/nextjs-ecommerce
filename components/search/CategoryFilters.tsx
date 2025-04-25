'use client';

import type { BagistoCollection } from 'lib/bagisto/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

interface CategoryFiltersProps {
  categories: BagistoCollection[];
  activeFilters: Record<string, string[]>;
}

export default function CategoryFilters({ categories, activeFilters }: CategoryFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [expanded, setExpanded] = useState(true);

  // Por defecto, expandir todas las categorías principales
  const [expandedCategories, setExpandedCategories] = useState<string[]>(
    categories.filter((cat) => cat.parentId === '1').map((cat) => cat.categoryId)
  );

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleCategoryChange = (categoryId: string) => {
    const params = new URLSearchParams(searchParams.toString());

    // Handle category selection
    if (params.get('category_id') === categoryId) {
      params.delete('category_id');
    } else {
      params.set('category_id', categoryId);
    }

    router.push(`/search?${params.toString()}`);
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
    );
  };

  // Identificar categorías principales (parentId = "1")
  const mainCategories = categories.filter((cat) => cat.parentId === '1');

  // Agrupar subcategorías por categoría principal
  const subcategoriesByParent = categories.reduce(
    (acc, cat) => {
      // Si no es una categoría principal y tiene parentId
      if (cat.parentId !== '1' && cat.parentId) {
        // Buscar si el parentId coincide con el categoryId de alguna categoría principal
        const parentCategory = mainCategories.find((main) => main.categoryId == cat.parentId);

        if (parentCategory) {
          if (!acc[parentCategory.categoryId]) {
            acc[parentCategory.categoryId] = [];
          }
          if (parentCategory) {
            acc[parentCategory.categoryId]?.push(cat);
          }
        }
      }
      return acc;
    },
    {} as Record<string, BagistoCollection[]>
  );

  if (categories.length === 0) {
    return null;
  }

  return (
    <div className="rounded-lg border border-purple-100 bg-white p-4 shadow-sm transition-all">
      <button
        className="group mb-4 flex w-full items-center justify-between text-left font-medium"
        onClick={toggleExpanded}
      >
        <h2 className="text-lg font-semibold text-purple-700 transition-colors group-hover:text-purple-800">
          Categorías
        </h2>
        <span className="text-purple-500 transition-colors group-hover:text-purple-700">
          {expanded ? '▼' : '▶'}
        </span>
      </button>

      {expanded && (
        <div className="space-y-0 divide-y divide-purple-100">
          {mainCategories.map((category) => (
            <div key={category.categoryId} className="py-2.5">
              <button
                className="group flex w-full items-center justify-between py-1 text-left font-medium"
                onClick={() => toggleCategory(category.categoryId)}
              >
                <span className="text-sm text-purple-700 transition-colors group-hover:text-purple-900">
                  {category.title || category.name}
                </span>
                <span className="text-purple-500 transition-colors group-hover:text-purple-700">
                  {expandedCategories.includes(category.categoryId) ? '▼' : '▶'}
                </span>
              </button>

              {expandedCategories.includes(category.categoryId) && (
                <div className="ml-2 mt-2 space-y-1.5">
                  {(subcategoriesByParent[category.categoryId] ?? []).length > 0 ? (
                    // Mostrar subcategorías si existen
                    subcategoriesByParent[category.categoryId]?.map((subcat) => (
                      <label
                        key={subcat.categoryId}
                        className="flex cursor-pointer items-center gap-2 rounded px-1 py-1 transition-colors hover:bg-purple-50"
                      >
                        <input
                          type="checkbox"
                          checked={
                            activeFilters['category_id']?.includes(subcat.categoryId) || false
                          }
                          onChange={() => handleCategoryChange(subcat.categoryId)}
                          className="rounded border-purple-300 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-sm text-gray-700">{subcat.title || subcat.name}</span>
                      </label>
                    ))
                  ) : (
                    // Mensaje si no hay subcategorías
                    <p className="py-1 text-xs italic text-gray-500">
                      No hay subcategorías disponibles
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
