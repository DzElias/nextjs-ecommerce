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

export function createCheckoutProceess(data: any) {
  if (typeof window !== 'undefined') {
    const checkoutData = getLocalStorage('checkout_data', true) || {};
    setLocalStorage('checkout_data', { ...checkoutData, ...data });
  }
}

export function setLocalStorage(key: string, value: any) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export function getLocalStorage(key: string, parse = false) {
  if (typeof window !== 'undefined') {
    const value = localStorage.getItem(key);
    if (value) {
      return parse ? JSON.parse(value) : value;
    }
  }
  return null;
}

export function removeFromLocalStorage(key: string) {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
}

export function createUrl(pathname: string, params: URLSearchParams | ReadonlyURLSearchParams) {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

  return `${pathname}${queryString}`;
}
