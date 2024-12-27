'use server';

import { z } from "zod";
import { apiFetchServer } from "../api";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Promotion, Welcome } from "../definitions";

export type WelcomeFormState = {
  errors?: {
    document?: string[];
    promotion_id?: string[];
  };
  message?: string | null;
  formData?: any | null;
  error? : boolean | null;
};

const WelcomeFormSchema = z.object({
  document: z.string({
    required_error: 'Por favor ingrese su documento completo (CI, DNI, Pasaporte, Otro).',
  }).min(1,{message: 'Por favor ingrese su documento completo (CI, DNI, Pasaporte, Otro).'}),
  promotion_id: z.string(),
});

export async function validateParticipant(prevState: WelcomeFormState, formData: FormData) {
  
  const validatedFields = WelcomeFormSchema.safeParse({
    document: formData.get('document'),
    promotion_id: formData.get('promotion_id'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Hay campos faltantes, por favor revise.',
      formData: Object.fromEntries(formData.entries()),
    };
  }
  
  const { document, promotion_id } = validatedFields.data;
  let canParticipate = false;
  let validPromotion = false;

  try {
    let premiseId = formData.get('premise_id');
    if (!premiseId) {
      return {
        message: 'Error al validar el local.',
        formData: Object.fromEntries(formData.entries()),
      };
    }

    const promotionPath = `promotion/${premiseId}/active`;
    const promotionQuery = new URLSearchParams({ document: document })

    const promotionResponse = await apiFetchServer({ method: 'GET', path: promotionPath, query: promotionQuery });
    const promotionResponseJson: Promotion | undefined = await promotionResponse.json();

    if (promotionResponseJson) {
      //Check if the active promotion in the response is still the same as we have.
      if (promotionResponseJson.id === Number(promotion_id)) {
        validPromotion = true;
      }
    }


    if (validPromotion) {
      const path = `promotion-participants/${promotion_id}/validate`;
      const query = new URLSearchParams({ document: document })

      const response = await apiFetchServer({ method: 'GET', path: path, query: query });
      const responseJson: boolean = await response.json();

      console.log("CAN PARTICIPATE RESPONSE JSON: ", responseJson);
      console.log("CAN PARTICIPATE RESPONSE: ", response);
      canParticipate = responseJson;
    }
  } catch (error) {
    return {
      error: true,
      message: 'Error al validar si la persona puede participar.',
      formData: Object.fromEntries(formData.entries()),
    };
  }

  if (!validPromotion) {
    redirect('/promotion/unavailable');
  }

  //This does not work inside the try catch block
  if (!canParticipate) {
    redirect('/promotion/unable_to_participate')
  }

  revalidatePath(`/promotion/registration/${document}`);
  redirect(`/promotion/registration/${document}`);
}