import type { Attribute } from './bagisto/types';

export async function getVisibleAttributes(): Promise<Attribute[]> {
  try {
    // Get the base URL from environment variables or use a default for development
    const baseUrl =
      process.env.NEXT_PUBLIC_API_URL || process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000';

    // Construct the full URL
    const apiUrl = new URL('/api/attributes/visible-select', baseUrl).toString();

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`Error fetching attributes: ${response.status}`);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch attributes');
    }

    // Process the attributes to make them easier to work with
    return result.data.map((attr: any) => {
      // Get the Spanish translation or fallback to English or admin name
      const translation = attr.translations.find((t: any) => t.locale === 'es') ||
        attr.translations.find((t: any) => t.locale === 'en') || { name: attr.adminName };

      // Process options with translations
      const options = attr.options.map((opt: any) => {
        const optTranslation = opt.translations.find((t: any) => t.locale === 'es') ||
          opt.translations.find((t: any) => t.locale === 'en') || { label: opt.adminName };

        return {
          id: opt.id,
          code: attr.code,
          label: optTranslation.label || opt.adminName,
          value: opt.id,
          attributeId: attr.id
        };
      });

      return {
        id: attr.id,
        code: attr.code,
        name: translation.name || attr.adminName,
        type: attr.type,
        isFilterable: attr.isFilterable,
        isVisibleOnFront: attr.isVisibleOnFront,
        options
      };
    });
  } catch (error) {
    console.error('Error fetching attributes:', error);
    return [];
  }
}
