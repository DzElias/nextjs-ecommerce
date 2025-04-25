'use client';

import { Select, SelectItem } from '@nextui-org/react';
import type { CountryArrayDataType } from 'lib/bagisto/types';
import { useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';

export default function RegionDropDown({
  countries,
  defaultValue,
  errorMsg,
  className,
  label
}: {
  countries: CountryArrayDataType[];
  defaultValue?: string;
  errorMsg?: string;
  className?: string;
  label: string;
}) {
  const { pending } = useFormStatus();
  const [states, setStates] = useState<any[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('');

  useEffect(() => {
    // Obtener el valor del país seleccionado del formulario
    const countrySelect = document.querySelector('select[name="country"]') as HTMLSelectElement;
    if (countrySelect) {
      const countryValue = countrySelect.value;
      setSelectedCountry(countryValue);

      // Buscar el país seleccionado en la lista de países
      const country = countries.find((c) => c.code === countryValue);
      if (country && country.states) {
        setStates(country.states);
      } else {
        setStates([]);
      }
    }

    // Agregar un event listener para detectar cambios en el select de país
    const handleCountryChange = () => {
      const countryValue = countrySelect.value;
      setSelectedCountry(countryValue);

      // Buscar el país seleccionado en la lista de países
      const country = countries.find((c) => c.code === countryValue);
      if (country && country.states) {
        setStates(country.states);
      } else {
        setStates([]);
      }
    };

    countrySelect?.addEventListener('change', handleCountryChange);

    return () => {
      countrySelect?.removeEventListener('change', handleCountryChange);
    };
  }, [countries]);

  return (
    <div className={className}>
      <Select
        name="state"
        label={label}
        defaultSelectedKeys={defaultValue ? [defaultValue] : undefined}
        isDisabled={states.length === 0 || pending}
        isInvalid={!!errorMsg}
        errorMessage={errorMsg}
        variant="bordered"
        className="w-full"
      >
        {states.map((state) => (
          <SelectItem key={state.code} value={state.code}>
            {state.defaultName}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
