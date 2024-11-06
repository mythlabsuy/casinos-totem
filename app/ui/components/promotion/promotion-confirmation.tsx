'use client'

import { printPDF } from "@/app/lib/print";
import { CardTranslucid } from "../card-translucid";
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { fetchParticipationPrint } from "@/app/lib/data/participate";
import { useSession } from "next-auth/react";
import { Premise, Promotion } from "@/app/lib/definitions";

interface Props {
  id: string;
  promotion?: Promotion;
}

export function PromotionConfirmation({ id, promotion }: Props) {
  const router = useRouter()
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
          router.push(`/promotion/confirmation/${id}?print=false`);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
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
        <p className="text-2xl">
          Estamos imprimiendo tu ticket.
          <br/>
          {promotion ? promotion.participation_instructions: ''}
        </p>
      </CardTranslucid>
    </div>
  );

  function backToHome(){
    router.push('/promotion?reload=false')
  }
}