'use client';

import type { Attribute } from 'lib/bagisto/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

interface AttributeFiltersProps {
  attributes: Attribute[];
  activeFilters: Record<string, string[]>;
}

export default function AttributeFilters({ attributes, activeFilters }: AttributeFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [expanded, setExpanded] = useState(true);
  const [expandedAttributes, setExpandedAttributes] = useState<string[]>([]);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const toggleAttribute = (attributeId: string) => {
    setExpandedAttributes((prev) =>
      prev.includes(attributeId) ? prev.filter((id) => id !== attributeId) : [...prev, attributeId]
    );
  };

  const handleAttributeChange = (attributeCode: string, optionId: string) => {
    const params = new URLSearchParams(searchParams.toString());

    // Get current values for this attribute
    const currentValues = params.getAll(attributeCode);

    if (currentValues.includes(optionId)) {
      // Remove value if already selected
      const newValues = currentValues.filter((v) => v !== optionId);
      params.delete(attributeCode);
      newValues.forEach((v) => params.append(attributeCode, v));
    } else {
      // Add value if not selected
      params.append(attributeCode, optionId);
    }

    router.push(`/search?${params.toString()}`);
  };

  if (attributes.length === 0) {
    return null;
  }

  return (
    <div className="rounded-lg border border-purple-100 bg-white p-4 shadow-sm transition-all">
      <button
        className="group mb-4 flex w-full items-center justify-between text-left font-medium"
        onClick={toggleExpanded}
      >
        <h2 className="text-lg font-semibold text-purple-700 transition-colors group-hover:text-purple-800">
          Filtros
        </h2>
        <span className="text-purple-500 transition-colors group-hover:text-purple-700">
          {expanded ? '▼' : '▶'}
        </span>
      </button>

      {expanded && (
        <div className="space-y-0 divide-y divide-purple-100">
          {attributes.map((attribute) => {
            // Skip attributes with no options
            if (!attribute.options || attribute.options.length === 0) {
              return null;
            }

            return (
              <div key={attribute.id} className="py-2.5">
                <button
                  className="group flex w-full items-center justify-between py-1 text-left font-medium"
                  onClick={() => toggleAttribute(attribute.id)}
                >
                  <span className="text-sm text-purple-700 transition-colors group-hover:text-purple-900">
                    {attribute.name}
                  </span>
                  <span className="text-purple-500 transition-colors group-hover:text-purple-700">
                    {expandedAttributes.includes(attribute.id) ? '▼' : '▶'}
                  </span>
                </button>

                {expandedAttributes.includes(attribute.id) && (
                  <div className="ml-2 mt-2 space-y-1.5">
                    {attribute.options.map((option) => (
                      <label
                        key={option.id}
                        className="flex cursor-pointer items-center gap-2 rounded px-1 py-1 transition-colors hover:bg-purple-50"
                      >
                        <input
                          type="checkbox"
                          checked={activeFilters[attribute.code]?.includes(option.id) || false}
                          onChange={() => handleAttributeChange(attribute.code, option.id)}
                          className="rounded border-purple-300 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
