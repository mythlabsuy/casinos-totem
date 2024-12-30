'only server'
import { Session } from "next-auth";
import { apiFetchResponse } from "../api-client";

export async function fetchParticipationPrint(
  participation_id: number,
  session?: Session | null
): Promise<Response> {
  
  try {
    const path = `promotion-participants/${participation_id}/print`
    const response = await apiFetchResponse({method: 'POST', path: path, body: undefined, session: session });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`)
    }
    
    const contentType = response.headers.get('Content-Type')
    if (!contentType?.includes('application/pdf')) {
      console.log("ERROR: Not a PDF. ", response);
    }

    return response;
  } catch (error) {
    console.error('Print Error:', error);
    throw new Error('Error al obtener la impresion');
  }
}