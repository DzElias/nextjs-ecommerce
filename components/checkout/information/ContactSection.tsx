'use client';

import { Checkbox } from '@nextui-org/react';
import InputText from '../cart/input'; // Ajusta la ruta si es necesario

interface ContactSectionProps {
  email?: string;
  emailErrorMsg?: string;
}

const ContactSection = ({ email, emailErrorMsg }: ContactSectionProps) => {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl font-bold">Contacto</h1>
      <InputText
        className="max-w-full"
        name="email"
        type="email" // Es bueno especificar el tipo de input
        defaultValue={email}
        errorMsg={emailErrorMsg}
        label="Ingrese Email"
        required // Asumiendo que el email es requerido
      />
      <Checkbox defaultSelected className="" color="primary" name="newsLetterSubscription">
        {/* Es buena práctica añadir un 'name' al checkbox si su valor es relevante para el form submission */}
        <span className="text-neutral-400 dark:text-white">Envíame noticias y ofertas</span>
      </Checkbox>
    </div>
  );
};

export default ContactSection;
