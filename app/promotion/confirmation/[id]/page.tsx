import { fetchActivePromotion } from '@/app/lib/data/promotions';
import { ApiResponse, Promotion, TokenPremise } from '@/app/lib/definitions';
import { PromotionConfirmation } from '@/app/ui/components/promotion/promotion-confirmation';
import { auth } from '@/auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Confirmación',
};
 
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  let id = (await params).id
  let tokenPremise: TokenPremise;
  let promotion: Promotion | undefined = undefined;
  let apiStatus: number = 200;
  const session = await auth();

  // If user is not logged in session will be null
  // If the user has many premises, only the first one will be used.
  // Totem users should have only 1 premise
  if(session && session.user_data){
    tokenPremise = session.user_data?.premises[0];
    
  if(tokenPremise){
      let promotionResp: ApiResponse = await fetchActivePromotion(tokenPremise.id);
      
      apiStatus = promotionResp.status;
      if(promotionResp.status !== 401){
        promotion = promotionResp.data;
      }
    } else {
      //TODO show error
    }

    console.log("PREMISES", session.user_data?.premises);
  } else {
    //TODO ver como manejar cuando no hay session
  }
  return (
    <main>
      <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('${promotion?.background.path}')` }} >
        <PromotionConfirmation id={id} promotion={promotion} userSession={session}/>
      </div>
    </main>
  );
}