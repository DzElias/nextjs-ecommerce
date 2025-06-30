'use client';

import { Divider } from '@nextui-org/react';
import type { Cart } from 'lib/types/cart';
import { formatPrice } from 'lib/utils';

interface CartSummaryProps {
  cart: Cart;
}

const CartSummary = ({ cart }: CartSummaryProps) => {
  return (
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
              -{cart.formattedPrice?.discount || formatPrice(cart.discountAmount || '0')}
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
  );
};

export default CartSummary;
