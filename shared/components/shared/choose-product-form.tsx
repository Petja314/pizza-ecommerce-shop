import React from 'react';

import { Title } from '@/shared/components/shared/title';
import { Button } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';
import Link from 'next/link';

interface Props {
   imageUrl: string;
   name: string;
   className?: string;
   price: number;
   onSubmit: VoidFunction;
   productId: any;
   loading: any;
}

/**
 * From to choose the product
 * @param imageUrl
 * @param name
 * @param className
 * @param price
 * @param onSubmit
 * @constructor
 */

export const ChooseProductForm: React.FC<Props> = ({
   imageUrl,
   name,
   className,
   price,
   onSubmit,
   productId,
   loading,
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

            <Button
               className={'mt-10 w-[100%] pt-2'}
               onClick={() => onSubmit()}
               loading={loading}
            >
               Добавить в корзину за {price} £{' '}
            </Button>
         </div>
      </div>
   );
};
