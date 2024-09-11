'use client';
import React from 'react';
import { cn } from '@/shared/lib/utils';
import { CartItemProps } from '../cart/cart-item-details/cart-item-details.types';
import { X } from 'lucide-react';
import { CartItemDetailsImage } from '@/shared/components/shared/cart/cart-item-details/cart-item-details-image';
import { CartItemDetailsPrice } from '@/shared/components/shared/cart/cart-item-details/cart-item-details-price';
import { CartItemDetailsCountButton } from '@/shared/components/shared/cart/cart-item-details/cart-item-details-count-button';
import { CartItemInfo } from '@/shared/components/shared/cart/cart-item-details/cart-item-info';

interface Props extends CartItemProps {
   onClickCountButton?: (type: 'plus' | 'minus') => void;
   onClickRemove?: () => void;
   className?: string;
}

const CheckoutBasketItems: React.FC<Props> = ({
   className,
   imageUrl,
   name,
   details,
   onClickCountButton,
   quantity,
   onClickRemove,
   price,
   disabled,
}) => {
   return (
      <div
         className={cn('flex items-start justify-between max-sm:flex-col ', {
            'opacity-50 pointer-events-none': disabled,
         })}
      >
         <div className={'flex items-start gap-5 flex-1 max-sm:items-center'}>
            <CartItemDetailsImage src={imageUrl} />
            <CartItemInfo name={name} details={details} />
         </div>

         <div
            className={
               'flex items-center gap-10 ml-20 max-sm:gap-1 max-lg:gap-10 max-lg:mt-4'
            }
         >
            <CartItemDetailsPrice value={price} />
            <CartItemDetailsCountButton
               onClick={onClickCountButton}
               value={quantity}
            />
            <button type={'button'} onClick={onClickRemove}>
               <X
                  className={'text-gray-400 cursor-pointer hover:text-gray-600'}
                  size={20}
               />
            </button>
         </div>
      </div>
   );
};

export default CheckoutBasketItems;
