import { PromotionParticipationForm } from '@/app/ui/components/promotion/promotion-participation-form';
import { lusitana } from '@/app/ui/fonts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Registro',
};
 
export default async function Page() {
  
  return (
    <main>
      <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://imageio.forbes.com/specials-images/imageserve/656df61cc3a44648c235dde3/Las-Vegas--Nevada--USA-at-the-Welcome-Sign/960x0.jpg?format=jpg&width=960')" }} >
        <PromotionParticipationForm doc_number='123456789'/>
      </div>
    </main>
  );
}