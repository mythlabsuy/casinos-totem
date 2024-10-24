'use client'

import { CardTranslucid } from "../card-translucid";
import { TextInput } from "../form-fields/input";
import { useRouter } from 'next/navigation';

export function PromotionWelcomeForm() {
  const router = useRouter()

  return (
    <div className="flex justify-center items-center min-h-screen">
      <CardTranslucid title='Ingresa tu documento para participar' onClickCallback={() => { participate() }} btnText='Participar' 
      btnClassName={`flex h-10 items-center justify-items-center rounded-2xl bg-primary-600 px-20 py-8 text-2xl font-medium text-white 
        transition-colors hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 
        focus-visible:outline-offset-2 focus-visible:outline-primary-600 uppercase w-96`}> 
        <TextInput id={'participate'} className="bg-transparent border-black mt-8 mb-4 px-16" icon="MagnifyingGlassIcon"></TextInput>
      </CardTranslucid>
    </div>
  );

  function participate(){
    console.log("TADAAA!!!")
    router.push('/promotion/registration')
  }
}