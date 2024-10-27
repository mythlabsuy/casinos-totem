import { apiFetchServer } from "../api";
import { Premise, Promotion } from "../definitions";

const ITEMS_PER_PAGE = 6;

export async function fetchActivePromotion(
  premise_id: number,
) : Promise<Promotion> {
  
  try {
    const path = `promotion/${premise_id}/active`
    const response = await apiFetchServer({method: 'GET', path: path, body: undefined });

    console.log("PROMOTION RESPONSE", response);
    
    return response.json();
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Error al obtener la promocion activa');
  }
}