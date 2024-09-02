'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Container } from '@/shared/components/shared/container';
import { cn } from '@/shared/lib/utils';
import Link from 'next/link';
import { Button } from '@/shared/components/ui/button';
import { User } from 'lucide-react';
import { SearchInput } from '@/shared/components/shared/search-input';
import { CartButton } from '@/shared/components/shared/cart/cart-button';
import { useSearchParam } from 'react-use';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { useSession, signIn, signOut } from 'next-auth/react';
import { AuthButton } from '@/shared/components/shared/auth-button/auth-button';
import { AuthModal } from '@/shared/components/shared/modals';

interface Props {
   hasSearch?: boolean;
   hasCartButton?: boolean;
   className?: string;
}

export const Header: React.FC<Props> = ({
   className,
   hasSearch = true,
   hasCartButton = true,
}) => {
   const [openAuthModal, setOpenAuthModal] = useState(false);
   const { data: session } = useSession();
   // console.log('session >', session);
   const searchParams = useSearchParams();
   const router = useRouter();

   useEffect(() => {
      if (searchParams.has('paid')) {
         setTimeout(() => {
            toast.success('Order successfully has been paid!', {
               icon: '✅',
            });
         }, 500);
         router.push('/');
      }
      if (searchParams.has('verified')) {
         setTimeout(() => {
            toast.success('Account was successfully confirmed', {
               icon: '✅',
            });
         }, 500);
         router.push('/');
      }
   }, []);

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
            {hasSearch && (
               <div className={'mx-10 flex-1'}>
                  <SearchInput />
               </div>
            )}

            {/*RIGHT SIDE*/}
            <div className={'flex items-center gap-3'}>
               <AuthModal
                  open={openAuthModal}
                  onClose={() => setOpenAuthModal(false)}
               />
               <AuthButton onClickSignIn={() => setOpenAuthModal(true)} />
               {hasCartButton && (
                  <div>
                     <CartButton />
                  </div>
               )}
            </div>
         </Container>
      </header>
   );
};
