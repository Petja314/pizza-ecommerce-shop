import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Button } from '@/shared/components/ui';
import { CircleUser, User } from 'lucide-react';
import Link from 'next/link';

interface Props {
   onClickSignIn?: () => void;
   className?: string;
}

export const AuthButton: React.FC<Props> = ({ className, onClickSignIn }) => {
   const { data: session } = useSession();

   return (
      <div className={className}>
         {!session ? (
            <Button
               onClick={onClickSignIn}
               variant="outline"
               className="flex items-center gap-1"
            >
               <User size={16} />
               <span className={'max-sm:hidden'}>Sign In</span>
            </Button>
         ) : (
            <Link href="/profile">
               <Button variant="secondary" className="flex items-center gap-2">
                  <CircleUser size={18} />
                  <span className={'max-sm:hidden'}>Profile</span>
               </Button>
            </Link>
         )}
      </div>
   );
};
