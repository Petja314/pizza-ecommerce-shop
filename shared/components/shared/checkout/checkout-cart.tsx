import React from 'react';
import { WhiteBlock } from '@/shared/components/shared';
import CheckoutBasketItems from '@/shared/components/shared/checkout/checkout-basket-items';
import { getCartItemsDetails } from '@/shared/lib';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { CartStateItem } from '@/shared/lib/get-cart-details';

interface Props {
   className?: string;
   items: CartStateItem[];
   removeCartItem: (id: number) => void;
   onClickCountButton: (
      id: number,
      quantity: number,
      type: 'plus' | 'minus'
   ) => void;
}

export const CheckoutCart: React.FC<Props> = ({
   className,
   items,
   removeCartItem,
   onClickCountButton,
}) => {
   return (
      <div className={className}>
         <WhiteBlock title={'1. Basket'} endAdornment={''}>
            <div className={'flex flex-col gap-5'}>
               {items.map((item) => (
                  <CheckoutBasketItems
                     key={item.id}
                     id={item.id}
                     imageUrl={item.imageUrl}
                     details={getCartItemsDetails(
                        item.ingridients,
                        item.pizzaType as PizzaType,
                        item.pizzaSize as PizzaSize
                     )}
                     name={item.name}
                     price={item.price}
                     quantity={item.quantity}
                     disabled={item.disabled}
                     onClickRemove={() => removeCartItem(item.id)}
                     onClickCountButton={(type) =>
                        onClickCountButton(item.id, item.quantity, type)
                     }
                  />
               ))}
            </div>
         </WhiteBlock>
      </div>
   );
};
