// components/checkout/cart/CartWrapper.tsx
import { getCart } from 'lib/bagisto';
import { cookies } from 'next/headers';
import Cart from './cart';

export default async function CartWrapper() {
  const cartId = cookies().get('bagisto_session')?.value;
  const cartData = await getCart(cartId);

  return <Cart initialCart={cartData} />;
}
