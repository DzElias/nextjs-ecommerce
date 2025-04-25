'use client';

import type React from 'react';

import { PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import LoadingDots from 'components/loading-dots';
import type { ConfigurableProductData, ConfigurableProductIndexData } from 'lib/bagisto/types';
import { useSearchParams } from 'next/navigation';
import { useFormState, useFormStatus } from 'react-dom';
import { addItem } from './actions';

function SubmitButton({
  availableForSale,
  selectedVariantId
}: {
  availableForSale: boolean;
  selectedVariantId: boolean;
}) {
  const { pending } = useFormStatus();
  const buttonClasses =
    'relative flex w-full items-center justify-center rounded-full bg-purple-600 p-4 tracking-wide text-white';
  const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60';

  if (!availableForSale) {
    return (
      <button aria-disabled className={clsx(buttonClasses, disabledClasses)}>
        Agotado
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button
        aria-label="Por favor selecciona una opción"
        aria-disabled
        className={clsx(buttonClasses, disabledClasses)}
      >
        <div className="absolute left-0 ml-4">
          <PlusIcon className="h-5" />
        </div>
        Agregar al Carrito
      </button>
    );
  }

  return (
    <button
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        if (pending) e.preventDefault();
      }}
      aria-label="Agregar al carrito"
      aria-disabled={pending}
      className={clsx(buttonClasses, {
        'hover:opacity-90': true,
        disabledClasses: pending
      })}
    >
      <div className="absolute left-0 ml-4">
        {pending ? <LoadingDots className="mb-3 bg-white" /> : <PlusIcon className="h-5" />}
      </div>
      Agregar al Carrito
    </button>
  );
}

export function AddToCart({
  variants,
  availableForSale,
  index,
  productId
}: {
  variants: ConfigurableProductData[];
  availableForSale: boolean;
  productId: string;
  index: ConfigurableProductIndexData[];
}) {
  const [message, formAction] = useFormState(addItem, null);
  const searchParams = useSearchParams();

  // Function to convert URLSearchParams to object
  const searchParamsToObject = (searchParams: any) => {
    const paramsObject: any = {};
    for (const [key, value] of searchParams.entries()) {
      paramsObject[key] = value;
    }
    return paramsObject;
  };

  // Convert searchParams to object
  const searchParamsObject = searchParamsToObject(searchParams);

  // Function to find the object matching the search value
  const findMatchingObject = (searchParamsObject: any, index: ConfigurableProductIndexData[]) => {
    for (const data of index) {
      let match = true;
      const attributeOptionIds = [];
      for (const attributeOption of data.attributeOptionIds) {
        const attributeCode = attributeOption.attributeCode;
        const attributeOptionId = attributeOption.attributeOptionId;
        if (searchParamsObject[attributeCode] !== attributeOptionId) {
          match = false;
          break;
        }
        attributeOptionIds.push({
          attributeId: Number(attributeOption.attributeId),
          attributeOptionId: Number(attributeOption.attributeOptionId)
        });
      }
      if (match) {
        // Update the data with the new attributeOptionIds
        return { ...data, attributeOptionIds };
      }
    }
    return null;
  };

  // Call the function to find the matching object
  const matchingObject = findMatchingObject(searchParamsObject, index);

  const defaultVariantId = variants.length === 1 ? variants[0]?.id : productId;
  // This code checked configruable product is selected or not
  const buttonStatus = variants.length > 1 ? (matchingObject?.id ? true : false) : true;
  const variant = variants.find((variant: ConfigurableProductData) =>
    variant.options.every((option) => option.id === searchParams.get(variant.code.toLowerCase()))
  );

  const selectedVariantId = matchingObject?.id || defaultVariantId;
  const selectedConfigurableOption = Number(
    Object.keys(searchParamsObject).length
      ? matchingObject
        ? matchingObject?.id
        : ''
      : variant?.id || defaultVariantId
  );
  const superAttribute = matchingObject?.attributeOptionIds || [];
  const actionWithVariant = formAction.bind(null, {
    selectedVariantId,
    selectedConfigurableOption,
    superAttribute
  });

  return (
    <form action={actionWithVariant}>
      <SubmitButton availableForSale={availableForSale} selectedVariantId={buttonStatus} />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
