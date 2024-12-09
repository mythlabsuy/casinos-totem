'only server'
import { apiFetchServer } from "../api";
import { ApiResponse } from "../definitions";

export async function fetchParticipantByDocumentNumber(
    document_number: string,
): Promise<ApiResponse> {

    try {
        let searchParams = new URLSearchParams();
        searchParams.append('q', document_number)
        const path = `participant/document_number`
        const response = await apiFetchServer({ method: 'GET', path: path, body: undefined, query: searchParams });

        let resp: ApiResponse = {
            status: response.status,
            data: await response.json()
        }

        return resp
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Error al obtener la el participante');
    }
}