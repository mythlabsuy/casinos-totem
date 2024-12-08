'use client'

import { useActionState, useEffect, useState } from "react";
import { CardTranslucid } from "../card-translucid";
import { TextInput } from "../form-fields/input";
import { useRouter, useSearchParams } from 'next/navigation';
import { WelcomeFormState, validateParticipant } from "@/app/lib/actions/welcome";
import { SubmitButton } from "../../button";
import { Promotion } from "@/app/lib/definitions";

interface Props{
  promotion: Promotion | undefined;
  premiseId : number | undefined;
}

export function PromotionWelcomeForm( { promotion, premiseId } : Props ) {
  
  const router = useRouter()
  
  const initialState: WelcomeFormState = { message: null, errors: {}, formData: {} };
  const [state, formAction] = useActionState(validateParticipant, initialState);
  const [formData, setFormData] = useState<any>({});
  
  const searchParams = useSearchParams();
  const reload = searchParams.get('reload');
  const shouldReload = reload ? reload === 'true' : true;
  
  useEffect(() => {
    
    if (state?.errors) {
      setFormData(state.formData || {});
    }
    
    console.log('PROMOCION', promotion)
    if(!promotion){
      router.push('/promotion/unavailable')
      console.log('NO PROMOTION AVAILABLE')
    }
  }, [state, router, promotion]);

  return (
    <div className="flex justify-center items-center min-h-screen">
        <CardTranslucid title='Ingresa tu documento para participar'>
          <form action={formAction}>
          <input id="premise_id" name="premise_id" type="hidden" value={premiseId}/>
            <input id="promotion_id" name="promotion_id" type="hidden" value={promotion?.id}/>
            <TextInput id={'document'} className="bg-transparent border-black mt-8 mb-4 px-16" 
              errors={state && state?.errors ? state.errors.document : undefined} 
              defaultValue={formData.document || ''}
              icon="MagnifyingGlassIcon"/>

            <div className="mt-6 flex justify-center">
              <SubmitButton type="submit" className="flex h-10 items-center justify-items-center rounded-2xl bg-primary-600 py-8 text-2xl 
                font-medium text-white transition-colors hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 
                focus-visible:outline-offset-2 focus-visible:outline-primary-600 uppercase w-96 text-center mt-4">Participar Ahora</SubmitButton>
            </div>
          </form>
        </CardTranslucid>
      </div>
  );
}