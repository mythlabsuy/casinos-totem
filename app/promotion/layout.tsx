import { auth } from '@/auth';
import { SignOutButton } from '../ui/components/sign-out-button';
 
export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  let userName: string = '';
  
  if(session && session.user_data){
    userName = session.user_data.username ? session.user_data.username : session.user_data.username;
  }

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="flex-grow md:overflow-y-auto xs:p-12">{children}</div>
      <div className='fixed right-2 bottom-2'>
        <SignOutButton/>
      </div>
    </div>
  );
}