'use client';
import { Checkbox } from '@nextui-org/react';
import type { CountryArrayDataType } from 'lib/bagisto/types';
import { createCheckoutProceess, setLocalStorage } from 'lib/utils';
import { useRouter } from 'next/navigation'; // Import useRouter
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { getLocalStorage } from '../../../lib/utils';
import { createCheckoutAddress } from '../action';
// InputText, RegionDropDown, Selectbox will be used by subcomponents
import { ProceedToCheckout } from '../cart/proceed-to-checkout';
import ContactSection from './ContactSection'; // Import ContactSection
import ShippingAddressSection from './ShippingAddressSection'; // Import ShippingAddressSection
import { GuestCheckoutFormState } from 'lib/types/checkout'; // Import the new state type
import { updateCheckoutDataInLocalStorage } from 'lib/utils'; // Import new localStorage function

const GuestCheckOutForm = ({ countries }: { countries: CountryArrayDataType[] }) => {
  const router = useRouter(); // Initialize useRouter

  // Lectura inicial de localStorage para 'checkout_data' o 'shippingAddress'
  // Para mantener la compatibilidad con el `initialState` que espera campos individuales,
  // podríamos leer el `shippingAddress` de `checkout_data` si existe.
  const initialCheckoutData = getLocalStorage('checkout_data', true) as Partial<GuestCheckoutFormState> | null;
  const initialShippingValues = initialCheckoutData?.shippingAddress || getLocalStorage('shippingAddress', true) || {};

  const initialState: GuestCheckoutFormState = {
    email: initialShippingValues.email || '',
    country: initialShippingValues.country || '',
    firstName: initialShippingValues.firstName || '',
    lastName: initialShippingValues.lastName || '',
    address1: initialShippingValues.address1 || '',
    address2: initialShippingValues.address2 || '',
    phone: initialShippingValues.phone || '',
    city: initialShippingValues.city || '',
    state: initialShippingValues.state || '',
    postcode: initialShippingValues.postcode || '',
    errors: undefined,
    shippingAddress: null, // Initialize as null
    success: undefined,
    message: undefined
  };

  const [state, formAction] = useFormState<GuestCheckoutFormState, FormData>(createCheckoutAddress, initialState);

  useEffect(() => {
    // state.shippingAddress es la dirección validada devuelta por la server action
    if (state.success && state.shippingAddress) {
      // Actualizamos el objeto 'checkout_data' en localStorage con la nueva dirección de envío.
      // La server action `createCheckoutAddress` debería devolver un objeto que contenga `shippingAddress`.
      updateCheckoutDataInLocalStorage({ shippingAddress: state.shippingAddress });

      // Eliminamos la clave antigua 'shippingAddress' si existía, para evitar redundancia.
      removeFromLocalStorage('shippingAddress');

      router.push('/checkout/shipping');
    }
    // Podríamos manejar state.errors aquí para mostrar un toast global o algo similar
  }, [state, router]);

  return (
    <form action={formAction} className="my-5">
      <ContactSection email={state.email} emailErrorMsg={state.errors?.email?.join(', ')} />

      <ShippingAddressSection
        countries={countries}
        defaultValues={{
          country: state.country || initialState.country,
          firstName: state.firstName || initialState.firstName,
          lastName: state.lastName || initialState.lastName,
          address1: state.address1 || initialState.address1,
          address2: state.address2 || initialState.address2,
          phone: state.phone || initialState.phone,
          city: state.city || initialState.city,
          state: state.state || initialState.state,
          postcode: state.postcode || initialState.postcode
        }}
        errors={state.errors}
      />

      {/* Checkbox for saving info and ProceedToCheckout button remain here */}
      <div className="my-7 grid grid-cols-6 gap-4">
        <Checkbox className="col-span-6" color="primary" name="saveInformation">
          {/* It's good practice to add a 'name' to the checkbox if its value is relevant for form submission */}
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
