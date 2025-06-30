'use client';

import type { CountryArrayDataType } from 'lib/bagisto/types';
import InputText from '../cart/input'; // Ajusta la ruta si es necesario
import RegionDropDown from '../region-drop-down'; // Ajusta la ruta
import Selectbox from '../select-box'; // Ajusta la ruta

interface ShippingAddressSectionProps {
  countries: CountryArrayDataType[];
  defaultValues: {
    country?: string;
    firstName?: string;
    lastName?: string;
    address1?: string;
    address2?: string;
    phone?: string;
    city?: string;
    state?: string;
    postcode?: string;
  };
  errors?: {
    country?: string[];
    firstName?: string[];
    lastName?: string[];
    address1?: string[];
    address2?: string[];
    phone?: string[];
    city?: string[];
    state?: string[];
    postcode?: string[];
  };
}

const ShippingAddressSection = ({
  countries,
  defaultValues,
  errors
}: ShippingAddressSectionProps) => {
  return (
    <div className="my-7 grid grid-cols-6 gap-4">
      <h1 className="col-span-6 text-2xl font-bold ">Dirección de envío</h1>
      <Selectbox
        countries={countries}
        className="col-span-6"
        nameAttr="country"
        defaultvalue={defaultValues.country}
        errorMsg={errors?.country?.join(', ')}
        label="País/Región"
        required
      />
      <InputText
        className="col-span-3"
        name="firstName"
        defaultValue={defaultValues.firstName}
        errorMsg={errors?.firstName?.join(', ')}
        label="Nombre"
        required
      />
      <InputText
        className="col-span-3"
        name="lastName"
        defaultValue={defaultValues.lastName}
        errorMsg={errors?.lastName?.join(', ')}
        label="Apellido"
        required
      />
      <InputText
        className="col-span-6"
        name="address1"
        label="Dirección"
        defaultValue={defaultValues.address1}
        errorMsg={errors?.address1?.join(', ')}
        required
      />
      <InputText
        className="col-span-6"
        name="address2"
        label="Apartamento, suite, etc. (opcional)"
        defaultValue={defaultValues.address2}
        errorMsg={errors?.address2?.join(', ')}
      />
      <InputText
        className="col-span-6"
        name="phone"
        type="tel" // Especificar tipo tel
        label="Teléfono"
        defaultValue={defaultValues.phone}
        errorMsg={errors?.phone?.join(', ')}
        required
      />
      <InputText
        className="col-span-6 sm:col-span-2"
        name="city"
        label="Ciudad"
        defaultValue={defaultValues.city}
        errorMsg={errors?.city?.join(', ')}
        required
      />
      <RegionDropDown
        countries={countries}
        errorMsg={errors?.state?.join(', ')}
        defaultValue={defaultValues.state}
        className="col-span-3 sm:col-span-2"
        label="Estado"
        name="state" // Asegurar que el name prop se pasa a RegionDropDown si es necesario para el form
        required
      />
      <InputText
        className="col-span-3 sm:col-span-2"
        name="postcode"
        label="Código Postal"
        defaultValue={defaultValues.postcode}
        errorMsg={errors?.postcode?.join(', ')}
        required
      />
    </div>
  );
};

export default ShippingAddressSection;
