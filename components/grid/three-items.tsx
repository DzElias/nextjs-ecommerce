import { GridTileImage } from 'components/grid/tile';
import { getCollectionProducts } from 'lib/bagisto';
import type { Product } from 'lib/bagisto/types';
import Link from 'next/link';

function ThreeItemGridItem({
  item,
  size,
  priority
}: {
  item: Product;
  size: 'small' | 'medium';
  priority?: boolean;
}) {
  return (
    <div
      className={size === 'medium' ? 'md:col-span-2 md:row-span-2' : 'md:col-span-2 md:row-span-1'}
    >
      <Link
        className="relative block aspect-square h-full w-full transition-transform duration-300 hover:scale-[0.98]"
        href={`/product/${item.urlKey}`}
      >
        <GridTileImage
          src={item.images?.[0]?.url || ''}
          fill={true}
          sizes={
            size === 'medium' ? '(min-width: 768px) 50vw, 100vw' : '(min-width: 768px) 25vw, 100vw'
          }
          priority={priority}
          alt={item?.name || 'Product Image'}
          label={{
            position: 'bottom',
            title: item?.name as string,
            amount: item.priceHtml?.finalPrice || item.priceHtml?.regularPrice || '0',
            currencyCode: item.priceHtml?.currencyCode
          }}
        />
      </Link>
    </div>
  );
}

export async function ThreeItemGrid() {
  // Obtener productos
  const homepageItems = await getCollectionProducts({
    collection: ''
  });

  if (
    !homepageItems[0] ||
    !homepageItems[1] ||
    !homepageItems[2] ||
    !homepageItems[3] ||
    !homepageItems[4]
  )
    return null;

  const [firstProduct, secondProduct, thirdProduct, fourthProduct, fifthProduct] = homepageItems;

  return (
    <section className="mx-auto max-w-screen-2xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col items-center">
        <span className="mb-2 text-sm font-medium text-purple-600">Selecciones en tendencia</span>
        <h2 className="relative text-center text-3xl font-bold text-gray-900 dark:text-white">
          Productos destacados
          <span className="absolute bottom-0 left-1/2 -mb-2 h-1 w-24 -translate-x-1/2 transform rounded-full bg-purple-500"></span>
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:grid-rows-2 md:gap-6">
        <ThreeItemGridItem size="medium" item={firstProduct} priority={true} />
        <ThreeItemGridItem size="small" item={secondProduct} priority={true} />
        <ThreeItemGridItem size="small" item={thirdProduct} />
        <ThreeItemGridItem size="small" item={fourthProduct} />
        <ThreeItemGridItem size="small" item={fifthProduct} />
      </div>
    </section>
  );
}
