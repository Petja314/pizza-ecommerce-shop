import React from 'react';

import { Title } from '@/shared/components/shared/title';
import { Button } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';

interface Props {
   imageUrl: string;
   name: string;
   ingredients: any[];
   items?: any[];
   onClickAdd?: VoidFunction;
   className?: string;
   textDetails?: string;
   price: number;
}

export const ChooseProductForm: React.FC<Props> = ({
   imageUrl,
   name,
   ingredients,
   items,
   onClickAdd,
   className,
   textDetails = '25 см, традиционное тесто 25, 380г',
   price = 20,
}) => {
   return (
      <div className={'flex flex-1'}>
         <div
            className={cn(
               'flex items-center justify-center flex-1 relative w-full',
               className
            )}
         >
            <img
               src={imageUrl}
               alt={`product-${name}`}
               className={cn(
                  'relative left-2 top-2 transition-all z-10 duration duration-300 w-[350px] h-[350px]'
               )}
            />
         </div>

         <div className={'w-[490px] bg-[#f7f6f5] p-7'}>
            <Title text={name} size={'md'} className={'font-extrabold mb-1'} />
            <p className={'text-gray-400'}>{textDetails}</p>

            <Button className={'mt-10 w-[100%] pt-2'}>
               Добавить в корзину за {price} £{' '}
            </Button>
         </div>
      </div>
   );
};
