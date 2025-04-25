'use client';
import { Button } from '@nextui-org/react';
import { getLocalStorage, setLocalStorage } from 'lib/utils';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import InputText from '../cart/input';
import type { RecipientInfoReturn } from '../gift-actions';
import { saveRecipientInfo } from '../gift-actions';
import { GiftBox } from '../icons/gift-box';

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

const RecipientForm = () => {
  const giftData = getLocalStorage('gift_data', true);
  const initialState: RecipientInfoReturn = {
    recipientInfo: {
      senderName: giftData?.recipientInfo?.senderName || '',
      recipientName: giftData?.recipientInfo?.recipientName || ''
    },
    success: false
  };

  const [state, formAction] = useFormState(saveRecipientInfo, initialState);

  useEffect(() => {
    if (state?.success) {
      const currentGiftData = getLocalStorage('gift_data', true) || {};
      setLocalStorage('gift_data', {
        ...currentGiftData,
        recipientInfo: state.recipientInfo
      });
      redirect('/checkout/whatsapp');
    }
  }, [state]);

  return (
    <div className="my-5">
      <div className="mb-6 flex items-center justify-center">
        <div className="rounded-full bg-purple-100 p-4">
          <GiftBox className="h-12 w-12 text-purple-600" />
        </div>
      </div>

      <h1 className="mb-6 text-center text-2xl font-bold text-purple-800">Regalo seleccionado!</h1>

      <form action={formAction} className="space-y-6">
        <div className="rounded-lg border border-purple-100 bg-white p-6 shadow-sm">
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">De:</label>
              <InputText
                className="max-w-full"
                name="senderName"
                defaultValue={initialState.recipientInfo?.senderName?.toString()}
                errorMsg={state?.errors?.senderName?.join(', ')}
                label="Nombre de quien envía el regalo"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Para:</label>
              <InputText
                className="max-w-full"
                name="recipientName"
                defaultValue={initialState.recipientInfo?.recipientName?.toString()}
                errorMsg={state?.errors?.recipientName?.join(', ')}
                label="Nombre de quien recibe el regalo"
              />
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-gray-600">
          Quien recibe el regalo escogera los detalles del producto dentro de las opciones
          disponibles.
        </p>

        <div className="mt-6 flex justify-center">
          <div className="w-full sm:w-2/3">
            <ProceedButton />
          </div>
        </div>
      </form>
    </div>
  );
};

export default RecipientForm;
