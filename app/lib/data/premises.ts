import { apiFetchServer } from "../api";
import { ApiResponse } from "../definitions";

export async function fetchPremiseById(
    premise_id: number,
  ) : Promise<ApiResponse> {
    
    try {
      const path = `premise/${premise_id}`
      const response = await apiFetchServer({method: 'GET', path: path, body: undefined });
  
      let resp: ApiResponse = {
        status: response.status,
        data: await response.json()
      }
  
      console.log("PREMISE RESPONSE", response);
      
      return resp
    } catch (error) {
      console.error('Database Error:', error);
      if(error instanceof Error){
        throw error;
      }
      throw new Error('Error al obtener la promocion activa');
    }
  }