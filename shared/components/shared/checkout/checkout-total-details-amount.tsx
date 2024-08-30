import React, { ReactNode } from 'react';
import { cn } from '@/shared/lib/utils';

interface Props {
   icon?: ReactNode;
   className?: string;
   title: string;
   value: ReactNode;
}

export const CheckoutTotalDetailsAmount: React.FC<Props> = ({
   className,
   title,
   value,
   icon,
}) => {
   return (
      <div className={'flex my-4'}>
         <span
            className={'flex items-center  flex-1 text-lg text-neutral-500 '}
         >
            <span className={'mr-2 text-gray-400'}> {icon} </span> {title}
            <div
               className={
                  'flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2'
               }
            />
         </span>
         <span className={'font-bold text-lg'}>{value} </span>
      </div>
   );
};
