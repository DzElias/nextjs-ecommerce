'use client';
import { ProceedToCheckout } from 'components/checkout/cart/proceed-to-checkout';
import RightArrowIcon from 'components/icons/right-arrow';
import type { ShippingAddressDataType, selectedPaymentMethodType } from 'lib/bagisto/types';
import { isObject } from 'lib/type-guards';
import { removeFromLocalStorage, setLocalStorage } from 'lib/utils';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import type { PlaceOrderReturn } from '../action';
import { placeOrder } from '../action';

export default function PlaceOrderPage({
  selectedPayment,
  shippingAddress,
  selectedShipping
}: {
  selectedPayment?: selectedPaymentMethodType;
  shippingAddress?: ShippingAddressDataType;
  selectedShipping: any;
}) {
  // Usar el tipo correcto para el estado inicial
  const initialState: PlaceOrderReturn = {};

  const [state, formAction] = useFormState(placeOrder, initialState);

  useEffect(() => {
    if (isObject(state?.order)) {
      removeFromLocalStorage('checkout_data');
      setLocalStorage('reviewOrder', state?.order);
      redirect(`/cart?order=${state?.order?.id}`);
    }
  }, [state, selectedPayment]);

  return (
    <div className="my-5 flex-col">
      <div className="relative my-4 rounded-sm border-[1px] border-solid px-3 dark:border-white/30">
        {isObject(shippingAddress) && (
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
            <tbody>
              <tr className="border-b dark:border-gray-700">
                <td className=" py-4">Contacto</td>
                <th
                  scope="row"
                  className=" break-all px-6 py-4 font-medium text-gray-900 dark:text-white"
                >
                  {shippingAddress?.email}
                </th>
                <td className="py-4">
                  <Link
                    href="/checkout/information"
                    className="font-medium text-purple-600 hover:underline dark:text-purple-500"
                  >
                    Cambiar
                  </Link>
                </td>
              </tr>
              <tr className="border-b dark:border-gray-700">
                <td className=" py-4">Enviar a</td>
                <th
                  scope="row"
                  className="break-all px-6 py-4 font-medium text-gray-900 dark:text-white"
                >
                  {shippingAddress?.firstName}, {shippingAddress?.lastName},{' '}
                  {shippingAddress?.address1}, {shippingAddress?.city}, {shippingAddress?.state},{' '}
                  {shippingAddress?.postcode}, {shippingAddress?.country}
                </th>
                <td className="py-4 text-center">
                  <Link
                    href="/checkout/information"
                    className="font-medium text-purple-600 hover:underline dark:text-purple-500"
                  >
                    Cambiar
                  </Link>
                </td>
              </tr>
              <tr className="border-b dark:border-gray-700">
                <td className=" py-4">Método</td>
                <th
                  scope="row"
                  className="break-all px-6 py-4 font-medium text-gray-900 dark:text-white"
                >
                  {selectedShipping?.methodTitle}
                </th>
                <td className="py-4 text-center">
                  <Link
                    href="/checkout/shipping"
                    className="font-medium text-purple-600 hover:underline dark:text-purple-500"
                  >
                    Cambiar
                  </Link>
                </td>
              </tr>
              <tr className="border-b dark:border-gray-700">
                <td className=" py-4">Pago</td>
                <th
                  scope="row"
                  className="break-all px-6 py-4 font-medium text-gray-900 dark:text-white"
                >
                  {selectedPayment?.methodTitle}
                </th>
                <td className="py-4 text-center">
                  <Link
                    href="/checkout/payment"
                    className="font-medium text-purple-600 hover:underline dark:text-purple-500"
                  >
                    Cambiar
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
      <div className="flex flex-col gap-6">
        <form action={formAction}>
          <div className="my-4 flex flex-col-reverse items-center justify-between gap-4 sm:flex-row sm:gap-0">
            <button className="flex items-center text-purple-600">
              <RightArrowIcon className="" />
              <Link href="/checkout/payment" className=" mx-1 text-sm">
                Volver a pago
              </Link>
            </button>
            <div className="w-full sm:w-2/5">
              <ProceedToCheckout buttonName="Realizar Pedido" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
