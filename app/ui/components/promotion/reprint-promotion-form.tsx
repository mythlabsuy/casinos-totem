'use client'

import { useActionState, useEffect, useRef, useState } from "react";
import { CardTranslucid } from "../card-translucid";
import { PasswordInput, TextInput } from "../form-fields/input";
import { redirect, useRouter } from 'next/navigation';
import { SubmitButton } from "../../button";
import { InfiniteProgressBar } from "../infinite-progress";
import { ReprintFormState, reprintParticipation } from "@/app/lib/actions/reprint";
import { printPDF } from "@/app/lib/print";

interface Props{
  participationId: string;
}

export function ReprintPromotionForm( { participationId } : Props ) {
  
  const router = useRouter()
  
  const initialState: ReprintFormState = { message: null, errors: {}, formData: {} };
  const [state, formAction, isPending] = useActionState(reprintParticipation, initialState);
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  

  const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
      const handleDataChange = async () => {
        setLoading(false)
        try{
        if (state.data instanceof Blob && state.data.size > 0) {
          await printPDF(state.data)
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      }
      handleDataChange();
    }, [participationId, router, state.data]);
  
  if(state.success === true &&  !isPending){
    return (
      <>
          <div className="flex justify-center items-center min-h-screen">
      <CardTranslucid title='Gracias por participar!' onClickCallback={() => { router.push('/promotion?reload=false') }} btnText='Volver' participationId={participationId} replaceOnReprint={true}
        btnClassName={`flex h-10 items-center justify-items-center rounded-2xl bg-primary-600 py-8 text-2xl font-medium text-white 
        transition-colors hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 
        focus-visible:outline-offset-2 focus-visible:outline-primary-600 uppercase w-96`}>
        <p className="text-2xl text-gray-800">
          Estamos reimprimiendo tu ticket.
          <br/>
        </p>
      </CardTranslucid>
    </div>
      </>
    )
  }else{
    return (
      <div className="flex justify-center items-center min-h-screen">
        
          <CardTranslucid title='Inicia sesión para reimprimir'>
            <form action={formAction} ref={formRef}>
              <input id="participantion_id" name="participantion_id" type="hidden" value={participationId}/>
              <TextInput id='username' className="bg-transparent border-black mb-4 px-16" 
              label="Usuario"
                errors={state && state?.errors ? state.errors.username : undefined} 
                defaultValue={formData.document || ''}/>
              
              <PasswordInput id='password' className="bg-transparent border-black mb-4 px-16" 
              label="Contraseña"
                errors={state && state?.errors ? state.errors.password : undefined} 
                defaultValue={formData.document || ''}/>
  
              <div className="mt-6 flex flex-col gap-1 items-center justify-center">
                <SubmitButton type="submit" onClick={() => { 
                    setLoading(true);
                    // Changing the button to disabled status stops the form submission. This submits the form again.
                    if (formRef.current) {
                      formRef.current.requestSubmit();
                    }
                  }} 
                  className="flex h-10 items-center justify-items-center rounded-2xl bg-primary-600 py-8 text-2xl 
                  font-medium text-white transition-colors hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 
                  focus-visible:outline-offset-2 focus-visible:outline-primary-600 uppercase w-96 text-center mt-4" disabled={loading}>Reimprimir</SubmitButton>
                { loading ? <InfiniteProgressBar color="bg-violet-700"/> : null }
  
                <SubmitButton type="submit" onClick={() => { 
                  redirect(`/promotion/confirmation/${participationId}?print=false`);
                  }} 
                  className="flex h-10 items-center justify-items-center rounded-2xl bg-primary-600 py-8 text-2xl 
                  font-medium text-white transition-colors hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 
                  focus-visible:outline-offset-2 focus-visible:outline-primary-600 uppercase w-96 text-center mt-4" disabled={loading}>Volver</SubmitButton>
              </div>
            </form>
          </CardTranslucid>
        </div>
    );
  }
}
