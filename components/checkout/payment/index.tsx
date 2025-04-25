'use client';

import type React from 'react';

import { Radio, RadioGroup, cn } from '@nextui-org/react';
import { ProceedToCheckout } from 'components/checkout/cart/proceed-to-checkout';
import RightArrowIcon from 'components/icons/right-arrow';
import WalletLogo from 'components/icons/wallet-logo';
import type { ShippingAddressDataType, selectedPaymentMethodType } from 'lib/bagisto/types';
import { isArray, isObject } from 'lib/type-guards';
import { createCheckoutProceess, getLocalStorage } from 'lib/utils';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { createPaymentMethod } from '../action';
// Define a type for the props
type CustomRadioProps = {
  children: React.ReactNode;
  description?: string;
  value: string;
} & typeof Radio.defaultProps;

export default function PaymentPage({
  selectedPayment,
  selectedShipping,
  shippingAddress
}: {
  selectedPayment?: selectedPaymentMethodType;
  selectedShipping?: any;
  shippingAddress?: ShippingAddressDataType;
}) {
  const getCheckoutData = getLocalStorage('checkout_data', true);
  const methods = getCheckoutData?.paymentMethods;
  const initialState = {
    method: selectedPayment?.method || ''
  };

  const [state, formAction] = useFormState(createPaymentMethod, initialState);
  useEffect(() => {
    if (isObject(state?.payment)) {
      createCheckoutProceess(state);
      redirect('/checkout/place-order');
    }
  }, [state, selectedShipping]);

  return (
    <div className="my-5 flex-col">
      <div className="relative my-4 rounded-lg border-[1px] border-solid px-3 dark:border-white/30">
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
            </tbody>
          </table>
        )}
      </div>
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold ">Método de pago</h1>
        <form action={formAction}>
          <div className="flex flex-col gap-5">
            {isArray(methods) && (
              <RadioGroup label="" defaultValue={state?.method} name="method">
                {methods.map((method: any) => (
                  <CustomRadio
                    className="my-1 border border-solid border-neutral-300 dark:border-neutral-500"
                    key={method?.sort}
                    description={method?.description}
                    value={method?.method}
                  >
                    <span className="text-neutral-700 dark:text-white">{method?.methodTitle}</span>
                  </CustomRadio>
                ))}
              </RadioGroup>
            )}
          </div>
          <div className="my-4 flex flex-col-reverse items-center justify-between gap-4 sm:flex-row sm:gap-0">
            <button className="flex items-center text-purple-600">
              <RightArrowIcon className="" />
              <Link href="/checkout/shipping" className=" mx-1 text-sm">
                Volver a Envío
              </Link>
            </button>
            <div className="w-full sm:w-2/5">
              <ProceedToCheckout buttonName="Pagar Ahora" />
            </div>
          </div>
        </form>
      </div>
      {isArray(!methods) && (
        <div className="flex flex-col gap-2  ">
          <h1 className="text-2xl font-bold ">Pago</h1>
          <p className="text-neutral-500">Todas las transacciones son seguras y encriptadas.</p>
          <div className="flex h-32 flex-col items-center justify-center gap-2 rounded-sm bg-neutral-100 px-3">
            <WalletLogo className="text-neutral-400" />
            <p className="text-center text-neutral-500">
              Esta tienda no puede aceptar pagos en este momento.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

const CustomRadio = (props: CustomRadioProps) => {
  const { children, ...otherProps } = props;
  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          'inline-flex m-0 bg-transparent  hover:bg-transparent items-center',
          'flex-row max-w-full cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent',
          'data-[selected=true]:border-primary'
        )
      }}
    >
      {children}
    </Radio>
  );
};
