'use client';

// Removed Divider, DeleteItemButton, EditItemQuantityButton, formatPrice, Image imports as they are now in subcomponents
import { Cart, CartItem } from 'lib/types/cart'; // Import Cart and CartItem types
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CartItemDisplay from './CartItemDisplay'; // Import CartItemDisplay
import CartSummary from './CartSummary'; // Import CartSummary

export default function CartClient({ initialCart }: { initialCart: Cart | null | undefined }) {
  const [cart, setCart] = useState<Cart | null | undefined>(initialCart);
  const [loading, setLoading] = useState(false); // Keep loading state for now
  const router = useRouter();

  useEffect(() => {
    setCart(initialCart);
  }, [initialCart]);

  // Initial loading state could be true if initialCart is not yet loaded by parent
  // Or, if initialCart is passed, but we want to show a brief loading for UI consistency
  // For now, this loading state seems to be for internal operations if any were added.
  // If initialCart is guaranteed to be loaded by the parent, this loading might be removable
  // or used for actions within this component (e.g., during quantity updates if they were handled here).

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
          {cart.lines.map((item: CartItem) => (
            <CartItemDisplay key={item.id} item={item} />
          ))}
        </div>
      </div>

      <CartSummary cart={cart} />
    </div>
  );
}
