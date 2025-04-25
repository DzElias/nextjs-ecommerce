'use client';

import { Dialog, Transition } from '@headlessui/react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import Price from 'components/price';
import type { Cart } from 'lib/bagisto/types';
import { DEFAULT_OPTION } from 'lib/constants';
import { createUrl } from 'lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useEffect, useRef, useState } from 'react';
import CloseCart from './close-cart';
import { DeleteItemButton } from './delete-item-button';
import { EditItemQuantityButton } from './edit-item-quantity-button';
import OpenCart from './open-cart';

type MerchandiseSearchParams = {
  [key: string]: string;
};

export default function CartModal({ cart }: { cart: Cart | undefined }) {
  const [isOpen, setIsOpen] = useState(false);
  const quantityRef = useRef(cart?.itemsQty);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  useEffect(() => {
    if (cart?.itemsQty !== quantityRef.current) {
      if (!isOpen) {
        setIsOpen(true);
      }
      quantityRef.current = cart?.itemsQty;
    }
  }, [isOpen, cart?.itemsQty, quantityRef]);

  return (
    <>
      <button aria-label="Open cart" onClick={openCart}>
        <OpenCart quantity={cart?.itemsQty} />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeCart} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-neutral-200 bg-white/95 p-6 text-black backdrop-blur-xl dark:border-neutral-700 dark:bg-gray-900/95 dark:text-white md:w-[420px]">
              <div className="flex items-center justify-between">
                <Dialog.Title className="text-xl font-semibold tracking-wide text-gray-900 dark:text-white">
                  Mi Carrito
                </Dialog.Title>
                <button aria-label="Close cart" onClick={closeCart}>
                  <CloseCart />
                </button>
              </div>

              {!cart || cart.lines?.length === 0 ? (
                <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
                  <ShoppingCartIcon className="h-16 text-purple-500" />
                  <p className="mt-6 text-center text-2xl font-bold">Tu carrito está vacío</p>
                  <p className="mt-2 text-center text-gray-500 dark:text-gray-400">
                    ¿No sabes qué regalar? ¡Nuestra IA te puede ayudar!
                  </p>
                </div>
              ) : (
                <div className="flex h-full flex-col justify-between overflow-hidden">
                  <ul className="flex-grow overflow-auto py-4 pr-2">
                    {cart?.items?.map((item, i) => {
                      const merchandiseSearchParams = {} as MerchandiseSearchParams;
                      const merchandiseUrl = createUrl(
                        `/product/${item?.product.sku}`,
                        new URLSearchParams(merchandiseSearchParams)
                      );

                      return (
                        <li
                          key={i}
                          className="group relative flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700"
                        >
                          <div className="relative flex w-full flex-row justify-between px-1 py-4">
                            <div className="absolute z-40 -mt-2 ml-[55px] opacity-0 transition-opacity group-hover:opacity-100">
                              <DeleteItemButton item={item} />
                            </div>
                            <Link
                              href={merchandiseUrl}
                              onClick={closeCart}
                              className="z-30 flex flex-row space-x-4 group-hover:opacity-50"
                            >
                              <div className="relative h-20 w-20 cursor-pointer overflow-hidden rounded-xl border border-neutral-300 bg-neutral-300 transition-transform duration-200 group-hover:scale-95 dark:border-neutral-700 dark:bg-neutral-900">
                                <Image
                                  className="h-full w-full object-cover"
                                  width={80}
                                  height={80}
                                  alt={item.product.images?.[0]?.path || item.product.name}
                                  src={item.product.images?.[0]?.url || '/image/placeholder.webp'}
                                />
                              </div>

                              <div className="flex flex-1 flex-col text-base">
                                <span className="font-medium leading-tight">
                                  {item.product.name}
                                </span>
                                {item.name !== DEFAULT_OPTION ? (
                                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                    {item.name}
                                  </p>
                                ) : null}
                              </div>
                            </Link>
                            <div className="flex h-20 flex-col justify-between">
                              <Price
                                className="flex justify-end space-y-2 text-right text-sm font-semibold"
                                amount={item.total}
                                currencyCode={'PYG'}
                              />
                              <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 bg-white shadow-sm transition-colors hover:border-neutral-300 dark:border-neutral-700 dark:bg-gray-950 dark:hover:border-neutral-600">
                                <EditItemQuantityButton item={item} type="minus" />
                                <p className="w-6 text-center">
                                  <span className="w-full text-sm">{item.quantity}</span>
                                </p>
                                <EditItemQuantityButton item={item} type="plus" />
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="border-t border-neutral-200 py-4 text-sm text-neutral-500 dark:border-neutral-700 dark:text-neutral-400">
                    <div className="mb-3 flex items-center justify-between pb-1">
                      <p>Impuestos</p>
                      <Price
                        className="text-right text-base font-medium text-black dark:text-white"
                        amount={cart.taxTotal}
                        currencyCode={'PYG'}
                      />
                    </div>
                    <div className="mb-3 flex items-center justify-between pb-1 pt-1">
                      <p>Envío</p>
                      <p className="text-right">Calculado al finalizar</p>
                    </div>
                    <div className="mb-3 flex items-center justify-between border-t border-neutral-200 pb-1 pt-3 dark:border-neutral-700">
                      <p className="text-base font-medium text-black dark:text-white">Total</p>
                      <Price
                        className="text-right text-lg font-semibold text-black dark:text-white"
                        amount={cart.grandTotal}
                        currencyCode={'PYG'}
                      />
                    </div>
                  </div>
                  <Link
                    onClick={closeCart}
                    href="/checkout/information"
                    className="block w-full rounded-full bg-gradient-to-r from-purple-600 to-purple-700 p-4 text-center text-base font-medium text-white shadow-lg transition-all duration-200 hover:from-purple-700 hover:to-purple-800 hover:shadow-purple-200 dark:hover:shadow-purple-900/30"
                  >
                    Finalizar Compra
                  </Link>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
