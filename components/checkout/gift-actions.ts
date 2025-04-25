'use server';
import { TAGS } from 'lib/constants';
import { revalidateTag } from 'next/cache';
import { z } from 'zod';

// Definir tipos para los estados de retorno
export type RecipientInfoReturn = {
  recipientInfo?: {
    senderName: FormDataEntryValue | null;
    recipientName: FormDataEntryValue | null;
  };
  errors?: Record<string, string[]>;
  success?: boolean;
};

export type WhatsappInfoReturn = {
  whatsappInfo?: {
    senderWhatsapp: FormDataEntryValue | null;
    recipientWhatsapp: FormDataEntryValue | null;
  };
  errors?: Record<string, string[]>;
  success?: boolean;
};

export type CardInfoReturn = {
  cardInfo?: {
    message: FormDataEntryValue | null;
    cardTemplate: FormDataEntryValue | null;
    senderName: FormDataEntryValue | null;
  };
  errors?: Record<string, string[]>;
  success?: boolean;
};

export type ConfirmationReturn = {
  confirmed: boolean;
  success: boolean;
};

// Esquema para validar los datos del remitente y destinatario
const recipientSchema = z.object({
  senderName: z
    .string({ required_error: 'Nombre del remitente es requerido' })
    .min(1, { message: 'Por favor ingrese el nombre del remitente' }),
  recipientName: z
    .string({ required_error: 'Nombre del destinatario es requerido' })
    .min(1, { message: 'Por favor ingrese el nombre del destinatario' })
});

// Esquema para validar los números de WhatsApp
const whatsappSchema = z.object({
  senderWhatsapp: z
    .string({ required_error: 'WhatsApp del remitente es requerido' })
    .min(8, { message: 'Número de WhatsApp inválido' }),
  recipientWhatsapp: z
    .string({ required_error: 'WhatsApp del destinatario es requerido' })
    .min(8, { message: 'Número de WhatsApp inválido' })
});

// Esquema para validar la tarjeta digital
const cardSchema = z.object({
  message: z
    .string({ required_error: 'Mensaje es requerido' })
    .min(1, { message: 'Por favor ingrese un mensaje' }),
  cardTemplate: z.string({ required_error: 'Plantilla de tarjeta es requerida' })
});

// Acción para guardar los datos del remitente y destinatario
export async function saveRecipientInfo(
  prevState: RecipientInfoReturn,
  formData: FormData
): Promise<RecipientInfoReturn> {
  const validatedFields = recipientSchema.safeParse({
    senderName: formData.get('senderName'),
    recipientName: formData.get('recipientName')
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors
    };
  }

  // Guardar datos en el estado
  const recipientInfo = {
    senderName: formData.get('senderName'),
    recipientName: formData.get('recipientName')
  };

  revalidateTag(TAGS.cart);
  return {
    recipientInfo,
    success: true
  };
}

// Acción para guardar los números de WhatsApp
export async function saveWhatsappInfo(
  prevState: WhatsappInfoReturn,
  formData: FormData
): Promise<WhatsappInfoReturn> {
  const validatedFields = whatsappSchema.safeParse({
    senderWhatsapp: formData.get('senderWhatsapp'),
    recipientWhatsapp: formData.get('recipientWhatsapp')
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors
    };
  }

  // Guardar datos en el estado
  const whatsappInfo = {
    senderWhatsapp: formData.get('senderWhatsapp'),
    recipientWhatsapp: formData.get('recipientWhatsapp')
  };

  revalidateTag(TAGS.cart);
  return {
    whatsappInfo,
    success: true
  };
}

// Acción para guardar la tarjeta digital
export async function saveCardInfo(
  prevState: CardInfoReturn,
  formData: FormData
): Promise<CardInfoReturn> {
  const validatedFields = cardSchema.safeParse({
    message: formData.get('message'),
    cardTemplate: formData.get('cardTemplate')
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors
    };
  }

  // Guardar datos en el estado
  const cardInfo = {
    message: formData.get('message'),
    cardTemplate: formData.get('cardTemplate'),
    senderName: formData.get('senderName')
  };

  revalidateTag(TAGS.cart);
  return {
    cardInfo,
    success: true
  };
}

// Acción para confirmar toda la información
export async function confirmGiftInfo(
  prevState: ConfirmationReturn,
  formData: FormData
): Promise<ConfirmationReturn> {
  // Aquí podrías hacer una validación final o simplemente confirmar
  revalidateTag(TAGS.cart);
  return {
    confirmed: true,
    success: true
  };
}
