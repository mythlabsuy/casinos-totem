'use client'

import { CardTranslucid } from "../card-translucid";
import { useRouter } from 'next/navigation';

export function PromotionConfirmation() {
  const router = useRouter()

  return (
    <div className="flex justify-center items-center min-h-screen">
      <CardTranslucid title='Gracias por participar!' onClickCallback={() => { backToHome() }} btnText='Volver' 
        btnClassName={`flex h-10 items-center justify-items-center rounded-2xl bg-primary-600 py-8 text-2xl font-medium text-white 
        transition-colors hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 
        focus-visible:outline-offset-2 focus-visible:outline-primary-600 uppercase w-96`}>
        <p className="text-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, rem? Quis veniam ducimus qui eveniet nihil assumenda nemo delectus 
          consequatur, natus accusantium reiciendis, enim placeat quas nobis explicabo eius sapiente.
        </p>
      </CardTranslucid>
    </div>
  );

  function backToHome(){
    router.push('/promotion')
  }
}