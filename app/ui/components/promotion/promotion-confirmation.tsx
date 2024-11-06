'use client'

import { printPDF } from "@/app/lib/print";
import { CardTranslucid } from "../card-translucid";
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchParticipationPrint } from "@/app/lib/data/participate";
import { useSession } from "next-auth/react";

interface Props {
  id: string
}

export function PromotionConfirmation({ id }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const { data: session } = useSession();

  const searchParams = useSearchParams();
  const print = searchParams.get('print');
  const shouldPrint = print ? print === 'true' : true;
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if(session && shouldPrint){
          const response = await fetchParticipationPrint(parseInt(id), session);
          const blob = await response.blob();
          await printPDF(blob)
          router.push('/promotion/confirmation/5?print=false');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session]); //TODO Empty dependency array to run only on mount?

  return (
    <div className="flex justify-center items-center min-h-screen">
      <CardTranslucid title='Gracias por participar!' onClickCallback={() => { backToHome() }} btnText='Volver' 
        btnClassName={`flex h-10 items-center justify-items-center rounded-2xl bg-primary-600 py-8 text-2xl font-medium text-white 
        transition-colors hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 
        focus-visible:outline-offset-2 focus-visible:outline-primary-600 uppercase w-96`}>
          { loading ? 
            <p className="text-xl">Imprimiendo ...</p> : 
            <p className="text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, rem? Quis veniam ducimus qui eveniet nihil assumenda nemo delectus 
              consequatur, natus accusantium reiciendis, enim placeat quas nobis explicabo eius sapiente.
            </p>
          }
      </CardTranslucid>
    </div>
  );

  function backToHome(){
    router.push('/promotion?reload=false')
  }
}