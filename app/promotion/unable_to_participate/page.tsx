import { fetchActivePromotion } from '@/app/lib/data/promotions';
import { ApiResponse, Premise, Promotion } from '@/app/lib/definitions';
import { PromotionUnableToParticipate } from '@/app/ui/components/promotion/promotion-unable-participate';
import { auth } from '@/auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Confirmacion',
};
 
export default async function Page() {
  let premise: Premise | undefined = undefined;
  let promotion: Promotion | undefined = undefined;
  let apiStatus: number = 200;
  const session = await auth();
  
  // If user is not logged in session will be null
  // If the user has many premises, only the first one will be used.
  // Totem users should have only 1 premise
  if(session && session.user_data){
    premise = session.user_data?.premises[0];
    
    let promotionResp: ApiResponse = await fetchActivePromotion(premise.id);

    apiStatus = promotionResp.status;
    if(promotionResp.status !== 401){
      promotion = promotionResp.data;
    }

    console.log("PREMISES", session.user_data?.premises);
  } else {
    //TODO ver como manejar cuando no hay session
  }

  
  return (
    <main>
      <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('${promotion?.background.path}')` }} >
        <PromotionUnableToParticipate />
      </div>
    </main>
  );
}