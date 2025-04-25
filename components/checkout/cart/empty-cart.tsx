'use client';

import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function EmptyCartPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-24 text-center">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-purple-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-12 w-12 text-purple-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
      </div>

      <h1 className="mb-2 text-2xl font-bold text-purple-800">Tu carrito está vacío</h1>
      <p className="mb-8 text-gray-600">
        Parece que aún no has añadido ningún producto a tu carrito. Explora nuestra tienda para
        encontrar el regalo perfecto.
      </p>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Button
          color="primary"
          size="lg"
          className="rounded-full px-8"
          onClick={() => router.push('/')}
          variant="solid"
        >
          Explorar productos
        </Button>
        <Button
          color="default"
          size="lg"
          className="rounded-full px-8"
          onClick={() => router.push('/search')}
          variant="bordered"
        >
          Ver categorías
        </Button>
      </div>

      <div className="mt-12">
        <h2 className="mb-4 text-lg font-medium text-purple-700">¿Ya tienes una cuenta?</h2>
        <p className="mb-4 text-gray-600">
          Inicia sesión para ver tus productos guardados y continuar donde lo dejaste.
        </p>
        <Link
          href="/login"
          className="text-purple-600 underline decoration-dotted underline-offset-4 hover:text-purple-800"
        >
          Iniciar sesión
        </Link>
      </div>
    </div>
  );
}
