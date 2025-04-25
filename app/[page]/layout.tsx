import Navbar from 'components/layout/navbar';
import { Suspense } from 'react';

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <Navbar />
      {children}
    </Suspense>
  );
}
