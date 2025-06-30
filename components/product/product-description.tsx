import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import Prose from 'components/prose';
import { BagistoProductInfo } from 'lib/bagisto/types';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { VariantSelector } from './variant-selector';

export function ProductDescription({ product }: { product: BagistoProductInfo | null | undefined }) {
  if (!product) return notFound();

  const configurableProductData = product.configutableData?.attributes || [];
  const configurableProductIndexData = product.configutableData?.index || [];
  const quantity = Number(product.inventories?.[0]?.qty) || 1; // Still need to access inventories as an array
  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-5xl font-medium">{product.name}</h1>
        <div className="mr-auto w-auto rounded-full bg-purple-600 p-2 text-sm text-white">
          <Price
            amount={product.priceHtml?.finalPrice || product.priceHtml?.regularPrice || '0'}
            currencyCode={product.priceHtml?.currencyCode || ''}
          />
        </div>
      </div>
      <Suspense fallback={null}>
        <VariantSelector variants={configurableProductData} index={configurableProductIndexData} />
      </Suspense>
      {product.description ? (
        <Prose
          className="mb-6 text-sm leading-tight dark:text-white/[60%]"
          html={product.description}
        />
      ) : null}

      <Suspense fallback={null}>
        <AddToCart
          variants={configurableProductData || []}
          index={configurableProductIndexData}
          productId={product.id || ''}
          availableForSale={quantity > 0 ? true : false}
        />
      </Suspense>
    </>
  );
}
