'use client';

import { Select, SelectItem } from '@nextui-org/react';
import clsx from 'clsx';
import type { CountryArrayDataType } from 'lib/bagisto/types';

export default function Selectbox({
  countries,
  nameAttr,
  defaultvalue,
  errorMsg,
  className,
  label
}: {
  countries: CountryArrayDataType[];
  nameAttr: string;
  defaultvalue?: string;
  errorMsg?: string;
  className?: string;
  label: string;
}) {
  return (
    <div className={clsx('w-full', className)}>
      <Select
        name={nameAttr}
        label={label}
        defaultSelectedKeys={defaultvalue ? [defaultvalue] : undefined}
        isInvalid={!!errorMsg}
        errorMessage={errorMsg}
        variant="bordered"
        className="w-full"
      >
        {countries.map((country) => (
          <SelectItem key={country.code} value={country.code}>
            {country.name}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
