import FormPlaceHolder from 'components/checkout/place-holder';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const WhatsappForm = dynamic(() => import('components/checkout/whatsapp/whatsapp-form'), {
  loading: () => <FormPlaceHolder />,
  ssr: false
});

export default async function WhatsappPage() {
  return <WhatsappForm />;
}

export const metadata: Metadata = {
  title: 'Información de WhatsApp',
  description: 'Ingresa los números de WhatsApp para la entrega del regalo'
};
