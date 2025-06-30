import { clsx, type ClassValue } from 'clsx';
import type { ReadonlyURLSearchParams } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function ensureStartsWith(str: string, prefix: string) {
  if (!str.startsWith(prefix)) {
    return prefix + str;
  }
  return str;
}

export function formatPrice(
  price: string | number,
  options: { currency?: string; notation?: Intl.NumberFormatOptions['notation'] } = {}
) {
  const { currency = 'PYG', notation = 'standard' } = options;

  const numericPrice = typeof price === 'string' ? Number.parseFloat(price) : price;

  return new Intl.NumberFormat('es-PY', {
    style: 'currency',
    currency,
    notation,
    maximumFractionDigits: 0
  }).format(numericPrice);
}

// Import CheckoutData type
import type { CheckoutAddress, CheckoutData } from './types/checkout';

/**
 * Updates the main 'checkout_data' object in localStorage by merging new data.
 * @param newData A partial CheckoutData object containing the fields to update.
 */
export function updateCheckoutDataInLocalStorage(newData: Partial<CheckoutData>): void {
  if (typeof window !== 'undefined') {
    const existingCheckoutData = getLocalStorage('checkout_data', true) as Partial<CheckoutData> | null || {};
    // Deep merge shippingAddress if it's part of newData and also exists in existingCheckoutData
    // This is to handle cases where `newData` might only be { shippingAddress: {...} }
    // or `newData` could be a more complete state object from a form.

    let mergedData: Partial<CheckoutData> = { ...existingCheckoutData };

    if (newData.shippingAddress && existingCheckoutData.shippingAddress) {
      mergedData.shippingAddress = { ...existingCheckoutData.shippingAddress, ...newData.shippingAddress };
      // Avoid duplicating shippingAddress if it's also a top-level prop in newData (which it shouldn't be if structure is clean)
      const { shippingAddress, ...restOfNewData } = newData;
      mergedData = { ...mergedData, ...restOfNewData };
    } else {
      mergedData = { ...mergedData, ...newData };
    }

    setLocalStorage('checkout_data', mergedData);
  }
}

export function setLocalStorage(key: string, value: any): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export function getLocalStorage(key: string, parse = false): any | null { // Return type can be more specific if needed
  if (typeof window !== 'undefined') {
    const value = localStorage.getItem(key);
    if (value) {
      try {
        return parse ? JSON.parse(value) : value;
      } catch (error) {
        console.error(`Error parsing localStorage key "${key}":`, error);
        return null; // Return null or handle error appropriately
      }
    }
  }
  return null;
}

export function removeFromLocalStorage(key: string): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
}

export function createUrl(pathname: string, params: URLSearchParams | ReadonlyURLSearchParams) {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

  return `${pathname}${queryString}`;
}
