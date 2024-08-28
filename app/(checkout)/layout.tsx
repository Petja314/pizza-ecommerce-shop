import { ReactNode } from 'react';
import { Container, Header } from '@/shared/components/shared';

export const metadata = {
   title: 'Michelle Pizza | Basket',
   description: 'Italian top pizza',
};

export default function CheckoutLayout({ children }: { children: ReactNode }) {
   return (
      <main lang="en" className="min-h-screen bg-[#F4F1EE]">
         <Header
            className={'border-gray-200 '}
            hasSearch={false}
            hasCartButton={false}
         />
         <Container>{children}</Container>
      </main>
   );
}
