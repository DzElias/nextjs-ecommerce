import { redirect } from 'next/navigation';

// Redirigir al nuevo flujo de checkout de regalo
export default async function InformationPage() {
  redirect('/checkout/recipient');
}
