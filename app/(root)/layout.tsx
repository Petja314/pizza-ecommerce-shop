import type { Metadata } from 'next';
import '../globals.css';
import { Header } from '@/shared/components/shared';

export const metadata: Metadata = {
   title: 'Dodo Pizza | Home',
   description: 'Pizza delivery to your home',
};

export default function RootLayout({
   children,
   modal,
}: Readonly<{
   children: React.ReactNode;
   modal: React.ReactNode;
}>) {
   return (
      <main className={'min-h-screen'}>
         <Header />
         {children}
         {modal}
      </main>
   );
}
