import { PromotionUnavailable } from '@/app/ui/components/promotion/promotion-unavailable';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'No hay promocion',
};
 
export default async function Page() {
  
  return (
    <main>
      <div>
        <PromotionUnavailable />
      </div>
    </main>
  );
}