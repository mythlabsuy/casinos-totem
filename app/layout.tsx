import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
 
export const metadata: Metadata = {
  //TODO update metadata
  title: {
    template: '%s | Totem',
    default: 'Totem',
  },
  description: 'The official Next.js Learn Dashboard built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-white">
      <body className={`${inter.className} antialiased h-full`}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
