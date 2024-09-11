import React from 'react';

import { Title } from '@/shared/components/shared/title';
import { Button } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';
import { Container } from '@/shared/components/shared/container';

interface Props {
   imageUrl: string;
   name: string;
   className?: string;
   price: number;
   onSubmit: VoidFunction;
   productId: any;
   loading: any;
   isProductPage: boolean;
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
   isProductPage,
}) => {
   return (
      <>
         <div
            className={
               'flex  max-lg:flex max-lg:flex-col items-center max-h-full justify-center overflow-hidden'
            }
         >
            <div
               className={cn(
                  'flex items-center justify-center relative w-full max-lg:',
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

            <div
               className={
                  'w-[490px] bg-[#f7f6f5] p-7 border rounded-2xl max-lg:max-w-full'
               }
            >
               <Title
                  text={name}
                  size={'md'}
                  className={
                     'font-extrabold mb-1 max-lg:flex max-lg:justify-center'
                  }
               />

               <Button
                  className={
                     'mt-10 w-[100%] pt-2 max-lg:flex max-lg:justify-center'
                  }
                  onClick={() => onSubmit()}
                  loading={loading}
               >
                  Add to basket for {price} £{' '}
               </Button>
            </div>
         </div>
      </>
   );
};
