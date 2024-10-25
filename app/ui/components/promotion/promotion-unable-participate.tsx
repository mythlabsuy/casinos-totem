'use client'

import { useEffect, useState } from "react";
import { CardTranslucid } from "../card-translucid";
import { useRouter } from 'next/navigation';

export function PromotionUnableToParticipate() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(interval); // Clear interval when countdown reaches 0
          router.push("/target-page"); // Redirect to the target page
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000); // Update countdown every 1 second (1000 ms)

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <CardTranslucid title='Ya ha participado en la actual promoción.' onClickCallback={() => { backToHome() }} btnText={`Volver (${countdown})`} 
        btnClassName={`flex h-10 items-center justify-items-center rounded-2xl bg-primary-600 py-8 text-2xl font-medium text-white 
        transition-colors hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 
        focus-visible:outline-offset-2 focus-visible:outline-primary-600 uppercase w-96`}>
      </CardTranslucid>
    </div>
  );

  function backToHome(){
    router.push('/promotion')
  }
}