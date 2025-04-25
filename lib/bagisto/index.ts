import { BAGISTO_GRAPHQL_API_ENDPOINT, CHECKOUT, HIDDEN_PRODUCT_TAG, TAGS } from 'lib/constants';
import { isBagistoError, isObject } from 'lib/type-guards';
import { ensureStartsWith } from 'lib/utils';
import { revalidateTag } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';
import {
  addToCartMutation,
  createCartMutation,
  editCartItemsMutation,
  removeFromCartMutation
} from './mutations/cart';
import { savePaymentMutation } from './mutations/payment-method';
import { savePlaceOrder } from './mutations/place-order';
import { addShippingAddressMutation } from './mutations/shipping-address';
import { addShippingMethodMutation } from './mutations/shipping-method';
import { getCartQuery } from './queries/cart';
import { getChannelQuery } from './queries/channel';
import { getCollectionProductsQuery } from './queries/collection';
import { getFilterAttribute } from './queries/filterAttribute';
import { getMenuQuery } from './queries/menu';
import { getCountryQuery, getPageQuery, getPagesQuery } from './queries/page';
import { getShippingMethodQuery } from './queries/shipping-method';
import type {
  BagistoAddToCartOperation,
  BagistoCart,
  BagistoCartOperation,
  BagistoChannelOperation,
  BagistoCheckoutOperation,
  BagistoCollection,
  BagistoCollectionOperation,
  BagistoCollectionProductsOperation,
  BagistoCollectionsOperation,
  BagistoCountriesOperation,
  BagistoCreateCartOperation,
  BagistoFilterAttributeOperation,
  BagistoMenuOperation,
  BagistoPageOperation,
  BagistoPagesOperation,
  BagistoPaymentDataType,
  BagistoProductInfo,
  BagistoRemoveFromCartOperation,
  BagistoUpdateCartOperation,
  Cart,
  ChannelType,
  CountryArrayDataType,
  FilterAttribute,
  FilterCmsPageTranslationInput,
  ImageInfo,
  Menu,
  Page,
  Product,
  SEO,
  ShippingArrayDataType,
  SuperAttribute
} from './types';

const domain = process.env.BAGISTO_STORE_DOMAIN
  ? ensureStartsWith(process.env.BAGISTO_STORE_DOMAIN, 'https://')
  : '';
const endpoint = `${domain}${BAGISTO_GRAPHQL_API_ENDPOINT}`;
// const key = process.env.BAGISTO_STOREFRONT_ACCESS_TOKEN!;

type ExtractVariables<T> = T extends { variables: object } ? T['variables'] : never;

export async function bagistoFetch<T>({
  cache = 'force-cache',
  headers,
  query,
  tags,
  variables,
  cartId = true
}: {
  cache?: RequestCache;
  headers?: HeadersInit;
  query: string;
  tags?: string[];
  variables?: ExtractVariables<T>;
  cartId?: boolean;
}): Promise<{ status: number; body: T } | never> {
  try {
    let bagistoCartId;
    if (cartId && typeof window === 'undefined') {
      const { cookies } = await import('next/headers');
      bagistoCartId = cookies().get('bagisto_session')?.value;
    }

    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'X-Bagisto-Storefront-Access-Token': key,
        Cookie: `${bagistoCartId ? `bagisto_session=${bagistoCartId}` : ''}`,
        ...headers
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables })
      }),
      cache,
      ...(tags && { next: { tags } })
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body
    };
  } catch (e) {
    if (isBagistoError(e)) {
      throw {
        cause: e.cause?.toString() || 'unknown',
        status: e.status || 500,
        message: e.message,
        query
      };
    }

    throw {
      error: e,
      query
    };
  }
}

const removeEdgesAndNodes = (array: Array<any>) => {
  return array?.map((edge) => edge);
};

const reshapeCart = (cart: BagistoCart): Cart => {
  if (!cart?.grandTotal) {
    // cart.cost.totalTaxAmount = {
    //   amount: '0.0',
    //   currencyCode: 'USD'
    // };
  }

  return {
    ...cart,
    lines: removeEdgesAndNodes(cart?.items)
  };
};

const reshapePayments = (payments: any): any => {
  let paymentMethods = {};
  if (isObject(payments)) {
    paymentMethods = { ...payments };
  }
  return paymentMethods;
};

const reshapePaymentMethods = (payments: any): any => {
  let paymentMethods = {};
  if (isObject(payments)) {
    paymentMethods = { ...payments };
  }
  return paymentMethods;
};
const reshapeShippingAddress = (payments: any): any => {
  let paymentMethods = {};
  if (isObject(payments)) {
    paymentMethods = { ...payments };
  }
  return paymentMethods;
};

const reshapeImages = (images: Array<ImageInfo>, productTitle: string) => {
  const flattened = removeEdgesAndNodes(images);

  return flattened.map((image) => {
    const filename = image?.url.match(/.*\/(.*)\..*/)?.[1] || '';
    return {
      ...image,
      altText: image?.altText || `${productTitle} - ${filename}`
    };
  });
};

const reshapeProduct = (product: BagistoProductInfo, filterHiddenProducts = true) => {
  if (!product || (filterHiddenProducts && product.tags?.includes(HIDDEN_PRODUCT_TAG))) {
    return undefined;
  }

  const { images, variants, ...rest } = product;

  return {
    ...rest,
    images: reshapeImages(images, product.title),
    variants: removeEdgesAndNodes(variants)
  };
};

const reshapeProducts = (products: BagistoProductInfo[]) => {
  const reshapedProducts = [];

  for (const product of products) {
    if (product) {
      const reshapedProduct = reshapeProduct(product);

      if (reshapedProduct) {
        reshapedProducts.push(reshapedProduct);
      }
    }
  }

  return reshapedProducts;
};

export async function getFilterAttributes(): Promise<FilterAttribute> {
  const res = await bagistoFetch<BagistoFilterAttributeOperation>({
    query: getFilterAttribute,
    tags: [TAGS.filters],
    cache: 'no-store'
  });

  return res.body.data.getFilterAttribute;
}

export async function createCart(): Promise<Cart> {
  const res = await bagistoFetch<BagistoCreateCartOperation>({
    query: createCartMutation,
    cache: 'no-store'
  });

  return reshapeCart(res.body.data.cartCreate.cart);
}

export async function getChennel(): Promise<ChannelType> {
  const res = await bagistoFetch<BagistoChannelOperation>({
    query: getChannelQuery,
    cache: 'no-store'
  });
  return res.body.data.getDefaultChannel;
}

export async function addToCart(input: {
  productId: number;
  quantity: number;
  selectedConfigurableOption: number | undefined;
  superAttribute: SuperAttribute[];
}): Promise<Cart> {
  const res = await bagistoFetch<BagistoAddToCartOperation>({
    query: addToCartMutation,
    variables: {
      input
    },
    cache: 'no-store'
  });

  return reshapeCart(res.body.data.addItemToCart.cart);
}

export async function addShippingMethod(input: { shippingMethod: string }): Promise<any> {
  const res = await bagistoFetch<any>({
    query: addShippingMethodMutation,
    variables: {
      input
    },
    cache: 'no-store'
  });
  revalidateTag(TAGS.cart);
  return reshapePayments(res.body.data.paymentMethods);
}

export async function addPaymentMethod(input: { method: string }): Promise<BagistoPaymentDataType> {
  const res = await bagistoFetch<any>({
    query: savePaymentMutation,
    variables: {
      input
    },
    cache: 'no-store'
  });
  return reshapePaymentMethods(res.body.data.savePayment);
}

export async function createPlaceOrder(): Promise<any> {
  const res = await bagistoFetch<any>({
    query: savePlaceOrder,
    cache: 'no-store'
  });
  return res.body.data.placeOrder;
}

export async function addCheckoutAddress(input: any): Promise<any> {
  const res = await bagistoFetch<any>({
    query: addShippingAddressMutation,
    variables: {
      input
    },
    cache: 'no-store'
  });
  return reshapeShippingAddress(res.body.data.saveCheckoutAddresses);
}

export async function removeFromCart(lineIds: number): Promise<Cart> {
  const res = await bagistoFetch<BagistoRemoveFromCartOperation>({
    query: removeFromCartMutation,
    variables: {
      lineIds
    },
    cache: 'no-store'
  });

  return reshapeCart(res.body.data.removeCartItem.cart);
}

export async function updateCart(qty: { cartItemId: number; quantity: number }[]): Promise<Cart> {
  const res = await bagistoFetch<BagistoUpdateCartOperation>({
    query: editCartItemsMutation,
    variables: {
      input: { qty }
    },
    cache: 'no-store'
  });

  return reshapeCart(res.body.data.updateItemToCart.cart);
}

// Modificar la función getCart para asegurar que devuelva datos correctos
export async function getCart(cartId?: string): Promise<Cart | undefined> {
  try {
    const res = await bagistoFetch<BagistoCartOperation>({
      query: getCartQuery,
      tags: [TAGS.cart],
      cache: 'no-store'
    });

    // Verificar si hay datos en la respuesta
    if (!res.body.data.cartDetail) {
      console.log('No cart data found, creating new cart');
      // Si no hay carrito, intentar crear uno nuevo
      try {
        const newCart = await createCart();
        return newCart;
      } catch (createError) {
        console.error('Error creating new cart:', createError);
        return undefined;
      }
    }

    // Transformar los datos del carrito
    const cartData = reshapeCart(res.body.data.cartDetail);

    // Log para depuración
    console.log('Cart data processed:', {
      id: cartData.id,
      itemsCount: cartData.itemsCount,
      linesCount: cartData.lines?.length || 0
    });

    return cartData;
  } catch (error) {
    console.error('Error fetching cart:', error);
    return undefined;
  }
}

export async function getCollection(handle: string): Promise<Product[] | undefined> {
  const input = [{ key: 'category_id', value: `${handle}` }];

  const res = await bagistoFetch<BagistoCollectionOperation>({
    query: getCollectionProductsQuery,
    tags: [TAGS.collections],
    variables: {
      input
    }
  });

  return reshapeProducts(res.body.data.allProducts.data);
}

export async function getCollectionProducts({
  collection,
  reverse,
  sortKey,
  page,
  filters = []
}: {
  collection: string;
  reverse?: boolean;
  sortKey?: string;
  page?: string;
  filters?: { key: string; value: string }[];
}): Promise<Product[]> {
  let input = [{ key: 'limit', value: '100' }];

  if (collection && page != 'product') {
    input = [{ key: 'category_id', value: `${collection}` }, ...input];
  }
  if (sortKey) {
    const direction = reverse ? 'desc' : 'asc';
    input = [{ key: 'sort', value: `${sortKey.toLowerCase()}-${direction}` }, ...input];
  }
  if (collection && page === 'product') {
    input = [{ key: 'url_key', value: collection }, ...input];
  }

  // Add filters to the input
  if (filters && filters.length > 0) {
    input = [...filters, ...input];
  }

  const res = await bagistoFetch<BagistoCollectionProductsOperation>({
    query: getCollectionProductsQuery,
    tags: [TAGS.collections, TAGS.products],
    variables: {
      input
    }
  });
  if (!res.body.data?.allProducts) {
    // console.log(`No collection found for \`${collection}\``);
    return [];
  }

  return reshapeProducts(res.body.data.allProducts.data);
}

// Añadir código de depuración para ver la estructura de las categorías
export async function getHomeCategories(): Promise<BagistoCollection[]> {
  const res = await bagistoFetch<BagistoCollectionsOperation>({
    query: getMenuQuery,
    tags: [TAGS.collections],
    cartId: false
  });

  // Depuración: Imprimir la respuesta completa
  console.log(
    'API Response for categories:',
    JSON.stringify(res.body?.data?.homeCategories, null, 2)
  );

  const categories =
    res.body?.data?.homeCategories?.map(
      (item: {
        title: string;
        description: string;
        seo: SEO;
        path: string;
        updatedAt: string;
        name: string;
        parentId: string;
        id: string;
        categoryId: string;
        slug: string;
        handle: string;
        logoPath: string;
      }) => ({
        title: item.name,
        description: item.description || '',
        seo: item.seo || { title: '', description: '' },
        updatedAt: item.updatedAt || '',
        handle: item.handle || '',
        slug: item.slug || '',
        name: item.name,
        id: item.id,
        // Usar el id como categoryId si no existe
        categoryId: item.categoryId || item.id,
        parentId: item.parentId || '',
        path: `/search/${(item.slug || '')
          .replace(domain, '')
          .replace('/collections', '/search')
          .replace('/pages', '/search')}`,
        logoPath: item.logoPath || ''
      })
    ) || [];

  // Depuración: Imprimir las categorías procesadas
  console.log('Processed categories:', JSON.stringify(categories, null, 2));

  return categories;
}

export async function getMenu(handle: string): Promise<Menu[]> {
  const res = await bagistoFetch<BagistoMenuOperation>({
    query: getMenuQuery,
    tags: [TAGS.collections],
    variables: {
      handle
    }
  });

  return (
    res.body?.data?.homeCategories?.map(
      (item: { name: string; slug: string; categoryId: string; parentId: string }) => ({
        id: item.categoryId,
        parentId: item.parentId, // 👈 Ahora también retorna el parent_id
        title: item.name,
        path: `/search/${item.slug
          .replace(domain, '')
          .replace('/collections', '/search')
          .replace('/pages', '/search')}`
      })
    ) || []
  );
}

export async function getPage(input: FilterCmsPageTranslationInput): Promise<Page> {
  const res = await bagistoFetch<BagistoPageOperation>({
    query: getPageQuery,
    variables: { input }
  });
  return res.body.data?.cmsPages;
}

export async function getPages(): Promise<Page> {
  const res = await bagistoFetch<BagistoPagesOperation>({
    query: getPagesQuery,
    cartId: false
  });

  return res.body.data?.cmsPages;
}

export async function getProducts({
  query,
  reverse,
  sortKey,
  filters = []
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
  filters?: { key: string; value: string }[];
}): Promise<Product[]> {
  let input = [{ key: 'limit', value: '100' }];
  if (sortKey) {
    const direction = reverse ? 'desc' : 'asc';
    input = [{ key: 'sort', value: `${sortKey.toLowerCase()}-${direction}` }, ...input];
  }
  if (query) {
    input = [{ key: 'name', value: query }, ...input];
  }

  // Add filters to the input
  if (filters && filters.length > 0) {
    input = [...filters, ...input];
  }

  const res = await bagistoFetch<BagistoCollectionProductsOperation>({
    query: getCollectionProductsQuery,
    tags: [TAGS.products],
    cartId: false,
    variables: {
      input
    }
  });

  return reshapeProducts(res.body.data.allProducts.data);
}

export async function getCountryList(): Promise<CountryArrayDataType[]> {
  const res = await bagistoFetch<BagistoCountriesOperation>({
    query: getCountryQuery
  });
  return res.body?.data?.countries?.data;
}

export async function getShippingMethod(): Promise<ShippingArrayDataType[] | undefined> {
  const res = await bagistoFetch<BagistoCheckoutOperation>({
    query: getShippingMethodQuery,
    tags: [CHECKOUT.method],
    cache: 'no-store'
  });
  // Old carts becomes `null` when you checkout.
  if (!res.body.data.shippingMethods) {
    return undefined;
  }
  return res.body.data.shippingMethods;
}

// This is called from `app/api/revalidate.ts` so providers can control revalidation logic.
export async function revalidate(req: NextRequest): Promise<NextResponse> {
  // We always need to respond with a 200 status code to Bagisto,
  // otherwise it will continue to retry the request.
  const collectionWebhooks = ['collections/create', 'collections/delete', 'collections/update'];
  const productWebhooks = ['products/create', 'products/delete', 'products/update'];

  let topic = 'unknown';
  if (typeof window === 'undefined') {
    const { headers } = await import('next/headers');
    topic = headers().get('x-bagisto-topic') || 'unknown';
  }

  const secret = req.nextUrl.searchParams.get('secret');
  const isCollectionUpdate = collectionWebhooks.includes(topic);
  const isProductUpdate = productWebhooks.includes(topic);

  if (!secret || secret !== process.env.BAGISTO_REVALIDATION_SECRET) {
    return NextResponse.json({ status: 200 });
  }

  if (!isCollectionUpdate && !isProductUpdate) {
    // We don't need to revalidate anything for any other topics.
    return NextResponse.json({ status: 200 });
  }

  if (isCollectionUpdate) {
    revalidateTag(TAGS.collections);
  }

  if (isProductUpdate) {
    revalidateTag(TAGS.products);
  }

  return NextResponse.json({ status: 200, revalidated: true, now: Date.now() });
}

// Add this function to fetch categories
export async function getCategories(): Promise<any[]> {
  try {
    // Get the base URL from environment variables or use a default for development
    const baseUrl =
      process.env.NEXT_PUBLIC_API_URL || process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000';

    // Construct the full URL
    const apiUrl = new URL('/api/categories', baseUrl).toString();

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`Error fetching categories: ${response.status}`);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch categories');
    }

    return result.data || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}
