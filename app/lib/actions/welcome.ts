'use server';

import { z } from "zod";
import { apiFetchServer } from "../api";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Welcome } from "../definitions";

export type WelcomeFormState = {
  errors?: {
    document?: string[];
  };
  message?: string | null;
  formData?: any | null;
};

const WelcomeFormSchema = z.object({
  document: z.string({
    required_error: 'Por favor ingrese su documento completo (CI, DNI, Pasaporte, Otro).',
  }).min(1,{message: 'Por favor ingrese su documento completo (CI, DNI, Pasaporte, Otro).'}),
});

export async function validateParticipant(prevState: WelcomeFormState, formData: FormData) {
  
  const validatedFields = WelcomeFormSchema.safeParse({
    document: formData.get('document'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Hay campos faltantes, por favor revise.',
      formData: Object.fromEntries(formData.entries()),
    };
  }
  
  const { document } = validatedFields.data;

  try {
    const body: Welcome = {
      document_number: document
    }

    //TODO check against DB if it can participate

    // const orderId = formData.get('order_id'); //On add this will be null
    // const method = orderId ? 'PUT' : 'POST';
    // const path = orderId ? `order/admin/${orderId}` : 'order/admin/';
    
    // const response = await apiFetchServer({method: method, path: path, body: JSON.stringify(body)});
    // const responseJson: Order = await response.json();
    // console.log("ADD ORDER RESPONSE", responseJson);

    // console.log("NEW/UPDATE ORDER RESPONSE: " + orderId, response);
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Participant.',
      formData: Object.fromEntries(formData.entries()),
    };
  }

  revalidatePath(`/promotion/registration/${document}`);
  redirect(`/promotion/registration/${document}`);
}