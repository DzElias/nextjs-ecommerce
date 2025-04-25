import FormPlaceHolder from 'components/checkout/place-holder';
import { getCart } from 'lib/bagisto';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { cookies } from 'next/headers';

const PaymentPage = dynamic(() => import('components/checkout/payment'), {
  loading: () => <FormPlaceHolder />,
  ssr: false
});

const payment = async () => {
  const cartId = cookies().get('bagisto_session')?.value;
  const cart = await getCart(cartId);
  console.log(cart?.shippingAddress);
  console.log(cart?.selectedShippingRate);

  return (
    <PaymentPage
      selectedPayment={cart?.payment}
      shippingAddress={cart?.shippingAddress}
      selectedShipping={cart?.selectedShippingRate}
    />
  );
};

export default payment;

export const metadata: Metadata = {
  title: 'Pago',
  description: 'Completa el pago de tu regalo'
};
