'use client'

import { useEffect, useState } from "react";
import { CardTranslucid } from "../card-translucid";
import { useRouter } from 'next/navigation';
import { signOut } from "next-auth/react";

export function PromotionUnavailable() {
  const [countdown, setCountdown] = useState(60);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(interval); // Clear interval when countdown reaches 0
          signOut({ callbackUrl: "/" });
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000); // Update countdown every 1 second (1000 ms)

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [signOut]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <CardTranslucid title='No hay promoción disponible.' onClickCallback={() => { closeSession() }} btnText={`Cerrar Sesión (${countdown})`} 
        btnClassName={`flex h-10 items-center justify-items-center rounded-2xl bg-primary-600 py-8 text-2xl font-medium text-white 
        transition-colors hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 
        focus-visible:outline-offset-2 focus-visible:outline-primary-600 uppercase w-96`}>
      </CardTranslucid>
    </div>
  );

  function closeSession(){
    signOut({ callbackUrl: "/" });
  }
}