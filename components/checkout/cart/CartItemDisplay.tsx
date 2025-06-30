'use client';

import { DeleteItemButton } from 'components/cart/delete-item-button';
import { EditItemQuantityButton } from 'components/cart/edit-item-quantity-button';
import type { CartItem } from 'lib/types/cart';
import { formatPrice } from 'lib/utils';
import Image from 'next/image';

interface CartItemDisplayProps {
  item: CartItem;
}

const CartItemDisplay = ({ item }: CartItemDisplayProps) => {
  return (
    <div className="flex gap-4">
      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        {item.product && item.product.images && item.product.images.length > 0 ? (
          <Image
            src={item.product.images[0].url || '/placeholder.svg'}
            alt={item.product.images[0].altText || item.name}
            fill
            className="object-cover object-center"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
            {/* Placeholder SVG or icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-8 w-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-700">{item.name}</h3>
            <p className="mt-1 text-xs text-gray-500">Cantidad: {item.quantity}</p>
          </div>
          <p className="text-sm font-medium text-purple-700">
            {item.formattedPrice?.total || formatPrice(item.total)}
          </p>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center rounded-full border border-gray-200">
            <EditItemQuantityButton item={item} type="minus" />
            <p className="w-6 text-center text-sm">{item.quantity}</p>
            <EditItemQuantityButton item={item} type="plus" />
          </div>
          <DeleteItemButton item={item} />
        </div>
      </div>
    </div>
  );
};

export default CartItemDisplay;
