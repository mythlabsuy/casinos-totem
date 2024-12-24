'use server';

import { z } from "zod";
import { apiFetchServer } from "../api";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Promotion, Welcome } from "../definitions";

export type ReprintFormState = {
    errors?: {
        username?: string[];
        password?: string[];
    };
    message?: string | null;
    formData?: any | null;
    data?: Blob | null;
    success? : boolean | null;
};

const ReprintFormSchema = z.object({
    username: z.string().min(1, { message: 'Complete este campo.' }),
    password: z.string().min(1, { message: ' Complete este campo.' }),
});

export async function reprintParticipation(prevState: ReprintFormState, formData: FormData) {

    const validatedFields = ReprintFormSchema.safeParse({
        username: formData.get('username'),
        password: formData.get('password'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Hay campos faltantes, por favor revise.',
            formData: Object.fromEntries(formData.entries()),
        };
    }

    const { username, password } = validatedFields.data;

    try {
        let participationId = formData.get('participantion_id');
        if (!participationId) {
            return {
                message: 'Error al validar la participación.',
                formData: Object.fromEntries(formData.entries()),
            };
        }

        const data: FormData = new FormData()
        data.append('username', username);
        data.append('password', password);

        const promotionPath = `promotion-participants/${participationId}/reprint`;

        const response = await apiFetchServer({ method: 'POST', path: promotionPath, isForm: true,  body: data });
        const responseBlob = await response.blob();

        return {
            success: true,
            data: responseBlob,
        }

    } catch (error) {
        return {
            message: 'Error al validar si la persona puede participar.',
            formData: Object.fromEntries(formData.entries()),
        };
    }
}