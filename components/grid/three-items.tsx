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
    <div className={size === 'medium' ? 'md:col-span-2 md:row-span-2' : 'md:col-span-2 md:row-span-1'}>
      <Link className="relative block aspect-square h-full w-full" href={`/product/${item.urlKey}`}>
        <GridTileImage
          src={item.images?.[0]?.url || ''}
          fill={true}
          sizes={size === 'medium' ? '(min-width: 768px) 50vw, 100vw' : '(min-width: 768px) 25vw, 100vw'}
          priority={priority}
          alt={item?.name || 'Images'}
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
  // Obtener 5 productos en lugar de 3
  const homepageItems = await getCollectionProducts({
    collection: ''
  });

  if (!homepageItems[0] || !homepageItems[1] || !homepageItems[2] || !homepageItems[3] || !homepageItems[4]) return null;

  const [firstProduct, secondProduct, thirdProduct, fourthProduct, fifthProduct] = homepageItems;

  return (
    <section className="mx-auto grid max-w-screen-xl gap-2 px-4 pb-4 md:grid-cols-6 md:grid-rows-2">
      <ThreeItemGridItem size="medium" item={firstProduct} priority={true} />
      <ThreeItemGridItem size="small" item={secondProduct} priority={true} />
      <ThreeItemGridItem size="small" item={thirdProduct} />
      <ThreeItemGridItem size="small" item={fourthProduct} />
      <ThreeItemGridItem size="small" item={fifthProduct} />
    </section>
  );
}
