'use client';

import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import LoadingDots from 'components/loading-dots';
import type { CartItem } from 'lib/bagisto/types';
import type React from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { updateItemQuantity } from './actions';

function SubmitButton({ type }: { type: 'plus' | 'minus' }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        if (pending) e.preventDefault();
      }}
      aria-label={type === 'plus' ? 'Aumentar cantidad' : 'Reducir cantidad'}
      aria-disabled={pending}
      className={clsx(
        'ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full px-2 transition-all duration-200 hover:text-purple-600 dark:hover:text-purple-400',
        {
          'cursor-not-allowed opacity-50': pending,
          'ml-auto': type === 'minus'
        }
      )}
    >
      {pending ? (
        <LoadingDots className="bg-black dark:bg-white" />
      ) : type === 'plus' ? (
        <PlusIcon className="h-4 w-4" />
      ) : (
        <MinusIcon className="h-4 w-4" />
      )}
    </button>
  );
}

export function EditItemQuantityButton({ item, type }: { item: CartItem; type: 'plus' | 'minus' }) {
  const [message, formAction] = useFormState(updateItemQuantity, null);
  const payload = {
    lineId: Number(item.id),
    quantity: type === 'plus' ? item.quantity + 1 : item.quantity - 1
  };
  const actionWithVariant = formAction.bind(null, payload);

  return (
    <form action={actionWithVariant}>
      <SubmitButton type={type} />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
