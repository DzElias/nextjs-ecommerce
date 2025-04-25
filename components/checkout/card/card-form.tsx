'use client';
import type React from 'react';
import { useEffect, useState } from 'react';

import { Button } from '@nextui-org/react';
import { getLocalStorage, setLocalStorage } from 'lib/utils';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useFormState, useFormStatus } from 'react-dom';
import type { CardInfoReturn } from '../gift-actions';
import { saveCardInfo } from '../gift-actions';
import { CardIcon } from '../icons/card-icon';

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

const CardForm = () => {
  const giftData = getLocalStorage('gift_data', true);
  const initialState: CardInfoReturn = {
    cardInfo: {
      message:
        giftData?.cardInfo?.message ||
        '¡Qué felicidad poder celebrar contigo otro momento especial!\n\nEspero que este regalo haga tu día más alegre.\n\n¡Un abrazo!',
      cardTemplate: giftData?.cardInfo?.cardTemplate || 'template1',
      senderName: giftData?.recipientInfo?.senderName || ''
    },
    success: false
  };

  const [state, formAction] = useFormState(saveCardInfo, initialState);
  const [message, setMessage] = useState(initialState.cardInfo?.message?.toString() || '');
  const [selectedTemplate, setSelectedTemplate] = useState(
    initialState.cardInfo?.cardTemplate?.toString() || 'template1'
  );

  useEffect(() => {
    if (state?.success) {
      const currentGiftData = getLocalStorage('gift_data', true) || {};
      setLocalStorage('gift_data', {
        ...currentGiftData,
        cardInfo: state.cardInfo
      });
      redirect('/checkout/confirmation');
    }
  }, [state]);

  // Verificar si tenemos la información previa
  if (!giftData?.whatsappInfo || !giftData?.recipientInfo) {
    redirect('/checkout/recipient');
  }

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleTemplateChange = (template: string) => {
    setSelectedTemplate(template);
  };

  return (
    <div className="my-5">
      <div className="mb-6 flex items-center justify-center">
        <div className="rounded-full bg-purple-100 p-4">
          <CardIcon className="h-12 w-12 text-purple-600" />
        </div>
      </div>

      <h1 className="mb-6 text-center text-2xl font-bold text-purple-800">¡Regalo seleccionado!</h1>

      <div className="mb-4">
        <p className="text-center font-medium text-purple-800">
          Crea una experiencia increíble editando la tarjeta digital que acompaña al regalo
        </p>
        <p className="mt-1 text-center text-sm text-gray-600">
          Haz clic en los campos de texto para editar
        </p>
      </div>

      <form action={formAction} className="space-y-6">
        <input type="hidden" name="cardTemplate" value={selectedTemplate} />
        <input type="hidden" name="senderName" value={giftData?.recipientInfo?.senderName || ''} />

        <div className="relative rounded-lg border border-gray-200 bg-gray-50 p-4">
          <div className={`card-template ${selectedTemplate} relative mx-auto max-w-md`}>
            <div className="overflow-hidden rounded-lg bg-white shadow-md">
              <div className="relative">
                {selectedTemplate === 'template1' && (
                  <div className="bg-gradient-to-tr from-purple-900 via-purple-600 to-red-400 p-6">
                    <div className="rounded-md border border-dashed border-white/70 p-4">
                      <div className="mb-4 text-center font-medium text-white">
                        {giftData?.recipientInfo?.recipientName}
                      </div>

                      <textarea
                        name="message"
                        value={message}
                        onChange={handleMessageChange}
                        className="w-full resize-none border-none bg-transparent text-center text-white focus:outline-none focus:ring-0"
                        rows={6}
                      />

                      <div className="mt-4 text-center font-medium text-white">
                        {giftData?.recipientInfo?.senderName}
                      </div>
                    </div>
                  </div>
                )}

                {selectedTemplate === 'template2' && (
                  <div className="bg-gradient-to-br from-teal-500 to-yellow-400 p-6">
                    <div className="rounded-md border-2 border-white/70 p-4">
                      <div className="mb-4 text-center font-medium text-white">
                        {giftData?.recipientInfo?.recipientName}
                      </div>

                      <textarea
                        name="message"
                        value={message}
                        onChange={handleMessageChange}
                        className="w-full resize-none border-none bg-transparent text-center text-white focus:outline-none focus:ring-0"
                        rows={6}
                      />

                      <div className="mt-4 text-center font-medium text-white">
                        {giftData?.recipientInfo?.senderName}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => handleTemplateChange('template1')}
              className={`h-8 w-8 rounded-full ${
                selectedTemplate === 'template1' ? 'ring-2 ring-purple-600 ring-offset-2' : ''
              } bg-gradient-to-tr from-purple-900 via-purple-600 to-red-400`}
            />
            <button
              type="button"
              onClick={() => handleTemplateChange('template2')}
              className={`h-8 w-8 rounded-full ${
                selectedTemplate === 'template2' ? 'ring-2 ring-purple-600 ring-offset-2' : ''
              } bg-gradient-to-br from-teal-500 to-yellow-400`}
            />
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-sm text-purple-700">
          <span className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clipRule="evenodd"
              />
            </svg>
            Podrás grabar un video para {giftData?.recipientInfo?.recipientName} después del pago
          </span>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <Link
            href="/checkout/whatsapp"
            className="text-purple-600 transition-colors hover:text-purple-800"
          >
            Volver
          </Link>

          <div className="w-full sm:w-2/3">
            <ProceedButton />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CardForm;
