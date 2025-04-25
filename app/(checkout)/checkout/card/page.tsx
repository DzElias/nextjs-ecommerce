import FormPlaceHolder from 'components/checkout/place-holder';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const CardForm = dynamic(() => import('components/checkout/card/card-form'), {
  loading: () => <FormPlaceHolder />,
  ssr: false
});

export default async function CardPage() {
  return <CardForm />;
}

export const metadata: Metadata = {
  title: 'Personalización de Tarjeta',
  description: 'Personaliza la tarjeta digital que acompaña tu regalo'
};
