import Navbar from 'components/layout/navbar';
import type React from 'react';
import { Suspense } from 'react';

export default async function SearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <Navbar />
      <div className="mx-auto max-w-screen-2xl px-4 py-8">{children}</div>
    </Suspense>
  );
}
