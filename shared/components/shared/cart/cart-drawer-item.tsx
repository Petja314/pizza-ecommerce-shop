'use client';

import React from 'react';
import { cn } from '@/shared/lib/utils';
import * as CartItem from './cart-item-details';
import { CartItemProps } from '@/shared/components/shared/cart/cart-item-details/cart-item-details.types';
import { CountButton } from './cart-item-details';
import { Trash2Icon } from 'lucide-react';

interface Props extends CartItemProps {
   onClickCountButton?: (type: 'plus' | 'minus') => void;
   onClickRemove?: () => void;
   className?: string;
}

export const CartDrawerItem: React.FC<Props> = ({
   className,
   id,
   imageUrl,
   details,
   name,
   price,
   quantity,
   disabled,
   onClickCountButton,
   onClickRemove,
}) => {
   return (
      <div className={cn('flex bg-white p-5 ga-6', className)}>
         <CartItem.Image src={imageUrl} />
         <div className={'flex-1'}>
            <CartItem.Info name={name} details={details} />
            <hr className={'my-3'} />

            <div className={'flex justify-between items-center'}>
               <CountButton onClick={onClickCountButton} value={quantity} />

               <div className={'flex items-center gap-3'}>
                  <CartItem.Price value={price} />
                  <Trash2Icon
                     onClick={onClickRemove}
                     size={16}
                     className={
                        'cursor-pointer text-gray-400 hover:text-gray-600'
                     }
                  />
               </div>
            </div>
         </div>
      </div>
   );
};
