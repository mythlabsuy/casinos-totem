import { fetchActivePromotion } from '@/app/lib/data/promotions';
import { ApiResponse, Promotion, TokenPremise } from '@/app/lib/definitions';
import { PromotionWelcomeForm } from '@/app/ui/components/promotion/promotion-welcome-form';
import { auth } from '@/auth';
import { Metadata } from 'next';
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'Bienvenida',
};
 
export default async function Page() {
  let tokenPremise: TokenPremise;
  let promotion: Promotion | undefined = undefined;
  let apiStatus: number = 200;
  let premiseId : number | undefined = undefined;
  const session = await auth();

  // If user is not logged in session will be null
  // If the user has many premises, only the first one will be used.
  // Totem users should have only 1 premise
  if(session && session.user_data){
    tokenPremise = session.user_data?.premises[0];
    premiseId = tokenPremise.id;
    try {
      let promotionResp: ApiResponse = await fetchActivePromotion(premiseId);
        promotion = promotionResp.data;
        if(!promotion){
          redirect('/promotion/unavailable')
        }
    } catch (error) {
        throw error;
    }
  } else {

  }
    return (
      <main>
        <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('${promotion?.welcome_background.path}')` }} >
          <PromotionWelcomeForm promotion={promotion} premiseId={premiseId}/>
        </div>
      </main>
    );
}