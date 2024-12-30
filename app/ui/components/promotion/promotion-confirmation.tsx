'use client'

import { printPDF } from "@/app/lib/print";
import { CardTranslucid } from "../card-translucid";
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { fetchParticipationPrint } from "@/app/lib/data/participate";
import { useSession } from "next-auth/react";
import { Promotion } from "@/app/lib/definitions";
import { Session } from "next-auth";
import Swal from "sweetalert2";

interface Props {
  id: string;
  promotion?: Promotion;
  userSession: Session | null;
}

export function PromotionConfirmation({ id, promotion, userSession }: Props) {
  const router = useRouter()
  // const { data: session } = useSession();

  const searchParams = useSearchParams();
  const print = searchParams.get('print');
  const shouldPrint = print ? print === 'true' : true;
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("SESSION PRINT: ", userSession);
        console.log("SHOULD PRINT: ", shouldPrint);
        if(userSession && shouldPrint){
          try {
            const response = await fetchParticipationPrint(parseInt(id), userSession);
            const blob = await response.blob();
            console.log("printPDF");
            await printPDF(blob)
            //* Note: code below printPDF will not excecute.
            router.push(`/promotion/confirmation/${id}?print=false`);
          } catch (error) {
            Swal.fire({
              title: 'Error!',
              text: error instanceof Error ? error.message ?? 'Ha ocurrido un error' : 'Ha ocurrido un error',
              icon: 'error',
              confirmButtonText: 'OK',
            });
          }

        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userSession]); //TODO Empty dependency array to run only on mount?

  return (
    <div className="flex justify-center items-center min-h-screen">
      <CardTranslucid title='Gracias por participar!' onClickCallback={() => { backToHome() }} btnText='Volver' participationId={id} 
        btnClassName={`flex h-10 items-center justify-items-center rounded-2xl bg-primary-600 py-8 text-2xl font-medium text-white 
        transition-colors hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 
        focus-visible:outline-offset-2 focus-visible:outline-primary-600 uppercase w-96`}>
        <p className="text-2xl text-gray-800">
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