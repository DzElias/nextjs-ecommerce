// lib/types/checkout.ts

// Basado en los campos usados en GuestCheckOutForm y la estructura inferida
export interface CheckoutAddress {
  email?: string; // El email de contacto a menudo se considera parte de la información de la dirección o del contacto principal
  country?: string;
  firstName?: string;
  lastName?: string;
  address1?: string;
  address2?: string; // Opcional
  phone?: string;
  city?: string;
  state?: string; // Corresponde a la región/estado
  postcode?: string;
  // Podríamos añadir más campos si son necesarios para Bagisto o el proceso de envío
  // companyName?: string;
  // vatId?: string;
}

// Representa el objeto completo que se guardará en localStorage['checkout_data']
export interface CheckoutData {
  // shippingAddress contiene los datos del formulario de información del checkout
  // que en el flujo actual de Bagisto, a menudo es la dirección de envío.
  shippingAddress?: CheckoutAddress;
  // billingAddress podría ser igual que shippingAddress o diferente.
  // Por ahora, el formulario GuestCheckOutForm parece enfocarse en una sola dirección.
  billingAddress?: CheckoutAddress;
  // Podríamos añadir otros datos relevantes para el proceso de checkout aquí
  // Por ejemplo, el método de envío seleccionado, método de pago, etc.
  // selectedShippingRateId?: string;
  // selectedPaymentMethod?: string;

  // El `state` devuelto por `createCheckoutAddress` en `GuestCheckOutForm`
  // actualmente tiene una propiedad `shippingAddress` a nivel raíz que es la que
  // se guarda en localStorage y dispara la redirección.
  // También tiene `errors`.
  // Para mantener la compatibilidad con la estructura actual de `state` de `useFormState`
  // y lo que `GuestCheckOutForm` espera, `CheckoutData` podría ser la forma del `state`.
  // O, `createCheckoutAddress` podría devolver un objeto que se mapea a esta estructura.

  // Por ahora, mantendremos shippingAddress como el campo principal que viene del form.
  // Si 'state' de useFormState tiene más campos de nivel superior que deban persistirse,
  // se pueden añadir aquí.
  // Ejemplo: si la server action `createCheckoutAddress` devuelve { success: true, shippingAddress: {...}, errors: {} }
  // CheckoutData podría reflejar eso.

  // Para el `initialState` de `GuestCheckOutForm` y el `state` que maneja:
  // La interfaz `CheckoutFormState` definida en `GuestCheckOutForm` es una buena
  // representación de los campos del formulario y sus errores.
  // `CheckoutData` es lo que persistimos de forma más global.
  // Podríamos hacer que `CheckoutData` contenga una instancia de `CheckoutFormState`
  // o campos específicos.
  // Por simplicidad y alineación con createCheckoutProcess:
  // CheckoutData será el objeto que contiene shippingAddress y potencialmente otros
  // datos consolidados del checkout.
  // La función `updateCheckoutDataInLocalStorage` tomará partes del `CheckoutFormState`
  // (específicamente, el `shippingAddress` exitoso) y lo fusionará aquí.

  // Si el `state` de `useFormState (createCheckoutAddress)` devuelve directamente un objeto `CheckoutAddress`
  // bajo una clave (ej. `data.shippingAddress`), entonces `updateCheckoutDataInLocalStorage`
  // tomaría ese objeto.

  // Por ahora, asumamos que `CheckoutData` es el contenedor de alto nivel.
  // Y que `GuestCheckOutForm` nos dará un objeto `CheckoutAddress` para guardar.
}

// Esta interfaz es para el estado del formulario en GuestCheckOutForm,
// incluyendo los errores. Podríamos moverla aquí para centralizar los tipos de checkout.
export interface GuestCheckoutFormState {
  email?: string;
  country?: string;
  firstName?: string;
  lastName?: string;
  address1?: string;
  address2?: string;
  phone?: string;
  city?: string;
  state?: string;
  postcode?: string;
  // Esta es la propiedad que se verifica en GuestCheckOutForm para redirigir.
  // Proviene de la respuesta de la acción del servidor createCheckoutAddress.
  // Debería ser del tipo CheckoutAddress si la acción es exitosa.
  shippingAddress?: CheckoutAddress | null; // Puede ser null si no hay errores y no hay dirección (caso inicial) o si hay error
  errors?: {
    email?: string[];
    country?: string[];
    firstName?: string[];
    lastName?: string[];
    address1?: string[];
    address2?: string[];
    phone?: string[];
    city?: string[];
    state?: string[];
    postcode?: string[];
    form?: string[]; // Errores generales del formulario
  };
  // Otros campos que la server action pueda devolver
  success?: boolean;
  message?: string;
}
