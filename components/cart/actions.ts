'use server';

import { addToCart } from 'lib/bagisto';
import type { SuperAttribute } from 'lib/bagisto/types';
import { TAGS } from 'lib/constants';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

export async function addItem(
  prevState: any,
  input: {
    selectedVariantId: string | undefined;
    selectedConfigurableOption: number;
    superAttribute: SuperAttribute[];
  }
) {
  // Verificar si ya existe un ID de carrito en las cookies
  const cartId = cookies().get('bagisto_session')?.value;

  // Si no hay un ID de carrito, crear uno nuevo
  if (!cartId) {
    const cookieValue = generateCookieValue(40);
    cookies().set('bagisto_session', cookieValue, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    });
  }

  if (!input.selectedVariantId) {
    return 'Falta el ID de la variante del producto';
  }

  const selectedConfigurableOption = input.selectedConfigurableOption;
  const superAttribute = input.superAttribute;

  try {
    const result = await addToCart({
      productId: Number(input?.selectedVariantId),
      quantity: 1,
      selectedConfigurableOption,
      superAttribute
    });

    console.log('Producto añadido al carrito:', result);

    // Revalidar el tag del carrito para actualizar la UI
    revalidateTag(TAGS.cart);
    return 'Producto añadido al carrito';
  } catch (e) {
    console.error('Error al añadir producto al carrito:', e);
    return 'Error al añadir producto al carrito';
  }
}

function generateCookieValue(length: number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let cookieValue = '';
  for (let i = 0; i < length; i++) {
    cookieValue += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return cookieValue;
}

export async function removeItem(prevState: any, lineId: number) {
  const cartId = cookies().get('bagisto_session')?.value;

  if (!cartId) {
    return 'Falta el ID del carrito';
  }

  try {
    await removeFromCart(Number(lineId));
    revalidateTag(TAGS.cart);
  } catch (e) {
    return 'Error al eliminar producto del carrito';
  }
}

export async function updateItemQuantity(
  prevState: any,
  payload: {
    lineId: number;
    quantity: number;
  }
) {
  const cartId = cookies().get('bagisto_session')?.value;

  if (!cartId) {
    return 'Falta el ID del carrito';
  }

  const { lineId, quantity } = payload;

  try {
    if (quantity === 0) {
      await removeFromCart(Number(lineId));
      revalidateTag(TAGS.cart);
      return;
    }

    await updateCart([
      {
        cartItemId: lineId,
        quantity
      }
    ]);
    revalidateTag(TAGS.cart);
  } catch (e) {
    return 'Error al actualizar la cantidad del producto';
  }
}

// Importar estas funciones desde lib/bagisto para evitar errores circulares
async function removeFromCart(lineId: number) {
  const { removeFromCart } = await import('lib/bagisto');
  return removeFromCart(lineId);
}

async function updateCart(items: { cartItemId: number; quantity: number }[]) {
  const { updateCart } = await import('lib/bagisto');
  return updateCart(items);
}
