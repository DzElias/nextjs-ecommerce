import clsx from 'clsx';
import { getMenu } from 'lib/bagisto';
import Link from 'next/link';
import { Suspense } from 'react';

async function CollectionList() {
  const collections = await getMenu('header-menu');
  
  const mainCategories = collections.filter(category => category.parentId === "1");

  return (
    <div className="space-y-4 w-full">
      <h2 className="text-lg font-semibold">Categorías</h2>
      <ul className="space-y-3">
        {mainCategories.map(category => {
          const subcategories = collections.filter(subCat => subCat.parentId == category.id);

          return (
            <li key={`main-${category.id}`} className="font-bold">
              <details className="group">
                <summary className="flex justify-between w-full text-left cursor-pointer">
                  {category.title}
                  <span className="group-open:rotate-180 transition-transform">▼</span>
                </summary>
                {subcategories.length > 0 && (
                  <ul className="ml-4 space-y-2 text-sm flex flex-col">
                    {subcategories.map(subcategory => (
                      <li key={`sub-${subcategory.id}`}>
                        <Link href={subcategory.path} className="text-gray-600 hover:no-underline">
                          {subcategory.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </details>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const skeleton = 'mb-3 h-4 w-5/6 animate-pulse rounded';
const activeAndTitles = 'bg-neutral-800 dark:bg-neutral-300';
const items = 'bg-neutral-400 dark:bg-neutral-700';

export default function Collections() {
  return (
    <Suspense
      fallback={
        <div className="col-span-2 hidden h-[400px] w-full flex-none py-4 lg:block">
          <div className={clsx(skeleton, activeAndTitles)} />
          <div className={clsx(skeleton, activeAndTitles)} />
          {[...Array(8)].map((_, i) => (
            <div key={`skeleton-${i}`} className={clsx(skeleton, items)} />
          ))}
        </div>
      }
    >
      <CollectionList />
    </Suspense>
  );
}
