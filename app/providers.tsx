'use client';

import { NextUIProvider } from '@nextui-org/react';
import React from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  // Verificar si estamos en el cliente para evitar errores de hidratación
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Durante la renderización del servidor o la hidratación inicial,
  // simplemente renderiza los children sin el proveedor
  // Esto evita el error "Cannot read properties of null (reading 'useMemo')"
  if (!mounted) {
    return <>{children}</>;
  }

  // Una vez que estamos en el cliente y el componente está montado,
  // envolvemos los children con el NextUIProvider
  return <NextUIProvider>{children}</NextUIProvider>;
}
