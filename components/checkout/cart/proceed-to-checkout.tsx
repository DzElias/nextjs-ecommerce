'use client';

import { Button } from '@nextui-org/react';
import { useFormStatus } from 'react-dom';

export function ProceedToCheckout({ buttonName }: { buttonName: string }) {
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
      {buttonName}
    </Button>
  );
}
