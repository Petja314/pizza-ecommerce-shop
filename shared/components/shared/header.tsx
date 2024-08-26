'use client';
import React from 'react';
import Image from 'next/image';
import { Container } from '@/shared/components/shared/container';
import { cn } from '@/shared/lib/utils';
import Link from 'next/link';
import { Button } from '@/shared/components/ui/button';
import { User } from 'lucide-react';
import { SearchInput } from '@/shared/components/shared/search-input';
import { CartButton } from '@/shared/components/shared/cart/cart-button';

interface Props {
   className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
   return (
      <header className={cn('border border-b', className)}>
         <Container className="flex items-center justify-between py-8">
            {/*Left side*/}
            <Link href={'/'}>
               <div className={'flex items-center gap-4'}>
                  <Image
                     src={'/logo.png'}
                     alt={'logo'}
                     width={35}
                     height={35}
                  />
                  <div>
                     <h1 className={'text-2xl uppercase font-black'}>
                        Next pizza
                     </h1>
                     <p className={'text-sm text-gray-400 leading-3'}>
                        вкусней уже некуда
                     </p>
                  </div>
               </div>
            </Link>

            {/*CENTER*/}
            <div className={'mx-10 flex-1'}>
               <SearchInput />
            </div>

            {/*RIGHT SIDE*/}
            <div className={'flex items-center gap-3'}>
               <Button
                  variant={'outline'}
                  className={'flex items-center gap-1'}
               >
                  <User size={16} />
                  Войти
               </Button>

               <div>
                  <CartButton />
               </div>
            </div>
         </Container>
      </header>
   );
};
