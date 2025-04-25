'use client';

import { Divider } from '@nextui-org/react';
import { DeleteItemButton } from 'components/cart/delete-item-button';
import { EditItemQuantityButton } from 'components/cart/edit-item-quantity-button';
import { formatPrice } from 'lib/utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CartClient({ initialCart }: { initialCart: any }) {
  const [cart, setCart] = useState<any>(initialCart);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setCart(initialCart);
  }, [initialCart]);

  if (loading) {
    return (
      <div className="flex h-full flex-col justify-between p-6">
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-purple-800">Tu carrito</h2>
          </div>
          <div className="mt-6 animate-pulse space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-4">
                <div className="h-16 w-16 rounded-md bg-gray-200"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 rounded bg-gray-200"></div>
                  <div className="h-4 w-1/2 rounded bg-gray-200"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!cart || !cart.lines || cart.lines.length === 0) {
    return (
      <div className="flex h-full flex-col justify-between p-6">
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-purple-800">Tu carrito</h2>
          </div>
          <div className="mt-20 flex flex-col items-center justify-center space-y-4">
            <div className="relative h-24 w-24 text-purple-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-full w-full"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </div>
            <p className="text-center text-gray-500">Tu carrito está vacío </p>
            <button
              onClick={() => router.push('/')}
              className="mt-4 rounded-full bg-purple-600 px-6 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Continuar comprando
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col justify-between p-6">
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-purple-800">Tu carrito</h2>
          <span className="text-sm text-gray-500">{cart.lines.length} productos</span>
        </div>

        <div className="mt-6 space-y-6">
          {cart.lines.map((item: any) => (
            <div key={item.id} className="flex gap-4">
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                {item.product.images && item.product.images.length > 0 ? (
                  <Image
                    src={item.product.images[0].url || '/placeholder.svg'}
                    alt={item.name}
                    fill
                    className="object-cover object-center"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
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
          ))}
        </div>
      </div>

      <div className="mt-8">
        <Divider className="my-4" />
        <div className="space-y-2">
          <div className="flex justify-between">
            <p className="text-sm text-gray-600">Subtotal</p>
            <p className="text-sm font-medium text-gray-900">
              {cart.formattedPrice?.subTotal || formatPrice(cart.subTotal)}
            </p>
          </div>

          {Number(cart.discountAmount) > 0 && (
            <div className="flex justify-between">
              <p className="text-sm text-gray-600">Descuento</p>
              <p className="text-sm font-medium text-green-600">
                -{cart.formattedPrice?.discount || formatPrice(cart.discountAmount)}
              </p>
            </div>
          )}
          <div className="flex justify-between">
            <p className="text-sm text-gray-600">Impuestos</p>
            <p className="text-sm font-medium text-gray-900">
              {cart.formattedPrice?.taxTotal || formatPrice(cart.taxTotal)}
            </p>
          </div>
          <Divider className="my-2" />
          <div className="flex justify-between">
            <p className="text-base font-medium text-gray-900">Total</p>
            <p className="text-base font-medium text-purple-700">
              {cart.formattedPrice?.grandTotal || formatPrice(cart.grandTotal)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
