'only server'
import { Session } from "next-auth";

interface Props {
  path?: string,
  method?: string,
  body?: string | FormData,
  query?: URLSearchParams,
  isForm?: boolean
  isFileUpload?: boolean
  withAuth?: boolean
  session?: Session | null
}

const API_HOST = process.env.NEXT_PUBLIC_API_HOST ? process.env.NEXT_PUBLIC_API_HOST : ''

export async function apiFetchJson({method = 'GET', path = '/', query, body, session, isForm = false, isFileUpload = false, withAuth = true}: Props){
  const response = await apiFetchResponse({method, path, query, body, session, isForm, isFileUpload, withAuth})
  return response.json()
}

export async function apiFetchResponse({method = 'GET', path = '/', query, body, session, isForm = false, isFileUpload = false, withAuth = true}: Props){
  // const { data: session } = useSession();
  console.log("SESSION CLIENT SIDE: ", session);

  var headers = new Headers({
    'Accept': 'application/json',
  },);

  if(!isForm && !isFileUpload){
    headers.append('Content-type', 'application/json')
  }

  if(withAuth){
    if(session){
      headers.append('Authorization', session?.accessToken ?? '');
    }
  }
    
  const response = await fetch(getFullPath(path) + (query ? ('?' + query) : ''), 
    {
      method: method,
      headers: headers,
      body: body,
      // cache: 'force-cache'
    }
  );
  //TODO handle status errors and trigger a dialog and log errors
  console.info("FETCH RESPONSE", response);

  return response;
}

export function getFullPath(path?: string){
  console.log("API HOST", API_HOST);
  return API_HOST + (path ? path : '');
}