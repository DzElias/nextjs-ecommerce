'use client';

import { Input } from '@nextui-org/react';
import clsx from 'clsx';

export default function InputText({
  name,
  label,
  defaultValue,
  errorMsg,
  className
}: {
  name: string;
  label: string;
  defaultValue?: string;
  errorMsg?: string;
  className?: string;
}) {
  return (
    <div className={clsx('w-full', className)}>
      <Input
        name={name}
        label={label}
        defaultValue={defaultValue}
        isInvalid={!!errorMsg}
        errorMessage={errorMsg}
        variant="bordered"
        className="w-full"
      />
    </div>
  );
}
