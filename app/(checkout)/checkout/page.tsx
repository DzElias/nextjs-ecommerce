import { redirect } from 'next/navigation';

export default function CheckoutPage() {
  // Redirigir al primer paso del nuevo flujo de checkout de regalo
  redirect('/checkout/recipient');
}
