import { Promotion } from '@/app/lib/definitions';

import { ReprintPromotionForm } from '@/app/ui/components/promotion/reprint-promotion-form';
import { auth } from '@/auth';
import { Metadata } from 'next';
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'Reimprimir ticket',
};

 
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
 let id = (await params).id
  return (
    <main>
      <div className="min-h-screen bg-cover bg-center bg-no-repeat" >
        <ReprintPromotionForm participationId={id} />
      </div>
    </main>
  );
}