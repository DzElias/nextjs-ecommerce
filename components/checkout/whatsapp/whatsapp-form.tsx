'use client';
import { Button } from '@nextui-org/react';
import { getLocalStorage, setLocalStorage } from 'lib/utils';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import InputText from '../cart/input';
import type { WhatsappInfoReturn } from '../gift-actions';
import { saveWhatsappInfo } from '../gift-actions';
import { WhatsappIcon } from '../icons/whatsapp-icon';

// Componente local para el botón de proceder
function ProceedButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      color="primary"
      className="w-full rounded-full"
      size="lg"
      isLoading={pending}
      disabled={pending}
    >
      Continuar
    </Button>
  );
}

const WhatsappForm = () => {
  const giftData = getLocalStorage('gift_data', true);
  const initialState: WhatsappInfoReturn = {
    whatsappInfo: {
      senderWhatsapp: giftData?.whatsappInfo?.senderWhatsapp || '',
      recipientWhatsapp: giftData?.whatsappInfo?.recipientWhatsapp || ''
    },
    success: false
  };

  const [state, formAction] = useFormState(saveWhatsappInfo, initialState);

  useEffect(() => {
    if (state?.success) {
      const currentGiftData = getLocalStorage('gift_data', true) || {};
      setLocalStorage('gift_data', {
        ...currentGiftData,
        whatsappInfo: state.whatsappInfo
      });
      redirect('/checkout/card');
    }
  }, [state]);

  // Verificar si tenemos la información del remitente y destinatario
  if (!giftData?.recipientInfo) {
    redirect('/checkout/recipient');
  }

  return (
    <div className="my-5">
      <div className="mb-6 flex items-center justify-center">
        <div className="rounded-full bg-purple-100 p-4">
          <WhatsappIcon className="h-12 w-12 text-purple-600" />
        </div>
      </div>

      <h1 className="mb-6 text-center text-2xl font-bold text-purple-800">¡Regalo seleccionado!</h1>

      <form action={formAction} className="space-y-6">
        <div className="rounded-lg border border-purple-100 bg-white p-6 shadow-sm">
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Tu WhatsApp:</label>
              <p className="mb-2 text-sm text-gray-600">
                Para que la persona que recibe el regalo pueda agradecerte y podamos contactarte si
                es necesario
              </p>
              <InputText
                className="max-w-full"
                name="senderWhatsapp"
                defaultValue={initialState.whatsappInfo?.senderWhatsapp?.toString()}
                errorMsg={state?.errors?.senderWhatsapp?.join(', ')}
                label="Tu WhatsApp"
              />
            </div>

            <div className="mt-6">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                WhatsApp que recibirá el regalo:
              </label>
              <p className="mb-2 text-sm text-gray-600">
                Usaremos el número para entregar el regalo, recopilar la dirección de entrega y otra
                información necesaria
              </p>
              <InputText
                className="max-w-full"
                name="recipientWhatsapp"
                defaultValue={initialState.whatsappInfo?.recipientWhatsapp?.toString()}
                errorMsg={state?.errors?.recipientWhatsapp?.join(', ')}
                label="WhatsApp que recibirá"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <Link
            href="/checkout/recipient"
            className="text-purple-600 transition-colors hover:text-purple-800"
          >
            Volver
          </Link>

          <div className="w-full sm:w-2/3">
            <ProceedButton />
          </div>
        </div>
      </form>

      <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-4">
        <div className="flex items-center justify-center">
          <div className="max-w-xs overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md">
            <div className="flex items-center bg-green-500 p-2">
              <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-white">
                <WhatsappIcon className="h-5 w-5 text-green-500" />
              </div>
              <span className="font-medium text-white">GiftStore</span>
            </div>
            <div className="p-3 text-sm">
              <p className="text-gray-700">¡Hola, Ana! ¿Cómo estás?</p>
              <p className="mt-1 text-gray-700">
                Tenemos una sorpresa para ti: María acaba de enviarte un regalo 🎁
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsappForm;
