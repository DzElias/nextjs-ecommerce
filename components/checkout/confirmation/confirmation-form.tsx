'use client';
import { Button } from '@nextui-org/react';
import { getLocalStorage, setLocalStorage } from 'lib/utils';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import type { ConfirmationReturn } from '../gift-actions';
import { confirmGiftInfo } from '../gift-actions';
import { CheckIcon } from '../icons/check-icon';

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
      Todo esta correcto
    </Button>
  );
}

const ConfirmationForm = () => {
  const giftData = getLocalStorage('gift_data', true);
  // Definir el estado inicial con el tipo correcto
  const initialState: ConfirmationReturn = {
    confirmed: false,
    success: false
  };

  const [state, formAction] = useFormState(confirmGiftInfo, initialState);

  useEffect(() => {
    if (state?.success) {
      const currentGiftData = getLocalStorage('gift_data', true) || {};
      setLocalStorage('gift_data', {
        ...currentGiftData,
        confirmed: true
      });
      redirect('/checkout/payment');
    }
  }, [state]);

  // Verificar si tenemos toda la información necesaria
  if (!giftData?.cardInfo || !giftData?.whatsappInfo || !giftData?.recipientInfo) {
    redirect('/checkout/recipient');
  }

  return (
    <div className="my-5">
      <div className="mb-6 flex items-center justify-center">
        <div className="rounded-full bg-purple-100 p-4">
          <CheckIcon className="h-12 w-12 text-purple-600" />
        </div>
      </div>

      <h1 className="mb-6 text-center text-2xl font-bold text-purple-800">
        Confirma la información
      </h1>
      <p className="mb-8 text-center text-gray-600">Después del pago, no se podrá modificar</p>

      <form action={formAction} className="space-y-6">
        <div className="space-y-4">
          <div className="rounded-lg border border-purple-100 bg-white p-6 shadow-sm">
            <h2 className="mb-2 text-sm font-medium text-gray-500">Tú:</h2>
            <div className="rounded-md bg-gray-50 p-4">
              <p className="font-medium text-gray-800">{giftData.recipientInfo.senderName}</p>
              <p className="text-gray-600">{giftData.whatsappInfo.senderWhatsapp}</p>
            </div>
          </div>

          <div className="rounded-lg border border-purple-100 bg-white p-6 shadow-sm">
            <h2 className="mb-2 text-sm font-medium text-gray-500">
              Enviarás el regalo al WhatsApp de:
            </h2>
            <div className="rounded-md bg-gray-50 p-4">
              <p className="font-medium text-gray-800">{giftData.recipientInfo.recipientName}</p>
              <p className="text-gray-600">{giftData.whatsappInfo.recipientWhatsapp}</p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <Link
            href="/checkout/card"
            className="flex items-center gap-1 text-purple-600 transition-colors hover:text-purple-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Editar información
          </Link>
        </div>

        <div className="mt-6 flex justify-center">
          <div className="w-full sm:w-2/3">
            <ProceedButton />
          </div>
        </div>
      </form>

      <div className="mt-6 text-center">
        <Link
          href="/checkout/card"
          className="flex items-center justify-center gap-1 text-sm text-purple-600 transition-colors hover:text-purple-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
              clipRule="evenodd"
            />
          </svg>
          Ver como se entrega
        </Link>
      </div>
    </div>
  );
};

export default ConfirmationForm;
