'use server';

import { z } from "zod";
import { apiFetchServer } from "../api";
import { redirect } from "next/navigation";
import { Participant } from "../definitions";

export type ParticipateFormState = {
  errors?: {
    document?: string[];
    full_name?: string[];
    phone_number?: string[];
    email?: string[];
    is_over_18?: string[];
    accepts_tos?: string[];
    accepts_privacy_policy?: string[];
  };
  message?: string | null;
  formData?: any | null;
  error? : boolean | null;
};

const ParticipateFormSchema = z.object({
  document: z.string(),
  full_name: z.string({
    required_error: 'Por favor ingrese su nombre completo.',
  }).min(1,{message: 'Por favor ingrese su nombre completo.'}),
  phone_number: z.coerce.number({
    invalid_type_error: 'Por favor ingrese un número de teléfono.',
  }).min(1, {message: 'Por favor ingrese un número de teléfono.'}),
  email: z.string().email("Por favor ingrese un mail válido (ejemplo@gmail.com).").or(z.literal('')),
  is_over_18: z.boolean().refine((value) => value === true, {
    message: "Debe ser mayor de 18 para participar.",
  }),
  accepts_tos: z.boolean().refine((value) => value === true, {
    message: "Debe aceptar los términos y condiciones.",
  }),
  accepts_privacy_policy: z.boolean().refine((value) => value === true, {
    message: "Debe aceptar las políticas de privacidad.",
  }),
});

export async function createOrUpdateParticipant(prevState: ParticipateFormState, formData: FormData) {
  
  const validatedFields = ParticipateFormSchema.safeParse({
    document: formData.get('document'),
    full_name: formData.get('full_name'),
    phone_number: formData.get('phone_number'),
    email: formData.get('email'),
    is_over_18: formData.get('is_over_18') === 'true',
    accepts_tos: formData.get('accepts_tos') === 'true',
    accepts_privacy_policy: formData.get('accepts_privacy_policy') === 'true',
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Hay campos faltantes, por favor revise.',
      formData: Object.fromEntries(formData.entries()),
    };
  }
  
  const { document, full_name, phone_number, email, is_over_18, accepts_tos, accepts_privacy_policy } = validatedFields.data;

  let registrationOk = false;
  let registrationStatus = 200;
  let participation_id = '0';
  let responseDetail: string | undefined;

  try {
    const body: Participant = {
      full_name: full_name,
      email: email,
      document_number: document,
      phone_number: phone_number.toString(),
      accepts_terms_of_service: accepts_tos,
      accepts_privacy_policy: accepts_privacy_policy,
      over_18: is_over_18,
    }

    const promotionId = formData.get('promotion_id'); //On add this will be null
    const method = 'POST';
    const path = `promotion-participants/${promotionId}`;
    
    const response = await apiFetchServer({method: method, path: path, body: JSON.stringify(body)});
    const responseJson = await response.json();
    participation_id = responseJson;
    console.log("PARTICIPATION RESPONSE", response, "RESPONSE JSON", responseJson);

    registrationOk = response.ok;
    registrationStatus = response.status;
    responseDetail = responseJson.detail;

  } catch (error) {
    return {
      error: true,
      message: 'Error al completar la participación.',
      formData: Object.fromEntries(formData.entries()),
    };
  }

  if (registrationStatus === 200) {
    redirect(`/promotion/confirmation/${participation_id}`);
  } else if (registrationStatus === 400) {
    if (responseDetail == 'Ya has participado en esta promoción') {
      redirect('/promotion/unable_to_participate');
    }
    redirect('/promotion/unavailable')
  } else {
    //TODO ver que otros posibles errores hay y como mostrar al usuario
    redirect('/promotion/unavailable')
  }
}