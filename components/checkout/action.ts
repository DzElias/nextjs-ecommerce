'use server';

import {
  addCheckoutAddress,
  addPaymentMethod,
  addShippingMethod,
  createPlaceOrder
} from 'lib/bagisto';
import { TAGS } from 'lib/constants';
import { revalidateTag } from 'next/cache';
import { z } from 'zod';

// Esquema para validar la dirección de envío
const shippingAddressSchema = z.object({
  firstName: z
    .string({ required_error: 'El nombre es obligatorio' })
    .min(1, { message: 'Por favor ingrese su nombre' }),
  lastName: z.string().optional(),
  email: z
    .string({ required_error: 'El email es obligatorio' })
    .email({ message: 'Por favor ingrese una dirección de email válida' }),
  address1: z
    .string({ required_error: 'La dirección es obligatoria' })
    .min(1, { message: 'Por favor ingrese su dirección' }),
  address2: z.string().optional(),
  city: z
    .string({ required_error: 'La ciudad es obligatoria' })
    .min(1, { message: 'Por favor ingrese su ciudad' }),
  state: z
    .string({ required_error: 'El estado es obligatorio' })
    .min(1, { message: 'Por favor seleccione su estado' }),
  postcode: z
    .string({ required_error: 'El código postal es obligatorio' })
    .min(1, { message: 'Por favor ingrese su código postal' }),
  country: z
    .string({ required_error: 'El país es obligatorio' })
    .min(1, { message: 'Por favor seleccione su país' }),
  phone: z
    .string({ required_error: 'El número de teléfono es obligatorio' })
    .min(1, { message: 'Por favor ingrese su número de teléfono' })
});

// Función para crear la dirección de envío
export async function createCheckoutAddress(prevState: any, formData: FormData) {
  const validatedFields = shippingAddressSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    address1: formData.get('address1'),
    address2: formData.get('address2'),
    city: formData.get('city'),
    state: formData.get('state'),
    postcode: formData.get('postcode'),
    country: formData.get('country'),
    phone: formData.get('phone')
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors
    };
  }

  const shippingAddress = {
    shipping: {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      address1: formData.get('address1'),
      address2: formData.get('address2'),
      city: formData.get('city'),
      state: formData.get('state'),
      postcode: formData.get('postcode'),
      country: formData.get('country'),
      phone: formData.get('phone'),
      useForBilling: true
    }
  };

  try {
    const data = await addCheckoutAddress({
      billing: {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        address1: formData.get('address1'),
        address2: formData.get('address2'),
        city: formData.get('city'),
        state: formData.get('state'),
        postcode: formData.get('postcode'),
        country: formData.get('country'),
        phone: formData.get('phone'),
        useForShipping: true
      },
      shipping: {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        address1: formData.get('address1'),
        address2: formData.get('address2'),
        city: formData.get('city'),
        state: formData.get('state'),
        postcode: formData.get('postcode'),
        country: formData.get('country'),
        phone: formData.get('phone')
      }
    });

    revalidateTag(TAGS.cart);
    return { ...data, shippingAddress };
  } catch (error) {
    return {
      message: 'Error al crear la dirección de envío'
    };
  }
}

// Función para crear el método de envío
export async function createShippingMethod(prevState: any, formData: FormData) {
  const shippingMethod = formData.get('shippingMethod');

  try {
    const data = await addShippingMethod({
      shippingMethod: shippingMethod as string
    });

    revalidateTag(TAGS.cart);
    return data;
  } catch (error) {
    return {
      message: 'Error al crear el método de envío'
    };
  }
}

// Función para crear el método de pago
export async function createPaymentMethod(prevState: any, formData: FormData) {
  const method = formData.get('method');

  try {
    const data = await addPaymentMethod({
      method: method as string
    });

    revalidateTag(TAGS.cart);
    return data;
  } catch (error) {
    return {
      message: 'Error al crear el método de pago'
    };
  }
}

// Primero, definamos un tipo para el retorno de la función placeOrder
export type PlaceOrderReturn = {
  order?: any;
  message?: string;
};

// Modificar la función placeOrder para usar el tipo correcto
export async function placeOrder(prevState: PlaceOrderReturn): Promise<PlaceOrderReturn> {
  try {
    const data = await createPlaceOrder();

    revalidateTag(TAGS.cart);
    return { order: data };
  } catch (error) {
    return {
      message: 'Error al realizar el pedido'
    };
  }
}
