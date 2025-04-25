import ActiveFilters from 'components/search/ActiveFilters';
import AttributeFilters from 'components/search/AttributeFilters';
import CategoryFilters from 'components/search/CategoryFilters';
import LoadingResults from 'components/search/LoadingResults';
import SearchHeader from 'components/search/SearchHeader';
import SearchResults from 'components/search/SearchResults';
import { getFilterAttributes, getHomeCategories, getProducts } from 'lib/bagisto';
import { getVisibleAttributes } from 'lib/getAttributes';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export default async function SearchPage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { q: searchQuery, sort, order, ...filterParams } = searchParams;

  // Get filter attributes
  const filterAttributes = await getFilterAttributes();

  // Get product attributes for filtering
  const attributes = await getVisibleAttributes();

  // Get categories for filtering
  const categories = await getHomeCategories();

  // Process filter parameters
  const filters = Object.entries(filterParams).map(([key, value]) => {
    if (Array.isArray(value)) {
      return { key, value: value.join(',') };
    }
    return { key, value: value as string };
  });

  // Get products with filters
  const products = await getProducts({
    query: typeof searchQuery === 'string' ? searchQuery : undefined,
    sortKey: typeof sort === 'string' ? sort : undefined,
    reverse: order === 'desc',
    filters
  });

  // Get active filters for display
  const activeFilters = Object.entries(filterParams).reduce(
    (acc, [key, value]) => {
      if (value) {
        const values = Array.isArray(value) ? value : [value];
        acc[key] = values;
      }
      return acc;
    },
    {} as Record<string, string[]>
  );

  // Create attribute and option label maps for display
  const attributeLabels: Record<string, string> = {
    category_id: 'Categoría',
    ...attributes.reduce(
      (acc, attr) => {
        acc[attr.code] = attr.name;
        return acc;
      },
      {} as Record<string, string>
    )
  };

  // Create option label maps
  const optionLabels: Record<string, Record<string, string>> = {
    ...attributes.reduce(
      (acc, attr) => {
        acc[attr.code] = attr.options.reduce(
          (optAcc, opt) => {
            optAcc[opt.id] = opt.label;
            return optAcc;
          },
          {} as Record<string, string>
        );
        return acc;
      },
      {} as Record<string, Record<string, string>>
    ),

    // Add category labels using categoryId instead of id
    category_id: categories.reduce(
      (acc, cat) => {
        if (cat.categoryId) {
          acc[cat.categoryId] = cat.title || cat.name;
        }
        return acc;
      },
      {} as Record<string, string>
    )
  };

  return (
    <div className="mx-auto max-w-screen-2xl px-4">
      <SearchHeader
        searchQuery={typeof searchQuery === 'string' ? searchQuery : ''}
        totalResults={products.length}
        sortOrders={filterAttributes.sortOrders}
        currentSort={typeof sort === 'string' ? sort : ''}
        currentOrder={typeof order === 'string' ? order : ''}
      />

      <div className="mb-10 grid grid-cols-1 gap-8 md:grid-cols-4">
        <div className="space-y-6 md:col-span-1">
          <AttributeFilters attributes={attributes} activeFilters={activeFilters} />
          <CategoryFilters categories={categories} activeFilters={activeFilters} />
        </div>

        <div className="md:col-span-3">
          <ActiveFilters
            activeFilters={activeFilters}
            attributeLabels={attributeLabels}
            optionLabels={optionLabels}
          />

          <Suspense fallback={<LoadingResults />}>
            <SearchResults products={products} activeFilters={activeFilters} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
