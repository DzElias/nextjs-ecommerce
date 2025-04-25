import FormPlaceHolder from 'components/checkout/place-holder';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const RecipientForm = dynamic(() => import('components/checkout/recipient/recipient-form'), {
  loading: () => <FormPlaceHolder />,
  ssr: false
});

export default async function RecipientPage() {
  return <RecipientForm />;
}

export const metadata: Metadata = {
  title: 'Selección de Destinatario',
  description: 'Selecciona quién envía y quién recibe el regalo'
};
