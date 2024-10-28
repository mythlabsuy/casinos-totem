import { fetchActivePromotion } from '@/app/lib/data/promotions';
import { ApiResponse, Premise, Promotion } from '@/app/lib/definitions';
import { LogOut } from '@/app/ui/components/logOut';
import { PromotionWelcomeForm } from '@/app/ui/components/promotion/promotion-welcome-form';
import { auth } from '@/auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bienvenida',
};
 
export default async function Page() {
  let premise: Premise;
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
      <LogOut status={apiStatus}/>
      <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://imageio.forbes.com/specials-images/imageserve/656df61cc3a44648c235dde3/Las-Vegas--Nevada--USA-at-the-Welcome-Sign/960x0.jpg?format=jpg&width=960')" }} >
        <PromotionWelcomeForm promotion={promotion}/>
      </div>
    </main>
  );
}