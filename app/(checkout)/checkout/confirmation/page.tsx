import FormPlaceHolder from 'components/checkout/place-holder';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const ConfirmationForm = dynamic(
  () => import('components/checkout/confirmation/confirmation-form'),
  {
    loading: () => <FormPlaceHolder />,
    ssr: false
  }
);

export default async function ConfirmationPage() {
  return <ConfirmationForm />;
}

export const metadata: Metadata = {
  title: 'Confirmación de Información',
  description: 'Confirma los detalles de tu regalo antes de proceder al pago'
};
