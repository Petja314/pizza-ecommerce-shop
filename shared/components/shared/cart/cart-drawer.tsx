'use client';

import React, { useEffect } from 'react';
import {
   Sheet,
   SheetContent,
   SheetFooter,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from '@/components/ui/sheet';
import Link from 'next/link';
import { Button } from '@/shared/components/ui';
import { ArrowRight } from 'lucide-react';
import { CartDrawerItem } from '@/shared/components/shared';
import { getCartItemsDetails } from '@/shared/lib';
import { useCartStore } from '@/shared/store/cart';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { updateItemQuantity } from '@/services/cart';

interface Props {
   className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({
   className,
   children,
}) => {
   const [
      totalAmount,
      fetchCartItems,
      items,
      updateItemQuantity,
      removeCartItem,
   ] = useCartStore((state) => [
      state.totalAmount,
      state.fetchCartItems,
      state.items,
      state.updateItemQuantity,
      state.removeCartItem,
   ]);

   useEffect(() => {
      fetchCartItems();
   }, []);
   const onClickCountButton = (
      id: number,
      quantity: number,
      type: 'plus' | 'minus'
   ) => {
      // console.log('onClickCountButton > ', { id, quantity, type });
      const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
      updateItemQuantity(id, newQuantity);
   };
   const onClickRemove = (id: number) => {
      removeCartItem(id);
   };

   return (
      <Sheet>
         <SheetTrigger asChild>{children}</SheetTrigger>
         <SheetContent
            className={'flex flex-col justify-between pb-0 bg-[#F4F1EE]'}
         >
            <SheetHeader>
               <SheetTitle>
                  Items in basket :{' '}
                  <span className={'font-bold'}>{items.length}</span>
               </SheetTitle>
            </SheetHeader>

            <div className={'-mx-6 mt-5 overflow-auto flex-1 scrollbar'}>
               <div className={'mb-2'}>
                  {items.map((item) => (
                     <CartDrawerItem
                        onClickRemove={() => onClickRemove(item.id)}
                        onClickCountButton={(type) =>
                           onClickCountButton(item.id, item.quantity, type)
                        }
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
                     />
                  ))}
               </div>
            </div>

            <SheetFooter className={'-mx-6 bg-white p-8 '}>
               <div className={'flex flex-col w-full'}>
                  <div className={'flex mb-4'}>
                     <span className={'flex flex-1 text-lg text-neutral-500'}>
                        Total
                        <div
                           className={
                              'flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2'
                           }
                        ></div>
                     </span>
                     <span className={'font-bold text-lg'}>
                        {totalAmount} £
                     </span>
                  </div>
                  <Link href={'/cart'}>
                     <Button
                        type={'submit'}
                        className={'w-full h-12 text-base'}
                     >
                        Place order
                        <ArrowRight className={'w-5 ml-2'} />
                     </Button>
                  </Link>
               </div>
            </SheetFooter>
         </SheetContent>
      </Sheet>
   );
};
