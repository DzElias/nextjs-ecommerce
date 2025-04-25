'use client';
import { Checkbox } from '@nextui-org/react';
import type { CountryArrayDataType } from 'lib/bagisto/types';
import { createCheckoutProceess, setLocalStorage } from 'lib/utils';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { getLocalStorage } from '../../../lib/utils';
import { createCheckoutAddress } from '../action';
import InputText from '../cart/input';
import { ProceedToCheckout } from '../cart/proceed-to-checkout';
import RegionDropDown from '../region-drop-down';
import Selectbox from '../select-box';

const GuestCheckOutForm = ({ countries }: { countries: CountryArrayDataType[] }) => {
  const values = getLocalStorage('shippingAddress', true);
  const initialState = {
    ...values?.shipping
  };
  const [state, formAction] = useFormState(createCheckoutAddress, initialState);
  useEffect(() => {
    if (state?.shippingAddress) {
      createCheckoutProceess(state);
      setLocalStorage('shippingAddress', state?.shippingAddress);
      redirect('/checkout/shipping');
    }
  }, [state]);

  return (
    <form action={formAction} className="my-5">
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-bold">Contacto</h1>
        <InputText
          className="max-w-full"
          name="email"
          defaultValue={state.email}
          errorMsg={state?.errors?.email?.join(', ')}
          label="Ingrese Email"
        />
        <Checkbox defaultSelected className="" color="primary">
          <span className="text-neutral-400 dark:text-white">Envíame noticias y ofertas</span>
        </Checkbox>
      </div>
      <div className="my-7 grid grid-cols-6 gap-4">
        <h1 className="col-span-6 text-2xl font-bold ">Dirección de envío</h1>
        <Selectbox
          countries={countries}
          className="col-span-6"
          nameAttr="country"
          defaultvalue={state?.country}
          errorMsg={state?.errors?.country?.join(', ')}
          label="País/Región"
        />
        <InputText
          className="col-span-3"
          name="firstName"
          defaultValue={state.firstName}
          errorMsg={state?.errors?.firstName?.join(', ')}
          label="Nombre"
        />
        <InputText
          className="col-span-3"
          name="lastName"
          defaultValue={state.lastName}
          label="Apellido"
        />
        <InputText
          className="col-span-6"
          name="address1"
          label="Dirección"
          defaultValue={state.address1}
          errorMsg={state?.errors?.address1?.join(', ')}
        />
        <InputText
          className="col-span-6"
          name="address2"
          label="Apartamento, suite, etc. (opcional)"
        />
        <InputText
          className="col-span-6"
          name="phone"
          label="Teléfono"
          defaultValue={state.phone}
          errorMsg={state?.errors?.phone?.join(', ')}
        />
        <InputText
          className="col-span-6 sm:col-span-2"
          name="city"
          label="Ciudad"
          defaultValue={state.city}
          errorMsg={state?.errors?.city?.join(', ')}
        />
        <RegionDropDown
          countries={countries}
          errorMsg={state?.errors?.state?.join(', ')}
          defaultValue={state?.state}
          className="col-span-3 sm:col-span-2"
          label="Estado"
        />
        <InputText
          className="col-span-3 sm:col-span-2"
          name="postcode"
          defaultValue={state.postcode}
          label="Código Postal"
          errorMsg={state?.errors?.postcode?.join(', ')}
        />

        <Checkbox className="col-span-6" color="primary">
          <span className="text-neutral-400 dark:text-white">
            Guardar esta información para la próxima vez
          </span>
        </Checkbox>
        <div className="col-span-6 flex w-full justify-end ">
          <div className="w-full sm:w-2/5">
            <ProceedToCheckout buttonName="Continuar a envío" />
          </div>
        </div>
      </div>
    </form>
  );
};

export default GuestCheckOutForm;
